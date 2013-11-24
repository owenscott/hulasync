var Backbone = require("backbone"),
    _ = require("underscore");

var VillageView = Backbone.View.extend({
    events: {},

    tagName: 'tr',

    template: _.template($('#villageTemplate').html()),

    render: function() {
        console.log("Rendering village row");

        this.$el.html(this.template(this.model.toJSON()));

        console.log("Done Rendering village row");

        return this;
    }

});

module.exports = VillageView;
