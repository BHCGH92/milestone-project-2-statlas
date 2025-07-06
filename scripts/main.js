/* Import functions from our api.js and ui.js files */
import { fetchCountryByName, fetchRandomCountry, transformCountryData } from './api.js';
import { clearDisplay, displayCountry, showMessage, toggleLoader } from './ui.js';

document.addEventListener('DOMContentLoaded', () => { // Add this

const searchForm = document.getElementById('country-search-form');
const randomCountryBtn = document.getElementById('random-country-btn');

/* Initiate country search and present the data to user */
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); /* Prevent the page from re-loading */

    const formData = new FormData(searchForm);
    const countryName = formData.get('country-search').trim();

    clearDisplay(); /* Clear previous results */
    toggleLoader(true); /* Show the loader - for slower speeds */
    // debugger; - Uncomment to debug to see the loader in action

    if (!countryName) {
        showMessage('Please enter a country name.', 'warning');
        toggleLoader(false);
        return;
    }

    try {
        const countryData = await fetchCountryByName(countryName);
        displayCountry(countryData); /* Display the country data */
    } catch (error) {
        console.log("An error was caught in main.js:", error);
        const message = "There was an issue fetching the country data, check your spelling and try again.";
        showMessage(message, 'error'); /* Display the error message */
    } finally {
        toggleLoader(false); /* Hide the loader - this always runs*/
    }

});

/* Initiate ranomiser and present the data to user */
randomCountryBtn.addEventListener('click', async () => {
    clearDisplay();
    toggleLoader(true);
    try {
        const countryData = await fetchRandomCountry();
        displayCountry(countryData);
    } catch (error) {
        console.log("An error was caught in main.js while fetching a random country:", error);
        const message = "There was an issue fetching a random country. Please try again.";
        showMessage(message, 'error');
    } finally {
        toggleLoader(false);
    }
});

});