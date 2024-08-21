const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
// Function to populate the dropdown menus with currencies from codes.js
function populateDropdowns() {
  // Loop through the currency codes in the countryList object
  for (let currencyCode in countryList) {
    let fromOption = document.createElement("option");
    let toOption = document.createElement("option");

    // Set the option value and text to the currency code
    fromOption.value = currencyCode.toLowerCase();
    fromOption.innerText = currencyCode;
    toOption.value = currencyCode.toLowerCase();
    toOption.innerText = currencyCode;

    // Append the options to the "from" and "to" dropdowns
    fromSelect.appendChild(fromOption);
    toSelect.appendChild(toOption);
  }

  // Set default selections
  fromSelect.value = "usd"; // Default "from" currency
  toSelect.value = "inr"; // Default "to" currency

  // Update the flag images for the default selections
  updateFlag(fromSelect);
  updateFlag(toSelect);
}

// Function to update the flag based on the selected currency
function updateFlag(selectElement) {
  let currencyCode = selectElement.value.toUpperCase(); // Get the selected currency code and convert to uppercase
  let countryCode = countryList[currencyCode]; // Get the corresponding country code from the countryList
  let flagImg = selectElement.parentElement.querySelector("img"); // Find the <img> element within the same container
  flagImg.src = `https://flagsapi.com/${countryCode}/flat/64.png`; // Update the flag image URL based on the country code
}

// Function to fetch and display the exchange rate
async function updateExchangeRate(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way

  const fromCurrency = fromSelect.value; // Get the selected "from" currency
  const toCurrency = toSelect.value; // Get the selected "to" currency
  const amount = document.querySelector(".amount input").value; // Get the entered amount

  try {
    // Fetch the exchange rate data from the API
    const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${fromCurrency}.json`);
    const data = await response.json();

    // Extract the exchange rate for the target currency
    const rate = data[fromCurrency][toCurrency];

    if (rate) {
      // Calculate the converted amount
      const convertedAmount = amount * rate;

      // Update the UI with the conversion result
      document.querySelector(".msg").innerText = `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount.toFixed(2)} ${toCurrency.toUpperCase()}`;
    } else {
      // Handle case where the exchange rate is not found
      document.querySelector(".msg").innerText = `Exchange rate for ${toCurrency.toUpperCase()} not found.`;
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("Error:", error);
    document.querySelector(".msg").innerText = "Failed to fetch conversion rate.";
  }
}

// Attach the updateExchangeRate function to the form submit event
document.querySelector("#currency-form").addEventListener("submit", updateExchangeRate);

// Populate the dropdowns when the page loads
window.addEventListener("load", populateDropdowns);

// Attach the updateFlag function to the "from" dropdown change event
document.querySelector(".from select").addEventListener("change", function() {
  updateFlag(this);
});

// Attach the updateFlag function to the "to" dropdown change event
document.querySelector(".to select").addEventListener("change", function() {
  updateFlag(this);
});
