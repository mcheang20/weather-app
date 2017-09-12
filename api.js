var dest =  "https://fcc-weather-api.glitch.me/api/current?";
var weatherData = document.getElementById('weather-data');
var getData = document.getElementById('get-data');

var lat;
var long;

window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    lat = startPos.coords.latitude;
    long = startPos.coords.longitude;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    getCoords(lat, long);
    console.log(lat, long);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

function getCoords(lat, long){
  var request = new XMLHttpRequest('');
  var urlName = dest + "lat=" + lat + "&" + "lon=" + long;
  request.open('GET', urlName);
  request.onload = function(){
    var allData = JSON.parse(request.responseText);
    document.getElementById("locationInfo").innerHTML = allData.name + " , " +  allData.sys.country;
    document.getElementById("tempInfo").innerHTML = allData.main.temp + " C " + allData.weather[0].description;
    document.getElementById("weatherIcon").innerHTML = allData.weather[0].icon;
    console.log(allData);
  }
  request.send();
}

getCoords();
