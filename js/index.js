var api = 'https://fcc-weather-api.glitch.me/api/current?';
var lat = '';
var lon = '';

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = 'lat=' + position.coords.latitude;
      var lon = 'lon=' + position.coords.longitude;
      getWeather(lat, lon);
    });
  } else {
    $('#location').text('Location not enabled.');
  }

  function getWeather(lat, lon) {
    var jsonLink = api + lat + '&' + lon;

    $.getJSON(jsonLink, function(json) {
      var tempC = Math.round(json.main.temp) + ' Celsius';
      var tempF = Math.round((json.main.temp * 9/5) + 32) + ' Fahrenheit';

      $('#location').text(json.name);
      $('#weather').text(tempF);
      $('#description').text(json.weather[0].main);
      $('#weather-icon').html("<img src='" + json.weather[0].icon + "' />");
    });

  }

});
