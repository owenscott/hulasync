var Backbone = require("backbone"),
    Villages = require("./collections/villages.js"),
    Village = require("./models/village.js"),
    VillageTbl = require("./views/villageTbl"),
    VillageFrm = require("./views/VillageFrm"),
    Offline = require("../public/js/offline"),
    $ = require('jquery-browserify');

//Set jquery dependancy on Backbone.
Backbone.$ = $;

function offlineEvent() {
    console.log("this.local==>" + this.local);
    console.log("this.remote==>" + this.remote);

    this.collection.local = this.local;
    this.collection.remote = this.remote;
}

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
        local: false,
        remote : true
    });

    Offline.on("confirmed-down", offlineEvent, {
        collection: villages,
        local: true,
        remote: false
    });

    //Load from server.
    villages.fetch();

})();

