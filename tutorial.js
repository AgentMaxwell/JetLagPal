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
                        <strong>Turn answers into shapes — four tools.</strong>
                        <ul>
                            <li><strong>🎯 Radar</strong> &mdash; a circle around a point. Tap a chip for the range.</li>
                            <li><strong>🌡️ Dividing line</strong> &mdash; tap two points. <em>Thermometer</em> mode
                                keeps the half you got warmer toward (this also answers Measuring
                                questions); <em>Match a line</em> runs the divider along a street or
                                transit line.</li>
                            <li><strong>🗺️ Boundary match</strong> &mdash; pick a level (borough, county,
                                country, fare zone) then the area.</li>
                            <li><strong>📍 Points of interest</strong> &mdash; <em>Tentacles</em> for
                                "within X km of any", <em>Nearest one</em> for catchment areas.</li>
                        </ul>
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">4</div>
                    <div>
                        <strong>Mark HIT or MISS.</strong>
                        Every tool adds a layer to the <em>Layers</em> tab. Toggle it and the map shades
                        <strong style="color:#15803d;">green</strong> where the hider could still be
                        and <strong style="color:#b91c1c;">red</strong> where they're ruled out.
                        Got it wrong? <strong>↩ Undo</strong> has a one-tap Restore.
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">5</div>
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
