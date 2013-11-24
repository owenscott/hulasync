var Backbone = require("backbone"),
    Village = require("../models/village");

var Villages = Backbone.Collection.extend({
    model: Village,

    url: '/villages'
});


module.exports = Villages;
