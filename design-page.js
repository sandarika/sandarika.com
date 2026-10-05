/* JS page: makes the demo components respond like they do on the real pages. */
(() => {
  "use strict";

  const { $, $$, toast } = window.Site;

  // Filter chips: one pressed at a time
  $$("[data-demo-chips] .chip").forEach((chip, _, all) => {
    chip.addEventListener("click", () => all.forEach((c) => c.setAttribute("aria-pressed", String(c === chip))));
  });

  // Toast + copy demos
  $("[data-demo-toast]").addEventListener("click", () => toast("Hi there ✓"));
  $("[data-demo-copy]").addEventListener("click", () => toast("Email copied ✓"));
})();
