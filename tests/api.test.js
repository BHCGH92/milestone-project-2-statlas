/* Tests for api.js */

import {
    transformCountryData,
    fetchCountryByName,
    fetchCountryList,
    getRandomCountry
} from '../scripts/api.js';

beforeEach(() => {
    fetch.resetMocks(); // Use resetMocks() provided by jest-fetch-mock
});

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

describe('fetchCountryByName', () => {
    it("should fetch country data, transform it and return it all successfully", async () => {
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
        fetch.mockResponseOnce(JSON.stringify([mockApiData]));
        const result = await fetchCountryByName('France');
        expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/France');
        expect(result.name).toBe('France');
        expect(result.capital).toBe('Paris');
    });
    it("should throw an error if the country is not found", async () => {
        const mockError = { message: "Not Found." };
        fetch.mockResponseOnce(JSON.stringify(mockError), { status: 404 });
        await expect(fetchCountryByName('UnknownCountry')).rejects.toThrow("Not Found.");
    });
});

describe('fetchCountryList', () => {
    it("should fetch a list of countries", async () => {
        const mockApiData = [
            { name: { common: "France" } },
            { name: { common: "Germany" } }
        ];
        fetch.mockResponseOnce(JSON.stringify(mockApiData));
        const result = await fetchCountryList();
        expect(fetch).toHaveBeenCalledWith('https://restcountries.com/v3.1/all?fields=name');
        expect(result).toEqual(["France", "Germany"]);
    });

    it("should throw an error if the fetch fails", async () => {
        fetch.mockRejectOnce(new Error("Network failure"));
        await expect(fetchCountryList()).rejects.toThrow("Network failure");
    });
});

describe('getRandomCountry', () => {
    it('should return a single country name from the provided list', () => {
        const mockCountryList = ["France", "Germany", "Spain"];
        const result = getRandomCountry(mockCountryList);
        expect(mockCountryList).toContain(result);
        expect(typeof result).toBe('string');
    });
    it('should return undefined when given an empty array', () => {
        const mockCountryList = [];
        const result = getRandomCountry(mockCountryList);
        expect(result).toBeUndefined();
    });

    it('should return undefined when given null or undefined', () => {
        expect(getRandomCountry(null)).toBeUndefined();
        expect(getRandomCountry(undefined)).toBeUndefined();
    });
});