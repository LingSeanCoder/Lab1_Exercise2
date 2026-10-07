# Project Rules — AI Agent Constitution

> Parse this file BEFORE proposing any code change.

## Stack
- Vanilla HTML5, modern CSS, ES6+ JS only.
- No jQuery, Bootstrap, Tailwind, React, Vue, or any framework.
- No external CDN scripts.

## Language
- `const` by default. `let` only if reassigned. **`var` forbidden.**
- No `innerHTML` for user-derived content. Use `textContent`.

## HTML
- No structural `<div>`. `<div>` only as layout wrapper with class.
- Each pad is a `<button>` with `data-key` and `data-sound`.
- Exactly one `<h1>`. No inline event handlers.

## CSS
- Hex allowed only in `css/tokens.css` `:root`.
- Rule files use `var(--token)` only.
- Mobile-first, min-width queries.
- `:focus-visible` on every interactive element.

## JavaScript
- Scripts are `defer` or external. No inline scripts.
- Key events: `keydown` + `event.key` only.
  `keypress`, `keyCode`, `which` forbidden.
- Every `keydown` handler starts with `if (e.repeat) return;`.
- Audio: `new Audio(src)`, reset `currentTime = 0` before `.play()`.
- Recorder: `performance.now()` timestamps, FIFO.

## Git
- Atomic commits. One commit = one artifact.
- CSS + JS in same commit = 0 pts.
- HTML contract commit BEFORE any JS commit.

## AI Collaboration
- One prompt = one file.
- Every prompt includes contract (owns / must not do).
- Verify with grep before commit.