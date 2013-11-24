var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    VillageTable = require("./views/villageTblView");

//Set jquery dependancy on Backbone.
Backbone.$ = window.$;

var villages = new Villages();

villages.fetch({
    success: function(collection, response, options) {

        console.log("Done fetching village data");

        console.log("Length =>" + collection.length);

        var tbl = new VillageTable({
            collection: collection.models
        });
    }
});


