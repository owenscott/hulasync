var Backbone = require('backbone'),
    VillageRow = require('./VillageRow'),
    _ = require('underscore'),
    $ = require('jquery-browserify');

var VillageTbl = Backbone.View.extend({

    el: '#villagesTbl',

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

});

module.exports = VillageTbl;
