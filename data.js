/* =============================================================
   ✏️  EDIT THIS FILE TO UPDATE THE SITE
   Everything on the home page is generated from what's below
   (album rankings are in albums.js). You never need to touch the HTML.
   ============================================================= */

window.SITE = {
  name: "Sandi Warjri",
  initials: "SW",                       // shown in the logo + browser tab icon
  tagline:
    "Computer Science student at the University of Nebraska–Lincoln and the Raikes School, minoring in Business and Math. Mentoring young coders and helping people use AI responsibly.",

  email: "sandarikaw@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sandarika" },
    { label: "GitHub", url: "https://github.com/sandarika" },
  ],

  // Scrolling ticker of languages, tools and skills
  stack: [
    "Python", "Java", "C", "C#", "SQL", "JavaScript", "HTML & CSS",
    "React", "Next.js", "FastAPI", "ASP.NET", "SQLAlchemy", "Bootstrap", "REST APIs",
    "Git", "GitHub", "Docker", "Linux", "Bash", "MongoDB", "Postman", "VS Code", "Eclipse",
    "Copilot", "Gemini", "ChatGPT", "Agile", "Spanish",
  ],

  // Paragraphs for the About section (leave empty to show just the stats + list)
  about: [],

  now: [
    "Studying: CS + Business + Math at UNL",
    "Mentoring: young coders at Girls Code Lincoln",
    "Advising: responsible AI with The Prairie Initiative",
  ],

  // decimals: how many digits after the point (e.g. 2 for a GPA)
  stats: [
    { value: 4.0, decimals: 2, label: "GPA" },
    { value: 7, label: "languages I code in" },
    { value: 2, suffix: "+", label: "years mentoring young coders" },
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
