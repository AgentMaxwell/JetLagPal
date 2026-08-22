// tutorial.js — the first-run walkthrough.
//
// Paged rather than one long scroll: this is the only place a new player is
// told what the app is *for*, and a wall of six steps got skimmed and closed.
// One idea per card, concept first, mechanics after.
//
// Both roles are covered in one pass (hider cards are marked as such) so a
// player who later swaps sides has already seen the other half.

const CARDS = [
    {
        icon: '🕵️',
        title: 'What this app is for',
        body: `
            <p>You're playing <strong>Jet Lag: The Game — Hide + Seek</strong>. The hider is
            somewhere in your play area, and every question you ask rules part of the map out.</p>

            <p>JetLagPal does the ruling-out for you. Record an answer and the map shades
            <strong style="color:var(--hit);">green</strong> where the hider could still be, and
            <strong style="color:var(--miss);">red</strong> where they can't possibly be.</p>

            <p>Stack up a few answers and the green shrinks from a whole city to a couple of
            streets. That green area <em>is</em> your deduction — there's nothing to work out on
            paper.</p>
        `
    },
    {
        icon: '🔗',
        title: 'Two rooms, one game',
        body: `
            <p>Pick your side on the next screen. <strong>Seekers</strong> get the full map
            toolkit. <strong>Hiders</strong> get a queue of incoming questions and what each
            answer costs.</p>

            <p>Each side runs its <strong>own room</strong>, so the hiders never see the seekers'
            working. Teammates on the same side share a room using the 5-digit code or the
            🔗 invite link next to it.</p>

            <p>To connect the two sides, one team opens <strong>⚙️ Settings → 🔗 Copy link
            invite</strong> and sends that URL over. Opening it links the rooms automatically —
            no codes to type. From then on questions and answers flow both ways.</p>
        `
    },
    {
        icon: '❓',
        title: 'Asking a question',
        badge: 'Seekers',
        body: `
            <p>Tap any question in the <strong>Ask</strong> tab. Before anything else it asks
            <em>where you're asking from</em> — your location, a tap on the map, or coordinates
            you type or paste.</p>

            <p>That's the whole point of it: every seeking question is really "…compared to
            <em>where</em>?", and the hider can't answer honestly without knowing.
            <strong>Thermometers</strong> ask for two points — where you started, then where it
            got warmer. Photo questions ask for none.</p>

            <p>The question and its coordinates go straight to the hiders. You also get a
            <strong>Draw it</strong> shortcut that jumps you to the right tool with the settings
            already filled in.</p>
        `
    },
    {
        icon: '🎯',
        title: 'Turning the answer into a shape',
        badge: 'Seekers',
        body: `
            <p>Your question waits in the bar above the tabs, pinned to where you asked — so you
            can keep walking while the hider thinks. Asking another replaces it; only one waits
            at a time.</p>

            <p>When the answer lands, tap the matching button — Hit/Miss, Same/Different,
            Warmer/Colder — and the region is drawn <strong>from where you asked</strong>,
            however long it took to come back.</p>

            <p>Four tools cover the deck:</p>
            <ul>
                <li>🎯 <strong>Radar</strong> — a circle of the range you picked.</li>
                <li>🌡️ <strong>Dividing line</strong> — <em>Thermometer</em> keeps the half you
                    got warmer toward; <em>Match a line</em> runs the divider along a street,
                    transit line or coast.</li>
                <li>🗺️ <strong>Boundary match</strong> — same borough, county, country or fare
                    zone as your point.</li>
                <li>📍 <strong>Points of interest</strong> — <em>Matching</em> ("same nearest
                    museum as me?"), <em>Measuring</em> ("closer to one than me?") and
                    <em>Tentacles</em> ("within 2km of me, which one are you nearest to?").</li>
            </ul>

            <p>Got one wrong? Any layer in the <strong>Layers</strong> tab can be flipped,
            renamed or deleted, and ↩ Undo has a one-tap Restore.</p>
        `
    },
    {
        icon: '🙈',
        title: 'Answering, as the hider',
        badge: 'Hiders',
        body: `
            <p>Your home is the <strong>Answers</strong> tab. It lists what the seekers have
            asked and — the part that matters — the exact coordinates they asked from, each with
            a ⧉ copy button. Thermometers get a <strong>Copy both points</strong> button too.</p>

            <p>Work out the honest answer, then tap <strong>HIT</strong> or <strong>MISS</strong>.
            They're told what it means and how many cards they draw, read straight off the
            question's own deck heading ("Draw 3, Pick 1").</p>

            <p>Everything you've answered stays in a history underneath, so you can see the whole
            run at a glance. The seeking tools are hidden from you — you can't see their
            deductions, and they can't see yours.</p>
        `
    },
    {
        icon: '📶',
        title: 'Out in the field',
        body: `
            <p><strong>Install it.</strong> Use your browser's install or "Add to Home Screen"
            option and it runs like a normal app, full screen.</p>

            <p><strong>It works with no signal.</strong> The map, your stations and your room all
            keep working in a tunnel or a dead zone. Anything you change syncs the moment you're
            back — and you'll be told if a teammate changed something while you were away.</p>

            <p><strong>Turn on 🔔 in Settings</strong> so questions and answers reach you with the
            app closed. Do it on each device, in the room that device is actually using.</p>
        `
    }
];

