# Task Decomposition — Lab 1 Exercise 2

**Student:** Nguyen Dinh Sang
**Student ID:** 24521521
**GitHub:** https://github.com/LingSeanCoder/Lab1_Exercise2
**Course:** Web Application Development — Lab 1: Modern Web Foundations & AI-Assisted Engineering

---

## WBS — Work Breakdown Structure

Exercise 2: Enterprise Developer Portfolio.

| ID    | Task                                                       | Output                  | Commit Message                                            | Depends on |
|-------|------------------------------------------------------------|-------------------------|-----------------------------------------------------------|------------|
| E2-01 | Portfolio HTML shell (hero, nav, skills, cards, form)      | `portfolio.html`        | `feat(html): enterprise developer portfolio shell`        | —          |
| E2-02 | Tokens & Reset                                             | `css/tokens.css`        | `feat(css): tokens & reset`                               | E2-01      |
| E2-03 | 2D Grid Layout (responsive, mobile-first)                  | `css/layout.css`        | `feat(css): responsive grid`                              | E2-02      |
| E2-04 | Theme Engine CSS (`[data-theme]` attribute driven)         | `css/theme.css`         | `feat(css): theme engine styles`                          | E2-02      |
| E2-05 | Theme toggle JS (localStorage + aria-pressed)              | `js/theme-toggle.js`    | `feat(js): dark mode engine`                              | E2-01      |
| E2-06 | Component styles (project cards, nav, form)                | `css/components.css`    | `feat(css): component styles`                             | E2-03, E2-04 |
| E2-07 | Form validation JS (client-side state, aria-live)          | `js/form.js`            | `feat(js): form validation with client-side state`        | E2-01      |
| E2-08 | Wire CSS + JS in portfolio.html                            | `portfolio.html`        | `chore(html): wire styles and scripts`                    | E2-01 → E2-07 |

---

## Slide Mandatory Sub-Tasks (from Exercise 2 brief)

The slide defines 3 mandatory sub-tasks; they map to WBS entries above:

| Slide sub-task                          | Maps to   |
|-----------------------------------------|-----------|
| SUB-TASK T-02A: Tokens & Reset          | E2-02     |
| SUB-TASK T-02B: 2D Grid Layout          | E2-03     |
| SUB-TASK T-02C: Theme Engine            | E2-04 + E2-05 |

**Atomicity note:** The slide lists Theme Engine as one sub-task, but combining
CSS theme styles with JS toggle logic in one commit violates the Monolithic
Dump Ban (CSS & JS in 1 shot = 0 pts). We split it:

- E2-04 = `css/theme.css` (CSS only)
- E2-05 = `js/theme-toggle.js` (JS only)

Each maps to its own commit with the message shown in the slide:
- `feat(js): dark mode engine` (the slide's commit message for T-02C)

---

## Contract-First Constraints (slide)

Applies to every task:

1. **State persistence strictly via localStorage key `'theme'`.**
   No sessionStorage, no cookies, no query params.

2. **Colors paired via CSS variables, zero hard-coded hex codes in rules.**
   Every color used in layout/components must reference a custom property
   defined in `css/tokens.css`. The only hex allowed is inside `:root` and
   inside `[data-theme="dark"]` selector in `css/theme.css`.

3. **Performance Budget: Zero CLS, LCP < 2.0s on DevTools Fast 3G.**
   - Reserve space for images (`width` + `height` attributes).
   - No layout shift on theme toggle (theme change must not reflow grid).
   - Preload critical assets if needed.

4. **Monolithic Dump Ban:**
   Commits combining CSS & JS in 1 shot = **0 pts**.
   Each commit touches exactly one file (except E2-08 which only adds
   `<link>` and `<script>` tags — no CSS/JS content).

5. **3-Minute Live Defense:**
   Instructor hides one CSS token; must fix in 60 seconds.
   Means: every visual value must trace back to a token. No magic numbers.

---

## Strict Acceptance Criteria Matrix (slide)

| Criterion                                         | Verification                        |
|---------------------------------------------------|-------------------------------------|
| Monolithic Dump Ban                               | `git log --stat` shows 1 file/commit|
| Renders cleanly at 375px mobile (zero h-scroll)   | DevTools device toolbar             |
| Passes WCAG 2.2 AA contrast ratios >= 4.5:1       | Lighthouse Accessibility >= 95      |
| Zero console errors during dynamic theme toggling | DevTools Console, toggle 5×         |
| Navigation supports full keyboard Tab & Enter     | Manual keyboard walk-through        |
| 3-Minute Live Defense                             | Token removal test                  |

---

## Atomicity Contract

**Rule:** 1 prompt → 1 file → 1 commit. Never combined.

**Forbidden:**
- Commit chứa cả CSS và JS trong cùng 1 lần.
- Prompt yêu cầu AI viết nhiều hơn 1 file.
- Hard-coded hex colors ngoài `:root` / `[data-theme="dark"]`.
- `<div>` cho cấu trúc (landmarks semantic).
- `onclick=""` inline trong HTML.

---

## Definition of Done (per task)

1. Output file khớp đúng tên trong WBS.
2. Verification gate của task đó pass (grep / DevTools / Lighthouse).
3. Commit message khớp CHÍNH XÁC cột "Commit Message".
4. Push lên `origin/main` trước khi bắt đầu task kế tiếp.
5. Zero console errors sau khi wire (E2-08 trở đi).