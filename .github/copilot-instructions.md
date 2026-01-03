<!--
Guidance for AI coding agents working on this repository.
Keep this file concise and focused on discoverable, actionable project details.
-->
# Copilot / AI agent instructions

Purpose
- This is a small static website (single-page HTML) that describes "Cure's Inventory Prospects".
- Primary files: `index.html`, `script.js`, `style.css`, and the `images/` folder.

Big picture
- Architecture: static client-side site (no build step or backend). HTML contains sections with fragment IDs (`#home`, `#prospects`, `#summary-page`, `#closing`) and relies on plain DOM-manipulating JavaScript included via `<script src="script.js">` at the bottom of `index.html`.
- Data flow: content is authored directly in HTML (and images in `images/`). There is no JSON API or runtime bundling — editing HTML/CSS/JS directly is the normal workflow.

Key patterns and conventions
- CSS-heavy layout: `style.css` uses grid and many class names such as `.tool-bag`, `.tools-group`, `.tool-card`, `.summary-grid`. Preserve these class names when editing structure or styling.
- Global, non-module JS: `script.js` defines global functions (for example `navDropDown`) and attaches event handlers on `window`. Keep changes compatible with non-module usage (no ES module imports expected).
- Anchor navigation: internal navigation uses anchors and fragment ids. Avoid changing section ids unless updating all references.
- Images: referenced by relative paths like `images/portrait.jpg`. Add image files to `images/` and reference them with the same relative path.

Project-specific gotchas (do not assume typical patterns)
- No build/test setup: there are no `package.json` or test runners present. Do not add changes that assume a bundler unless you also add clear instructions and manifests.
- Script bug to watch: in `script.js` the click handler contains `if (myDropdown.style.height = "16rem") { ... }` — that's an assignment, not a comparison. Fix with `===` or use `getComputedStyle(myDropdown).height` when checking visible state.
- Dropdown behavior: `navDropDown()` sets `prosCatDrop.style.height`. Other code uses `window.onclick` to collapse it. Be careful when modifying those functions to preserve expected show/hide behavior and accessibility.

Developer workflows (how to run and debug)
- Quick local preview (PowerShell): run a simple HTTP server in the project root so `file://` origin issues don't interfere with requests:
```powershell
# Python 3
python -m http.server 8000
# or (if Node.js available) temporary server
npx http-server -p 8000
```
- Open `http://localhost:8000/index.html` in the browser and use DevTools Console to inspect runtime errors.
- Recommended edits: make small, atomic changes (edit HTML or CSS, reload browser). For JS changes, add `console.log(...)` to inspect values before refactors.

What to change and examples
- Small bugfix example (fix assignment bug): edit `script.js`:
```js
// before
if (myDropdown.style.height = "16rem") {
  myDropdown.style.height = "4rem";
}

// suggested fix
if (getComputedStyle(myDropdown).height === '16rem' || myDropdown.style.height === '16rem') {
  myDropdown.style.height = '4rem';
}
```
- Adding a new tool card: update `index.html` to add a new `.tool-card` inside the `.tool-bag-grid` and add image files into `images/`. Preserve the `.tool-card` structure used elsewhere.

Commit/PR guidance for AI agents
- Keep commits small and focused: one bugfix or one UI change per PR.
- In PR descriptions, reference the file(s) changed and why (e.g., "Fix dropdown collapse bug in `script.js` by using comparison instead of assignment").
- Do not reformat unrelated files; preserve original style and indentation.

If unclear or missing
- Ask the human author which behavior to preserve when there are ambiguous UI choices (e.g., desired dropdown animation height or timing).
- If adding tooling (build/test), include exact dependency manifest and explicit run steps.

Files to inspect for more context
- `index.html` — main content and where `script.js` is included
- `script.js` — DOM logic and event handlers
- `style.css` — all layout and visual rules
- `images/` — image assets referenced by pages

End of file — ask the maintainer to review any unclear UI behavior before major refactors.
