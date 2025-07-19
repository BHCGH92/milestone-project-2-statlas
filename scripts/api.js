/** JSDoc comment - function transformCountryData
* Transforms the country data from the Restcountries API into a more usable format.
* @param {object} countryData - The raw country data from the API.
* @returns {object} - Transformed country data with specific fields.
*/

export function transformCountryData(countryData) {
    return {
        name: countryData.name.common,
        capital: countryData.capital?.[0] ?? "No capital",
        currencyName: Object.values(countryData.currencies ?? {})[0]?.name ?? "No currency",
        currencySymbol: Object.values(countryData.currencies ?? {})[0]?.symbol ?? "No symbol",
        languages: Object.values(countryData.languages ?? {}).join(", ") || "No languages",
        population: countryData.population ?? "N/A",
        flagPng: countryData.flags?.png ?? "No flag image",
        flagAlt: countryData.flags?.alt ?? "No flag description"
    };
}

/** JSDoc comment - function fetchCountryByName
 * Fetches country data by name from the API, transforms it, 
 * and returns the result.
 * @param {string} countryName - The name of the country to fetch.
 * @returns {Promise<object>} - A promise that resolves to the 
 * transformed country data.
 */

export async function fetchCountryByName(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message ||
             `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const dataArray = await response.json();

        return transformCountryData(dataArray[0]);

    } catch (error) {
        console.error("Error fetching country data:", error);
        throw error;
    }
}

/** JSDoc comment - function fetchCountryByNameExact
 * Fetches country data by name from the API, transforms it, 
 * and returns the result exact matches only for home page search.
 * @param {string} countryName - The name of the country to fetch.
 * @returns {Promise<object>} - A promise that resolves to the transformed country data.
 */

export async function fetchCountryByNameExact(countryName) {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const dataArray = await response.json();

        return transformCountryData(dataArray[0]);

    } catch (error) {
        console.error("Error fetching country data:", error);
        throw error;
    }
}

/** JSDoc comment - function fetchCountryList
 * Call the api to fetch a list of countries
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of country names.
 */

export async function fetchCountryList() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');

        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const dataArray = await response.json();
        const countryNames = dataArray.map((country) => country.name.common);
        return countryNames.sort();

    } catch (error) {
        console.error("Error fetching country list:", error);
        throw error;
    }
}

/** JSDoc comment - function getRandomCountry
 * Takes a sorted array of country names and chooses one at random
 * @param {array<string>} countryNames - Sorted array of country names
 * @returns {string | undefined} - A random country name from the list,
 *  or undefined if the array is empty.
 */

export function getRandomCountry(countryNames) {
    if (!countryNames || countryNames.length === 0) {
    console.warn("getRandomCountry was called with an empty array.");
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * countryNames.length);
  return countryNames[randomIndex];
}

/** 
 * Executes the full process for getting a random country's details.
 * It fetches the list, picks a random name, then fetches that country's data.
 * @returns {Promise<object>} A promise that resolves to the 
 * transformed data of a random country.
 */

export async function fetchRandomCountry() {
    try {
        const countryNames = await fetchCountryList();
        const randomName = getRandomCountry(countryNames);
        const countryData = await fetchCountryByName(randomName);
        return countryData;
    } catch (error) {
        console.error("The process to fetch random country data failed in api.js:", error);
        throw error;
    }
}