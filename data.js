/* =============================================================
   ✏️  EDIT THIS FILE TO UPDATE THE SITE
   Everything on both pages (home + albums) is generated from
   what's below. You never need to touch the HTML.
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

/* -------------------------------------------------------------
   ALBUMS  (shown on albums.html, sorted by rank: 1 = best)
   1. Put the cover image in the  images/albums/  folder
   2. Copy the line below into the list and fill it in

   { rank: 1, title: "Album Title", artist: "Artist", favSong: "Favorite Song", image: "images/albums/cover.jpg" },

   - image can also be a full https:// link, or "" for a generated cover
   - artist is optional
   ------------------------------------------------------------- */
window.ALBUMS = [];
