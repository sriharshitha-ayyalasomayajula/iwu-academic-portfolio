# IWU Academic Portfolio

Graduate coursework portfolio for the Master of Science in Computer Information Sciences, Artificial Intelligence Specialization, at Indiana Wesleyan University.

This is not an official university website. The current artifact is AIML-501, Assignment 1.5: Machine Learning Algorithm Types.

The student name, term, biography, personal value proposition, process narrative, and AI-assistance disclosure are empty in `src/data/site.config.ts` and `src/data/documentation.ts`. Those sections stay off the public pages until they are filled in. A development build prints a console warning for the empty site fields.

## Run locally

Use Node.js 22. The dev server uses the GitHub Pages project base path.

```bash
npm install
npm run dev
```

Open `http://localhost:5173/iwu-academic-portfolio/`.

## Checks

```bash
npm run lint
npm run build
```

`npm run preview` serves the production build at the same base path.

## Infographic downloads

Finished exports live in `public/downloads/`:

- `aiml-501-algorithm-types.pdf` — two 17 × 11 inch landscape pages
- `aiml-501-algorithm-types-page-1.png` and `page-2.png`
- `aiml-501-algorithm-types-page-1.jpg` and `page-2.jpg`

Page 1 is the algorithm taxonomy. Page 2 is the six relationships, the classification matrix, and the legend. Mechanism diagrams stay on the website.

Regenerate the files from a running dev server with system Chrome, Poppler, and `sips`. No extra npm package is required.

```bash
PRINT_URL=http://127.0.0.1:5173/iwu-academic-portfolio/aiml-501/algorithm-types/print node scripts/export-infographic.mjs
```

The print stylesheet sets `@page { size: 17in 11in; margin: 0.4in; }` and disables ligatures so the text layer does not substitute characters inside “ft” and “ff”.

## GitHub Pages

The Vite `base` is `/iwu-academic-portfolio/`. `public/404.html` redirects unknown project-site paths back into the single-page app. The repository has not been deployed from this version. Pages hosting requires a public repository, or a plan that supports Pages on private repositories.
