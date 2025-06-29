/* Import functions from our api.js and ui.js files */
import {  fetchCountryByName } from './api.js';
import { clearDisplay, displayCountry, showMessage, toggleLoader } from './ui.js';

const searchForm = document.getElementById('country-search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); /* Prevent the page from re-loading */

    const formData = new FormData(searchForm);
    const countryName = formData.get('country-search').trim();

    clearDisplay(); /* Clear previous results */
    toggleLoader(true); /* Show the loader - for slower speeds */
    // debugger;

    if(!countryName) {
        showMessage('Please enter a country name.', 'warning');
        toggleLoader(false);
        return;
    }

    try {
        const countryData = await fetchCountryByName(countryName);
        displayCountry(countryData); /* Display the country data */
    } catch (error){
        console.log("An error was caught in main.js:", error);
        const message = error.message;
        showMessage(message, 'error'); /* Display the error message */
    } finally {
        toggleLoader(false); /* Hide the loader - this always runs*/
    }

});