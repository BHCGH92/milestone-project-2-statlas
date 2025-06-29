/* Get the div id's where the information will be shown */
const countryDisplay = document.getElementById("#countryDisplay");
const errorHandle = document.getElementById("#errorHandle");
const loader = document.getElementById("loader");


/* Clear down the display before presenting a new one */
export function clearDisplay() {
    countryDisplay.innerHTML = "";
    errorHandle.innerHTML = "";
}

/** JSDoc comment - function toggleLoader
 * Show / Hide the loader
 * @param {boolean} visible - true to show the loader, false to hide it
 */
export function toggleLoader(visible) {
    loader.style.display = visible ? "flex" : "none";
}

/** JSDoc comment - function showMessage
 * Display error/warning messages in the errorHandle div
 * @param {string} message - The message to display
 * @param {boolean} type - Type of message for styling
 */
export function showMessage(message, type = "error") {
    /* Ternary Operator to decide on what class */
    const alertClass = type === "error" ? "alert-danger" : "alert-warning";
    const messageHtml = `
      <div class="row justify-content-center mt-3">
          <div class="col-md-8">
              <div class="alert ${alertClass}" role="alert">
                  ${message}
              </div>
          </div>
      </div>`;

      errorHandleContainer.innerHTML = messageHtml;
};

/** JSDoc comment - function displayCountry
 * Renders the country data in the countryDisplay div
 * @param {Object} countryData - The country data to display
 */
export function displayCountry(countryData) {
    const countryHtml = `
    <div class="row justify-content-center mt-3">
          <div class="col-md-8">
              <div class="country-wrapper">
                  <h2>${country.name}</h2>
                  <div class="country-display-card">
                      <div>
                          <img src="${country.flagPng}" alt="${country.flagAlt}" class="img-fluid mb-3 mt-3">
                      </div>
                      <div class="country-info-wrapper">
                          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                          <p><strong>Currency:</strong> ${country.currencyName} (${country.currencySymbol})</p>
                          <p><strong>Capital City:</strong> ${country.capital}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
      countryDisplayContainer.innerHTML = countryHtml;
};  