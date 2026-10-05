# My Portfolio

A fast, animated personal site for showing off projects. It's plain HTML, CSS and JavaScript, so there's no build step and nothing to break. It runs free, all the time, on GitHub Pages.

## Make it yours

Edit **`data.js`** only. Your name, roles, bio, links, stats and every project card come from that file.

- **Add a project:** copy one `{ ... }` block in `PROJECTS` and change the text.
- **Add a screenshot:** put an image in `projects/images/` and set `image: "projects/images/your-file.png"`. Leave `image` empty to get an auto-generated animated cover instead.
- **Host a web project on this site:** put its files in `projects/<name>/`, then set `demo: "projects/<name>/"`. It will be live at `yourdomain/projects/<name>/`. See `projects/bouncing-orbs/` for an example.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000. You can also just double-click `index.html`.

## Put it online (free, always on)

1. Make a free GitHub account. If you're a student, also apply for the [GitHub Student Developer Pack](https://education.github.com/pack) with your school email.
2. Create a **public** repo named exactly `<your-username>.github.io`.
3. Upload these files to it (drag them onto the repo page, or use `git push`).
4. In the repo, open **Settings → Pages**. Set Source to **Deploy from a branch**, then pick **main** and **/ (root)**.
5. After about a minute your site is live at `https://<your-username>.github.io`.

Every time you push a change, the site updates automatically.

## Free custom domain

Pick one:

| Option | Looks like | Cost | Notes |
| --- | --- | --- | --- |
| GitHub Pages default | `yourname.github.io` | Free forever | Nothing to set up |
| [is-a.dev](https://docs.is-a.dev) | `yourname.is-a.dev` | Free forever | Open a pull request on GitHub, and a volunteer reviews it. Follow their docs exactly. |
| Student Pack: Namecheap | `yourname.me` | Free for 1 year | Then it renews at the normal price |
| Student Pack: get.tech / name.com | `yourname.tech` and others | Free for 1 year | Same as above |

### Connecting a domain to GitHub Pages

1. **Settings → Pages → Custom domain:** type your domain and save. GitHub adds a `CNAME` file to the repo for you.
2. At your domain's DNS settings:
   - **Subdomain** (`yourname.is-a.dev`, `www.yourname.me`): add a **CNAME** record pointing to `<your-username>.github.io`.
   - **Root domain** (`yourname.me`): add four **A** records pointing to
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. Once the DNS check passes (anywhere from a few minutes to a day), tick **Enforce HTTPS**.

## Fun stuff hidden in the site

- Click the hero background to send out a shockwave.
- Type `party` anywhere on the page.
- Hover over the letters of your name.
