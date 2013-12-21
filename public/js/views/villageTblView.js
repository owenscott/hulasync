var Backbone = require("backbone"),
    _ = require("underscore"),
    VillageRow = require("./villageView"),
    $ = require('jquery-browserify');

Backbone.$ = $;

var VillageTblView = Backbone.View.extend({

    el: '#villages',

    events: {
        'click #add': 'addVillage'
    },

    initialize: function() {
        this.render();
    },

    render: function() {

        this.collection.on("add", this.renderVillageRow, this);
    },

    renderVillageRow: function(village) {

        var villageRow = new VillageRow({
            model: village
        });

        $("#villageRows").append(villageRow.render().el);
    },

    addVillage: function(e) {
      //e.preventDefault();
			this.collection.add({
						villageName: "Elephant2s",
						district: "Tanzania",
						population: "2000",
						numBasicLatrines: "300",
						numImprvLatrines: "80",
						numFuncWPs: "59",
						numNonFuncWPs: "30"
				});
    }
});

module.exports = VillageTblView;
