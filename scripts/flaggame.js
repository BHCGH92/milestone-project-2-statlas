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


