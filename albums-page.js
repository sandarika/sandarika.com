/* Albums page: builds the grid (newest release first) from window.ALBUMS in albums.js.
   Shared helpers live in common.js. */
(() => {
  "use strict";

  const { $, esc, name } = window.Site;

  document.title = `Albums Rated — ${name}`;
  Site.splitLetters($("[data-title]"), "Albums Rated", 250);

  // newest release first; falls back to the year when there's no exact date
  const releaseKey = (a) => String(a.released || (a.year ? `${a.year}-00-00` : ""));
  const albums = (window.ALBUMS || [])
    .slice()
    .sort((a, b) => releaseKey(b).localeCompare(releaseKey(a)) || String(a.title || "").localeCompare(String(b.title || "")));

  const releaseDate = (a) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a.released || "");
    if (!m) return a.year ? String(a.year) : "";
    return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]))
      .toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
  };

  const hueAt = (i) => Math.round(200 + i * 137.5) % 360; // golden-angle steps keep neighbours distinct
  const cssUrl = (url) => `url("${String(url).replace(/["\\]/g, "\\$&")}")`;

  const meta = $("[data-albums-meta]");
  const grid = $("[data-albums]");

  if (!albums.length) {
    meta.textContent = "first albums dropping soon";
    grid.outerHTML = `
      <div class="empty reveal">
        <span class="mini-vinyl" aria-hidden="true"></span>
        <p class="mono empty-line"><span class="prompt">♫</span> queue loading<span class="caret"></span></p>
        <p class="empty-note">No albums yet. Check back soon.</p>
      </div>`;
  } else {
    const top = albums[0];
    meta.innerHTML = `${albums.length} album${albums.length === 1 ? "" : "s"}<span class="dot">·</span>newest: <strong>${esc(top.title || "Untitled")}</strong>`;
    if (top.image) $("[data-hero-label]").style.backgroundImage = cssUrl(top.image);

    grid.innerHTML = albums
      .map((a, i) => {
        const title = a.title || "Untitled";
        const bg = a.image ? ` style="background-image:${esc(cssUrl(a.image))}"` : "";
        const cover = a.image
          ? `<img src="${esc(a.image)}" alt="${esc(title)} album cover" loading="lazy" />`
          : `<div class="art"></div><span class="art-letter" aria-hidden="true">${esc([...title][0])}</span>`;
        const fav = a.favSong
          ? `<div class="fav">
               <span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
               <div><span class="fav-label mono">fav song</span><span class="fav-song">${esc(a.favSong)}</span></div>
             </div>`
          : "";
        const byline = a.artist ? esc(a.artist) : "";
        const released = releaseDate(a);
        // cards open the album (e.g. on YouTube Music) when a link is set
        const open = a.link ? `<a class="album-link" href="${esc(a.link)}" target="_blank" rel="noopener">` : "<div>";
        const close = a.link ? "</a>" : "</div>";
        return `
        <li class="album-card reveal" style="--h:${hueAt(i)}; --d:${(i % 4) * 80}ms">
          ${open}
          <div class="album-art">
            <div class="glow"${bg}></div>
            <div class="vinyl" aria-hidden="true"><div class="disc"><div class="disc-label"${bg}></div></div></div>
            <div class="cover">${cover}</div>
          </div>
          <div class="album-info">
            <h3>${esc(title)}</h3>
            ${byline ? `<p class="artist">${byline}</p>` : ""}
            ${fav}
            ${released ? `<p class="released mono"><span class="released-label">released</span> ${esc(released)}</p>` : ""}
            ${a.link ? '<span class="listen mono">listen <span aria-hidden="true">↗</span></span>' : ""}
          </div>
          ${close}
        </li>`;
      })
      .join("");
  }

  Site.reveal();

  // Click the turntable to lift / drop the needle
  const tt = $(".turntable");
  tt.addEventListener("click", () => {
    tt.setAttribute("aria-pressed", String(tt.classList.toggle("paused")));
  });
})();
