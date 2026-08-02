# JetLagPal

A companion web app for the **Jet Lag: The Game — Hide and Seek** home game. Seekers
use it to narrow down where the hider is: draw geometric constraints on a Leaflet map,
mark each as **HIT** or **MISS**, and the map shades green (hider still possible) / red
(eliminated). Game state syncs in real time between players via Firebase Firestore rooms
(5-digit codes).

There are four tools, each covering a family of questions:

| Tool | Covers |
|------|--------|
| 🎯 **Radar** | Radius questions — a circle around a point |
| 🌡️ **Dividing line** | *Thermometer* mode is the perpendicular bisector of two points, keeping the warmer half. *Match a line* mode runs the divider along the two points instead, for streets, transit lines and coastlines. Either mode takes two map taps **or** two typed coordinates. |
| 🗺️ **Boundary match** | "Same borough as me?" — finds which borough / county / country / fare zone contains your position and shades it. Manual area selection is still there behind the disclosure. |
| 📍 **Points of interest** | One category list, three question types: *Matching* ("same nearest museum as me?" → the catchment of your nearest one), *Measuring* ("closer to a museum than me?"), and *Tentacles* (within a fixed radius of any). |

Following [taibeled's JetLagHideAndSeek](https://taibeled.github.io/JetLagHideAndSeek/),
matching and measuring questions are asked **from where you are** rather than by naming
an area. Set your position once — GPS, a map tap, or the latitude / longitude boxes —
and each tool derives its own region. Layer toggles are then worded the way the question
was asked: Same/Different, Closer/Further, Warmer/Colder.

The measuring reduction is worth stating plainly: if your nearest museum is *d* km away,
"is the hider closer to a museum than me?" is exactly "is the hider inside the union of
*d*-km circles around every museum?" — so it reuses the tentacle geometry with the
radius measured instead of chosen.
Transit stations and boundaries are fetched live from the Overpass API (OpenStreetMap)
and cached in `localStorage`.

Coordinates are entered as separate latitude and longitude number boxes, so there is no
format to get wrong. Map style (light / muted / dark tiles) is a per-device setting in
⚙️ Settings and defaults to light — the red "ruled out" wash over dark tiles was
unreadable in daylight.

It is a **static site** — plain HTML/CSS/JS with no build step, no bundler, and no
framework. Dependencies (Leaflet, Turf.js, osmtogeojson, the Firebase JS SDK) load from
CDNs at runtime.

## Talking to Overpass

Map data comes from the free public [Overpass API](https://overpass-api.de), which gives
each IP roughly two concurrent slots and rate-limits hard past that. **Every Overpass
request goes through `window.Overpass` in `index.html`** — do not call `fetch` against a
mirror directly, or you reintroduce the timeouts. The client:

- runs requests **strictly one at a time**, spaced 1.5s apart, so two loaders can never
  collide;
- aborts a hung attempt after 50s instead of hanging forever;
- retries up to 5 times with exponential backoff, honouring `Retry-After` on a 429;
- rotates between three mirrors and remembers the last one that worked
  (`gm_op_mirror`);
- de-duplicates identical in-flight queries and caches responses in `localStorage`
  for 7 days under the `gm_op_v1_` prefix.

```js
const data = await window.Overpass.run(query, {
    key: 'poi_museum_53.4,-2.3,53.5,-2.2',  // cache key; omit to skip caching
    label: 'museums',                       // used in progress messages
    onStatus: (msg) => prog.update(msg),
    cache: false,                           // for responses too big for localStorage
    force: true                             // bypass a cached hit
});
```

The other half of the fix is **when** requests happen. Joining a room fetches stations
and nothing else. The heavy administrative-boundary query runs only the first time
someone reaches for the Boundary tool (`ensureBoundaryData()`), fare zones only when
that level is selected, and POI queries only on demand — with Tentacles and Nearest-one
sharing a cache key, so asking for museums twice costs one request. The derived boundary
result is cached separately under `gm_areas_v1_*` (simplified, because the raw response
runs to megabytes). **⚙️ Settings → ⤓ Re-download** clears all of it.

## Running it locally

Because the app uses ES modules and `fetch`, you must serve it over HTTP — opening
`index.html` directly with `file://` will not work. Any static server does:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .

# or PHP
php -S localhost:8000
```

Then open <http://localhost:8000>. Add `?room=12345` to auto-join a room.

## Firebase setup

Multiplayer sync uses Firebase Firestore. Configuration lives in **`firebase-config.js`**,
which exports a `firebaseConfig` object:

```js
// firebase-config.js
export const firebaseConfig = {
    apiKey: "…",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project",
    storageBucket: "your-project.firebasestorage.app",
    messagingSenderId: "…",
    appId: "…",
};
```

1. Create a Firebase project and enable **Cloud Firestore**.
2. Copy your web app's config into `firebase-config.js`.
3. Set Firestore security rules for the `games` collection. Rooms are anonymous and
   ephemeral; a permissive rule is fine for casual play, but restrict as you see fit.

Rooms are stored as documents in the `games` collection keyed by the 5-digit code, with
fields: `region`, `constraints`, `logEntries`, `questionState`, and (for custom zones)
`customOverpassBbox` / `customTurfBbox` / `customTurfPoly`.

If you tighten the [Content-Security-Policy](index.html) `connect-src`, keep your
Firebase domains (`*.googleapis.com`) allowlisted.

## Project structure

| File | Purpose |
|------|---------|
| `index.html` | Markup + the main inline ES-module script (map engine, sync, tools, questions) |
| `styles.css` | All styling. Design tokens live in `:root` (with a `prefers-color-scheme: dark` override) — change a colour there and it propagates everywhere. Includes the bottom-sheet and touch-target rules. |
| `ui.js` | Self-contained notification helpers: toast, progress, confirm, prompt |
| `tutorial.js` | The first-run walkthrough modal |
| `questions.js` | The Jet Lag question deck (categories → subcategories → items) |
| `mapData.js` | City profiles (see below) |
| `firebase-config.js` | Your Firebase project config (not checked in for real deployments) |

## Adding a new city

City profiles live in **`mapData.js`** as entries in the exported `cityProfiles`
object, and each option in the "Create New Game" dropdown in `index.html` maps to one
of these keys. To add a city:

1. **Add a `<option>`** to `#regionSelect` in `index.html`, e.g.
   `<option value="leeds">Leeds</option>`.
2. **Add a matching profile** to `cityProfiles` in `mapData.js`:

```js
"leeds": {
    name: "Leeds",                       // shown in the UI
    center: [53.7997, -1.5492],          // [lat, lng] map centre
    defaultZoom: 11,
    boundingBox: "53.70,-1.70,53.90,-1.40", // "south,west,north,east" for Overpass

    // Overpass query body run to draw stations/lines. {{bbox}} is substituted.
    overpassQuery: `node["railway"~"station|tram_stop"]({{bbox}}); way["railway"~"rail|tram|light_rail"]({{bbox}}); relation["type"="route"]["route"~"tram|light_rail"]({{bbox}});`,

    // Optional: predefined station lists for the Boundary tool's Borough level
    // (falls back to dynamically-fetched administrative boundaries if omitted).
    boroughs: { "Leeds": ["Leeds", "Cross Gates", "…"] },

    // Optional: fare-zone → station lists for the Boundary tool's Fare zone level.
    // Omit it and the app fetches zones from Overpass the first time someone
    // selects that level.
    zones: { "1": ["Leeds", "…"] },

    // Optional: which national-rail stations to show. "ALL" or an array of names.
    allowedRail: "ALL",

    // Optional tuning:
    stationAliases: { "leeds city": "leeds" }, // normalise alternate names
    blacklistedStops: ["Some Depot"],          // hide unwanted stops
    colorOverrides: { "Line 1": "#ff0000" },   // recolour named routes
}
```

Only `name`, `center`, `defaultZoom`, `boundingBox`, and `overpassQuery` are required;
the rest are optional. Boundaries (boroughs, counties, countries) and fare zones can be
fetched dynamically from Overpass when not predefined.

Custom zones need no profile: pick **Custom (Draw Map)** when creating a room and tap
out the area on the map.
