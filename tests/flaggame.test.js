/**
 * @jest-environment jsdom
 */

describe('Score checks', () => {
    /*Select relevant ids of the html that needs to be tested */
    const mockFlagGamHTML =
        `<div id="flaggameflagimage" class="text-center">
            <img id="current-flag-img" src="" alt="Country Flag" class="img-fluid mb-3 mt-3 d-none">
            <div id="country-loader" class="loader d-none"></div>
        </div>
            <div id="country-loader-text" class="text-light text-center mt-3 d-none">
               <p>Loading country data...</p>
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

    let flagGameModule;

    jest.mock('../scripts/api.js', () => ({
        fetchRandomCountry: jest.fn(() => Promise.resolve({
            name: 'France',
            flagPng: 'france.png',
            flagAlt: 'Flag of France'
        })),
    }));

    beforeEach(async () => {
        // Set up the HTML structure for the flag game
        document.body.innerHTML = mockFlagGamHTML;
        jest.resetModules();

        flagGameModule = await import('../scripts/flaggame.js');

        if (flagGameModule.resetGameForTesting) {
            flagGameModule.resetGameForTesting();
        }

        document.dispatchEvent(new Event('DOMContentLoaded'));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should have intial score of 0 and sections hidden until game starts", () => {
        const currentScore = document.getElementById('current-score');
        const flagImage = document.getElementById('current-flag-img');
        const guessSection = document.getElementById('guess-section');
        const flagLoader = document.getElementById('country-loader');

        expect(currentScore.textContent).toBe('0');
        expect(flagImage.classList.contains('d-none')).toBe(true);
        expect(guessSection.classList.contains('d-none')).toBe(true);
        expect(flagLoader.classList.contains('d-none')).toBe(true);
    });

    /* Incremenet score for correct answer  */
    it("should increment the score when the correct guess is made", async () => {

        const currentScore = document.getElementById('current-score');
        const playButton = document.getElementById('play-game-btn');
        const submitGuessButton = document.getElementById('submit-guess-btn');
        const countryGuessInput = document.getElementById('country-guess-input');

        playButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        countryGuessInput.value = 'France';

        submitGuessButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(currentScore.textContent).toBe('1');

    });

    /* Score does not increase when giving an incorrect answer */
    it("should not increment score when incorrect answer is given", async () => {

        const currentScore = document.getElementById('current-score');
        const submitGuessButton = document.getElementById('submit-guess-btn');
        const countryGuessInput = document.getElementById('country-guess-input');
        const playButton = document.getElementById('play-game-btn');

        playButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        countryGuessInput.value = 'Germany';

        submitGuessButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(currentScore.textContent).toBe('0');

    });

    /* Score decreases correctly on a wrong answer */
    it("Score greater than 0 should decrement by 1 with an incorrect answer", async () => {

        const currentScore = document.getElementById('current-score');
        const submitGuessButton = document.getElementById('submit-guess-btn');
        const countryGuessInput = document.getElementById('country-guess-input');
        const playButton = document.getElementById('play-game-btn');

        for (let i = 0; i < 3; i++) {
            playButton.click();
            await new Promise(resolve => setTimeout(resolve, 0));

            countryGuessInput.value = 'France';

            submitGuessButton.click();
            await new Promise(resolve => setTimeout(resolve, 0));
        }

        expect(currentScore.textContent).toBe('3');

        playButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        countryGuessInput.value = 'Germany';

        submitGuessButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(currentScore.textContent).toBe('2');

    });
    /* Score doesn't go below 0 */
    it("Score does not go below 0", async () => {

        const currentScore = document.getElementById('current-score');
        const submitGuessButton = document.getElementById('submit-guess-btn');
        const countryGuessInput = document.getElementById('country-guess-input');
        const playButton = document.getElementById('play-game-btn');

        expect(currentScore.textContent).toBe('0');

        playButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        countryGuessInput.value = 'Germany';

        submitGuessButton.click();
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(currentScore.textContent).toBe('0');

    });
});