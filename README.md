# HFS Site — static prototype

Static HTML/CSS/JS. No build step and no server code required.

## Files
- `index.html`: the site (all pages use hash routing, e.g. `#/on-the-road/driver-tools`)
- `hfs-sitemap.js`: menu, footer and page structure
- `hfs-locator.js`, `hfs-locator.css`: Find a Sinclair Station map
- `image-slot.js` + `.image-slots.state.json`: image placeholders and the images already placed in them
- `login.html` + `tweaks-panel.jsx`: Portal Login screen
- `*.png`, `design-files/`: logos
- `.nojekyll`: **required**. Without it, GitHub Pages hides dot-files, and the placed images won't load.

## Publish on GitHub Pages
1. Create a new repository on GitHub (public, or private on a paid plan).
2. Upload **the contents of this folder** to the repository root: **Add file → Upload files**, then drag everything in. Make sure `.nojekyll` and `.image-slots.state.json` are included. On macOS, press Cmd+Shift+. to show hidden files.
3. Go to **Settings → Pages → Build and deployment**, set Source to **Deploy from a branch**, and choose `main` / `(root)`. Save.
4. After about a minute the site is live at `https://<user>.github.io/<repo>/`.

Using git instead:
```
git init && git add -A && git commit -m "HFS site"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

## External dependencies (loaded from CDNs)
Google Fonts (Open Sans, Montserrat, Material Symbols), Leaflet 1.9.4 (unpkg), and the map tile provider used in `hfs-locator.js`. On login.html: React 18, ReactDOM and Babel standalone (unpkg).

## Known limitations
- Station data is placeholder. Map tiles are a stand-in until a Google Maps API key is added.
- The Portal Login screen works, but the portal pages it routes to after sign-in are not included in this package.
- Social icon links and app store badge slots are placeholders.
- Image slots are read-only once hosted. To change the images, replace them in `.image-slots.state.json` or swap in static `<img>` tags.
