var Backbone = require("backbone"),
    Village = require("../models/village");

var Villages = Backbone.Collection.extend({
    model: Village,
    local: true,
    url: '/villages'
});


module.exports = Villages;
