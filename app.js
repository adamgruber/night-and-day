
/**
 * Module dependencies.
 */

var express = require('express');
var exphbs  = require('express3-handlebars');
var routes = require('./routes');
var user = require('./routes/user');
var sunTimesSvc = require('./routes/sunTimesSvc');
var http = require('http');
var path = require('path');
var less = require('less-middleware');

var app = express();
var bootstrapPath = path.join(__dirname, 'node_modules', 'bootstrap');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Less Middleware
var lessSrc = path.join(__dirname, 'assets', 'less');
var lessMwOpts = {
  dest: path.join(__dirname, 'public'),
  preprocess: {
    path: function(pathname, req) {
      console.log(pathname);
      return pathname.replace('/stylesheets', '');
    }
  }
};
var lessParserOpts = {
  paths: [path.join(bootstrapPath, 'less')]
};
var lessCompilerOpts = {
  compress: false
};

app.use(less(lessSrc, lessMwOpts, lessParserOpts, lessCompilerOpts));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/sunTimes', sunTimesSvc.getSunTimes);
app.get('/sunPosition', sunTimesSvc.getSunPosition);
app.get('/moonPosition', sunTimesSvc.getMoonPosition);
app.get('/moonIllum', sunTimesSvc.getMoonIllumination);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});