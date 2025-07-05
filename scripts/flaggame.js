import { fetchRandomCountry } from '../scripts/api.js';

/* Get DOM Elements */
const currentflagImg = document.getElementById('current-flag-img');
const guessSection = document.getElementById('guess-section');
const flagGameLoader = document.getElementById('flag-loader');
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
    flagGameLoader.style.display = visible ? 'block' : 'none';
    currentflagImg.classList.toggle('d-none', visible);
};

/** JSDOc comment - function displayFlag
 * Display the flag image in the img element.
 * @param {string} flagPng - The URL of the flag image to display.
 * @param {string} flatAlt - The alt text for the flag image.
 */
function displayFlag(flagPng, flagAlt) {
    current.FlagImg.src = flagPng;
    currentFlagImg.alt = flagAlt;
    currentFlagImg.classList.remove('d-none');
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