// var currentUrl = api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial;
// var apiKey = "1113d052c8b10c2850e5325a254b7ebe&units=imperial";
// var forecastUrl = "api.openweathermap.org/data/2.5/forecast?q=";
// var long = "";
// var lat = "";



var form = document.querySelector("#city-name-form");
var input = document.querySelector("#city-name-input");
var h2 = document.querySelector("#city-header");
var apiKey = "1113d052c8b10c2850e5325a254b7ebe";

// Grab city name from input and create an event listener for the search button

function returnCityInfo(event) {
  event.preventDefault();
  cityName = input.value;
  console.log(cityName);
  input.value = "";

  getCurrentWeather();
}

function getCurrentWeather() {
  // var currentUrl = `api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCurrentWeather(data);
      renderFiveDayForecast(data);
    });
}

function renderCurrentWeather(data) {
  var cityHeader = document.querySelector("#city-header");
  var cityTemp = document.querySelector("#city-temp");
  var cityWind = document.querySelector("#city-wind");
  var cityHumidity = document.querySelector("#city-humidity");
  var uvInfo = document.querySelector("#uvInfo");
  
  cityTemp.textContent = "Temp: " + data.main.temp + "F";
  cityWind.textContent = "Wind: " + data.wind.speed + " MPH";
  cityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
  console.log(data);
  cityHeader.textContent =
    data.name + " - " + moment().format("MMMM Do YYYY");

  fetch(
    "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      data.coord.lat +
      "&lon=" +
      data.coord.lon +
      "&appid=" + 
      apiKey
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      uvInfo.textContent = "UV Index: " + data.value;
    if (data.value < 2) {
      uvInfo.classList.add("favorable");
    } else if (data.value > 2 && data.value < 8) {
      uvInfo.classList.add("moderate");
    } else {
      uvInfo.classList.add("severe");
    }
    });
}

function renderFiveDayForecast(data){
fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${data.name}&appid=${apiKey}&units=imperial` 
)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  for (let i = 1; i < 6; i ++){
    let divId= $("div#" + i)
    divId.children()[0].innerHTML = data.list[i * 8 - 1].dt_txt.split(" ")[0];
    console.log("forecast", data)
    divId.children()[1].setAttribute("src", `https://openweathermap.org/img/w/${data.list[i * 8 - 1].weather[0].icon}.png`); 
    divId.children()[2].innerHTML = "Temp: " + data.list[i * 8 - 1].main.temp;
    divId.children()[3].innerHTML = "Wind: " + data.list[i * 8 - 1].wind.speed + " MPH";
    divId.children()[4].innerHTML = "Humidity: " + data.list[i * 8 - 1].main.humidity;
  }
  
});
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


