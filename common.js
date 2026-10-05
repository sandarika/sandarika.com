/* Shared by every page: nav, footer, scroll progress, reveal-on-scroll,
   number counters, magnetic buttons, cursor ring and toasts.
   Page scripts (home.js, albums-page.js) use these through window.Site. */
window.Site = (() => {
  "use strict";

  const SITE = window.SITE || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  /* ---------- Name, footer ---------- */
  const name = SITE.name || "Sandi Warjri";
  $$("[data-name-plain]").forEach((el) => (el.textContent = name));
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Toast ---------- */
  const toastEl = $(".toast");
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- Scroll: progress bar + nav background ---------- */
  const progress = $(".progress");
  const nav = $(".nav");
  const scrollHandlers = [];
  function handleScroll() {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.setProperty("--p", max > 0 ? y / max : 0);
    if (nav) nav.classList.toggle("scrolled", y > 20);
    scrollHandlers.forEach((fn) => fn(y));
  }
  addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
  function onScroll(fn) {
    scrollHandlers.push(fn);
    fn(scrollY);
  }

  /* ---------- Letters that rise in one by one ---------- */
  function splitLetters(el, text, delay = 150) {
    let i = 0;
    el.setAttribute("aria-label", text);
    el.innerHTML = text
      .split(/\s+/)
      .map(
        (word) =>
          `<span class="word" aria-hidden="true">${[...word]
            .map((ch) => `<span class="char"><span style="--i:${i++}; --base:${delay}ms">${esc(ch)}</span></span>`)
            .join("")}</span>`
      )
      .join(" ");
    // once the intro finishes, letters can pop out of their masks on hover
    setTimeout(() => el.classList.add("ready"), reduceMotion ? 0 : 1100 + delay + i * 45);
  }

  /* ---------- Reveal on scroll + number counters ---------- */
  function format(n, decimals) {
    return decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString();
  }
  function countUp(el) {
    const target = Number(el.dataset.count);
    const decimals = Number(el.dataset.decimals) || 0;
    const suffix = el.dataset.suffix || "";
    if (reduceMotion) return (el.textContent = format(target, decimals) + suffix);
    const t0 = performance.now();
    const dur = 1600;
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      el.textContent = format(target * (1 - Math.pow(1 - t, 4)), decimals) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const revealer = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        $$("[data-count]", en.target).forEach(countUp);
        revealer.unobserve(en.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  function reveal(root = document) {
    $$(".reveal:not(.in)", root).forEach((el) => revealer.observe(el));
  }

  /* ---------- Pointer effects: magnetic buttons + cursor ring ---------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach((el) => {
      let rect;
      el.addEventListener("pointerenter", () => (rect = el.getBoundingClientRect()));
      el.addEventListener("pointermove", (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
      });
      el.addEventListener("pointerleave", () => {
        el.style.transform = "";
        rect = null;
      });
    });

    const ring = $(".cursor-ring");
    if (ring) {
      let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, scale = 1, targetScale = 1;
      addEventListener(
        "pointermove",
        (e) => {
          x = e.clientX;
          y = e.clientY;
          if (!ring.classList.contains("on")) {
            rx = x;
            ry = y;
            ring.classList.add("on");
          }
        },
        { passive: true }
      );
      document.addEventListener("pointerover", (e) => {
        const link = e.target.closest("a, button");
        ring.classList.toggle("link", !!link);
        targetScale = link ? 0.45 : e.target.closest(".card, .album-card") ? 1.6 : 1;
      });
      document.documentElement.addEventListener("pointerleave", () => ring.classList.remove("on"));
      (function follow() {
        rx += (x - rx) * 0.2;
        ry += (y - ry) * 0.2;
        scale += (targetScale - scale) * 0.2;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
        requestAnimationFrame(follow);
      })();
    }
  }

  // Inner-page titles marked data-split rise in letter by letter
  $$("[data-split]").forEach((el) => splitLetters(el, el.textContent.trim(), 250));

  // Page scripts run after this file; reveal whatever static content exists now.
  reveal();

  return { SITE, $, $$, esc, reduceMotion, finePointer, name, toast, onScroll, splitLetters, reveal };
})();
