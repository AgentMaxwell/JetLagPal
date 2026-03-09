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
                        <strong>Sync with Friends:</strong> 
                        Enter a unique <em>Game ID</em> at the top. Anyone using the same ID will see your map changes instantly!
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">2</div>
                    <div>
                        <strong>Initialize the Map:</strong> 
                        Go to the <em>Tools</em> tab and click <strong>"Load Stations"</strong>. This fetches the specific transit data for your current city.
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">3</div>
                    <div>
                        <strong>Advanced Geofencing:</strong> 
                        Use our specialized filters to track the hider:
                        <ul>
                            <li><strong>Administrative:</strong> Match by Boroughs or Ceremonial Counties.</li>
                            <li><strong>Fare Zones:</strong> Map out London Tube or Manchester Tram zones.</li>
                            <li><strong>POI Catchment:</strong> Use Voronoi math to find the <em>nearest</em> Hospital, Park, or Museum.</li>
                        </ul>
                    </div>
                </div>

                <div class="tut-step">
                    <div class="tut-icon">4</div>
                    <div>
                        <strong>The "HIT" Logic:</strong> 
                        When you add a layer, the map turns <strong>Red</strong>. If a stop is possible, it stays <strong>Green</strong>. Use the "Clear" buttons to reset your theories!
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
