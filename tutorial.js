// tutorial.js

export const tutorialHTML = `
    <div id="tutorialModal">
        <div id="tutorialContent">
            <div id="tutorialHeader">
                <span id="tutorialTitle">Welcome to JetLagPal!</span>
            </div>
            <div id="tutorialBody">
                <div class="tut-step">
                    <div class="tut-icon">1</div>
                    <div>
                        <strong>Create or join a room.</strong>
                        On the start screen, pick a city and tap <em>Create Room</em>, or enter a
                        5-digit code to join. Tap the <strong>🔗 link</strong> button by the room
                        code to copy an invite &mdash; anyone who opens it joins instantly and sees
                        your map changes live.
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">2</div>
                    <div>
                        <strong>Map data loads itself.</strong>
                        Stations and area boundaries download automatically when you join &mdash;
                        watch the progress banner at the top. There's nothing to press. (You can
                        force a fresh download later from <em>⚙️ Settings</em>.)
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">3</div>
                    <div>
                        <strong>Set your position first.</strong>
                        Matching and measuring questions are answered <em>from where you
                        are</em> &mdash; open &#9881;&#65039; <em>Settings</em> and tap <em>Update
                        now</em>, tap the map, or paste in a "lat, lng" pair. The app then works
                        out which borough you're in, or which museum is nearest, so you never
                        have to look it up. Turn on <em>Auto-update</em> there too, and it'll
                        keep refreshing from GPS on its own.
                    </div>
                </div>
                <div class="tut-step">
                    <div class="tut-icon">4</div>
                    <div>
                        <strong>Turn answers into shapes — four tools.</strong>
                        <ul>
                            <li><strong>🎯 Radar</strong> &mdash; a circle around a point. Tap a chip for the range.</li>
                            <li><strong>🌡️ Dividing line</strong> &mdash; tap two points. <em>Thermometer</em> mode
                                keeps the half you got warmer toward; <em>Match a line</em> runs the
                                divider along a street or transit line.</li>
                            <li><strong>🗺️ Boundary match</strong> &mdash; pick a level (borough,
                                county, country, fare zone) and tap <em>Same as me?</em></li>
                            <li><strong>📍 Points of interest</strong> &mdash; <em>Matching</em>
                                ("same nearest one as me?"), <em>Measuring</em> ("closer to one than
                                me?") and <em>Tentacles</em> ("within X km of any").</li>
                        </ul>
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">5</div>
                    <div>
                        <strong>Ask, then answer.</strong>
                        A seeker can easily walk on before the hider replies, so tapping a
                        question's button doesn't draw anything straight away &mdash; it pins
                        your position and shows the question as <em>pending</em> above the tabs.
                        Ask the hider out loud, and once they actually answer, tap the matching
                        button there (Hit/Miss, Same/Different, Warmer/Colder, …) to draw it —
                        still from where you asked, however long that took. The map then shades
                        <strong style="color:#15803d;">green</strong> where the hider could still
                        be and <strong style="color:#b91c1c;">red</strong> where they're ruled
                        out; got it wrong, or need to flip it later? Its entry in the
                        <em>Layers</em> tab has the same two buttons. <strong>↩ Undo</strong> has
                        a one-tap Restore too.
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">6</div>
                    <div>
                        <strong>Tick questions off in the Ask tab.</strong>
                        Marking a question logs it for the whole team, and for Radar,
                        Thermometer and Measuring questions you get a <em>Draw it</em>
                        shortcut that jumps straight to the right tool.
                    </div>
                </div>

                <button id="closeTutBtn" onclick="closeTutorial()">Got it! Let's Hunt.</button>
            </div>
        </div>
    </div>
`;

export function setupTutorial() {
    // 1. Inject the HTML into the page if it doesn't exist
    if (!document.getElementById('tutorialModal')) {
        document.body.insertAdjacentHTML('beforeend', tutorialHTML);
    }

    // 2. Attach functions to window for global access
    window.closeTutorial = function() {
        document.getElementById('tutorialModal').style.display = 'none';
        localStorage.setItem('gm_tutorial_seen', 'true');
    };

    window.openTutorial = function() {
        document.getElementById('tutorialModal').style.display = 'block';
    };

    window.checkTutorial = function() {
        if (!localStorage.getItem('gm_tutorial_seen')) {
            document.getElementById('tutorialModal').style.display = 'block';
        }
    };

    // Auto-check on setup
    window.checkTutorial();
}
