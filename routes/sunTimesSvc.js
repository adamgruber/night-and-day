var SunCalc = require('suncalc');

exports.getSunTimes = function (req, res) {
  var query = req.query || {},
      lng = query.longitude,
      lat = query.latitude,
      dateInt = new Date(parseInt(query.timestamp, 10));
  console.log(dateInt);
  res.send(SunCalc.getTimes(dateInt, lat, lng));
};

exports.getSunPosition = function (req, res) {
  var query = req.query || {},
      lng = query.longitude,
      lat = query.latitude,
      dateInt = new Date(parseInt(query.timestamp, 10));
  res.send(SunCalc.getPosition(dateInt, lat, lng));
};

exports.getMoonPosition = function (req, res) {
  var query = req.query || {},
      lng = query.longitude,
      lat = query.latitude,
      dateInt = new Date(parseInt(query.timestamp, 10));
  res.send(SunCalc.getMoonPosition(dateInt, lat, lng));
};

exports.getMoonIllumination = function (req, res) {
  var query = req.query || {},
      dateInt = new Date(parseInt(query.timestamp, 10));
  res.send(SunCalc.getMoonIllumination(dateInt));
};