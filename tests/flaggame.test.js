/**
 * @jest-environment jsdom
 */

/* Tests for game initial game state to be correct (0 score etc) */
describe('Flag Game Initial State', () => {
    /*Select relevant ids of the html that needs to be tested */
    const mockFlagGamHTML =
        `<div id="flaggameflagimage" class="text-center">
            <img id="current-flag-img" src="" alt="Country Flag" class="img-fluid mb-3 mt-3 d-none">
            <div id="flag-loader" class="loader d-none"></div>
        </div>
        <div class="flag-game-controls text-center">
            <button id="play-game-btn" class="btn btn-primary mt-3">Play Game</button>
            <div id="guess-section" class="mt-3 d-none">
                <input type="text" id="country-guess-input" class="form-control mb-2" placeholder="Guess the country name">
                <button id="submit-guess-btn" class="btn btn-success">Submit Guess</button>
            </div>
            <div id="game-message" class="mt-3"></div>
            <div class="score-display mt-3">
                <h3>Score: <span id="current-score">0</span></h3>
            </div>
        </div>
    `;

    beforeEach(() => {
        // Set up the HTML structure for the flag game
        document.body.innerHTML = mockFlagGamHTML;
    }); 

    it("should have intial score of 0 and sections hidden until game starts", () => {
        const currentScore = document.getElementById('current-score');
        const flagImage = document.getElementById('current-flag-img');
        const guessSection = document.getElementById('guess-section');
        const flagLoader = document.getElementById('flag-loader');

        expect(currentScore.textContent).toBe('0');
        expect(flagImage.classList.contains('d-none')).toBe(true);
        expect(guessSection.classList.contains('d-none')).toBe(true);
        expect(flagLoader.classList.contains('d-none')).toBe(true);
    });
});