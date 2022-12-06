
var searchTheCity = document.querySelector('#citySearch');
var searchButton = document.querySelector('#button');
var eventContainer = document.querySelector('#event');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var citySearch = searchTheCity.value.trim();
  
    if (citySearch) {
      getEvents(citySearch);
  
      eventContainer.textContent = '';
      searchTheCity.value = '';
    } else {
      alert('Please enter a City');
    }
  };

  var getEvents = function (events) {

  }

    $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?size=100&apikey=StOkfSjg5F7T3VntM28nRbxZCjxQgC2m",
    async:true,
    dataType: "json",
    success: function(json) {
                console.log(json);
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
  });

