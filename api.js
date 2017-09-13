var dest =  "https://fcc-weather-api.glitch.me/api/current?";
var tempInfo = document.getElementById("tempInfo");
var locationInfo = document.getElementById("locationInfo");
var weatherIcon =   document.getElementById("weatherIcon");

// get location using latitude and longitude
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    lat = startPos.coords.latitude;
    long = startPos.coords.longitude;
    getCoords(lat, long);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

function getCoords(lat, long){
  var request = new XMLHttpRequest('');
  var urlName = dest + "lat=" + lat + "&" + "lon=" + long; //api url endpoint with coordinates
  request.open('GET', urlName);
  request.onload = function(){
    var allData = JSON.parse(request.responseText);
    var weatherDesc = allData.weather[0].description;
    var fahrTemp = tempInfo.innerHTML = Math.round(allData.main.temp * 9 / 5 + 32) + "&deg" + "F " + weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);
    locationInfo.innerHTML = allData.name + " , " +  allData.sys.country; //city name and country
    weatherIcon.src = allData.weather[0].icon; // weather icon
  }
  request.send();
}

getCoords();
