let api = 'https://fcc-weather-api.glitch.me/api/current?';
let lat;
let lon;

// Get the user's location when the page is loaded
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let lat = `lat=${position.coords.latitude}`;
      let lon = `lon=${position.coords.longitude}`;
      getWeather(lat, lon);
    });
  } else {
    $('#location').text('Location not enabled.');
  }
  
  function getWeather(lat, lon) {
    let jsonLink = `${api}${lat}&${lon}`;
    
    $.getJSON(jsonLink, json => {
      let tempC = `${Math.round(json.main.temp)} Celsius`;
      let tempF = `${Math.round((json.main.temp * 9/5) + 32)} Fahrenheit`;
      
      $('#location').text(json.name);
      $('#weatherF').text(tempF);
      $('#weatherC').text(tempC);
      $('#description').text(json.weather[0].main);
      $('#weather-icon').html(`<img src='${json.weather[0].icon}' />`);
    });
    
    $('#weatherC').hide();
  }
  
});

// Change between F and C
function changeTempF() {
  $('#weatherF').show();
  $('#weatherC').hide();
}
      
function changeTempC() {
  $('#weatherC').show();
  $('#weatherF').hide();
}