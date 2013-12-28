var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    VillageTable = require("./views/villageTblView"),
    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.

Backbone.$ = $;

(function main() {

    var villages = new Villages();

    var villagesTable = new VillageTable({
        collection: villages
    });

    villages.fetch();

})();


