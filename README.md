# HW2 — Drum Kit Engine (Contract-First)

Keyboard-driven drum machine. Polyphonic audio playback, W3C `keydown`
events with repeat throttling, and a FIFO beat recorder. Built with
vanilla HTML5, modern CSS, and ES6+ JavaScript. No frameworks, no CDN,
no libraries.

**Author:** Nguyễn Đình Sang

---

## Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 semantic (0 structural `<div>`) |
| Style | Modern CSS — Grid, custom properties, `:focus-visible` |
| Behavior | Vanilla ES6+ JS — no `var`, no `innerHTML` |
| Audio | Web Audio via `new Audio()` — polyphonic by resetting `currentTime` |

---

## Project Structure
'''
hw2-drum-kit/
├── index.html
├── README.md
├── TASK_DECOMPOSITION.md
├── project-rules.md
├── css/
│ ├── tokens.css # design tokens — hex allowed ONLY here
│ ├── reset.css # box-sizing + normalization
│ └── drum.css # pad grid, active state, layout
├── js/
│ ├── audio.js # polyphonic playback engine
│ ├── keymap.js # keydown listener + repeat throttling
│ └── recorder.js # FIFO beat recorder with timestamps
└── assets/
└── sounds/
├── kick.wav
├── snare.wav
├── hihat.wav
├── tom.wav
├── rim.wav
└── clap.wav
'''


---

## Architecture — Decoupled Modules

Slide 24 mandates **architectural decoupling**:

1. **Step 1 — HTML contract first:**
   Each pad has `data-key` (single char) and `data-sound` (path).
   No JS logic before this contract is committed.

2. **Step 2 — Audio engine (`js/audio.js`):**
   Pure playback. Exposes `playSound(src)`. Polyphonic via
   `audio.currentTime = 0` before `.play()`. No UI knowledge.

3. **Step 3 — Keybindings (`js/keymap.js`):**
   Pure input. Listens to `keydown`, checks `event.repeat`,
   calls `playSound()` from the engine. No audio internals.

4. **Step 4 — Beat recorder (`js/recorder.js`):**
   Pure state. FIFO queue of `{ key, timestamp }`. Timestamp via
   `performance.now()`. No audio, no UI.

Each module is independently testable. No module imports another.

---

## Contract-First Constraints

| Constraint | Enforcement |
|---|---|
| Data contract | `data-key` + `data-sound` on each pad |
| Key events | W3C standard `keydown` + `event.key` + `event.repeat` |
| Forbidden events | `keypress`, `event.keyCode` |
| Polyphony | Reset `currentTime = 0` before `play()` |
| Recorder | FIFO queue, `performance.now()` timestamps |
| Security | CSP `script-src 'self'` — zero inline handlers |
| Code | `const` by default, `var` forbidden, no `innerHTML` |

---

## Live Defense Prep

The instructor may change **one key binding** on the spot. Fix procedure:

1. Open `index.html`.
2. Find the pad with the old `data-key`.
3. Change the `data-key` value to the new key.
4. Save. Reload. Done.

The fix touches **one line in one file** because:
- `keymap.js` reads `data-key` dynamically (`querySelectorAll('[data-key]')`),
  never hardcoded.
- `audio.js` reads `data-sound` dynamically.
- Nothing else references specific keys.

If the instructor instead changes the audio file path, edit one
`data-sound` attribute — same one-line fix.

---

## Development

Serve locally (needed for ES modules + CSP + Web Audio):

```bash
# option 1 — Python
python3 -m http.server 8000

# option 2 — Node
npx serve .