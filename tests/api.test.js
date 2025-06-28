/* Tests for api.js */

import { transformCountryData } from '../scripts/api.js';

describe('transformCountryData', () => {
    /* Test for correctly formatted data */
    it("should transform country data correctly", () => {
        const mockApiData = {
            name: {
                common: "France"
            },
            currencies: {
                EUR: {
                    name: "Euro",
                    symbol: "€"
                }
            },
            capital: [
                "Paris"
            ],
            population: 65273511,
            flags: {
                png: "https://flagcdn.com/w320/fr.png",
                alt: "The flag of France is composed of three vertical bands of blue, white and red."
            }
        };
        const result = transformCountryData(mockApiData);

        expect(result.name).toBe("France");
        expect(result.capital).toBe("Paris");
        expect(result.currencyName).toBe("Euro");
        expect(result.currencySymbol).toBe("€");
        expect(result.flagPng).toBe("https://flagcdn.com/w320/fr.png");
        expect(result.flagAlt).toBe("The flag of France is composed of three vertical bands of blue, white and red.");

    });
    /* Test for missign information */
    it("Should handle data with no capital, currency and currency symbol", () => {
        const mockCountryWithNoCapital = {
            name: {
                common: "Antarctica"
            },
            currencies: {
            },
            flags: {
            }
        };
        const result = transformCountryData(mockCountryWithNoCapital);
        expect(result.name).toBe("Antarctica");
        expect(result.capital).toBe("No capital");
        expect(result.currencyName).toBe("No currency");
        expect(result.currencySymbol).toBe("No symbol");
        expect(result.flagPng).toBe("No flag image");
        expect(result.flagAlt).toBe("No flag description");
    });
});