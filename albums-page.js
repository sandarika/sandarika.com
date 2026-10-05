/* Albums page: builds the ranked grid from window.ALBUMS in data.js.
   Shared helpers live in common.js. */
(() => {
  "use strict";

  const { $, esc, name } = window.Site;

  document.title = `Album Rankings — ${name}`;
  Site.splitLetters($("[data-title]"), "Album Rankings", 250);

  const rankOf = (a) => {
    const r = Number(a.rank);
    return a.rank !== "" && a.rank != null && Number.isFinite(r) ? r : Infinity;
  };
  const albums = (window.ALBUMS || [])
    .slice()
    .sort((a, b) => rankOf(a) - rankOf(b) || String(a.title || "").localeCompare(String(b.title || "")));

  const hueAt = (i) => Math.round(200 + i * 137.5) % 360; // golden-angle steps keep neighbours distinct
  const cssUrl = (url) => `url("${String(url).replace(/["\\]/g, "\\$&")}")`;

  const meta = $("[data-albums-meta]");
  const grid = $("[data-albums]");

  if (!albums.length) {
    meta.textContent = "first rankings dropping soon";
    grid.outerHTML = `
      <div class="empty reveal">
        <span class="mini-vinyl" aria-hidden="true"></span>
        <p class="mono empty-line"><span class="prompt">♫</span> queue loading<span class="caret"></span></p>
        <p class="empty-note">No albums ranked yet. Check back soon.</p>
      </div>`;
  } else {
    const top = albums[0];
    meta.innerHTML = `${albums.length} album${albums.length === 1 ? "" : "s"} ranked<span class="dot">·</span>#1 right now: <strong>${esc(top.title || "Untitled")}</strong>`;
    if (top.image) $("[data-hero-label]").style.backgroundImage = cssUrl(top.image);

    grid.innerHTML = albums
      .map((a, i) => {
        const rank = rankOf(a);
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
        const byline = [a.artist, a.year].filter(Boolean).map(esc).join(" · ");
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
            <span class="rank">${Number.isFinite(rank) ? `#${rank}` : "unranked"}</span>
          </div>
          <div class="album-info">
            <h3>${esc(title)}</h3>
            ${byline ? `<p class="artist">${byline}</p>` : ""}
            ${fav}
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
