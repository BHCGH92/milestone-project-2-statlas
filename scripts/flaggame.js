import { fetchRandomCountry } from '../scripts/api.js';

/* Get DOM Elements */
const currentflagImg = document.getElementById('current-flag-img');
const guessSection = document.getElementById('guess-section');
const flagGameLoader = document.getElementById('country-loader');
const flagLoaderText = document.getElementById('country-loader-text');
const playButton = document.getElementById('play-game-btn');
const submitGuessButton = document.getElementById('submit-guess-btn');
const countryGuessInput = document.getElementById('country-guess-input');
const gameMessageDiv = document.getElementById('game-message');
const currentScore = document.getElementById('current-score');

let currentCountry = null;
let score = 0;

/** JSDoc comment - function toggleFlagGameLoader
 * Shows/hides the flag game loader.
 * @param {boolean} visible - If true, shows the loader; otherwise hides it.
 */
function toggleFlagGameLoader(visible) {
    if (flagGameLoader) {
        if (visible) {
            flagGameLoader.classList.remove('d-none');
            flagLoaderText.classList.remove('d-none');
        } else {
            flagGameLoader.classList.add('d-none');
            flagLoaderText.classList.add('d-none');
        }
    } else {
        console.warn("Flag loader element (country-loader) not found!");
    }
};

/** JSDOc comment - function displayFlag
 * Display the flag image in the img element.
 * @param {string} flagPng - The URL of the flag image to display.
 * @param {string} flatAlt - The alt text for the flag image.
 */
function displayFlag(flagPng, flagAlt) {
    currentflagImg.src = flagPng;
    currentflagImg.alt = flagAlt;
    currentflagImg.classList.remove('d-none');
};

/**
 * clears the game area (input, message area etc.)
 */
function clearGameDisplay() {
    gameMessageDiv.innerHTML = '';
    countryGuessInput.value = '';
    /* Removes bootstrap validation styling */
    countryGuessInput.classList.remove('is-invalid', 'is-valid');
};

/** JSDOC comment - function toggleGameControls
 * Toggles the visibility and enabled/disabled state of the guess input and submit button.
 * @param {boolean} enable- If true, shows the guess input and submit button; otherwise hides them.
 */
function toggleGameControls(enable) {
    if (enable) {
        guessSection.classList.remove('d-none');
        countryGuessInput.removeAttribute('disabled');
        submitGuessButton.removeAttribute('disabled');
    } else {
        guessSection.classList.add('d-none');
        countryGuessInput.setAttribute('disabled', 'true');
        submitGuessButton.setAttribute('disabled', 'true');
    }
};

/**
 * upadate the score the score
 */
function updateScoreDisplay() {
    currentScore.textContent = score;
};

/** JSDOC comment - function showMessage
 * Displays a message in the game message area.
 * @param {string} message - The message to display.
 * @param {string} type - The type of message.
 */
function showMessage(message, type = "info") {
    const alertClass = {
        'success': 'alert-success',
        'error': 'alert-danger',
        'info': 'alert-info',
        'warning': 'alert-warning'
    }[type] || 'alert-info'; /* Default to info */

    const messageHtml = `
    <div class="row justify-content-center mt-3">
            <div class="col-md-10">
                <div class="alert ${alertClass}" role="alert">
                    ${message}
                </div>
            </div>
        </div>`;
    gameMessageDiv.innerHTML = messageHtml;
}

/** GAME LOGIC FUNCTIONS */

/**
 * Initiate new game
 * Clears relevant sections, fetches a flag and prepares the game for play.
 */
async function startNewRound() {
    clearGameDisplay();
    toggleGameControls(false);
    toggleFlagGameLoader(true);

    currentflagImg.classList.add('d-none');

    try {
        const countryData = await fetchRandomCountry();
        currentCountry = countryData;
        /* escapeRegex helps clean country names with special characters so I can remove the flag name from alt text */
        function escapeRegex(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        const escapedCountryName = escapeRegex(currentCountry.name);

        const regex = new RegExp(`\\b${escapedCountryName}\\b`, 'gi');
        const cleanFlagAlt = countryData.flagAlt.replace(regex, '??'); // Remove country name from alt text
        /* Pass cleaned alt text through to prevent cheating and more accessbility for screen reader players */
        displayFlag(countryData.flagPng, cleanFlagAlt);
        toggleGameControls(true);
        countryGuessInput.focus();
        showMessage(`Guess the country for the flag shown!`, 'info');

    } catch (error) {
        console.error('Error fetching country data:', error);
        showMessage('Failed to load flag. Please try again later.', 'error');
        toggleGameControls(false);
    } finally {
        toggleFlagGameLoader(false);
    }
};

/**
 * Check the users guess against the current country
 */

function checkGuess() {
    /* Prevent guess if no flag is shown. */
    if (!currentCountry) {
        showMessage('No flag to guess. Please start a new game.', 'warning');
        return;
    }

    const userGuess = countryGuessInput.value.trim();
    if (!userGuess) {
        showMessage('Please enter a guess.', 'warning');
        countryGuessInput.classList.add('is-invalid');
        return;
    }

    const correctName = currentCountry.name.toLowerCase();
    const guessedName = userGuess.toLowerCase();

    if (guessedName === correctName) {
        score++;
        updateScoreDisplay();
        showMessage(`Correct! The country is ${currentCountry.name}.`, 'success');
        countryGuessInput.classList.remove('is-invalid');
        countryGuessInput.classList.add('is-valid');
        toggleGameControls(false);
        playButton.textContent = 'Play next flag!'
    } else {
        score = Math.max(0, score - 1);  /* Ensure score doesn't go below 0 */
        updateScoreDisplay();
        showMessage(`Incorrect! The correct answer was ${currentCountry.name}.`, 'error');
        countryGuessInput.classList.remove('is-valid');
        countryGuessInput.classList.add('is-invalid');
        toggleGameControls(false);
        playButton.textContent = "Try Another Flag";
    }

};

/** EVENT LISTENERS */

playButton.addEventListener('click', startNewRound);

submitGuessButton.addEventListener('click', checkGuess);

countryGuessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  /* Prevent form submission */
        submitGuessButton.click();  /* Trigger the guess submission */
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateScoreDisplay();
    toggleGameControls(false);
    toggleFlagGameLoader(false);
    currentflagImg.classList.add('d-none');
});