var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    VillageTable = require("./views/villageTblView");

//Set jquery dependancy on Backbone.
Backbone.$ = window.$;

function renderVillageData(collection, response, options) {

    console.log("Done fetching village data");

    console.log("Length =>" + collection.length);

    var tbl = new VillageTable({
        collection: collection.models
    });
}

//Boot Strap app
new Villages().fetch({
    success: renderVillageData
});
