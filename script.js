//your JS code here. If required.
// JavaScript code
const typeaheadInput = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');
let debounceTimeout;

// Function to fetch suggestions from the API
async function fetchSuggestions(query) {
    const response = await fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`);
    const data = await response.json();
    return data;
}

// Function to handle the typing input event
function handleInput(event) {
    const query = event.target.value.trim();

    // If the input is empty, clear suggestions and return
    if (!query) {
        suggestionsList.innerHTML = '';
        return;
    }

    // Clear any previous debounce timeout
    clearTimeout(debounceTimeout);

    // Set up a new debounce timeout to trigger the API call after 500ms
    debounceTimeout = setTimeout(async () => {
        const suggestions = await fetchSuggestions(query);

        // Clear previous suggestions
        suggestionsList.innerHTML = '';

        // Render the new suggestions
        suggestions.forEach(suggestion => {
            const listItem = document.createElement('li');
            listItem.textContent = suggestion;
            listItem.addEventListener('click', () => selectSuggestion(suggestion));
            suggestionsList.appendChild(listItem);
        });
    }, 500);
}

// Function to select a suggestion and fill the input
function selectSuggestion(suggestion) {
    typeaheadInput.value = suggestion;
    suggestionsList.innerHTML = ''; // Clear suggestions
}

// Add event listener to the input field for the typing event
typeaheadInput.addEventListener('input', handleInput);
