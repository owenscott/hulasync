var Backbone = require("backbone"),
    _ = require("underscore");

var VillageView = Backbone.View.extend({
    events: {},

    tagName: 'tr',

    template: _.template($('#villageTemplate').html()),

    render: function() {

        this.$el.html(this.template(this.model.toJSON()));

        return this;
    }

});

module.exports = VillageView;
