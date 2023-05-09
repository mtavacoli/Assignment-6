$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    $("#search-value").val("");
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
  });

  $("#search-button").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13) {
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    }
  });

  var history = JSON.parse(localStorage.getItem("history")) || [];

  if (history.length > 0) {
    weatherFunction(history[history.length - 1]);
  }
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

  function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
  }

  $(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
  });
});
function weatherFunction(searchTerm) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=1a2eed41952ccceeacd1c0c803f76b31`
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (weatherData) {
      console.log(weatherData);
    });
}

function weatherForecast(searchTerm) {
  fetch(
    "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=1a2eed41952ccceeacd1c0c803f76b31"
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (weatherData) {
      console.log(weatherData);
    });
}
