# Lab1_Exercise2

# HW2 — Enterprise Developer Portfolio

Production-grade portfolio with a dark mode engine, responsive 2D grid,
and strict contract-first constraints. Built with vanilla HTML5, modern CSS,
and ES6+ JavaScript. No frameworks. No CDN. No libraries.

**Author:** Nguyễn Đình Sang

---

## Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 semantic (0 structural `<div>`) |
| Style | Modern CSS — Grid, custom properties, `:focus-visible`, `prefers-color-scheme` |
| Behavior | Vanilla ES6+ JS — no `var`, no `innerHTML` for user input |

---

## Project Structure

'''
hw2-enterprise-portfolio/
├── index.html
├── README.md
├── TASK_DECOMPOSITION.md
├── css/
│ ├── tokens.css # design tokens — hex allowed ONLY here
│ ├── reset.css # box-sizing + normalization
│ ├── layout.css # responsive 2D grid
│ └── components.css # header, hero, cards, badges, form
└── js/
├── theme.js # dark mode engine (localStorage['theme'])
└── app.js # form validation + nav interactions
'''


FOUC guard (inline `<script>` in `<head>`) sets `data-theme` before first
paint so the page never flashes light-then-dark.

---

## Contract-First Constraints

| Constraint | Enforcement |
|---|---|
| State persistence | `localStorage['theme']` — this key only |
| Colors | CSS variables only. Zero hardcoded hex outside `tokens.css` `:root` / `[data-theme="dark"]` |
| Performance | Zero CLS, LCP < 2.0s on DevTools Fast 3G |
| A11y | WCAG 2.2 AA contrast ≥ 4.5:1 (both themes), full keyboard Tab + Enter flow |
| Commits | Atomic. CSS + JS never in the same commit (Monolithic Dump Ban = 0 pts) |

---

## How the Theme Engine Works

1. **FOUC guard** (inline `<script>` in `<head>`, runs before CSS):
   - Reads `localStorage['theme']`, falls back to `prefers-color-scheme`.
   - Sets `document.documentElement.dataset.theme` immediately.

2. **`js/theme.js`** (deferred):
   - Wires the `#theme-toggle` button.
   - Toggles `data-theme`, updates `aria-pressed` + `aria-label` + icon.
   - Persists the new value to `localStorage['theme']`.

3. **`css/tokens.css`**:
   - `:root` holds the light palette.
   - `[data-theme="dark"]` overrides with the dark palette.
   - All rule files (`layout.css`, `components.css`) consume `var(--...)` only.

Because every color flows from `tokens.css`, changing one token fixes the whole
UI in one line — that is the Live Defense contract.

---

## Development

Serve locally (needed so CSP + module paths resolve, not `file://`):

```bash
# option 1 — Python
python3 -m http.server 8000

# option 2 — Node
npx serve .