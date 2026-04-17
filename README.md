# Kazura Kenzo — Portfolio

Personal portfolio website. Hosted on GitHub Pages at https://kenzokaz.github.io

## Folder Structure

```
portfolio/
├── index.html              ← Main page (HTML only, no inline styles or scripts)
├── README.md
└── assets/
    ├── css/
    │   └── style.css       ← All styles, CSS variables, responsive rules
    ├── js/
    │   └── main.js         ← Scroll animations, nav highlight, smooth scroll
    └── Kenzo_CV.pdf        ← Resume (linked from the Download CV button)
```

## How to update

**Add a new project:**
Open `index.html`, find the `<!-- ── PROJECTS ── -->` section and copy-paste an existing `.project-card` block. Update the title, description, tags, date, and `href`.

**Change accent color:**
Open `assets/css/style.css` and update the `:root` variables at the top — specifically `--burgundy`, `--burgundy-dark`, `--burgundy-light`, and `--burgundy-pale`.

**Update CV:**
Replace `assets/Kenzo_CV.pdf` with the new file (keep the same filename).

## Deployment (GitHub Pages)

1. Push all files to the root of your `kenzokaz.github.io` repository
2. GitHub Pages serves `index.html` automatically
3. No build step needed — pure HTML/CSS/JS
