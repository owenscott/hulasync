var Backbone = require("backbone"),
    Villages = require("./collections/villages"),
    Village = require("./models/village"),
    VillageTbl = require("./views/VillageTbl"),
    VillageFrm = require("./views/VillageFrm"),
    offline = require("../public/js/offline"),
    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.
Backbone.$ = $;

(function() {

    Offline.options = {
        checkOnLoad: true,
    };

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

    Offline.on("confirmed-up", offlineEvent, {
        collection: villages,
        state: true
    });

    Offline.on("confirmed-down", offlineEvent, {
        collection: villages,
        state: false
    });

    //Load from server.
    villages.fetch();

})();


function offlineEvent() {
    this.collection.alertMe();
}
