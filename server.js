var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    app = express();


//Express settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    swig.setDefaults({
        cache: false
    });
}


app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
