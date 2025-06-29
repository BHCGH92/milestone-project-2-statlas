/** JSDoc comment - transformCountryData
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
        flagPng: countryData.flags?.png ?? "No flag image",
        flagAlt: countryData.flags?.alt ?? "No flag description"
    };
}

/** JSDoc comment - fetchCountryByName
 * Fetches country data by name from the API, transforms it, and returns the result.
 * @param {string} countryName - The name of the country to fetch.
 * @returns {Promise<object>} - A promise that resolves to the transformed country data.
 */

export async function fetchCountryByName(countryName) {
    /* Call API and await response */
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        /* Check if the response is ok, if not handle it and throw an error */
        if (!response.ok) {
            const errorBody = await response.json();
            const errorMessage = errorBody.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const dataArray = await response.json();

        if (!dataArray || dataArray.length === 0) {
            throw new Error(`No results for country "${countryName}"`);
        }
        /* Successful - Transform data */
        return transformCountryData(dataArray[0]);

    } catch (error) {
        /* Error section */
        console.error("Error fetching country data:", error);
        throw error;
    }
};
