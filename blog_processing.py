import os
import json
import time
from pathlib import Path
import google.generativeai as genai
import logging

# --- Configuration ---

# Configure logging to show progress
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ResearchPaperConverter:
    """
    A class to convert research papers (PDFs) into blog posts using the Gemini API.
    Uses the reliable google-generativeai library for file uploads and processing.
    """
    def __init__(self, api_key: str, model_name: str = "gemini-2.0-flash-exp"):
        """
        Initializes the converter with the Gemini API key and model.
        
        Args:
            api_key (str): Your Google AI Studio (Gemini) API key.
            model_name (str): The name of the Gemini model to use.
        """
        try:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel(model_name)
            self.model_name = model_name
            logger.info(f"Gemini model '{model_name}' initialized successfully.")
        except Exception as e:
            logger.critical(f"Failed to configure Gemini. Please check your API key. Error: {e}")
            raise

        # Create output directories for blog posts and a summary file
        self.output_dir = Path("blog_posts")
        self.output_dir.mkdir(exist_ok=True)
        
    def create_enhanced_prompt(self, paper_name_base: str) -> str:
        """
        Creates a detailed, dynamic prompt for the Gemini model.

        Args:
            paper_name_base (str): The base name of the paper file (e.g., 'poseidon_networks').
                                   This is used for creating consistent image paths.
        
        Returns:
            str: The fully formatted prompt string.
        """
        return f"""
You are an expert technical writer and science communicator. Your task is to convert the provided research paper (PDF) into an engaging, accessible, and well-structured blog post in Markdown format. The goal is to make the content understandable to a broad technical audience while maintaining scientific accuracy.

**Output Requirements:**

1.  **YAML Front Matter:** Start with a YAML block formatted exactly like this. Extract the information directly from the paper.
    ```yaml
    ---
    title: "[Create an engaging title that captures the paper's main contribution]"
    excerpt: "[Write a 2-3 sentence summary that hooks the reader by explaining the core problem and solution]"
    date: "[Extract the publication date from the paper in YYYY-MM-DD format. If not found, use today's date]"
    author: "[Extract author names from the paper. List the primary authors.]"
    category: "[Choose an appropriate category, e.g., 'AI/ML', 'Network Systems', 'Computer Vision', 'Bioinformatics']"
    thumbnail: "/images/blogpic/{paper_name_base}_main.png"
    ---
    ```

2.  **Content Structure:**
    *   **Introduction:** Start with a hook that provides context on why this research area is important.
    *   **The Problem:** Clearly explain the challenge or gap the research addresses.
    *   **The Solution:** Introduce the paper's main contribution or proposed method.
    *   **How It Works (Technical Deep Dive):** Explain the methodology in accessible terms. Use analogies or simple examples.
    *   **Key Results:** Highlight the most important findings and evaluation results.
    *   **Why It Matters (Implications):** Discuss the broader impact, limitations, and future directions.
    *   **Conclusion:** Briefly summarize the key takeaways.

3.  **Formatting and Style:**
    *   Use **bold** for key terms. Define acronyms on first use.
    *   Use `####` for all subheadings.
    *   Write in a clear, conversational, and engaging tone.
    *   For any figures, charts, or diagrams referenced from the paper, use the following Markdown format for image linking. Provide a descriptive alt text.
    *   **Image Reference Format:** `![Descriptive alt text for the figure](/images/blogpic/{paper_name_base}_figure[X].png)`, where `[X]` is the figure number (e.g., `_figure1`, `_figure2`).

4.  **Final Touches:**
    *   If a link to the original paper (e.g., on arXiv) or a code repository (e.g., GitHub) is mentioned, include it at the end.

Please now process the provided PDF file and generate the complete Markdown blog post.
"""

    def process_paper(self, pdf_path: str):
        """
        Processes a PDF file and generates a blog post using the Gemini API.
        
        Args:
            pdf_path (str): The path to the PDF file.
            
        Returns:
            str or None: The generated blog post content in Markdown, or None if an error occurred.
        """
        paper_name_base = Path(pdf_path).stem.lower().replace(' ', '_').replace('-', '_')
        logger.info(f"Processing paper: {pdf_path} (Base name: {paper_name_base})")
        
        uploaded_file = None
        try:
            # Step 1: Upload the file to the Gemini File API
            logger.info("Uploading file to Gemini...")
            uploaded_file = genai.upload_file(path=pdf_path, display_name=paper_name_base)
            logger.info(f"File uploaded successfully: {uploaded_file.name}")
            
            # Wait for file processing to complete
            while uploaded_file.state.name == "PROCESSING":
                logger.info("Waiting for file processing...")
                time.sleep(10)
                uploaded_file = genai.get_file(uploaded_file.name)
            
            if uploaded_file.state.name == "FAILED":
                logger.error(f"File processing failed: {uploaded_file.state}")
                return None
            
            # Step 2: Generate content using the detailed prompt and the uploaded file
            prompt = self.create_enhanced_prompt(paper_name_base)
            logger.info("Generating content from the paper...")
            response = self.model.generate_content([prompt, uploaded_file])
            
            logger.info("Successfully generated blog post content.")
            return response.text
            
        except Exception as e:
            logger.error(f"An error occurred while processing {pdf_path}: {e}")
            return None
            
        finally:
            # Step 3: Clean up by deleting the file from the Gemini server
            if uploaded_file:
                try:
                    logger.info(f"Deleting uploaded file: {uploaded_file.name}")
                    genai.delete_file(uploaded_file.name)
                except Exception as cleanup_error:
                    logger.warning(f"Failed to delete uploaded file: {cleanup_error}")

    def save_blog_post(self, content: str, paper_name: str):
        """Saves the generated blog post content to a .md file."""
        filename = f"{paper_name.lower().replace(' ', '_').replace('-', '_')}.md"
        filepath = self.output_dir / filename
        
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            logger.info(f"Blog post saved successfully: {filepath}")
            return str(filepath)
        except IOError as e:
            logger.error(f"Failed to save blog post {filepath}: {e}")
            return None

    def process_folder(self, folder_path: str):
        """
        Processes all PDF files in a given folder.
        
        Args:
            folder_path (str): The path to the folder containing PDF files.
        """
        folder = Path(folder_path)
        pdf_files = list(folder.glob("*.pdf"))
        
        if not pdf_files:
            logger.warning(f"No PDF files found in the '{folder_path}' directory. Please add some papers and run again.")
            return

        logger.info(f"Found {len(pdf_files)} PDF(s) to process in '{folder_path}'.")
        
        results = []
        for pdf_file in pdf_files:
            blog_content = self.process_paper(str(pdf_file))
            
            if blog_content:
                filepath = self.save_blog_post(blog_content, pdf_file.stem)
                status = 'success' if filepath else 'failed_to_save'
                results.append({'paper': pdf_file.name, 'blog_post': filepath, 'status': status})
            else:
                results.append({'paper': pdf_file.name, 'blog_post': None, 'status': 'failed_processing'})
            
            # A small delay to respect potential API rate limits
            time.sleep(2)

        # Save a summary of the processing results
        summary_file = self.output_dir / "_processing_summary.json"
        with open(summary_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=4)
        
        logger.info(f"--- Processing complete. Summary saved to: {summary_file} ---")

