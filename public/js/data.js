/* Persistence related stuff */


/***** CONFIG *****/
var port = 4000;
var server = "localhost:" + port;
var dbName = 'hulasyncDB';


/***** SCHEMAS *****/
var Village = persistence.define('Village', {
  name: "TEXT",
  district: "TEXT",
  population: "INT",
  numBasicLatrines: "INT",
  numImprvLatrines: "INT",
  numFuncWPs: "INT",
  numNonFuncWPs: "INT",
  _lastChange: "BIGINT"
});

var District = persistence.define('District',{
  name: "TEXT",
  population:"INT",
  boundary:"TEXT",
  _lastChange: "BIGINT"  
});


/***** CONNECT TO DB *****/
// Currently only using local storage (memory) since WebSQL has been deprecated.
try {
    persistence.loadFromLocalStorage(function() {
        console.log("Data loaded from localStorage");

        persistence.flushHooks =
            persistence.saveToLocalStorage(function() {
                console.log("saved flush to localStorage.");
        });

        persistence.schemaSyncHooks =
            persistence.saveToLocalStorage(function() {
                console.log("saved schemaSync to localStorage.");
        });

    });
}
catch (e) {
    console.log("Data *not* loaded from localStorage. There probably is no data. " + e);
}

