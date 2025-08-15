
// Getting references to HTML elements
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");
const resultsDiv = document.getElementById("results");

// Event listener for Search button click
searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim(); // Remove extra spaces
    if (query) {
        searchWikipedia(query); // Call function to search
    } else {
        alert("Please enter a search term!");
    }
});

/**
 * Search Wikipedia using the MediaWiki API
 * @param {string} query - The search term entered by the user
 */
function searchWikipedia(query) {
    // Wikipedia Search API endpoint (returns JSON)
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`;

    // Fetch request to get search results
    fetch(apiUrl)
        .then(response => response.json()) 
        .then(data => {
            displayResults(data.query.search); // Show results on the page
        })
        .catch(error => {
            console.error("Error fetching Wikipedia data:", error);
            resultsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
        });
}

/**
 * Display the search results on the page
 * @param {Array} results - Array of search results from Wikipedia
 */
function displayResults(results) {
    resultsDiv.innerHTML = ""; // Clear old results

    if (results.length === 0) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
    }

    // Loop through each result and create HTML elements
    results.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        // Wikipedia page URL using the pageid
        const pageUrl = `https://en.wikipedia.org/?curid=${item.pageid}`;

        // Fill in result HTML
        resultItem.innerHTML = `
            <h3><a href="${pageUrl}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}...</p>
        `;

        // Add result to results container
        resultsDiv.appendChild(resultItem);
    });
}
