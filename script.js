var userInput = document.querySelector('#city-search');
var eventContainerEl = document.querySelector('#event-container');
var searchCity = document.querySelector('#search-button');

//function for user input


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
