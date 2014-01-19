var Backbone = require("backbone"),

    Villages = require("./collections/villages.js"),
    Village = require("./models/village.js"),
    VillageTbl = require("./views/VillageTbl.js"),
    VillageFrm = require("./views/VillageFrm.js"),

    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.
Backbone.$ = $;

(function() {

    //Main collection to store all village data.
    var villages = new Villages();

    //Data collection form.
    var villageFrm = new VillageFrm({
        collection: villages
    });

    //Village data display table.
    var villageTbl = new VillageTbl({
        collection: villages
    });

    //Load from server.
    villages.fetch();

})();


