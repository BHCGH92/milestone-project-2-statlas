/** JSDoc comment - transformCountryData
* Transforms the country data from the API into a more usable format.
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
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dataArray = await response.json();

        if (!dataArray || dataArray.length === 0) {
            throw new Error(`No results for country "${countryName}"`);
        }

        return transformCountryData(dataArray[0]);
        
    } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
    }
};
