const apiEndpoint = 'https://script.google.com/macros/s/AKfycbwkkdCrzf2Yanbmz8ByNtXmSzs8kDR-7PeUvNkqY7fTL3OYWctj0KHlFk22mWn1wcA/exec';

const goButton = document.getElementById('go');
const display = document.getElementById('display');
const loader = document.getElementById('loader');
const resourceSelect = document.getElementById('resources');
const styleSelect = document.getElementById('style');

// Fetch data from Google Sheets API
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Filter and display data based on user selection
function filterAndDisplayData(url) {
    display.style.display = 'none';
    loader.style.display = 'inline-block';
    fetchData(url)
        .then((payload) => {
            const selectedResource = Array.from(resourceSelect.selectedOptions, (option) => option.value);
            const selectedStyle = Array.from(styleSelect.selectedOptions, (option) => option.value);
            
            const filteredData = payload.filter((object) => {
                return selectedResource.includes(object.resource) && selectedStyle.includes(object.style);
            });

            let counter = 1;
            let dataDisplay = filteredData
                .map((object) => {
                    return `
                        <div class="citation-lookup">
                            <h2>Template</h2>
                            <p class="citation">${object.template}</p>
                            <h2>Example</h2>
                            <p class="citation">${object.example}</p>
                            <h2>In Text Citation</h2>
                            <p>${object.intext}</p>
                            <p class="learn-more"><a href="${object.link}" target="_blank">Learn more about ${selectedStyle} format</a></p>
                        </div>
                    `;
                })
                .join('');
            loader.style.display = 'none';
            display.style.display = "block";
            display.innerHTML = dataDisplay;
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}

// Attach event listener to the "Go" button
goButton.addEventListener('click', function () {
    filterAndDisplayData(apiEndpoint);
});
