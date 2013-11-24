var Backbone = require("backbone"),
    _ = require("underscore"),
    VillageView = require("./villageView");

var VillageTblView = Backbone.View.extend({
    events: {},

    el: '#villages',

    initialize: function() {
        this.render();
    },

    render: function() {
        console.log("Rendering village table");

        this.collection.forEach(function(village) {
            console.log(village);

            this.renderVillage(village);
        }, this);

        console.log("Done rendering village table");
    },

    renderVillage: function(village) {
        console.log("Rendering village");

        var villageView = new VillageView({
            model: village
        });

        this.$el.append(villageView.render().el);
    }
});

module.exports = VillageTblView;
