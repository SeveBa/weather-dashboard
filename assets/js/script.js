// var currentUrl = api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial;
// var apiKey = "&appid=feae67b17a7db2b1dc50bc7b73015b2c&units=imperial";
// var forecastUrl = "api.openweathermap.org/data/2.5/forecast?q=";
// var long = "";
// var lat = "";
// var uvUrl =
//   "https://api.openweathermap.org/data/2.5/onecall?lat=" +
//   lat +
//   "&lon=" +
//   long +
//   apiKey;

var form = document.querySelector("#city-name-form")
var input = document.querySelector("#city-name-input")
var h2 = document.querySelector("#city-header")
var cityName = "Austin"
var apiKey = "feae67b17a7db2b1dc50bc7b73015b2c"

// Grab city name from input and create an event listener for the search button

function returnCityInfo(event){ 
  event.preventDefault()
cityName = input.value 
console.log(cityName) 
input.value = ""

getCurrentWeather()
}

function getCurrentWeather(){ 
  
  // var currentUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      renderCurrentWeather(data)
      
    });
}

function renderCurrentWeather(data){
  console.log(data);
  h2.textContent = data.name
} 

form.addEventListener("submit", returnCityInfo);

//   GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


// fetch(
//   `https://api.openweathermap.org/data/2.5/weather?q=Austin&appid=feae67b17a7db2b1dc50bc7b73015b2c&units=imperial`
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(data) {
//     console.log(data);
//   });