// Purpose: This is the main javascript file for the project
var categoryInput = document.querySelector('#event-select');
var cityInput = document.querySelector('#city-search');
var eventContainerEl = document.querySelector('#event-container');
var searchCity = document.querySelector('#search-button');

//Fetch Data from TicketMaster API
function getApi() {
    var categoryInputVal = categoryInput.value
    var cityInputVal = cityInput.value
    console.log(cityInput);
    var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city="
        + cityInputVal + "&classificationName=" + categoryInputVal + "&apikey=" + APIKEY;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        //this will display the data in the console
        .then(function (data) {
            console.log(data);
            showEvents(data);

            //this is a for loop to get the latitude and longitude of the event
            for (var i = 0; i < data._embedded.events.length; i++) {
                var lat = data._embedded.events[i]._embedded.venues[0].location.latitude;
                var lon = data._embedded.events[i]._embedded.venues[0].location.longitude;
                console.log(lat);
                console.log(lon);
            }
            //This will be the map  
            var map = L.map('map').setView([lat, lon], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);

            //This will be the marker for the map
            var marker = L.marker([lat, lon]).addTo(map)
            console.log(marker);
            marker.bindPopup("<b>Hello!</b><br>This is where the event is happening.").openPopup();

            //this will be the circle for the map
            var circle = L.circle([lat, lon], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.2,
                radius: 80
            }).addTo(map);
            console.log(circle);
        });

    // this function will display the events in the event container 
    function showEvents(json) {
        for (var i = 0; i < json.page.size; i++) {
            var event = json._embedded.events[i];
            $("#event-container").append("<p>" + event.name + "</p>" + "<a target='_blank' href='https://www.ticketmaster.com/'>" + event.dates.start.localDate + "</a>");
        }
    }
}
//Event Listener for search button
searchCity.addEventListener('click', getApi);





