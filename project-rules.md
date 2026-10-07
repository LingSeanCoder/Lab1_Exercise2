# Project Rules — AI Agent Constitution

> **Mandate for any AI agent working in this repo:** Parse this file BEFORE
> proposing any code change. If a proposed change conflicts with a rule here,
> reject the proposal and ask for clarification.

---

## 1. Stack Constraints

- Vanilla HTML5, modern CSS, and ES6+ JavaScript **exclusively**.
- No jQuery, Bootstrap, Tailwind, React, Vue, or any framework.
- No external script CDNs. No `import` from external URLs.
- No polyfills unless explicitly justified in `TASK_DECOMPOSITION.md`.

---

## 2. Language Rules

- `const` by default.
- `let` only when reassignment is mandatory.
- **`var` is forbidden.** It causes hoisting bugs and global pollution.
- Use ES6+: arrow functions, template literals, destructuring, optional chaining.
- No `innerHTML` for user-derived content. Use `textContent` or DOM APIs.

---

## 3. HTML Rules

- Prioritize native semantic HTML over generic `<div>` containers.
- Structural `<div>` is forbidden. `<div>` is allowed **only** as a
  layout wrapper, and must have a class that describes its role.
- Mandatory landmarks: `<header>`, `<nav aria-label>`, `<main id>`, `<footer>`.
- Exactly **one** `<h1>` per document. No heading level skipping.
- Every form control has an explicit visible `<label for="id">`.
- Every `<img>` has `alt`, `width`, `height`, `loading`, `decoding`.
- No inline event handlers (`onclick="..."` is strictly banned).

---

## 4. CSS Rules

- Design tokens live in `css/tokens.css` only.
- Hex color codes are allowed **only** inside `:root` and `[data-theme="dark"]`
  in `tokens.css`.
- All rule files (`reset.css`, `layout.css`, `components.css`) reference
  `var(--token)` only. Zero hardcoded hex.
- Mobile-first. `min-width` media queries only.
- No horizontal scroll at 375px viewport.
- WCAG 2.2 AA contrast ≥ 4.5:1 in both themes.

---

## 5. JavaScript Rules

- All scripts are `defer` or external — except the FOUC guard
  which must run before CSS paint.
- State persistence uses `localStorage['theme']` — this key and no other.
- Event listeners use W3C standard events (`keydown`, `click`).
  `keypress` and `event.keyCode` are deprecated and forbidden.
- No `setInterval` for UI timing. Use `requestAnimationFrame` or CSS animations.
- Zero console errors during theme toggle, form submit, and nav.

---

## 6. Git Rules

- **Atomic commits only.** Each commit produces one artifact and maps to
  one row in `TASK_DECOMPOSITION.md`.
- **Monolithic Dump Ban:** CSS + JS in the same commit = 0 pts.
- Commit message format: `<type>(<scope>): <imperative summary>`.
- Types: `docs`, `feat`, `fix`, `perf`, `refactor`, `chore`.
- Minimum 6 commits total (slide 20).

---

## 7. AI Collaboration Rules

- **One prompt = one file.** Never ask AI to produce multiple files in one
  prompt.
- Every prompt must include the **contract** (what the file owns, what it
  must not do).
- AI output is **untrusted** until verified by a human step:
  - `grep` for forbidden patterns
  - DevTools a11y tree check
  - Contrast ratio check
- If AI proposes unauthorized libraries, inline handlers, or hex outside
  `tokens.css` → reject and re-prompt.

---

## 8. Verification Gates (run before each commit)

```bash
# No hex outside tokens.css
grep -rnE "#[0-9a-fA-F]{3,6}" css/ --include="*.css" | grep -v tokens.css

# No var in JS
grep -rn "\bvar\b" js/

# No innerHTML on user input
grep -rn "innerHTML" js/

# Exactly one <h1>
grep -c "<h1" index.html

# Only layout-wrapper <div>s
grep -n "<div" index.html

# Only localStorage key 'theme'
grep -n "localStorage" js/theme.js