$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getSunTimes);
  } else {
    console.log("you should really use a browser with geolocation");
  }
});

function getSunTimes(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var times = SunCalc.getTimes(new Date(), latitude, longitude);
  console.log(times);
  // let's show a map or do something interesting!
}