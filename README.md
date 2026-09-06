# Benjamin Mark Lewis — local portfolio

A static redesign of [benjaminmarklewis.com](https://benjaminmarklewis.com/), using the published biography, project images, publication figures, and CV assets. No package installation or build step is required.

## Preview

From this directory, run:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. Refresh the page after editing files. Stop the server with `Ctrl+C`.

## Files and content

- `index.html`: introduction, selected projects, publications, experience, education, methods, CV, and consulting contact form.
- `styles.css`: shared colors, typography, desktop and mobile layouts, and reduced-motion support.
- `script.js`: progressive enhancement for the mobile menu; all content and navigation remain available without JavaScript.
- `projects/`: all six project articles with the full published descriptions, examples, and figures.
- `repositories.html` and `repositories.js`: the published 24-repository directory, with local search and original/fork filters.
- `assets/`: unchanged public assets retrieved from the live site on September 4, 2026. Career details and the CV reflect the live site's content at that time; no employment history has been inferred or added.

The homepage, all six project pages, the repository directory, images, and CV files are served locally. Repository source links and publication DOIs retain their external destinations. Google Fonts loads Inter and Source Serif 4 when available; system fonts provide an offline fallback.

The inquiry form retains the live site's Formspark endpoint and submits through the browser. Checking the preview does not require sending a message. Native form validation, the existing honeypot field are retained; actual message delivery has not been tested.

This work does not deploy or alter the live website.
