var Backbone = require("backbone"),
    _ = require("underscore"),
    VillageView = require("./villageView");

var VillageTblView = Backbone.View.extend({
    events: {},

    el: '#villageRows',

    initialize: function() {
        this.render();
    },

    render: function() {

        this.collection.forEach(function(village) {

            this.renderVillage(village);

        }, this);

    },

    renderVillage: function(village) {

        var villageView = new VillageView({
            model: village
        });

        this.$el.append(villageView.render().el);
    }
});

module.exports = VillageTblView;
