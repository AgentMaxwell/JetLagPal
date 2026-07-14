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
                        <strong>Add constraints from the Tools tab.</strong>
                        Turn the seeker's answers into shapes:
                        <ul>
                            <li><strong>Radar</strong> &mdash; a radius circle (tap a quick chip for the range).</li>
                            <li><strong>Line Split / Bisect / Thermometer</strong> &mdash; tap two points on the map.</li>
                            <li><strong>Borough / County / Fare Zone / POI</strong> &mdash; pick from the lists.</li>
                        </ul>
                        Each one becomes a layer.
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">4</div>
                    <div>
                        <strong>Mark HIT or MISS.</strong>
                        In the <em>Layers</em> tab, toggle each layer. The map shades
                        <strong style="color:#2e7d32;">green</strong> where the hider could still be
                        and <strong style="color:#c62828;">red</strong> where they're ruled out.
                        Use <strong>↩ Undo</strong> (with one-tap Restore) or <em>Clear</em> to reset.
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
