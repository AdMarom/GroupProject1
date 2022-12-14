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
    var requestUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=8&city="
    + cityInputVal + "&classificationName=" + categoryInputVal + "&apikey=" + APIKEY;
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    //this will display the data in the console
    .then(function (data) {
        console.log(data);
        showEvents(data);
        mapMarker(data._embedded.events);
        
        //this is a for loop to get the latitude and longitude of the event
        //This will be the map 
        function mapMarker(data){
            console.log(data[0]);
            var map = L.map('map').setView([data[0]._embedded.venues[0].location.latitude,data[0]._embedded.venues[0].location.longitude], 13);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            
            for (var i = 0; i < data.length; i++) {
                var lat = data[i]._embedded.venues[0].location.latitude;
                var lon = data[i]._embedded.venues[0].location.longitude;
                var marker = new L.marker([lat, lon]).addTo(map)
                console.log(marker);
                // marker.bindPopup(data[i]).openPopup();
            }
            
            //This will be the marker for the map
            //this will be the circle for the map
            var circle = L.circle([lat, lon], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.2,
                radius: 80
            }).addTo(map);
            console.log(circle);
        }
    });
  
    
    // this function will display the events in the event container 
        function showEvents(json) {
            for (var i = 0; i < json.page.size; i++) {
                var event = json._embedded.events[i];

               var container = $("#event-container").append('<div id="local-storage">' + `<p>` + event.name + "</p>" + "<a target='_blank' href='https://www.ticketmaster.com/'>" + event.dates.start.localDate + "</a>" + '<button id="save-button">Save Event</button>' + '</div>');
                var saveResults = document.querySelector('#local-storage')
            
        

        //This button will save search results to local storage
 
        $(container).on('click', '#save-button', function(){
           localStorage.setItem('event', saveResults.innerHTML);
            document.getElementById("saved-results-here").innerHTML = localStorage.event;
           
        })
    }
        }

       

        
        




          
    }
    //Event Listener for search button
    searchCity.addEventListener('click', getApi);
    