# sandarika.com

Sandi Warjri's personal site: a home page with projects, about and contact, plus a ranked albums page. It's plain HTML, CSS and JavaScript with no build step, hosted free on GitHub Pages.

## Updating the site

Edit **`data.js`** only. The name, bio, links, stats, projects and albums on both pages all come from that file.

### Add an album

1. Put the cover image in `images/albums/` (for example `images/albums/blonde.jpg`).
2. Add a line to `ALBUMS` in `data.js`:

   ```js
   { rank: 1, title: "Album Title", artist: "Artist", favSong: "Favorite Song", image: "images/albums/blonde.jpg" },
   ```

Albums sort by `rank` automatically (1 = best), and the #1 cover becomes the label on the spinning record at the top of the page. `artist` is optional. Leaving `image` empty gives a generated cover, and `image` can also be a full `https://` link.

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
| `data.js` | All the content. Edit this one. |
| `index.html`, `home.js` | Home page |
| `albums.html`, `albums.css`, `albums-page.js` | Albums page |
| `common.js`, `styles.css` | Shared by both pages (nav, animations, theme) |
| `404.html` | Page shown for broken links |

## Hidden extras

- Click the home page background to send out a shockwave.
- Type `party` anywhere on the home page.
- Hover over the letters of the big headings.
- Click the turntable on the albums page to lift the needle.
