var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    Village = require("./models/village"),
    VillageTbl = require("./views/VillageTbl"),
    VillageFrm = require("./views/VillageFrm"),
    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.
Backbone.$ = $;

(function() {

    //Main collection to store all village data.
    var villages = new Villages();

    //Village data collection form.
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