def main():
    """Main function to configure and run the converter."""
    
    # --- IMPORTANT: CONFIGURE YOUR DETAILS HERE ---
    
    # 1. Set your Gemini API Key
    # It's recommended to set this as an environment variable for security.
    # e.g., API_KEY = os.environ.get("GEMINI_API_KEY")
    API_KEY = ""
    
    # 2. Set the path to your folder containing the research papers
    PDF_FOLDER = "C:/Users/SRINIVAS/Downloads/arxiv_papers"

    # --- END OF CONFIGURATION ---
    
    if not Path(PDF_FOLDER).exists():
        Path(PDF_FOLDER).mkdir(parents=True, exist_ok=True)
        logger.warning(f"Created folder '{PDF_FOLDER}'. Please add your PDF research papers to this folder and run the script again.")
        return
        
    if API_KEY == "YOUR_GEMINI_API_KEY_HERE" or not API_KEY:
        logger.error("Please set your Gemini API key in the `GEMINI_API_KEY` environment variable or update the `API_KEY` variable in the script.")
        return

    try:
        converter = ResearchPaperConverter(api_key=API_KEY)
        converter.process_folder(PDF_FOLDER)
    except Exception as e:
        logger.critical(f"A critical error occurred: {e}")

if __name__ == "__main__":
    main()