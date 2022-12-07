var searchInput = document.querySelector('#city-search');
var searchButton = document.querySelector('#search-button');
var eventContainer = document.querySelector('#event');
var selectOption = document.querySelector("#restaurant-select");



var buttonClickHandler = function (event) {
    event.preventDefault();

    var citySearch = searchInput.value.trim();
    var selectedRestaurant = selectOption.options[selectOption.selectedIndex].text;

    if (citySearch) {
        getEvents(citySearch);
        eventContainer.textContent = '';
        searchInput.value = '';
    } else {
        alert('Please enter a City');
    }
};

var getEvents = function (events) {
    $.ajax({
        type: "GET",
        url: "https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=StOkfSjg5F7T3VntM28nRbxZCjxQgC2m",
        async: true,
        dataType: "json",
        success: function (json) {
            console.log(json);
            // Parse the response.
            // Do other things.
        },


        error: function (xhr, status, err) {
        }
    });

}


var displayEvents = function (events) {
    // check if api returned any events
    if (events.length === 0) {
        eventContainer.textContent = 'No events found.';
        return;
    }

    // loop over events
    for (var i = 0; i < events.length; i++) {
        // format event name
        var eventName = events[i].name;

        // create container for each event
        var eventEl = document.createElement('div');
        eventEl.classList = 'card bg-light text-dark p-3 mb-2';

        // create event element to hold event name
        var nameEl = document.createElement('span');
        nameEl.textContent = eventName;

        // append to container
        eventEl.appendChild(nameEl);

        // append container to the dom
        eventContainer.appendChild(eventEl);
    }
}



function renderMap() {
    var map = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

searchButton.addEventListener('click', buttonClickHandler);

renderMap();