// tutorial.js

export const tutorialHTML = `
    <div id="tutorialModal">
        <div id="tutorialContent">
            <div id="tutorialHeader">
                <span id="tutorialTitle">Welcome to JetLagPal!</span>
            </div>
            <div id="tutorialBody">
                <div class="tut-step">
                    <div class="tut-icon">1.</div>
                    <div><strong>Multiplayer Rooms:</strong> Enter a Game ID at the top to sync maps with friends in real-time!</div>
                </div>
                <div class="tut-step">
                    <div class="tut-icon">2.</div>
                    <div><strong>Load Data:</strong> Click the "Load Stations" button in the Tools tab to load the map data.</div>
                </div>
                <div class="tut-step">
                    <div class="tut-icon">3.</div>
                    <div><strong>Use the Tools:</strong> Choose from Radius, Lines, Boroughs or zones to mark where the hider can and can't be!</div>
                </div>
                <button id="closeTutBtn" onclick="closeTutorial()">Got it! Let's Go.</button>
            </div>
        </div>
    </div>
`;

export function setupTutorial() {
    // 1. Inject the HTML into the page
    document.body.insertAdjacentHTML('beforeend', tutorialHTML);

    // 2. Attach the functions to the global window object so your buttons can find them
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
}