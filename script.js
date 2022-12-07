var userInput = document.querySelector('#city-search');
var eventContainerEl = document.querySelector('#event-container');
var searchCity = document.querySelector('#search-button');

function renderMap() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

renderMap();

//Fetch Data from TicketMaster API
function getApi () {
  var userInputVal = userInput.value
  console.log(userInput);
  var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + userInputVal + "&apikey="+ APIKEY;
fetch(requestUrl)

  .then(function (response) {
    return response.json();
  })
  .then(function(data){
    console.log(data);
    
  });
}

// getApi(requestUrl)

//display / appendchild from search results

//Event Listener for search button
searchCity.addEventListener('click', getApi);

