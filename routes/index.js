var SunCalc = require('suncalc');
/*
 * GET home page.
 */
// get today's sunlight times for London
var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
exports.index = function(req, res){
  res.render('home', {
    title: 'Express',
    times: times
  });
};