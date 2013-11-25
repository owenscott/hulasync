var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    url = require('url'),
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
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// Development only
if ('development' == app.get('env')) {
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

app.get('/villages', function(req, res, next) {

    var villages = [{
        villageName: "Lion",
        district: "Nambia",
        population: "2000",
        numBasicLatrines: "200",
        numImprvLatrines: "100",
        numFuncWPs: "159",
        numNonFuncWPs: "50"
    }, {
        villageName: "Tiger",
        district: "Zambia",
        population: "5000",
        numBasicLatrines: "500",
        numImprvLatrines: "200",
        numFuncWPs: "259",
        numNonFuncWPs: "150"
    }, {
        villageName: "Elephant",
        district: "Tanzania",
        population: "2000",
        numBasicLatrines: "300",
        numImprvLatrines: "80",
        numFuncWPs: "59",
        numNonFuncWPs: "30"
    }];

    res.json(villages);
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Express server listening on port ' + app.get('port'));
});
