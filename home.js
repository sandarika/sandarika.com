/* Home page: builds the hero wave, the projects tracklist, the experience piano
   and the liner notes (contact) from data.js. Shared helpers live in common.js. */
(() => {
  "use strict";

  const { SITE, $, $$, esc, reduceMotion, toast } = window.Site;
  const PROJECTS = window.PROJECTS || [];
  const EXPERIENCE = SITE.experience || [];

  Site.splitLetters($("[data-name]"), Site.name);

  const hueAt = (i) => Math.round(255 + i * 137.5) % 360; // golden-angle steps keep neighbours distinct
  const pad = (n) => String(n).padStart(2, "0");

  /* =========================================================
     1. Projects as a tracklist: featured first, then newest
     ========================================================= */
  const sorted = PROJECTS.map((p, i) => ({ ...p, _i: i })).sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.year || 0) - (a.year || 0) || a._i - b._i
  );
  const isExternal = (url) => /^https?:\/\//.test(url);
  const linkTag = (url, label) =>
    url
      ? `<a href="${esc(url)}"${isExternal(url) ? ' target="_blank" rel="noopener"' : ""}>${label} <span class="arrow" aria-hidden="true">↗</span></a>`
      : "";

  const list = $("[data-projects]");
  if (!sorted.length) {
    list.innerHTML = `
      <li class="track track-empty reveal">
        <span class="track-no mono">01</span>
        <div class="track-main">
          <h3>Untitled<span class="caret"></span></h3>
          <p>Recording in progress. New projects are on the way.</p>
        </div>
        <span class="track-genre mono">—</span>
        <span class="track-year mono">${new Date().getFullYear()}</span>
      </li>`;
  } else {
    list.innerHTML = sorted
      .map((p, i) => {
        const tags = (p.tags || []).map(esc).join(", ");
        return `
        <li class="track reveal" data-category="${esc(p.category || "")}" style="--d:${Math.min(i, 6) * 60}ms">
          <span class="track-no mono"><span class="n">${pad(i + 1)}</span><span class="play" aria-hidden="true">▶</span></span>
          <div class="track-main">
            <h3>${esc(p.title || "Untitled")}${p.featured ? ' <span class="badge mono">★ single</span>' : ""}</h3>
            ${p.description ? `<p>${esc(p.description)}</p>` : ""}
            ${tags ? `<p class="track-feat mono">feat. ${tags}</p>` : ""}
          </div>
          <span class="track-genre mono">${esc(p.category || "")}</span>
          <span class="track-year mono">${esc(p.year || "")}</span>
          <div class="track-links">${linkTag(p.demo, "Live")}${linkTag(p.code, "Code")}</div>
        </li>`;
      })
      .join("");
  }

  // Filter buttons (only when there's more than one genre)
  const filtersEl = $("[data-filters]");
  const categories = [...new Set(PROJECTS.map((p) => p.category).filter(Boolean))];
  if (categories.length > 1) {
    filtersEl.innerHTML = ["All", ...categories]
      .map((c) => {
        const n = c === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.category === c).length;
        return `<button class="chip" type="button" aria-pressed="${c === "All"}" data-filter="${esc(c)}">${esc(c)}<span class="count">${n}</span></button>`;
      })
      .join("");
    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".chip");
      if (!btn || btn.getAttribute("aria-pressed") === "true") return;
      const filter = btn.dataset.filter;
      const apply = () => {
        $$(".chip", filtersEl).forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
        $$(".track", list).forEach((row) => {
          row.hidden = !(filter === "All" || row.dataset.category === filter);
          row.classList.add("in");
        });
      };
      document.startViewTransition && !reduceMotion ? document.startViewTransition(apply) : apply();
    });
  } else {
    filtersEl.remove();
  }

  /* =========================================================
     2. Liner notes (contact)
     ========================================================= */
  $("[data-credits]").innerHTML = (SITE.linerNotes || [])
    .map((c) => `<div class="credit"><dt>${esc(c.label)}</dt><dd>${esc(c.text)}</dd></div>`)
    .join("");
  if (SITE.email) {
    const emailEl = $("[data-email]");
    emailEl.textContent = SITE.email;
    emailEl.href = `mailto:${SITE.email}`;
    $("[data-copy]").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        toast("Email copied ✓");
      } catch {
        location.href = `mailto:${SITE.email}`;
      }
    });
  } else {
    $("[data-email-block]").remove();
  }
  $("[data-socials]").innerHTML = (SITE.socials || [])
    .map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} <span aria-hidden="true">↗</span></a>`)
    .join("");

  Site.reveal();

  /* =========================================================
     3. Hero: the logo drawn as one long wave across the screen.
        It behaves like a string: moving the cursor across it,
        clicking, or playing the piano sends ripples along it.
     ========================================================= */
  const wave = (() => {
    const hero = $(".hero");
    const canvas = $(".hero-canvas");
    const ctx = canvas.getContext("2d");
    const css = getComputedStyle(document.documentElement);
    const COLORS = ["--accent", "--accent-2", "--accent-3"].map((v) => css.getPropertyValue(v).trim());
    const STEP = 3; // px between points on the string

    // Points along the logo's path (the same curve as the nav logo)
    const nums = ($(".logo-mark path")?.getAttribute("d") || "").match(/-?\d*\.?\d+/g)?.map(Number) || [12, 50];
    const logo = [];
    let [px, py] = nums;
    for (let k = 2; k + 5 < nums.length; k += 6) {
      const [x1, y1, x2, y2, x3, y3] = nums.slice(k, k + 6);
      for (let s = 1; s <= 24; s++) {
        const t = s / 24, m = 1 - t;
        logo.push([
          m * m * m * px + 3 * m * m * t * x1 + 3 * m * t * t * x2 + t * t * t * x3,
          m * m * m * py + 3 * m * m * t * y1 + 3 * m * t * t * y2 + t * t * t * y3,
        ]);
      }
      px = x3;
      py = y3;
    }
    logo.unshift([nums[0], nums[1]]);
    const LX0 = logo[0][0], LX1 = logo[logo.length - 1][0], LY0 = logo[0][1], LY1 = logo[logo.length - 1][1];

    let W = 0, H = 0, N = 0, y0 = 0;
    let base = new Float32Array(0), u = base, v = base;
    let drawn = reduceMotion ? 1 : 0, born = 0, running = false, raf = 0, hue = 0, party = false;
    const ptr = { x: 0, y: 0, seen: false };

    function layout() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const narrow = W < 720;
      y0 = H * (narrow ? 0.8 : 0.76);
      const span = narrow ? W * 0.62 : Math.min(W * 0.34, 460);
      const scale = span / (LX1 - LX0);
      const xs = (narrow ? W * 0.5 : W * 0.72) - span / 2;
      const tail = 30 * scale; // the logo ends high, so ease back down to the line

      N = Math.ceil(W / STEP) + 1;
      base = new Float32Array(N);
      u = new Float32Array(N);
      v = new Float32Array(N);
      let j = 0;
      for (let i = 0; i < N; i++) {
        const x = i * STEP;
        if (x >= xs && x <= xs + span) {
          const lx = LX0 + (x - xs) / scale;
          while (j < logo.length - 2 && logo[j + 1][0] < lx) j++;
          const [ax, ay] = logo[j], [bx, by] = logo[j + 1];
          const f = bx > ax ? Math.min(1, Math.max(0, (lx - ax) / (bx - ax))) : 0;
          base[i] = (ay + (by - ay) * f - LY0) * scale;
        } else if (x > xs + span && x < xs + span + tail) {
          const k = (x - xs - span) / tail;
          base[i] = (LY1 - LY0) * scale * (1 - k * k * (3 - 2 * k));
        }
      }
      if (!running) draw(performance.now());
    }

    function step() {
      for (let sub = 0; sub < 3; sub++) {
        for (let i = 1; i < N - 1; i++) {
          v[i] = (v[i] + 0.45 * (u[i - 1] + u[i + 1] - 2 * u[i]) - 0.003 * u[i]) * 0.993;
        }
        for (let i = 1; i < N - 1; i++) u[i] += v[i];
      }
      if (party) hue = (hue + 1.5) % 360;
    }

    function draw(now) {
      ctx.clearRect(0, 0, W, H);
      if (!reduceMotion) {
        if (!born) born = now;
        const t = Math.min(1, Math.max(0, (now - born - 300) / 1700));
        drawn = 1 - Math.pow(1 - t, 3);
      }
      const upto = Math.floor((N - 1) * drawn);
      if (upto < 2) return;

      const g = ctx.createLinearGradient(0, 0, W, 0);
      const stops = party ? [0, 120, 240].map((d) => `hsl(${(hue + d) % 360} 90% 66%)`) : COLORS;
      g.addColorStop(0, stops[0]);
      g.addColorStop(0.55, stops[1]);
      g.addColorStop(1, stops[2]);
      ctx.strokeStyle = g;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = ctx.lineCap = "round";
      ctx.shadowColor = party ? stops[1] : COLORS[1];
      ctx.shadowBlur = 14;

      const idle = reduceMotion ? 0 : now * 0.0012;
      const yAt = (i) => y0 + base[i] + u[i] + Math.sin(i * 0.035 + idle) * 2 + Math.sin(i * 0.013 - idle * 0.7) * 2.5;
      ctx.beginPath();
      ctx.moveTo(0, yAt(0));
      for (let i = 1; i <= upto; i++) ctx.lineTo(i * STEP, yAt(i));
      ctx.stroke();

      if (drawn < 1) {
        // the pen tip while the line draws itself in
        ctx.shadowBlur = 18;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(upto * STEP, yAt(upto), 3.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    }

    function loop(now) {
      step();
      draw(now);
      raf = requestAnimationFrame(loop);
    }
    function start() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // a bump of speed around column c
    function kick(c, amount, width = 5) {
      const from = Math.max(1, Math.floor(c - width * 3)), to = Math.min(N - 2, Math.ceil(c + width * 3));
      for (let i = from; i <= to; i++) v[i] += amount * Math.exp(-(((i - c) / width) ** 2));
    }

    let resizeTimer;
    addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 120);
    });
    layout();

    // Only animate while the hero is on screen and the tab is visible (saves battery)
    let heroVisible = true;
    new IntersectionObserver(([en]) => {
      heroVisible = en.isIntersecting;
      heroVisible && !document.hidden ? start() : stop();
    }).observe(hero);
    document.addEventListener("visibilitychange", () => (document.hidden || !heroVisible ? stop() : start()));

    // Cursor crossing the line plucks it
    addEventListener(
      "pointermove",
      (e) => {
        if (reduceMotion || !running) return;
        const r = canvas.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (ptr.seen) {
          const i = Math.round(x / STEP);
          if (i > 0 && i < N - 1 && Math.abs(y - (y0 + base[i] + u[i])) < 70) {
            kick(i, Math.max(-25, Math.min(25, y - ptr.y)) * 0.12, 4);
          }
        }
        ptr.x = x;
        ptr.y = y;
        ptr.seen = true;
      },
      { passive: true }
    );

    // Click anywhere in the hero to send a ripple from that spot
    hero.addEventListener("pointerdown", (e) => {
      if (e.target.closest("a, button") || reduceMotion) return;
      const r = canvas.getBoundingClientRect();
      const i = (e.clientX - r.left) / STEP;
      kick(i, e.clientY - r.top < y0 ? -9 : 9, 7);
    });

    return {
      pluck(frac, amount) {
        if (!reduceMotion) kick(frac * (N - 1), amount, 9);
      },
      toggleParty() {
        party = !party;
        return party;
      },
    };
  })();

  // Hero parallax as you scroll away
  const heroInner = $(".hero-inner");
  Site.onScroll((y) => {
    if (reduceMotion || y > innerHeight * 1.2) return;
    heroInner.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    heroInner.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.85));
  });

  /* =========================================================
     4. Anthology: a piano where every white key plays a note
        and pops out one experience. Black keys just play.
     ========================================================= */
  const section = $("[data-anthology]");
  if (!EXPERIENCE.length) {
    section.remove();
    $$('a[href="#anthology"]').forEach((a) => a.remove());
  } else {
    const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
    const WHITE = [0, 2, 4, 5, 7, 9, 11];
    const TYPE_KEYS = "awsedftgyhujkolp;"; // the usual computer-keyboard piano layout, from C
    const whites = Math.max(EXPERIENCE.length, 3);

    const keys = [];
    for (let s = 0, w = 0; w < whites; s++) {
      const isWhite = WHITE.includes(s % 12);
      if (isWhite) {
        keys.push({ midi: 60 + s, white: true, wi: w, exp: EXPERIENCE[w] || null });
        w++;
      } else if (w > 0) {
        keys.push({ midi: 60 + s, white: false, pos: w });
      }
      keys[keys.length - 1].type = TYPE_KEYS[s] || "";
    }
    // a trailing black key past the last white one isn't playable
    if (!keys[keys.length - 1].white) keys.pop();

    const noteName = (midi) => `${NOTE_NAMES[midi % 12]}${Math.floor(midi / 12) - 1}`;
    const pianoEl = $("[data-piano]");
    pianoEl.style.setProperty("--n", whites);
    pianoEl.innerHTML = keys
      .map((k, i) => {
        const label = k.exp
          ? `Play ${noteName(k.midi)}: ${k.exp.role}, ${k.exp.org}`
          : `Play ${noteName(k.midi)}`;
        const kbd = k.type ? `<kbd>${esc(k.type.toUpperCase())}</kbd>` : "";
        return k.white
          ? `<button class="key white" type="button" data-k="${i}" style="--h:${hueAt(k.wi)}" aria-label="${esc(label)}">
               <span class="key-dot" aria-hidden="true"></span>
               <span class="key-note" aria-hidden="true">${noteName(k.midi)}</span>${kbd}
             </button>`
          : `<button class="key black" type="button" data-k="${i}" style="--pos:${k.pos}; --h:${hueAt(k.pos - 1)}" aria-label="${esc(label)}">${kbd}</button>`;
      })
      .join("");

    // Piano-ish voice: a few harmonics through a closing low-pass, with a fast attack and long decay
    let audio;
    function playNote(midi) {
      try {
        audio = audio || new (window.AudioContext || window.webkitAudioContext)();
        if (audio.state === "suspended") audio.resume();
        const t = audio.currentTime;
        const f = 440 * 2 ** ((midi - 69) / 12);
        const out = audio.createGain();
        out.gain.setValueAtTime(0.0001, t);
        out.gain.exponentialRampToValueAtTime(0.3, t + 0.006);
        out.gain.exponentialRampToValueAtTime(0.08, t + 0.4);
        out.gain.exponentialRampToValueAtTime(0.0001, t + 2.4);
        const lp = audio.createBiquadFilter();
        lp.type = "lowpass";
        lp.frequency.setValueAtTime(f * 9, t);
        lp.frequency.exponentialRampToValueAtTime(f * 1.6, t + 1.4);
        lp.connect(out);
        out.connect(audio.destination);
        [[1, "triangle", 1], [2, "sine", 0.4], [3, "sine", 0.15], [4.02, "sine", 0.06]].forEach(([mult, type, gain]) => {
          const osc = audio.createOscillator();
          const g = audio.createGain();
          osc.type = type;
          osc.frequency.value = f * mult;
          g.gain.value = gain;
          osc.connect(g);
          g.connect(lp);
          osc.start(t);
          osc.stop(t + 2.5);
        });
      } catch {
        /* no Web Audio: the cards still work */
      }
    }

    const stage = $("[data-piano-stage]");
    const card = $("[data-exp]");
    const playedEl = $("[data-played]");
    const played = new Set();
    const updatePlayed = () =>
      (playedEl.textContent = `${played.size} of ${EXPERIENCE.length} chapters played`);
    updatePlayed();

    function showCard(k, keyEl) {
      const e = k.exp;
      card.className = "exp-card";
      card.style.setProperty("--h", hueAt(k.wi));
      card.innerHTML = `
        <p class="exp-meta mono"><span class="exp-noteName">♪ ${noteName(k.midi)}</span><span>${esc(e.when || "")}</span></p>
        <h3>${esc(e.role || "")}</h3>
        <p class="exp-org">${esc(e.org || "")}</p>
        ${e.note ? `<p class="exp-text">${esc(e.note)}</p>` : ""}
        ${e.link ? `<a class="exp-link mono" href="${esc(e.link)}">open <span aria-hidden="true">→</span></a>` : ""}`;
      // sit above the key, kept inside the stage, with the little arrow pointing at the key
      const sr = stage.getBoundingClientRect(), kr = keyEl.getBoundingClientRect();
      const center = kr.left - sr.left + kr.width / 2;
      const half = card.offsetWidth / 2;
      const left = Math.min(Math.max(center, half), sr.width - half);
      card.style.left = `${left}px`;
      card.style.setProperty("--nudge", `${center - left}px`);
      void card.offsetWidth; // restart the pop animation
      card.classList.add("pop");
    }

    function floatNote(keyEl, hue) {
      if (reduceMotion) return;
      const sr = stage.getBoundingClientRect(), kr = keyEl.getBoundingClientRect();
      const n = document.createElement("span");
      n.className = "float-note";
      n.setAttribute("aria-hidden", "true");
      n.textContent = Math.random() < 0.5 ? "♪" : "♫";
      n.style.left = `${kr.left - sr.left + kr.width / 2}px`;
      n.style.top = `${kr.top - sr.top}px`;
      n.style.setProperty("--h", hue);
      n.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
      n.style.setProperty("--rot", `${(Math.random() - 0.5) * 50}deg`);
      stage.appendChild(n);
      n.addEventListener("animationend", () => n.remove());
    }

    function press(i) {
      const k = keys[i];
      const keyEl = pianoEl.querySelector(`[data-k="${i}"]`);
      if (!k || !keyEl) return;
      playNote(k.midi);
      keyEl.classList.add("down");
      setTimeout(() => keyEl.classList.remove("down"), 180);
      floatNote(keyEl, hueAt(k.white ? k.wi : k.pos - 1));
      wave.pluck(0.15 + 0.7 * ((k.white ? k.wi + 0.5 : k.pos) / whites), k.white ? 10 : -7);
      if (k.exp) {
        showCard(k, keyEl);
        keyEl.classList.add("played");
        played.add(k.wi);
        updatePlayed();
      }
    }

    // pointerdown feels instant; keyboard activation (Enter/Space on a focused key) arrives as a click
    pianoEl.addEventListener("pointerdown", (e) => {
      const key = e.target.closest(".key");
      if (key) press(Number(key.dataset.k));
    });
    pianoEl.addEventListener("click", (e) => {
      const key = e.target.closest(".key");
      if (key && e.detail === 0) press(Number(key.dataset.k));
    });

    // Typing plays it too, while the piano is on screen
    let pianoVisible = false;
    new IntersectionObserver(([en]) => (pianoVisible = en.isIntersecting)).observe(stage);
    addEventListener("keydown", (e) => {
      if (!pianoVisible || e.repeat || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest("input, textarea, [contenteditable]")) return;
      const i = keys.findIndex((k) => k.type && k.type === e.key.toLowerCase());
      if (i >= 0) press(i);
    });
  }

  /* =========================================================
     5. Active nav link
     ========================================================= */
  const navLinks = $$(".nav nav a");
  const sectionSpy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  $$("section[id]").forEach((s) => sectionSpy.observe(s));

  /* =========================================================
     6. Easter egg: type "party" anywhere 🎉
     ========================================================= */
  let typed = "";
  addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);
    if (typed === "party") toast(wave.toggleParty() ? "🎉 party mode on" : "party mode off");
  });
})();
