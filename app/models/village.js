var Backbone = require("backbone");

var Village = Backbone.Model.extend({
    url: '/villages'
});

module.exports = Village;
