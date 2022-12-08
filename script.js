var userInput = document.querySelector('#city-search');
var eventContainerEl = document.querySelector('#event-container');
var searchCity = document.querySelector('#search-button');


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
        for(var i = 0; i < data._embedded.events.length; i++) {
            
            var lat = data._embedded.events[i]._embedded.venues[0].location.latitude;
            var lon = data._embedded.events[i]._embedded.venues[0].location.longitude;
            console.log(lat);
            console.log(lon);
            
            
        }
        // renderMap(lon,lat);
        
        var map = L.map('map').setView([lat, lon], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([lat, lon]).addTo(map);
        console.log (marker);
    });
}





// getApi(requestUrl)

//display / appendchild from search results

//Event Listener for search button
searchCity.addEventListener('click', getApi);

