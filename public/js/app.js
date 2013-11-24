var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    VillageTable = require("./views/villageTblView");

//Set jquery dependancy on Backbone.
Backbone.$ = window.$;

(function main() {

    var villages = new Villages();

    var villagesTable = new VillageTable({
        collection: villages
    });

    villages.fetch();

})();


