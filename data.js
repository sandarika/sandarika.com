/* =============================================================
   ✏️  EDIT THIS FILE TO UPDATE THE SITE
   Everything on the home page is generated from what's below
   (album rankings are in albums.js). You never need to touch the HTML.
   ============================================================= */

window.SITE = {
  name: "Sandi Warjri",
  tagline:
    "Learner.",

  email: "sandarikaw@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sandarika" },
    { label: "GitHub", url: "https://github.com/sandarika" },
  ],

  // Scrolling ticker of languages, tools and skills
  stack: [
    "Python", "Java", "C", "C#", "SQL", "JavaScript", "HTML & CSS",
    "React", "Next.js", "FastAPI", "ASP.NET", "SQLAlchemy", "Bootstrap",
    "Git", "GitHub", "Docker", "Linux", "Bash", "MongoDB", "Postman", "VS Code", "Eclipse",
    "Copilot", "Gemini", "ChatGPT", "Agile",
  ],

  // Paragraphs for the About section (leave empty to show just the stats + list)
  about: [],

  now: [
    "Studying: CS + Business + Math at UNL",
    "Mentoring: young coders at Girls Code Lincoln",
    "Advising: responsible AI with The Prairie Initiative",
  ],

  stats: [
    { value: 4.0, decimals: 1, label: "GPA" },
    { value: 2, label: "hackathon wins" },
    { value: 100, suffix: "%", label: "chance I'm procrastinating rn" },
  ],
};

/* -------------------------------------------------------------
   PROJECTS  (empty for now — the section shows a "coming soon" note)
   Copy this into the list to add one:

   {
     title: "Project name",
     year: 2026,
     category: "Web",              // used for the filter buttons
     description: "One or two sentences about it.",
     tags: ["Python", "React"],
     image: "",                    // e.g. "projects/images/screenshot.png" ("" = animated cover)
     demo: "",                     // live link (or "projects/<folder>/" to host it on this site)
     code: "https://github.com/sandarika/...",
     featured: false,              // true pins it to the top with a badge
   },
   ------------------------------------------------------------- */
window.PROJECTS = [];

// Album rankings live in albums.js (updated by the /albums Claude Code skill).
