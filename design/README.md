# Handoff: JetLagPal visual identity ("Departure Board")

## Overview

A new visual identity for **JetLagPal**, the companion PWA for playing Jet Lag: The Game (hide & seek). This is a **visual-system change only** — no change to layout structure, screen flow, or functionality. It replaces:

- every emoji with a custom SVG icon set,
- the single repeated card formula with a three-tier hierarchy,
- the generic centred-modal / top-pill-toast shapes with bottom-anchored signage surfaces,
- flat typography with real scale/weight contrast and mono tabular readouts,
- and adds a logo/wordmark + app icon.

Existing `--brand` teal token system, light/dark support, and all microcopy are **kept**. Copy in these mocks is the app's real copy — do not rewrite it.

Repo this targets: `AgentMaxwell/JetLagPal` (branch `main`).

## About the design files

`JetLagPal Identity.dc.html` in this bundle is a **design reference created in HTML** — a prototype showing intended look and behaviour, not production code to lift. The task is to **re-express these designs in JetLagPal's own static HTML/CSS/JS environment**, using its existing CSS custom properties, class names, and DOM structure. The mock uses literal hex values inline because it's a standalone artifact; in the app **every value below should land as a CSS custom property** in the existing token block, and components should be styled with the app's existing class names.

`icons.svg` is production-ready — drop it in as-is.

## Fidelity

**High-fidelity.** Colours, type, spacing, and target sizes are final and should be matched closely. Where the mock and the real DOM disagree structurally, keep the real DOM — this is a restyle.

## Direction

**Transit-diagram / departure board.** Vocabulary: chamfer-free flat rectangles, a coloured **state rule** across the top of every surface, a **left state bar** whose width encodes importance, **dashed route ticks** instead of hairline dividers, node/line graphics, mono tabular data, uppercase mono micro-labels. Signal amber is the only second accent.

Explicit non-goals: no purple/blue gradients, no glassmorphism, no Inter, no rounded-card-with-left-accent-stripe SaaS look, no emoji.

## Design tokens

Add these to the existing `:root` / `[data-theme="dark"]` blocks alongside `--brand`.

### Colour — dark (default)

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#0a1214` | app background / map underlay |
| `--bg-grid` | `rgba(46,196,214,.07)` | 34px grid overlay lines |
| `--surface` | `#0d1618` | sheet / panel body |
| `--surface-2` | `#111d20` | cards, tiles, active tab |
| `--surface-3` | `#151f22` | inset fields, code digits |
| `--surface-sunk` | `#0a1214` | secondary buttons, chips |
| `--hairline` | `#1a2629` | 2px section rules |
| `--hairline-soft` | `#162124` | 1px row rules |
| `--tick` | `#2c3c40` | dashed route ticks |
| `--text` | `#eef4f2` | headings, primary readouts |
| `--text-2` | `#cfe0e5` | body on cards |
| `--text-3` | `#8fa3a8` | secondary body |
| `--text-mono` | `#5b6d71` | mono micro-labels |
| `--text-dim` | `#4f6165` | disabled / passive |
| `--brand` | `#2ec4d6` | live state, active tab, primary |
| `--brand-ink` | `#04191c` | text on brand fill |
| `--accent` | `#ffb02e` | awaiting/attention, create CTA |
| `--accent-ink` | `#241300` | text on accent fill |
| `--accent-surface` | `#1a1206` | live-question card fill |
| `--ok` | `#4bd68a` | linked, YES |
| `--ok-surface` | `#12241b` | YES stamp block |
| `--danger` | `#ff6a4d` | end round, NO |
| `--danger-surface` | `#26130f` | NO stamp block |

### Colour — light

| Token | Value |
| --- | --- |
| `--bg` | `#edeae1` (map plate `#f1eee6`) |
| `--bg-grid` | `rgba(11,123,140,.09)` |
| `--surface` | `#f8f7f2` |
| `--surface-2` | `#eef1ec` |
| `--surface-3` | `#efece3` |
| `--hairline` | `#e4e1d6` |
| `--tick` | `#cfcdc0` |
| `--text` | `#10201f` |
| `--text-2` | `#3b4744` |
| `--text-3` | `#5e6a68` |
| `--text-mono` | `#8b938a` |
| `--text-dim` | `#a4aba1` |
| `--brand` | `#0b7b8c` |
| `--brand-ink` | `#ffffff` |
| `--accent` | `#c4741a` (label text `#b06a10`) |
| `--accent-ink` | `#ffffff` |
| `--accent-surface` | `#f6ecdc` |
| `--ok` | `#17a35f` |
| `--danger` | `#d1452a` |

Switch state (light): on `--brand` fill w/ `#fff` knob; off `#e4e1d6` fill w/ `#b6b3a6` knob.

### Typography

Two families, loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- `--font-ui: Archivo, system-ui, sans-serif` — all prose, labels, buttons.
- `--font-mono: "IBM Plex Mono", ui-monospace, monospace` — every number, code, timestamp, coordinate, and uppercase micro-label. Always `font-variant-numeric: tabular-nums` on numeric readouts.