const STORAGE_KEY = 'gm_tutorial_seen_v2';

export const tutorialHTML = `
    <div id="tutorialModal">
        <div id="tutorialContent" role="dialog" aria-modal="true" aria-labelledby="tutorialTitle">
            <div id="tutorialHeader">
                <span class="tut-icon" id="tutorialIcon"></span>
                <span id="tutorialTitle"></span>
                <span class="tut-badge" id="tutorialBadge"></span>
                <button class="tut-skip" id="tutSkipBtn" title="Skip the walkthrough">Skip</button>
            </div>
            <div id="tutorialBody"></div>
            <div id="tutorialFooter">
                <button class="tut-nav" id="tutBackBtn">Back</button>
                <div id="tutDots"></div>
                <button class="tut-nav tut-next" id="tutNextBtn">Next</button>
            </div>
        </div>
    </div>
`;

export function setupTutorial() {
    // Replace rather than skip-if-present: an older build's markup left in the
    // DOM has none of the elements wired up below, and silently skipping would
    // leave the walkthrough half-dead. Re-injecting is cheap and idempotent.
    const existing = document.getElementById('tutorialModal');
    if (existing) existing.remove();
    document.body.insertAdjacentHTML('beforeend', tutorialHTML);

    const modal = document.getElementById('tutorialModal');
    const iconEl = document.getElementById('tutorialIcon');
    const titleEl = document.getElementById('tutorialTitle');
    const badgeEl = document.getElementById('tutorialBadge');
    const bodyEl = document.getElementById('tutorialBody');
    const dotsEl = document.getElementById('tutDots');
    const backBtn = document.getElementById('tutBackBtn');
    const nextBtn = document.getElementById('tutNextBtn');

    let step = 0;

    function renderStep() {
        const card = CARDS[step];
        iconEl.textContent = card.icon;
        titleEl.textContent = card.title;
        badgeEl.textContent = card.badge || '';
        badgeEl.style.display = card.badge ? '' : 'none';
        bodyEl.innerHTML = card.body;
        bodyEl.scrollTop = 0; // a long card mustn't start half-read

        backBtn.style.visibility = step === 0 ? 'hidden' : '';
        nextBtn.textContent = step === CARDS.length - 1 ? "Got it — let's play" : 'Next';

        dotsEl.innerHTML = CARDS
            .map((_, i) => `<span class="tut-dot${i === step ? ' active' : ''}"></span>`)
            .join('');
    }

    backBtn.onclick = () => { if (step > 0) { step--; renderStep(); } };
    nextBtn.onclick = () => {
        if (step < CARDS.length - 1) { step++; renderStep(); }
        else window.closeTutorial();
    };
    document.getElementById('tutSkipBtn').onclick = () => window.closeTutorial();

    // Dismissal affordances the old single-page version never had. Clicking the
    // backdrop only counts on the overlay itself, not on the card inside it.
    modal.addEventListener('click', (e) => { if (e.target === modal) window.closeTutorial(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') window.closeTutorial();
    });

    window.closeTutorial = function() {
        modal.style.display = 'none';
        localStorage.setItem(STORAGE_KEY, 'true');
    };

    // Always reopens at the beginning — someone tapping "?" mid-game wants the
    // walkthrough, not wherever they happened to leave it.
    window.openTutorial = function() {
        step = 0;
        renderStep();
        modal.style.display = 'block';
    };

    window.checkTutorial = function() {
        if (!localStorage.getItem(STORAGE_KEY)) window.openTutorial();
    };

    renderStep();
    // No checkTutorial() here — index.html calls it during start-up, and calling
    // it in both places just opened the modal twice.
}
