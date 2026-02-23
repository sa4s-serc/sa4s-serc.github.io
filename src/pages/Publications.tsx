import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from 'lucide-react';
import { useEffect, useState } from "react";
import * as bibtexParse from "bibtex-parse-js";

interface Publication {
  id: string;
  authors: string[];
  title: string;
  venue: string;
  volume?: string;
  year: number;
  pages?: string;
  doi: string;
  publisher?: string;
  isbn?: string;
}

interface YearlyPublications {
  year: number;
  papers: Publication[];
}

function parseAuthors(rawAuthorString: string): string[] {
  return rawAuthorString
    .split(" and ")
    .map(a => a.trim())
    .filter(a => a.length > 0);
}

function decodeLatex(str: string): string {
  if (!str) return "";

  // Normalize double backslashes (e.g., \\')
  str = str.replace(/\\\\/g, "\\");

  // Extensive LaTeX accent map
  const accentMap: Record<string, string> = {
    // Umlaut / Diaeresis
    '\\"a': "ä", '\\"e': "ë", '\\"i': "ï", '\\"o': "ö", '\\"u': "ü",
    '\\"A': "Ä", '\\"E': "Ë", '\\"I': "Ï", '\\"O': "Ö", '\\"U': "Ü",

    // Acute
    "\\'a": "á", "\\'e": "é", "\\'i": "í", "\\'o": "ó", "\\'u": "ú",
    "\\'A": "Á", "\\'E": "É", "\\'I": "Í", "\\'O": "Ó", "\\'U": "Ú",
    "\\'y": "ý", "\\'Y": "Ý",

    // Grave
    "\\`a": "à", "\\`e": "è", "\\`i": "ì", "\\`o": "ò", "\\`u": "ù",
    "\\`A": "À", "\\`E": "È", "\\`I": "Ì", "\\`O": "Ò", "\\`U": "Ù",

    // Circumflex
    "\\^a": "â", "\\^e": "ê", "\\^i": "î", "\\^o": "ô", "\\^u": "û",
    "\\^A": "Â", "\\^E": "Ê", "\\^I": "Î", "\\^O": "Ô", "\\^U": "Û",

    // Tilde
    "\\~a": "ã", "\\~n": "ñ", "\\~o": "õ",
    "\\~A": "Ã", "\\~N": "Ñ", "\\~O": "Õ",

    // Cedilla
    "\\c{c}": "ç", "\\c{C}": "Ç",

    // Caron / Hacek
    "\\v{c}": "č", "\\v{s}": "š", "\\v{z}": "ž",
    "\\v{C}": "Č", "\\v{S}": "Š", "\\v{Z}": "Ž",

    // Ring
    "\\r{a}": "å", "\\r{A}": "Å",

    // Dot
    "\\.z": "ż", "\\.Z": "Ż",

    // Ligatures and special letters
    "{\\ae}": "æ", "{\\AE}": "Æ",
    "{\\oe}": "œ", "{\\OE}": "Œ",
    "{\\o}": "ø", "{\\O}": "Ø",
    "\\ss": "ß",
    // "\\l": "ł", "\\L": "Ł",

    // Common macros
    "\\&": "&",
    "\\%": "%",
  };

  for (const [latex, char] of Object.entries(accentMap)) {
    str = str.replace(new RegExp(latex, "g"), char);
  }

  // Handle nested forms like {\'{a}} or {\~{n}}
  str = str.replace(/\{\\['`"^~vckr]\{([a-zA-Z])\}\}/g, (_, l) => l.normalize("NFC"));

  // Remove math macros like \(\mathscr{H}\)
  str = str.replace(/\\\([^\)]*\\\)/g, "");
  str = str.replace(/\\\[[^\]]*\\\]/g, "");
  str = str.replace(/\\mathscr\{?([A-Za-z])\}?/g, "$1");
  str = str.replace(/\\mathbb\{?([A-Za-z])\}?/g, "$1");

  // Remove text styling
  str = str.replace(/\\text(it|bf)\{([^}]*)\}/g, "$2");

  // Remove remaining LaTeX commands (safe fallback)
  str = str.replace(/\\[a-zA-Z]+\{([^}]*)\}/g, "$1");
  str = str.replace(/\\[a-zA-Z]+/g, "");

  // Remove unneeded braces
  str = str.replace(/[{}]/g, "");

  // Normalize whitespace
  str = str.replace(/\s+/g, " ").trim();

  return str;
}

