$(document).ready(function () {
  //search button feature
  $("#search-button").on("click", function () {
    //get value in input search-value.
    var searchTerm = $("#search-value").val();
    //empty input field.
    $("#search-value").val("");
    weatherFunction(searchTerm);
    weatherForecast(searchTerm);
  });

  //search button enter key feature.
  $("#search-button").keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode === 13) {
      weatherFunction(searchTerm);
      weatherForecast(searchTerm);
    }
  });

  //pull previous searches from local storage
  var history = JSON.parse(localStorage.getItem("history")) || [];

  //sets history array search to correct length
  if (history.length > 0) {
    weatherFunction(history[history.length - 1]);
  }
  //makes a row for each element in history array(searchTerms)
  for (var i = 0; i < history.length; i++) {
    createRow(history[i]);
  }

  //puts the searched cities underneath the previous searched city
  function createRow(text) {
    var listItem = $("<li>").addClass("list-group-item").text(text);
    $(".history").append(listItem);
  }

  //listener for list item on click function
  $(".history").on("click", "li", function () {
    weatherFunction($(this).text());
    weatherForecast($(this).text());
  });
});
function weatherFunction(searchTerm) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=2d7cb52ab460b7ac9664d88f88ae807d`
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
    "api.openweathermap.org/data/2.5/forecast?q={city name}&appid=2d7cb52ab460b7ac9664d88f88ae807d"
  )
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (weatherData) {
      console.log(weatherData);
    });
}

//     $.ajax({
//       type: "GET",
//       url: "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={7afddf5328a74db83334492be055d162}"

// var APIKey = "7afddf5328a74db83334492be055d162"

//     }).then

//     fetch("").then(function(tacocat) {
// let pokename = tacocat.name

// return "I choose " + pokename + "!"
//     })
