/*
* Transforms the country data from the API into a more usable format.
* @param {object} countryData - The raw country data from the API.
* @returns {object} - Transformed country data with specific fields.
*/

export function transformCountryData(countryData) {
    return {
        name: countryData.name.common,
        capital: countryData.capital ? countryData.capital[0] : "No capital",
        currencyName: countryData.currencies ? Object.values(countryData.currencies)[0].name : "No currency",
        currencySymbol: countryData.currencies ? Object.values(countryData.currencies)[0].symbol : "No symbol",
        flagsPng: countryData.flags.png,
        flagsAlt: countryData.flags.alt
    };
}