function parseBibContent(bibContent: string): YearlyPublications[] {
  const parsed = bibtexParse.toJSON(bibContent);
  const map: Record<number, Publication[]> = {};
  const seenTitles = new Set<string>();

  for (const entry of parsed) {
    const fields = entry.entryTags;
    const year = parseInt(fields.year, 10);
    if (isNaN(year)) continue;

    const rawTitle = decodeLatex(fields.title || "");
    const normalizedTitle = rawTitle.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Deduplicate identical papers (e.g., conference version vs arXiv preprint)
    if (!normalizedTitle || seenTitles.has(normalizedTitle)) continue;
    seenTitles.add(normalizedTitle);

    const publication: Publication = {
      id: entry.citationKey,
      authors: parseAuthors(decodeLatex(fields.author || "")),
      title: rawTitle,
      venue: decodeLatex(fields.journal || fields.booktitle || ""),
      volume: decodeLatex(fields.volume || ""),
      year,
      pages: decodeLatex(fields.pages || ""),
      doi: decodeLatex(fields.doi || ""),
      publisher: decodeLatex(fields.publisher || ""),
      isbn: decodeLatex(fields.isbn || ""),
    };

    if (!map[year]) map[year] = [];
    map[year].push(publication);
  }

  return Object.entries(map)
    .map(([year, papers]) => ({
      year: Number(year),
      papers,
    }))
    .sort((a, b) => b.year - a.year);
}

const conferences = [
  { name: 'ICSA', logo: '/images/publications/icsa24.jpeg' },
  { name: 'ICSE', logo: '/images/publications/icse24.png' },
  { name: 'SEAMS', logo: '/images/publications/seams24.png' },
  { name: 'Software', logo: '/images/publications/software-logo-black-700x223.png' },
  { name: 'WF-IoT', logo: '/images/publications/wfiot.png' },
];

const Publications = () => {
  const [publicationsByYear, setPublicationsByYear] = useState<YearlyPublications[]>([]);

  useEffect(() => {
    const loadBibtex = async () => {
      try {
        const res = await fetch("/dblp.bib"); // served from /public/dblp.bib
        if (!res.ok) throw new Error("Failed to load .bib file");
        console.log("Fetched .bib file successfully");

        const bibContent = await res.text();
        const result = parseBibContent(bibContent);
        setPublicationsByYear(result);
      } catch (err: any) {
        console.error("Error loading publications:", err.message);
      }
    };

    loadBibtex();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-sa4s-teal-50 to-sa4s-blue-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Our research contributions published in leading conferences and journals in software engineering and computing.
          </p>
        </div>
      </div>

      {/* Conference Banner */}
      <div className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 overflow-x-auto pb-4">
            {conferences.map((conference) => (
              <div key={conference.name} className="flex-shrink-0">
                <img
                  src={conference.logo}
                  alt={conference.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity duration-150"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Publications by Year */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="multiple" className="space-y-8">
            {publicationsByYear.map((yearData) => (
              <AccordionItem key={yearData.year} value={yearData.year.toString()} className="border border-gray-200 rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-2xl font-bold text-gray-900">{yearData.year}</h2>
                    <span className="text-sm text-gray-500 mr-4">
                      {yearData.papers.length} publication{yearData.papers.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-4">
                    {yearData.papers.map((paper) => (
                      <li key={paper.id} className="leading-relaxed">
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-sa4s-teal-500 rounded-full mr-4 flex-shrink-0 mt-2"></span>
                          <div>
                            <span className="text-gray-700">
                              {paper.authors.join(', ')}.{" "}
                            </span>
                            <span className="italic text-gray-900 font-medium">
                              "{paper.title}."{" "}
                            </span>
                            <span className="text-gray-700">
                              <em>{paper.venue}</em>
                              {paper.volume && `, vol. ${paper.volume}`}
                              {paper.pages && `, pp. ${paper.pages}`}
                              , {paper.year}.
                            </span>
                            {paper.doi && (
                              <a
                                href={paper.doi.startsWith("http") ? paper.doi : `https://doi.org/${paper.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-2 text-sa4s-teal-600 hover:text-sa4s-teal-700 underline inline-flex items-center"
                              >
                                DOI
                                <ExternalLink size={14} className="ml-1" />
                              </a>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Publications;
