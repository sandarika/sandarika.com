/* Home page: builds the hero, projects, about and contact sections from
   data.js and runs the hero animations. Shared helpers live in common.js. */
(() => {
  "use strict";

  const { SITE, $, $$, esc, reduceMotion, finePointer, name, toast } = window.Site;
  const PROJECTS = window.PROJECTS || [];

  /* =========================================================
     1. Render content from data.js
     ========================================================= */
  $('meta[name="description"]').content = SITE.tagline || `${name}'s portfolio.`;
  $("[data-tagline]").textContent = SITE.tagline || "";

  Site.splitLetters($("[data-name]"), name);

  // Tech ticker (content repeated so the loop never shows a gap)
  const stack = SITE.stack || [];
  if (stack.length) {
    const reps = Math.max(1, Math.ceil(14 / stack.length));
    const half = Array.from({ length: reps }, () => stack).flat().map((t) => `<span>${esc(t)}</span>`).join("");
    $("[data-stack]").innerHTML = half + half;
    $("[data-stack]").style.animationDuration = `${reps * stack.length * 2.6}s`; // same speed however long the list is
    $("[data-marquee]").setAttribute("aria-label", `Tools I use: ${stack.join(", ")}`);
    $("[data-marquee]").setAttribute("role", "img");
  } else {
    $("[data-marquee]").remove();
  }

  // Projects: featured first, then newest
  const hueAt = (i) => Math.round(255 + i * 137.5) % 360; // golden-angle steps keep neighbours distinct
  const sorted = PROJECTS.map((p, i) => ({ ...p, _i: i })).sort(
    (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.year || 0) - (a.year || 0) || a._i - b._i
  );
  const isExternal = (url) => /^https?:\/\//.test(url);
  const linkTag = (url, label) =>
    url
      ? `<a href="${esc(url)}"${isExternal(url) ? ' target="_blank" rel="noopener"' : ""}>${label} <span class="arrow" aria-hidden="true">↗</span></a>`
      : "";

  const grid = $("[data-projects]");
  if (!sorted.length) {
    grid.outerHTML = `
      <div class="empty reveal">
        <p class="mono empty-line"><span class="prompt">$</span> git push projects<span class="caret"></span></p>
        <p class="empty-note">New projects are on the way.</p>
      </div>`;
    // nothing to see yet, so the hero button points at About instead
    const cta = $(".hero-cta .btn-primary");
    cta.href = "#about";
    cta.firstChild.textContent = "About me ";
  } else {
    grid.innerHTML = sorted
      .map((p, i) => {
        const title = p.title || "Untitled";
        const h = p.hue ?? hueAt(i);
        const media = p.image
          ? `<img src="${esc(p.image)}" alt="" loading="lazy" />`
          : `<div class="art"></div><span class="art-letter" aria-hidden="true">${esc([...title][0])}</span>`;
        const tags = (p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("");
        return `
        <article class="card reveal" data-category="${esc(p.category || "")}"
          style="--h:${h}; --d:${(i % 3) * 90}ms; view-transition-name: card-${i}">
          <div class="card-media">${media}</div>
          <div class="card-body">
            <div class="card-meta mono">
              <span>${esc(p.year || "")}${p.category ? " · " + esc(p.category) : ""}</span>
              ${p.featured ? '<span class="badge">★ featured</span>' : ""}
            </div>
            <h3>${esc(title)}</h3>
            <p>${esc(p.description || "")}</p>
            ${tags ? `<ul class="tags">${tags}</ul>` : ""}
            <div class="card-links">${linkTag(p.demo, "Live")}${linkTag(p.code, "Code")}</div>
          </div>
        </article>`;
      })
      .join("");
  }

  // Filter buttons
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
        $$(".card", grid).forEach((card) => {
          card.hidden = !(filter === "All" || card.dataset.category === filter);
          card.classList.add("in"); // make sure revealed
        });
      };
      if (document.startViewTransition && !reduceMotion) {
        document.startViewTransition(apply);
      } else {
        apply();
        $$(".card:not([hidden])", grid).forEach((c) => {
          c.classList.remove("pop");
          void c.offsetWidth;
          c.classList.add("pop");
        });
      }
    });
  } else {
    filtersEl.remove();
  }

  // About (without paragraphs, the stats + list spread across the full width)
  if ((SITE.about || []).length) {
    $("[data-about]").innerHTML = SITE.about.map((p) => `<p>${esc(p)}</p>`).join("");
  } else {
    $("[data-about]").remove();
    $("[data-about-grid]").classList.add("no-text");
  }
  $("[data-now]").innerHTML = (SITE.now || []).map((n) => `<li>${esc(n)}</li>`).join("");
  if (!(SITE.now || []).length) $(".now").remove();
  $("[data-stats]").innerHTML = (SITE.stats || [])
    .map((s, i) => {
      const value = s.value === "auto" ? PROJECTS.length : Number(s.value) || 0;
      const decimals = s.decimals || 0;
      return `<div class="stat reveal" style="--d:${i * 90}ms">
        <div class="stat-value" data-count="${value}" data-decimals="${decimals}" data-suffix="${esc(s.suffix || "")}">${(0).toFixed(decimals)}${esc(s.suffix || "")}</div>
        <div class="stat-label">${esc(s.label || "")}</div>
      </div>`;
    })
    .join("");

  // Contact
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
     2. Hero parallax + active nav link
     ========================================================= */
  const heroInner = $(".hero-inner");
  Site.onScroll((y) => {
    if (reduceMotion || y > innerHeight * 1.2) return;
    heroInner.style.transform = `translate3d(0, ${y * 0.3}px, 0)`;
    heroInner.style.opacity = Math.max(0, 1 - y / (innerHeight * 0.85));
  });

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
     3. Project card tilt + spotlight
     ========================================================= */
  if (finePointer) {
    $$(".card").forEach((card) => {
      let rect;
      card.addEventListener("pointerenter", () => (rect = card.getBoundingClientRect()));
      card.addEventListener("pointermove", (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        card.style.setProperty("--mx", `${x * 100}%`);
        card.style.setProperty("--my", `${y * 100}%`);
        if (!reduceMotion) {
          card.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
          card.style.setProperty("--rx", `${(0.5 - y) * 9}deg`);
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
        rect = null;
      });
    });
  }

  /* =========================================================
     4. Hero background: interactive particle constellation
     ========================================================= */
  const hero = $(".hero");
  const canvas = $(".hero-canvas");
  const ctx = canvas.getContext("2d");
  const HUES = [255, 170, 340]; // violet, teal, pink — matches the CSS accents
  const LINK_DIST = 130;
  const MOUSE_DIST = 180;
  let W = 0, H = 0, particles = [], rings = [], running = false, raf = 0, party = false;
  const mouse = { x: 0, y: 0, active: false };

  const spawn = () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.6 + 0.6,
    h: HUES[(Math.random() * HUES.length) | 0],
  });

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const want = Math.round(Math.min(110, (W * H) / 12500));
    while (particles.length < want) particles.push(spawn());
    particles.length = want;
    if (!running) draw();
  }

  function step() {
    for (const p of particles) {
      if (mouse.active) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 110) {
          const f = (1 - d / 110) * 0.12; // gentle push away from the cursor
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      p.vx *= 0.985;
      p.vy *= 0.985;
      if (Math.hypot(p.vx, p.vy) < 0.15) {
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10; else if (p.y > H + 10) p.y = -10;
      if (party) p.h = (p.h + 1.5) % 360;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK_DIST * LINK_DIST) {
          ctx.strokeStyle = `hsla(${a.h}, 90%, 68%, ${(1 - Math.sqrt(d2) / LINK_DIST) * 0.32})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      if (mouse.active) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < MOUSE_DIST) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - d / MOUSE_DIST) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      ctx.fillStyle = `hsla(${p.h}, 90%, 70%, 0.9)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // click shockwaves
    rings = rings.filter((r) => r.life > 0);
    for (const r of rings) {
      r.radius += (r.max - r.radius) * 0.08;
      r.life -= 0.022;
      ctx.strokeStyle = `hsla(${r.h}, 90%, 70%, ${Math.max(0, r.life)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  function loop() {
    step();
    draw();
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

  let resizeTimer;
  addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 120);
  });
  resize();

  // Only animate while the hero is on screen and the tab is visible (saves battery)
  let heroVisible = true;
  new IntersectionObserver(([en]) => {
    heroVisible = en.isIntersecting;
    heroVisible && !document.hidden ? start() : stop();
  }).observe(hero);
  document.addEventListener("visibilitychange", () => (document.hidden || !heroVisible ? stop() : start()));

  addEventListener(
    "pointermove",
    (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.active = mouse.y >= 0 && mouse.y <= r.height;
    },
    { passive: true }
  );
  document.documentElement.addEventListener("pointerleave", () => (mouse.active = false));

  hero.addEventListener("pointerdown", (e) => {
    if (e.target.closest("a, button") || reduceMotion) return;
    const r = canvas.getBoundingClientRect();
    const cx = e.clientX - r.left, cy = e.clientY - r.top;
    for (const p of particles) {
      const dx = p.x - cx, dy = p.y - cy;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 280) {
        const f = (1 - d / 280) * 7;
        p.vx += (dx / d) * f;
        p.vy += (dy / d) * f;
      }
    }
    const h = HUES[(Math.random() * HUES.length) | 0];
    rings.push({ x: cx, y: cy, radius: 0, max: 260, life: 1, h });
    rings.push({ x: cx, y: cy, radius: 0, max: 160, life: 0.8, h: (h + 90) % 360 });
  });

  /* =========================================================
     5. Easter egg: type "party" anywhere 🎉
     ========================================================= */
  let typed = "";
  addEventListener("keydown", (e) => {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-5);
    if (typed === "party") {
      party = !party;
      if (!party) particles.forEach((p) => (p.h = HUES[(Math.random() * HUES.length) | 0]));
      toast(party ? "🎉 party mode on" : "party mode off");
    }
  });
})();
