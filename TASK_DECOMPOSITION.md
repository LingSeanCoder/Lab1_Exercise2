# HW2 — Drum Kit Engine — Task Decomposition

Contract-first keyboard drum kit. Each step is one commit, one artifact.

## Mandatory Architectural Decoupling (Slide 24)
1. Commit HTML `data-sound` contract BEFORE touching JavaScript.
2. Implement polyphonic Audio engine independently.
3. Implement `keydown` listener with `event.repeat` throttling.
4. Implement FIFO Beat Recorder (timestamped event queue).

## Atomic Sub-task Pipeline

| # | Sub-task | Output | Commit message |
|---|---|---|---|
| 1 | Docs | README.md, TASK_DECOMPOSITION.md, project-rules.md | `docs: define drum kit contract and wbs` |
| 2 | Tokens | css/tokens.css | `feat(css): drum kit design tokens` |
| 3 | Reset | css/reset.css | `feat(css): box-sizing reset and normalization` |
| 4 | Layout | css/drum.css | `feat(css): drum pad grid layout and active state` |
| 5 | HTML contract | index.html | `feat(html): data-sound contract for drum pads` |
| 6 | Audio engine | js/audio.js | `feat(js): polyphonic audio playback engine` |
| 7 | Keybindings | js/keymap.js | `feat(js): keydown listener with repeat throttling` |
| 8 | Beat recorder | js/recorder.js | `feat(js): fifo beat recorder with timestamps` |

## Contract-First Constraints
- Data contract: `data-key` + `data-sound` on each pad.
- Key events: `keydown` + `event.key` only. `keypress` / `keyCode` forbidden.
- Repeat guard: `if (e.repeat) return;`.
- Polyphony: reset `currentTime = 0` before `.play()`.
- Recorder: FIFO queue, `performance.now()` timestamps.
- Security: CSP `script-src 'self'`. Zero inline handlers.

## Strict Acceptance Criteria
- [ ] Each pad plays on click AND keydown.
- [ ] Holding key does NOT flood audio.
- [ ] Two simultaneous keys overlap (polyphonic).
- [ ] Beat recorder FIFO with ms precision.
- [ ] Zero console errors on rapid mashing.
- [ ] Renders at 375px, full keyboard nav.
- [ ] Live Defense: change 1 key binding → fix in 60s.