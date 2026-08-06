# Gazal Darbar — Music & Dance Academy Website

A premium, fully responsive one-page website for **Gazal Darbar**, a music and
dance academy in Malappuram, Kerala. Built with plain HTML5, CSS3 and vanilla
JavaScript — no frameworks, no build step — so it runs as-is on **GitHub Pages**.

## Folder structure

```
Gazal-Darbar/
├── index.html
├── css/
│   ├── style.css          # design tokens, layout, components
│   ├── responsive.css     # tablet / mobile breakpoints
│   └── animations.css     # keyframes + scroll-reveal
├── js/
│   ├── main.js            # nav toggle, ripple buttons, active-link highlight
│   ├── gallery.js         # masonry lightbox
│   └── scroll.js          # header state, reveal-on-scroll, parallax
├── images/
│   ├── logo-placeholder.png   # your logo (used in header + hero)
│   ├── favicon/favicon.png
│   └── gallery/                # drop real photos here
└── README.md
```

## Replacing the logo

`images/logo-placeholder.png` currently holds the logo you supplied. To swap
it for a new version later, just overwrite that file (keep the same name) or
update the two `<img src="images/logo-placeholder.png">` references in
`index.html` (header + hero) if you rename it.

## Replacing placeholder content

- **About image** — in `index.html`, find `.about-image-placeholder` and swap
  it for an `<img>` tag pointing to a real photo.
- **Gallery** — each `.masonry-item` currently shows a text block
  (`ph-block`). Replace the `<span class="ph-block">…</span>` with an
  `<img>` tag, and add matching photos to `images/gallery/`.
- **Google Map** — the `<iframe>` in the Contact section uses a generic query
  (`Chelari, Malappuram, Kerala`). For a pinpoint location, generate an
  embed URL from Google Maps → Share → Embed a map, and swap the `src`.

## Deploying to GitHub Pages (free)

1. Create a new GitHub repository, e.g. `gazal-darbar`.
2. Upload the **contents** of this `Gazal-Darbar/` folder to the repository
   root (so `index.html` sits at the repo root, not inside a subfolder).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
5. Save. GitHub will publish the site at:
   `https://<your-username>.github.io/<repository-name>/`

No build tools, npm install, or server are required — every file is static.

## Editing content

All copy lives directly in `index.html` — course descriptions, schedule
times, testimonials, contact details, and footer links. Update the address,
phone or email in three places: the Contact section, the footer, and the
`schema.org` JSON-LD block near the top of `<head>` (keeps SEO accurate).

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). The site degrades
gracefully — animations respect `prefers-reduced-motion`, and the scroll
reveal falls back to "always visible" if `IntersectionObserver` is
unavailable.


## Credits

Palette, typography and layout designed around the Gazal Darbar brand mark
(matte charcoal, soft bronze, ivory and warm beige).
