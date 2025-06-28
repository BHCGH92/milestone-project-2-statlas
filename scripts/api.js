/*
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
