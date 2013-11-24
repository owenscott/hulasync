var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    VillageTable = require("./views/villageTblView");

//Set jquery dependancy on Backbone.
Backbone.$ = window.$;

console.log("Initiating village table");

var villages = new Villages();

console.log("Done Initiating village table");

console.log("Fetching village data");

villages.fetch({
    success: function(collection, response, options) {

        console.log("Done fetching village data");

        console.log(collection.length);

        var tbl = new VillageTable({
            collection: collection.models
        });
    }
});


