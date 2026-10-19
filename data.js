/* =============================================================
   ✏️  EDIT THIS FILE TO UPDATE THE SITE
   Everything on the home page is generated from what's below
   (rated albums are in albums.js). You never need to touch the HTML.
   ============================================================= */

window.SITE = {
  name: "Sandi Warjri",

  email: "sandarikaw@gmail.com",
  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/sandarika" },
    { label: "GitHub", url: "https://github.com/sandarika" },
  ],

  // The piano on the home page: one white key per experience, in this order.
  // Each: role, org, when, note (a sentence), and optionally link.
  experience: [
    { role: "Student", org: "University of Nebraska–Lincoln · Raikes School", when: "now",
      note: "Studying Computer Science, Business and Math, with a 4.0 GPA." },
    { role: "Mentor", org: "Girls Code Lincoln", when: "now",
      note: "Mentoring young coders." },
    { role: "Advisor", org: "The Prairie Initiative", when: "now",
      note: "Advising on responsible AI." },
    { role: "Hackathon winner", org: "2 wins", when: "",
      note: "Two hackathon wins, and counting." },
    { role: "Album rater", org: "sandarika.com/albums", when: "always",
      note: "Every album I've had on repeat, with my favourite song from each.", link: "/albums" },
  ],

  // Credits in the liner notes (contact section)
  linerNotes: [
    { label: "Written, produced & performed by", text: "Sandi Warjri" },
    { label: "Recorded at", text: "University of Nebraska–Lincoln · Raikes School" },
    { label: "Instruments", text: "Python, Java, C#, JavaScript, SQL, React" },
    { label: "Built with", text: "HTML, CSS, JavaScript & Claude" },
    { label: "Special thanks", text: "You, for listening" },
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

// Rated albums live in albums.js (updated by the /albums Claude Code skill).
