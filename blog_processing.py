import os
import json
import time
from pathlib import Path
import google.generativeai as genai
import logging
import fitz  # PyMuPDF

# --- Configuration ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ResearchPaperConverter:
    """
    A class to convert research papers (PDFs) into blog posts using the Gemini API.
    It automatically extracts figures with a page-specific naming convention, generates 
    a Markdown article, and checks if a file has already been processed.
    """
    def __init__(self, api_key: str, model_name: str = "gemini-2.5-pro"):
        """Initializes the converter with the Gemini API key and model."""
        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel(model_name)
            logger.info(f"Gemini model '{model_name}' initialized successfully.")
        except Exception as e:
            logger.critical(f"Failed to configure Gemini. Please check your API key. Error: {e}")
            raise

        # Create top-level output directory
        self.output_dir = Path("output")
        self.posts_dir = self.output_dir / "blog_posts"
        self.images_dir = self.output_dir / "images"
        self.posts_dir.mkdir(parents=True, exist_ok=True)
        self.images_dir.mkdir(parents=True, exist_ok=True)
        
    def _extract_and_save_figures(self, pdf_path: str, paper_name_base: str):
        """
        Extracts images from a PDF, converting them to RGB to prevent colorspace
        errors, and naming them based on their page and order on the page.
        """
        logger.info(f"Extracting figures from {pdf_path}...")
        total_figures_saved = 0
        try:
            doc = fitz.open(pdf_path)
            for page_num in range(len(doc)):
                figure_index_on_page = 0
                for img in doc.get_page_images(page_num):
                    xref = img[0]
                    # Create a Pixmap from the image
                    base_pix = fitz.Pixmap(doc, xref)
                    
                    # *** FIX: Convert to RGB if the colorspace is not supported (e.g., CMYK) ***
                    # This prevents the "unsupported colorspace for 'png'" error.
                    if base_pix.colorspace.name not in (fitz.csRGB.name, fitz.csGRAY.name):
                        pix = fitz.Pixmap(fitz.csRGB, base_pix)
                        base_pix = None  # Free memory of the original pixmap
                    else:
                        pix = base_pix # Use the original if it's already compatible

                    # More aggressive filter to ignore small, non-essential images
                    if pix.width < 150 or pix.height < 150:
                        pix = None # free memory
                        continue
                    
                    figure_index_on_page += 1
                    total_figures_saved += 1
                    
                    # NEW NAMING CONVENTION: p[page_number]_f[figure_index]
                    image_filename = f"{paper_name_base}_p{page_num + 1}_f{figure_index_on_page}.png"
                    image_path = self.images_dir / image_filename
                    
                    pix.save(str(image_path))
                    pix = None # free memory

            logger.info(f"Found and saved {total_figures_saved} figures.")
            doc.close()
        except Exception as e:
            logger.error(f"Could not extract figures from {pdf_path}. Error: {e}")

    def create_enhanced_prompt(self, paper_name_base: str) -> str:
        """Creates a detailed, dynamic prompt for the Gemini model."""
        return f"""
You are an expert technical writer and science communicator. Your task is to convert the provided research paper (PDF) into an engaging, accessible, and well-structured blog post in Markdown format.

**Crucial Image Referencing Rules:**

When you reference a figure from the paper, you MUST use a specific format that includes the page number and the figure's order on that page.
- **Image Path Format:** `/images/{paper_name_base}_p[PAGENO]_f[FIG_ON_PAGE_INDEX].png`
- **Example:** For the first figure discussed on page 3, the path would be `/images/{paper_name_base}_p3_f1.png`. For the second figure on page 5, it would be `/images/{paper_name_base}_p5_f2.png`.

**Output Requirements:**

1.  **YAML Front Matter:**
    - For the `thumbnail`, select the most representative figure (like an architecture diagram) and use the crucial image path format described above.

    ```yaml
    ---
    title: "[Create an engaging title that captures the paper's main contribution]"
    excerpt: "[Write a 2-3 sentence summary that hooks the reader]"
    date: "[Extract the publication date from the paper in YYYY-MM-DD format]"
    author: "[Extract author names from the paper]"
    category: "[Choose an appropriate category, e.g., 'AI/ML', 'Network Systems', 'Computer Vision']"
    thumbnail: "/images/{paper_name_base}_p[PAGENO]_f[FIG_ON_PAGE_INDEX].png"
    ---
    ```

2.  **Content Structure & Formatting:**
    - Use clear subheadings (`####`).
    - Use **bold** for key terms.
    - When you include an image in the body, use the following Markdown, strictly adhering to the image path format: `![Descriptive alt text](/images/{paper_name_base}_p[PAGENO]_f[FIG_ON_PAGE_INDEX].png)`.

Please now process the provided PDF file and generate the complete Markdown blog post following these strict instructions.
"""

    def process_paper(self, pdf_path: str):
        """Processes a single PDF: extracts figures, then generates a blog post."""
        paper_name_base = Path(pdf_path).stem.lower().replace(' ', '_').replace('-', '_')
        logger.info(f"Starting to process paper: {pdf_path}")
        
        self._extract_and_save_figures(pdf_path, paper_name_base)

        uploaded_file = None
        try:
            logger.info("Uploading file to Gemini for content generation...")
            # Using the new File API for better robustness
            uploaded_file = genai.upload_file(path=pdf_path, display_name=paper_name_base)
            
            prompt = self.create_enhanced_prompt(paper_name_base)
            logger.info("Generating content from the paper...")
            response = self.model.generate_content([prompt, uploaded_file])
            
            logger.info("Successfully generated blog post content.")
            return response.text
            
        except Exception as e:
            logger.error(f"An error occurred during Gemini processing for {pdf_path}: {e}")
            return None
            
        finally:
            if uploaded_file:
                logger.info(f"Deleting uploaded file: {uploaded_file.name}")
                genai.delete_file(uploaded_file.name)

    def save_blog_post(self, content: str, paper_name_base: str):
        """Saves the generated blog post content to a .md file."""
        filename = f"{paper_name_base}.md"
        filepath = self.posts_dir / filename
        
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            logger.info(f"Blog post saved successfully: {filepath}")
            return str(filepath)
        except IOError as e:
            logger.error(f"Failed to save blog post {filepath}: {e}")
            return None

    def process_folder(self, folder_path: str):
        """Processes all PDF files in a given folder, skipping already processed files."""
        folder = Path(folder_path)
        pdf_files = list(folder.glob("*.pdf"))
        
        if not pdf_files:
            logger.warning(f"No PDF files found in the '{folder_path}' directory. Please add some papers and run again.")
            return

        logger.info(f"Found {len(pdf_files)} PDF(s) to process in '{folder_path}'.")
        
        results = []
        for pdf_file in pdf_files:
            paper_name_base = pdf_file.stem.lower().replace(' ', '_').replace('-', '_')
            
            output_md_path = self.posts_dir / f"{paper_name_base}.md"
            if output_md_path.exists():
                logger.info(f"Skipping '{pdf_file.name}' as its output '{output_md_path.name}' already exists.")
                continue

            blog_content = self.process_paper(str(pdf_file))
            
            if blog_content:
                filepath = self.save_blog_post(blog_content, paper_name_base)
                status = 'success' if filepath else 'failed_to_save'
                results.append({'paper': pdf_file.name, 'blog_post': filepath, 'status': status})
            else:
                results.append({'paper': pdf_file.name, 'blog_post': None, 'status': 'failed_processing'})
            
            # A short delay can help manage API rate limits if processing many files
            time.sleep(2)

        summary_file = self.output_dir / "_processing_summary.json"
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4)
        
        logger.info(f"--- Processing complete. Summary and outputs saved to: {self.output_dir} ---")

def main():
    """Main function to configure and run the converter."""
    # IMPORTANT: Please replace with your actual API key and folder path.
    API_KEY = "AIzaSyAjFwi2L4vNUcmy5pcIgLe4KINcHg4k1_U"  # <-- Replace with your key
    PDF_FOLDER = "C:/Users/SRINIVAS/Downloads/test"          # <-- Place your PDFs in this folder
    
    # Create the folder for PDFs if it doesn't exist
    if not Path(PDF_FOLDER).exists():
        Path(PDF_FOLDER).mkdir()
        logger.warning(f"Created folder '{PDF_FOLDER}'. Please add your PDF research papers to this folder and run the script again.")
        return
        
    if API_KEY == "YOUR_GEMINI_API_KEY_HERE" or not API_KEY:
        logger.error("Please set your Gemini API key in the `API_KEY` variable inside the script.")
        return

    try:
        converter = ResearchPaperConverter(api_key=API_KEY)
        converter.process_folder(PDF_FOLDER)
    except Exception as e:
        logger.critical(f"A critical error occurred during initialization: {e}")

if __name__ == "__main__":
    main()