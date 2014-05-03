$(document).ready(function() {
    geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getSunCalcData);
  } else {
    console.log("you should really use a browser with geolocation");
  }
});

function getSunCalcData(position) {
  window.geoPosition = position;
  var positionData = {
    longitude: position.coords.longitude,
    latitude: position.coords.latitude,
    timestamp: position.timestamp
  };

  async.parallel({
    address: getAddress.bind(position.coords)
  }, function (err, results) {
    console.log(results);
  });
  
  $.get('/sunTimes', positionData, function (data, textStatus, jqXHR) {
    if (data) {
      renderSunCalc(data, 'sunTimesList');
    }
  });

  $.get('/sunPosition', positionData, function (data, textStatus, jqXHR) {
    if (data) {
      renderSunCalc(data, 'sunPosList');
    }
  });
  
  $.get('/moonPosition', positionData, function (data, textStatus, jqXHR) {
    if (data) {
      renderSunCalc(data, 'moonPosList');
    }
  });
  
  $.get('/moonIllum', positionData, function (data, textStatus, jqXHR) {
    if (data) {
      renderSunCalc(data, 'moonIllumList');
    }
  });

}

function renderSunCalc (data, list) {
  for (var index in data) {
    if (data.hasOwnProperty(index)) {
      var $li = $('<li><strong>' + index + ':</strong>' + ' ' + data[index] + '</li>');
      $('#' + list).append($li);
    }
  }
}

function getAddress(cb) {
  var position = this;
  var latlng = new google.maps.LatLng(position.latitude, position.longitude);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        document.getElementById('location').innerHTML = (results[0].formatted_address);
        cb(null, results[0].formatted_address);
      } else {
        document.getElementById('location').innerHTML('No results found');
      }
    } else {
      console.log('Geocoder failed due to: ' + status);
    }
  });
}