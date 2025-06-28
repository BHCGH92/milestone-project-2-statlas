/* Tests for api.js */

import { transformCountryData } from '../scripts/api.js';

describe('transformCountryData', () => {
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
        expect(result.flagsPng).toBe("https://flagcdn.com/w320/fr.png");
        expect(result.flagsAlt).toBe("The flag of France is composed of three vertical bands of blue, white and red.");

    });
});