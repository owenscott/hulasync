var Backbone = require("backbone"),
    _ = require("underscore"),
    $ = require('jquery-browserify');

var VillageRow = Backbone.View.extend({

    tagName: 'tr',

    template: _.template($('#villageTemplate').html()),

    render: function() {

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }

});

module.exports = VillageRow;
