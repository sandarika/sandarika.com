# sandarika.com

Sandi Warjri's personal site: a home page with projects, about and contact, plus a ranked albums page. It's plain HTML, CSS and JavaScript with no build step, hosted free on GitHub Pages.

## Updating the site

The home page content (name, tagline, links, stats, projects) comes from **`data.js`**. The album rankings come from **`albums.js`**.

### Albums

The easiest way is the `/albums` Claude Code skill. Tell it what you ranked, for example `/albums I just finished SOS by SZA, put it at #2, fav song Snooze`. It finds the album on YouTube Music, downloads the cover, re-ranks the list, and publishes the site.

To edit by hand instead, each entry in `albums.js` looks like this:

```json
{ "rank": 1, "title": "Album Title", "artist": "Artist", "year": 2024, "favSong": "Favorite Song",
  "image": "images/albums/cover.jpg", "link": "https://music.youtube.com/browse/..." }
```

Albums sort by `rank` (1 = best), and the #1 cover becomes the label on the spinning record at the top of the page. Cards open `link` when clicked. `albums.js` has to stay valid JSON: double quotes, and no trailing commas.

### Add a project

Copy the template in the comment above `PROJECTS` in `data.js` into the list and fill it in. Screenshots go in `projects/images/`. Leave `image` empty for an animated cover. Filter buttons show up on their own once you have projects in more than one `category`.

To host a web project on this site, put its files in `projects/<name>/` and set `demo: "projects/<name>/"`. It will be live at `sandarika.com/projects/<name>/`.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Double-clicking `index.html` also works.

## Deploying

Push to `main` and GitHub Pages redeploys in about a minute. Browsers may keep the old version for up to 10 minutes, so hard-refresh (Ctrl+Shift+R) if a change doesn't show.

## Domain setup

- `CNAME` in this repo contains `sandarika.com`. Don't delete it, or the custom domain turns off.
- Cloudflare DNS has four **A** records for `@` (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and a **CNAME** `www` → `sandarika.github.io`, all set to **DNS only** (grey cloud).
- In **Settings → Pages**, keep **Enforce HTTPS** ticked.

## Files

| File | What it is |
| --- | --- |
| `data.js` | Home page content |
| `albums.js` | Album rankings (updated by the `/albums` skill) |
| `index.html`, `home.js` | Home page |
| `albums.html`, `albums.css`, `albums-page.js` | Albums page |
| `common.js`, `styles.css` | Shared by both pages (nav, animations, theme) |
| `404.html` | Page shown for broken links |

## Hidden extras

- Click the home page background to send out a shockwave.
- Type `party` anywhere on the home page.
- Hover over the letters of the big headings.
- Click the turntable on the albums page to lift the needle.
