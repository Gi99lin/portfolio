# Portfolio: Ivan Yakimkin

The personal site of Ivan Yakimkin: a one-page static site, currently a Russian-language landing
about AI services, automation and infrastructure, with links to live demos of the projects.

## Stack

Plain HTML, CSS and JavaScript (`index.html`, `styles.css`, `main.js`) with no build step. The
Docker image is `nginx:alpine` with the repository copied into `/usr/share/nginx/html`
(`.dockerignore` lists what stays out).

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173.

## Deploy

A push to `main` runs `.github/workflows/docker-publish.yml`, which builds, smoke-tests and pushes
`ghcr.io/gi99lin/portfolio:latest`; Watchtower on the server pulls the new image. Pushes to other
branches build nothing.

## Docs

- [`design-system/README.md`](design-system/README.md): explorations for a new design system and a
  new concept of the page (parked, on the `design-system/explorations` branch).
- Feature docs are not set up yet. Run `qa-lab init-project` on the main checkout when the work
  resumes there; keep the vendored `open-design/` folder out of its scan.
