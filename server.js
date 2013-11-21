//Copyright 2012-2013 Carlos T. Linares & Owen Scott.  All rights reserved.
//We plan to release our code under an open source license, probably GPL v3.

/***** SETUP *****/
var express = require('express'),
    swig = require('swig'),
    path = require('path'),
    repl = require('repl'),
    sys = require('sys'),
    persistence = require('persistencejs/persistence').persistence,
    persistenceStore = require('persistencejs/persistence.store.sqlite3'),
    persistenceSync = require('persistencejs/persistence.sync.server'),
    mime = require('mime'),
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
app.use(express.static(path.join(__dirname, 'public')));


// Development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
    swig.setDefaults({
        cache: false
    });
}

var nodeUserGid = "ec2-user";
var nodeUserUid = "ec2-user";

var persistenceSession = function(req, res, next) {
    var end = res.end;

    req.conn = persistenceStore.getSession();
    res.end = function() {
        req.conn.close();
        end.apply(res, arguments);
    };
    req.conn.transaction(function(tx) {
        req.tx = tx;
        next();
    });
};

function log(o) {
    sys.print(sys.inspect(o) + "\n");
}


/***** APP CONFIG *****/
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
app.use(express.static(__dirName));
app.use(persistenceSession);


/***** DB CONFIG *****/
var dbPath = './sqlite_zebraSync.db';
persistenceStore.config(persistence, dbPath);

mime.define({
    'text/cache-manifest': ['.appcache']
});

persistenceSync.config(persistence);

var session = persistenceStore.getSession();
var entities = new Object();

session.transaction(function(tx) {
    entities["Village"] = persistence.define('Village', {
        name: "TEXT",
        district: "TEXT",
        population: "INT",
        numBasicLatrines: "INT",
        numImprvLatrines: "INT",
        numFuncWPs: "INT",
        numNonFuncWPs: "INT",
        _lastChange: "BIGINT"
    });
    entities["District"] = persistence.define('District', {
        name: "TEXT",
        population: "INT",
        boundary: "TEXT",
        _lastChange: "BIGINT"
    });
    session.schemaSync(tx, function(tx) {
        entities["Village"].enableSync(tx, function(tx) {
            persistence.flush(tx);
        });
        entities["District"].enableSync(tx, function(tx) {
            persistence.flush(tx);
        });
    });
});
session.close();


/***** APP IMPLEMENTATION *****/
app.get('/', function(req, res, next) {
    var body = 'Hello World';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.get('/sync/*', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var entity = url_parts.pathname;
    entity = entity.match("[a-zA-Z0-9]*$");
    console.log("\n===========GET entity is " + entity + " from " + req.ip);
    var session = persistenceStore.getSession();
    session.transaction(function(tx) {
        persistenceSync.pushUpdates(session, tx, entities[entity], req.query.since, function(updates) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(updates);
        });
    });
});

app.post('/sync/*', function(req, res) {
    var url_parts = url.parse(req.url, true);
    var entity = url_parts.pathname;
    entity = entity.match("[a-zA-Z0-9]*$");
    console.log("\n===========POST entity is " + entity + " from " + req.ip);

    var session = persistenceStore.getSession();
    session.transaction(function(tx) {
        persistenceSync.receiveUpdates(session, tx, entities[entity], req.body, function(result) {
            res.header("Access-Control-Allow-Origin", "*");
            res.send(result);
        });
    });
});

app.listen(port, function() {
    if (process.getgid && process.setgid) {
        console.log('Current gid: ' + process.getgid());
        try {
            process.setgid(nodeUserGid);
            console.log('New gid: ' + process.getgid());
        } catch (err) {
            console.log('Failed to set gid: ' + err);
        }
    }
    if (process.getuid && process.setuid) {
        console.log('Current uid: ' + process.getuid());
        try {
            process.setuid(nodeUserUid);
            console.log('New uid: ' + process.getuid());
        } catch (err) {
            console.log('Failed to set uid: ' + err);
        }
    }
    console.log('Express server listening on port ' + app.get('port'));
});
