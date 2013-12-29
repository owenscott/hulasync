var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    Village = require("./models/village"),
    VillageTbl = require("./views/VillageTbl"),
    VillageFrm = require("./views/VillageFrm"),
    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.
Backbone.$ = $;

(function main() {

    //Our Main collection to store all village data
    var villages = new Villages;

    var villageFrm = new VillageFrm({
        collection: villages
    });

    var villageTbl = new VillageTbl({
        collection: villages
    });

    //Load from server
    villages.fetch();

})();


