[English](README.md) | [Bahasa Indonesia](README.id.md)

# Nanta — Personal Portfolio Website

A static, responsive personal portfolio website for **Gede Yodyananta** ("Nanta"), a Software Engineering student at Politeknik Negeri Bali. The site presents his profile, learning journey, education, tech stack, values, selected projects (including an e-commerce case study), and a contact form. It is built with plain HTML, Tailwind CSS v4, and vanilla JavaScript, and is deployed as a static site on Vercel.

## Project Context & Origin

This project was created as a graduation requirement for membership in the **UKM Computer Club (Web Development Division)**. It demonstrates practical frontend web development skills — semantic HTML, responsive layouts with Tailwind CSS, vanilla JavaScript interactivity, accessibility considerations, and static deployment — applied to a real, personal portfolio product.

## Project Overview

- **Site type:** Static multi-page portfolio (no backend, no database, no authentication).
- **Pages:** `index.html` (main portfolio) and `projects/ecommerce-website/index.html` (e-commerce case study).
- **Sections on the main page:** Hero (with an animated "live code editor" typing effect), About (who I am, journey timeline, education, current focus, tech stack, vision, values), Projects (featured e-commerce, personal portfolio, next project, more-projects slot), and Contact (Formspree-backed form).
- **Theming:** Dark/light mode with persistence via `localStorage` and a `prefers-color-scheme` fallback to avoid a flash of the wrong theme.
- **Interactivity:** Navbar that turns to glass on scroll, scroll progress bar, scroll-spy active links, mobile menu with focus trap, entrance animations, lazy-image fade-in, dynamic copyright year, and a contact form with client-side validation and async submission.

## Key Features

- Responsive layout across mobile, tablet, and desktop.
- Dark/light theme toggle persisted in `localStorage`.
- Hero section with a macOS-style code editor window and a character-by-character typing animation.
- About section with an animated learning-journey timeline, education card, current-focus cards, tech-stack cards, vision panel, and personal-values grid.
- Projects section: a featured e-commerce project card with a "View Case Study" link, a personal portfolio card linking to the live site, an "in progress" next-project card, and a "more projects" invitation card.
- Dedicated e-commerce case study page with overview, challenge, solution, key features, stack rationale, development process timeline, screenshot gallery with a lightbox, lessons learned, and future improvements roadmap.
- Contact form posting to Formspree with required-field validation and status messages.
- SEO metadata: title/description, Open Graph, Twitter Card, canonical URL, JSON-LD `Person` structured data, `sitemap.xml`, and `robots.txt`.
- Accessibility: skip-to-main-content link, ARIA labels/roles, focus trap in the mobile menu, keyboard support (Escape to close).

## Tech Stack

- **Markup:** HTML5
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/cli`), compiled from `assets/css/input.css` to `assets/css/output.css`
- **Scripting:** Vanilla JavaScript (ES2015+ IIFE in `assets/js/main.js`)
- **Fonts:** Google Fonts — Inter and Sora
- **Contact delivery:** Formspree (third-party form endpoint)
- **Deployment:** Vercel (static, `outputDirectory: "."`)
- **Dev tooling:** `@tailwindcss/cli` ^4.3.2, `tailwindcss` ^4.3.2
- **Editor:** VS Code with Live Server on port 5502 (see `.vscode/settings.json`)

## Project Structure

```
.
├── index.html                          # Main portfolio page
├── package.json                        # npm scripts and dev dependencies
├── package-lock.json
├── vercel.json                         # Vercel static output config
├── robots.txt
├── sitemap.xml
├── .gitignore
├── .vscode/
│   └── settings.json                   # Live Server port 5502
├── assets/
│   ├── css/
│   │   ├── input.css                   # Tailwind source
│   │   └── output.css                  # Compiled/minified CSS
│   ├── images/                         # Static images (incl. .gitkeep)
│   └── js/
│       └── main.js                     # All portfolio interactivity
└── projects/
    └── ecommerce-website/
        └── index.html                  # E-commerce case study page
```

## Installation & Local Setup

Prerequisites: Node.js and npm (for the Tailwind build). A static server is recommended for correct relative-path behavior.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ccdt-2026
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Rebuild the CSS if you edit `assets/css/input.css`:
   ```bash
   npm run build
   ```
   or watch for changes:
   ```bash
   npm run watch
   ```
4. Serve the site statically. Options:
   - Open `index.html` directly in a browser (most features work), or
   - Use VS Code Live Server (configured port `5502`), or any static server:
     ```bash
     npx serve .
     ```

## Running Tests / Build

There is **no test suite** defined in this repository (`package.json` has no `test` script). Verification is done manually by loading the pages in a browser.

Build command (from `package.json`):
```bash
npm run build
```
This runs `npx @tailwindcss/cli -i ./assets/css/input.css -o ./assets/css/output.css --minify`.

Watch command:
```bash
npm run watch
```
This runs the Tailwind CLI in watch mode.

## Deployment

The site is deployed as a static site on **Vercel**. `vercel.json` sets `outputDirectory` to `"."`, so the repository root is served as-is. The canonical production URL referenced throughout the site is `https://gedeyodyananta.vercel.app/`.

## Known Limitations

- **No backend in this repository.** The portfolio is purely static HTML/CSS/JS. There is no server-side code, database, or authentication in this repo.
- **Contact form depends on a third party.** Messages are submitted to Formspree (`https://formspree.io/gedeyodyananta14@gmail.com`); delivery and spam handling rely on that service.
- **Theme preference is browser-local.** Dark/light choice is stored in `localStorage` and may reset per browser/device; it is not tied to any user account.
- **No automated tests.** Quality assurance is manual.
- **E-commerce project is external.** The actual PHP/JavaScript/CSS/MySQL e-commerce application is not part of this repository; only its case-study page and screenshots are included here. The "View Source Code" link points to a separate repository.
- **Some project slots are placeholders.** The "Next Project" card and "More projects" card are placeholders for future work.