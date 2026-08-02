// questions.js
//
// The Jet Lag: Hide + Seek seeking deck, following the category breakdown at
// https://www.lifack.ch/docs/seeking.
//
// ---------------------------------------------------------------------------
// EDIT ME: every distance the app offers lives in distancePresets below, in km.
// These drive three things at once — the question cards in the Ask tab, the
// Radar quick-select chips, and the Tentacles radius dropdown — so changing a
// number here changes it everywhere. Add, remove or reorder freely.
// ---------------------------------------------------------------------------
export const distancePresets = {
    // Radar — "Are you within ___ of me?"
    radar: [0.5, 1, 2, 5, 10, 15, 40, 80, 160],

    // Thermometer — the length of the leg you travelled.
    thermometer: [1, 2, 5, 15, 80],

    // Tentacles — "Within ___ of me, which ___ are you nearest to?"
    // `note` is shown beside the distance; `default: true` preselects one.
    tentacle: [
        { km: 1 },
        { km: 2,  note: 'medium games', default: true },
        { km: 5 },
        { km: 15 },
        { km: 25, note: 'large games' }
    ]
};

// "500m" / "2km" / "1.5km" — the one place distances get worded.
export function kmLabel(km) {
    return km < 1 ? `${Math.round(km * 1000)}m` : `${+km.toFixed(2)}km`;
}

// Look up the tentacle distance carrying a given note, so the deck headings stay
// in step with whatever you set above.
function tentacleKm(note, fallback) {
    const hit = distancePresets.tentacle.find(t => t.note === note);
    return hit ? hit.km : fallback;
}

// Category keys are matched case-insensitively by offerDrawShortcut() in
// index.html to decide which tool a question maps to, so keep the words
// "Matching", "Measuring", "Thermometer", "Radar", "Tentacles" and "Photos".

export const questionData = {
    "1. Matching — Draw 3, Pick 1": [
        { name: "Transit", items: [
            "Nearest Commercial Airport", "Same Transit Line", "Station's Name Length",
            "Same Street or Path"
        ] },
        { name: "Administrative", items: [
            "Same 1st Division", "Same 2nd Division", "Same 3rd Division", "Same 4th Division"
        ] },
        { name: "Natural", items: [
            "Nearest Mountain", "Same Landmass", "Nearest Park"
        ] },
        { name: "Places of Interest", items: [
            "Nearest Amusement Park", "Nearest Zoo", "Nearest Aquarium",
            "Nearest Golf Course", "Nearest Museum", "Nearest Movie Theater"
        ] },
        { name: "Public Utilities", items: [
            "Nearest Hospital", "Nearest Library", "Nearest Foreign Consulate"
        ] }
    ],

    // "Compared to me, are you closer to or further from ___?"
    "2. Measuring — Draw 3, Pick 1": [
        { name: "Transit", items: [
            "Commercial Airport", "High-Speed Train Line", "Rail Station"
        ] },
        { name: "Borders", items: [
            "International Border", "1st Administrative Division Border",
            "2nd Administrative Division Border"
        ] },
        { name: "Natural", items: [
            "Sea Level", "Body of Water", "Coastline", "Mountain", "Park"
        ] },
        { name: "Places of Interest", items: [
            "Amusement Park", "Zoo", "Aquarium", "Golf Course", "Museum", "Movie Theater"
        ] },
        { name: "Public Utilities", items: [
            "Hospital", "Library", "Foreign Consulate"
        ] }
    ],

    "3. Thermometer — Draw 2, Pick 1": [
        { name: "Distances", items: distancePresets.thermometer.map(kmLabel) }
    ],

    "4. Radar — Draw 2, Pick 1": [
        { name: "Ranges", items: distancePresets.radar.map(kmLabel) }
    ],

    // "Within ___ of me, which ___ are you nearest to?"
    "5. Tentacles — Draw 4, Pick 2": [
        { name: `Medium games — ${kmLabel(tentacleKm('medium games', 2))}`, items: [
            "Museums", "Libraries", "Movie Theaters", "Hospitals"
        ] },
        { name: `Large games — ${kmLabel(tentacleKm('large games', 25))}`, items: [
            "Metro Lines", "Zoos", "Aquariums", "Amusement Parks"
        ] }
    ],

    "6. Photos — Draw 1": [
        { name: "All Games", items: [
            "A Tree (entire)", "The Sky (directly up)", "You (selfie, fully extended)",
            "Widest Street (both sides)", "Tallest Structure in Sightline",
            "Any Building Visible From Station"
        ] },
        { name: "Medium and Large", items: [
            "Tallest Building From Station", "Trace Nearest Street/Path", "Two Buildings",
            "Restaurant Interior", "Train Platform", "Park", "Supermarket Aisle",
            "Place of Worship"
        ] },
        { name: "Large", items: [
            "Strava Map", "Tallest Mountain Visible From Station",
            "Biggest Body of Water in Your Zone", "Five Buildings"
        ] }
    ]
};