| Role | Spec |
| --- | --- |
| Wordmark | Archivo 800, 30px, `letter-spacing:-.035em` (24px in-panel, 21px compact) |
| Tab title / section head | Archivo 800, 20px, `-.03em`, uppercase |
| Card title (live question) | Archivo 700, 19px/1.25, `-.02em` |
| Row / tile label | Archivo 500–600, 13–15px/1.2 |
| Body | Archivo 400, 12.5–13.5px/1.5, `text-wrap: pretty` |
| Button | Archivo 600–800, 13–16px; primary uppercase, `letter-spacing:.02em` |
| Clock (sheet) | Plex Mono 700, 42px/.9, `-.03em`, tabular |
| Clock (collapsed dock) | Plex Mono 700, 30px/1 |
| Numeric readout (radius) | Plex Mono 700, 32px; unit 13px in `--text-mono` |
| Countdown (question) | Plex Mono 700, 20px |
| Room code | Plex Mono 700, 15–16px, `letter-spacing:.1em` |
| Micro-label | Plex Mono 600, 8.5–9.5px, `letter-spacing:.22–.30em`, uppercase |
| Timestamp / coords | Plex Mono 400–500, 10–11.5px |
| Tab label | Plex Mono 600 (700 active), 8.5px, `letter-spacing:.14em`, uppercase |

Colon in the clock is wrapped in a `<span>` coloured `--accent`.

### Geometry & spacing

- **Border radius: 0 everywhere.** The only radii in the mock are the phone shell (36px, device only) and the home indicator (3px). No rounded cards, no rounded buttons, no rounded chips.
- Spacing scale: 2, 4, 6, 8, 10, 12, 14, 16, 20, 22, 26px. Sheet horizontal padding 16px; setup screen 22px.
- Sibling groups use flex/grid + `gap` (2–4px for joined button pairs, 11–13px for stacked cards).
- **No box-shadows** on in-app surfaces. Elevation is expressed by the state rule + background step. (Shadows in the mock are on the phone shells only.)

### Hierarchy system — the important part

Four tiers, applied consistently. This replaces "one card formula everywhere".

1. **Live / awaiting (top tier).** `border-left: 6px solid --accent`, fill `--accent-surface`, top rule `4px --accent` if it owns the surface, mono countdown at 20px, its own footer action pair, blinking 7px square status dot. Used for: the pending question, the round clock strip.
2. **Active content (second tier).** `border-left: 6px solid --brand`, fill `--surface-2`, a `2px solid --brand` underline beneath its header row, primary action filled `--accent` or `--brand`. Used for: the open tool (Radar), the expanded question category.
3. **Passive record (third tier).** `border-left: 2px solid` (state colour: `--ok` / `--danger` / `--tick`), fill `--surface-2`, no top rule, title at 13.5px 600, mono meta above it. Answered questions get a 74px-wide stamp block on the right (`--ok-surface` / `--danger-surface`, icon + 12px mono YES/NO). Superseded items drop to `opacity:.72`.
4. **Chrome (thinnest tier).** No fill and no border box at all — a 44–58px row on a 1px `--hairline-soft` rule, mono label, control on the right. Used for: log entries, layer rows, settings rows.

Log entries additionally sit on a 2px vertical rail (`#1e2c30`) at `left:60px` with a 8–10px square node per entry, colour-coded by event type; the round-start node is hollow (`2px solid --brand`).

### Motif details

- **Grid overlay** on the map plate: `linear-gradient(--bg-grid 1px,transparent 1px), linear-gradient(90deg,--bg-grid 1px,transparent 1px)`, `background-size: 34px 34px`.
- **Dashed route tick divider**: `height:2px; background:repeating-linear-gradient(90deg,--tick 0 6px,transparent 6px 12px)`. A tighter `0 3px / 3px 7px` variant fills the space to the right of section headings.
- **Radar on map**: `stroke-dasharray="8 7"`, 2px `--brand`, fill `rgba(brand,.07)`, 7px solid centre node.
- **Thermometer route**: 3px `--accent` polyline, `stroke-linecap:square`, 5px square-ended nodes at vertices.
- **Blink** (awaiting dot / linked dot): `@keyframes { 0%,100%{opacity:.4} 50%{opacity:1} }`, 1.8s (question) / 2.4s (connection) `ease-in-out infinite`.

## Logo & app icon

The mark is a **route line with an interchange node** — one 90°+45° polyline (`M8 40V26L26 8h14` in a 48×48 viewBox), stroke 5–7 depending on size, `stroke-linecap:square`, with a knockout node circle at the bend (`cx=26 cy=8 r=6`, fill = surface colour, stroke = brand, stroke-width 4–4.5). A 4px amber dot terminates the lower end in the full lockup only.

- **Lockup**: mark at 44px + wordmark `Jet` / `Lag` (brand-coloured) / `Pal` at Archivo 800 30px, with a mono kicker under it: an 18×2px brand rule + `MAP TRACKER · HIDE & SEEK` at 9px, `letter-spacing:.24em`, `--text-3`. Keep the kicker `white-space:nowrap`.
- **In-panel lockup**: mark 22–26px, wordmark 15–21px, no kicker.
- **App icon**: three states — knockout (surface fill, brand mark, 3px brand top rule), solid brand, solid amber. Square, no radius (the OS applies its own mask).

