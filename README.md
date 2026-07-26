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
| 🌡️ **Dividing line** | *Thermometer* mode is the perpendicular bisector of two taps, keeping the warmer half — the same geometry answers Measuring ("closer to A or B?") questions. *Match a line* mode runs the divider along the two taps, for streets, transit lines and coastlines. |
| 🗺️ **Boundary match** | Borough / district, county, country and transit fare zone — one level selector, one area list. Uses the true OSM boundary polygon when available, otherwise a union of 500m bubbles around the stations inside it. |
| 📍 **Points of interest** | One category list, two modes: *Tentacles* (union of circles around every POI) and *Nearest one* (Voronoi catchments). |
Transit stations and boundaries are fetched live from the Overpass API (OpenStreetMap)
and cached in `localStorage`.

It is a **static site** — plain HTML/CSS/JS with no build step, no bundler, and no
framework. Dependencies (Leaflet, Turf.js, osmtogeojson, the Firebase JS SDK) load from
CDNs at runtime.

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
