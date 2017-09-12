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
    getCoords(lat, long);
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};

function getCoords(lat, long){
  var request = new XMLHttpRequest('');
  var urlName = dest + "lat=" + lat + "&" + "lon=" + long;
  request.open('GET', urlName);
  request.onload = function(){
    var allData = JSON.parse(request.responseText);
    var changeTempRead = document.getElementById('changeTemp');
    var tempUnit = "F";
    var fahrTemp = document.getElementById("tempInfo").innerHTML = Math.round(allData.main.temp * 9 / 5 + 32) + "&deg" + tempUnit;
    var celsTemp = document.getElementById("tempInfo").innerHtml = allData.main.temp + "&deg" + "C";
    document.getElementById("locationInfo").innerHTML = allData.name + " , " +  allData.sys.country;
    changeTempRead.addEventListener('click', function(){
      if(tempUnit === "F" ){
        document.getElementById("tempInfo").innerHtml = allData.main.temp + "&deg" + "C";
        tempUnit = "C";
      } else {
        document.getElementById("tempInfo").innerHTML = Math.round(allData.main.temp * 9 / 5 + 32) + "&deg" + "F";
        tempUnit = "F";
      }
    })
    //document.getElementById("tempInfo").innerHTML = Math.round(fahrTemp) + "&deg;" +  " F " + allData.weather[0].description;
    document.getElementById("weatherIcon").src = allData.weather[0].icon;
    console.log(allData);
  }
  request.send();
}

getCoords();
