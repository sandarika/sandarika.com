/* =============================================================
   ✏️  EDIT THIS FILE TO MAKE THE SITE YOURS
   Everything on the page (name, projects, links, stats) is
   generated from what's below. You never need to touch the HTML.
   ============================================================= */

window.SITE = {
  name: "Your Name",
  initials: "YN",                       // shown in the logo + browser tab icon
  roles: ["web apps", "data tools", "side projects", "things that move"],
  tagline:
    "Student developer who likes turning ideas into fast, good-looking software. This is where everything I build lives.",
  status: "open to internships & cool collabs",   // little pill above your name ("" to hide)

  email: "you@example.com",
  socials: [
    { label: "GitHub", url: "https://github.com/your-username" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your-username" },
    // { label: "Resume", url: "resume.pdf" },   // drop a PDF in this folder and uncomment
  ],

  // Scrolling ticker of tools you use
  stack: ["Python", "JavaScript", "HTML & CSS", "Git", "SQL", "React", "Node.js", "C++", "Linux", "Figma"],

  about: [
    "Hey! I'm a student developer who loves building things for the web and turning messy data into something useful.",
    "This site is my home base on the internet. Every project I make ends up here, from polished apps to weekend experiments that probably should've stayed weekend experiments.",
    "When I'm not coding you'll find me ____________.",
  ],

  now: [
    "Building: this portfolio ✦",
    "Learning: something new",
    "Listening to: whatever's on repeat",
  ],

  // value: "auto" counts the projects below automatically
  stats: [
    { value: "auto", label: "projects shipped" },
    { value: 1200, suffix: "+", label: "commits pushed" },
    { value: 3, label: "hackathons" },
    { value: 99, suffix: "%", label: "powered by caffeine" },
  ],
};

/* -------------------------------------------------------------
   PROJECTS
   - category: used for the filter buttons
   - image:    optional screenshot path, e.g. "projects/images/foo.png"
               (leave "" for an auto-generated animated cover;
               add  hue: 0-360  to pick its color yourself)
   - demo:     live link. Host web projects INSIDE this site by putting
               them in /projects/<name>/ and using "projects/<name>/"
   - code:     repo link
   - featured: true pins it to the top with a badge
   ⬇ These are EXAMPLES. Replace them with your own.
   ------------------------------------------------------------- */
window.PROJECTS = [
  {
    title: "This Portfolio",
    year: 2026,
    category: "Web",
    description:
      "The site you're looking at. Hand-built HTML, CSS & JavaScript with an interactive particle background, hosted free on GitHub Pages.",
    tags: ["HTML", "CSS", "JavaScript", "Canvas"],
    image: "",
    demo: "",
    code: "https://github.com/your-username/your-username.github.io",
    featured: true,
  },
  {
    title: "Bouncing Orbs",
    year: 2026,
    category: "Fun",
    description:
      "A tiny physics toy: click to spawn glowing orbs that bounce around. It's hosted right inside this site, as an example of how to store live demos here.",
    tags: ["JavaScript", "Canvas", "Physics"],
    image: "",
    demo: "projects/bouncing-orbs/",
    code: "",
    featured: true,
  },
  {
    title: "Pathfinding Visualizer",
    year: 2025,
    category: "Web",
    description:
      "Example project: draw walls on a grid and watch A*, Dijkstra and BFS race to find the shortest path.",
    tags: ["TypeScript", "Algorithms"],
    image: "",
    demo: "",
    code: "https://github.com/your-username",
  },
  {
    title: "Study Buddy Bot",
    year: 2025,
    category: "Tool",
    description:
      "Example project: a Discord bot that runs pomodoro timers, tracks study streaks and roasts you for skipping.",
    tags: ["Python", "discord.py", "SQLite"],
    image: "",
    demo: "",
    code: "https://github.com/your-username",
  },
  {
    title: "Budget Dashboard",
    year: 2024,
    category: "Data",
    description:
      "Example project: import bank CSVs and get interactive charts showing where the money actually goes.",
    tags: ["Python", "Pandas", "Plotly"],
    image: "",
    demo: "",
    code: "https://github.com/your-username",
  },
  {
    title: "Pixel Dungeon",
    year: 2024,
    category: "Game",
    description:
      "Example project: a tiny roguelike with procedurally generated rooms, built for a 48-hour game jam.",
    tags: ["C#", "Unity", "Game Jam"],
    image: "",
    demo: "",
    code: "https://github.com/your-username",
  },
];
