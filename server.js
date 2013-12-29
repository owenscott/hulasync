var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    url = require('url'),
    app = express();

//Express settings
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/templates'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('view cache', false);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser());

// Development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
    swig.setDefaults({
        cache: false
    });
}

app.get('/', function(req, res, next) {
    res.render('index', {
        title: 'HulaSync'
    });
});

app.get('/index.html', function(req, res, next) {
    res.render('index', {
        title: 'HulaSync'
    });
});

app.get('/villages', function(req, res, next) {

    var villages = [{
        villageName: "Lion",
        district: "Nambia",
        population: "2000",
        basicLatrines: "200",
        imprvLatrines: "100",
        funcWPs: "159",
        nonFuncWPs: "50"
    }, {
        villageName: "Tiger",
        district: "Zambia",
        population: "5000",
        basicLatrines: "500",
        imprvLatrines: "200",
        funcWPs: "259",
        nonFuncWPs: "150"
    }, {
        villageName: "Elephant",
        district: "Tanzania",
        population: "2000",
        basicLatrines: "300",
        imprvLatrines: "80",
        funcWPs: "59",
        nonFuncWPs: "30"
    }];

    res.json(villages);
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