## Screens

All at 390pt width, 44–62pt targets, one-handed reach. Every screen is in `JetLagPal Identity.dc.html`; ids `3a`/`3b` are the newest turn (top of the file), `2a`/`2b` below, `1a`/`1b` the original two directions (reference only — `1b` was chosen and `1a`'s mark adopted).

| Screen | Where | Notes |
| --- | --- | --- |
| Setup | `2a` | Logo lockup; side selector = two 56pt tiles (active = brand fill); create block = amber tier w/ 52pt zone select + 58pt uppercase amber CTA; join block = five 56pt mono digit cells + 52pt outlined button. 4px brand state rule under the status bar. |
| Map + Tools sheet | `2a` | Panel becomes a **bottom sheet**: 44pt drag handle, clock header row, tool content, tab dock pinned to the bottom edge. Connection strip floats over the map as a 44pt bar with a 3px `--ok` top rule. Radius chips are 60×44pt mono. |
| Collapsed dock + toast | `2b` | Resting state: clock strip + dock only. **Toast** = bottom-anchored strip, `border-left:6px` state colour, mono state label + sentence + timestamp — not a top-centre pill. |
| Settings sheet | `2b` | **Bottom sheet**, not a centred card: amber top rule, 58pt chrome rows, footer pair (`Close` / `Leave room` in `--text` fill). Overlay `rgba(16,32,31,.55)`. |
| Ask | `3a` | Live question (tier 1) pinned above the category list; collapsed category = 48pt row; expanded shows mono group labels (TRANSIT / BORDERS) and 52pt option tiles with icons. |
| Log | `3a` | Tier-4 rows on the node rail; 38pt mono time column, right-aligned. |
| Answers | `3a` | Tier-3 rows with YES/NO stamp blocks; photo answer shown superseded/dimmed. |
| Tutorial | `3b` | Progress = a **route**: filled squares for done, a larger hollow square for current, hollow small + dashed line for upcoming. 26px Archivo 800 step title, body, then an amber tip strip. Footer `Skip` (1fr) / `Next` (2fr, brand, uppercase). |
| Layers | `3b` | Tier-4 rows with a 26×6px colour route chip and a square 46×26pt switch. |

## Interactions & behaviour

Behaviour is unchanged from the current app; only the visual expression of state changes.

- **Tab switch**: active tab gains `3px solid --brand` top border, `--surface-2` fill, `margin-top:-2px` to overlap the dock rule, label goes 600→700 and brand-coloured; icon stroke 1.6→1.7.
- **Sheet**: drag handle expands/collapses; collapsed keeps clock strip + dock. Respect `env(safe-area-inset-bottom)` under the dock (the mock's home indicator stands in for it).
- **Press state**: darken/lighten one background step — do **not** use `filter: brightness()`.
- **Toast**: slide up from the bottom edge, 180ms `cubic-bezier(.2,.7,.3,1)`; auto-dismiss unchanged.
- **Awaiting question**: countdown ticks in mono tabular (no layout shift), status dot blinks.
- Motion is short and mechanical — 120–200ms. Honour `prefers-reduced-motion` by disabling the blink keyframes.

## Assets

- `icons.svg` — 29-symbol sprite, all 24×24 viewBox, stroke-based, `currentColor`. Inline it once in `index.html` (or fetch and inject) and reference with `<use href="#i-…">`. Emoji → icon mapping: compass/tools → `i-tools`, layers → `i-layers`, question → `i-ask`, log → `i-log`, answers → `i-answers`, radar → `i-radar`, pin/ask-from-here → `i-pin`, pick-centre → `i-crosshair`, seeking → `i-seek`, hiding → `i-hide`, copy → `i-copy`, share-link → `i-link`, settings → `i-dial`, help → `i-help`, close → `i-close`, back → `i-back`, timer → `i-clock`, airport → `i-plane`, train → `i-train`, station → `i-station`, border → `i-border`, measuring → `i-measure`, photo → `i-photo`, zone → `i-zone`, end-round → `i-stop`, yes → `i-check`, disclosure → `i-chevron`.
- Logo mark: inline SVG (paths above). No raster asset needed; generate PWA icons from the solid-brand app-icon variant.
- No new dependencies. Fonts are the only network addition — self-host if you'd rather keep the PWA fully offline.

## Files in this bundle

- `JetLagPal Identity.dc.html` — all 12 screens, dark/light paired, three annotated turns.
- `icons.svg` — production sprite.
- `README.md` — this file.

## Suggested implementation order

1. Tokens: add the table above to the existing custom-property blocks (both themes), keep `--brand` names already in use.
2. Fonts + the two type variables; replace all hardcoded sizes with the type table.
3. `icons.svg` in, every emoji out.
4. Radius → 0, shadows out, dashed-tick divider utility in.
5. Hierarchy tiers as four modifier classes; apply per the screen table.
6. Rework setup screen, then sheet/modal/toast shapes.
7. Logo lockup + app icons last.
