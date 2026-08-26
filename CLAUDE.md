# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

JetLagPal is a companion PWA for the *Jet Lag: The Game — Hide and Seek* home game. Seekers draw
geometric constraints on a Leaflet map (radius, dividing line, boundary match, points-of-interest),
mark each **HIT**/**MISS**, and the map shades green (hider still possible) / red (eliminated).
Game state syncs in real time between players via Firebase Firestore rooms (5-digit codes).

It is a **static site** — plain HTML/CSS/JS, no build step, no bundler, no framework. Leaflet,
Turf.js, osmtogeojson, and the Firebase JS SDK load from CDNs at runtime. The one exception is
`api/notify.js`, a tiny Vercel serverless function (separate `package.json`) that relays Web Push
notifications — see its file header for why it has to exist server-side.

## Commands

Serve over HTTP (the app uses ES modules and `fetch`, so `file://` will not work):

```bash
python -m http.server 8000     # or: npx serve .   /   php -S localhost:8000
```

Then open `http://localhost:8000` (add `?room=12345` to auto-join a room). There is no lint, test,
or build command — there is no test suite and nothing to compile.

`.claude/launch.json` already runs `python -m http.server 8091` for the preview browser tool.

## Architecture

### Single-file core

`index.html` holds the markup **and** the entire app logic as one inline ES-module `<script>`
(several thousand lines). It is organized into banner-commented sections — search for
`// === SECTION NAME ===` to navigate rather than reading start to finish. Major sections, in
order: Overpass client / shared cache, connection status, Leaflet setup, multiplayer sync
(`onSnapshot` listener), linked-room notifications, round clock, pending-question staging, "your
position", dividing-line tool, custom zone state, boundary tool, POI tools.

Supporting files: `styles.css` (all styling; design tokens in `:root` with a
`prefers-color-scheme: dark` override — change a color there and it propagates everywhere), `ui.js`
(toast/progress/confirm/prompt helpers), `tutorial.js` (first-run walkthrough), `questions.js` (the
Jet Lag question deck), `mapData.js` (city profiles), `firebase-config.js` (Firebase project
config), `sw.js` (service worker — offline shell + tile caching, bump `CACHE_VERSION` whenever a
precached file changes).

### The four tools share one shape

Each tool derives a region from an input (a point, two points, or "where you are") and shades the
map green/red accordingly:

- **Radar** — a circle around a point.
- **Dividing line** — one tool, two modes: *Thermometer* (perpendicular bisector of two points,
  keep the warmer half) and *Match a line* (divider runs along the two points, for streets/transit
  lines/coastlines). Both modes take two map taps or two typed coordinates.
- **Boundary match** — which borough/county/country/fare zone contains a position; one dropdown
  pair (`window.BOUNDARY_LEVELS`) drives all four levels, since each resolves the same way (a real
  Overpass polygon if available, else a union of 500m station bubbles).
- **Points of interest** — one category list, three question types: *Matching* (catchment of your
  nearest one), *Measuring* (closer to a POI than you are — reduces to the union of `d`-km circles
  around every POI, `d` = your distance to the nearest one, reusing tentacle geometry), *Tentacles*
  (within a fixed radius of any).

Matching/measuring questions are asked **from where you are**, not by naming an area (following
[taibeled's JetLagHideAndSeek](https://taibeled.github.io/JetLagHideAndSeek/)): set your position
once (GPS, map tap, or lat/lng boxes) and each tool derives its own region from it. `window.seekerPoint`
is the single source of truth for this. Layer toggles are worded the way the question was asked
(Same/Different, Closer/Further, Warmer/Colder), not as raw hit/miss.

### Pending-question staging

A seeker can keep walking while the hider thinks over a question, so any "from my position" tool
must draw using where the seeker *was* when they asked, not where they are when the answer arrives.
Every such tool stages its shape by freezing whatever it needs (position, radius, nearest POI, …)
into a `build()` closure rather than calling `addConstraint` directly; nothing reaches the map or
Firestore until `commitPendingAsk()` runs it.

### Overpass client (`window.Overpass`)

Map data (transit, boundaries, fare zones, POIs) comes from the free public Overpass API, which
rate-limits hard. **All Overpass requests must go through `window.Overpass.run()` in `index.html`**
— never `fetch` a mirror directly, or the timeouts/rate-limiting come back. It runs requests
strictly one at a time (1.5s apart), aborts hung attempts after 50s, retries up to 5x with backoff
(honoring `Retry-After`), rotates between three mirrors, de-dupes in-flight identical queries, and
caches responses in `localStorage` for 7 days (`gm_op_v1_` prefix). Also relevant: requests only
fire on demand (joining a room only fetches stations; boundary/fare-zone/POI queries run the first
time that tool is actually opened), and there's a Firestore-backed `window.SharedCache` so the
first player to fetch something in a room saves the rest a duplicate Overpass call.

```js
const data = await window.Overpass.run(query, {
    key: 'poi_museum_53.4,-2.3,53.5,-2.2',  // cache key; omit to skip caching
    label: 'museums',                       // used in progress messages
    onStatus: (msg) => prog.update(msg),
    cache: false,                           // for responses too big for localStorage
    force: true                             // bypass a cached hit
});
```

### Firestore room model

Rooms are documents in the `games` collection keyed by the 5-digit code, with fields: `region`,
`constraints`, `logEntries`, `questionState`, and (for custom zones) `customOverpassBbox` /
`customTurfBbox` / `customTurfPoly`. Two rooms can be linked (`linkedRoomId` / `linkToken`) so a
hider's room can push answers/notifications into a seeker's room via `attachLinkedRoomListener`.
State changes flow through a single `onSnapshot` listener in the multiplayer sync section — most
new features that touch room state hook into that listener plus the corresponding write helpers,
not a separate sync path.

### Adding a new city

City profiles live in `mapData.js`'s exported `cityProfiles` object; each `<option>` in
`#regionSelect` (`index.html`) maps to one of these keys. Only `name`, `center`, `defaultZoom`,
`boundingBox`, and `overpassQuery` are required — `boroughs`, `zones`, `allowedRail`,
`stationAliases`, `blacklistedStops`, and `colorOverrides` are optional and fall back to
dynamically-fetched Overpass data when omitted. See `README.md` for the full annotated example.
Custom zones (drawn on the map at room creation) need no profile at all.

### Firebase / deploy

Firebase config lives in `firebase-config.js` (not checked in for real deployments) — see
`README.md` for the required fields and Firestore security rule notes. The static app deploys to
GitHub Pages; `api/notify.js` deploys separately to Vercel purely for the push-relay function
(`.vercelignore` excludes everything else so Vercel doesn't host a second copy of the site).
