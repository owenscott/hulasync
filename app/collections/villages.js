var Backbone = require("backbone"),
    Village = require("../models/village");

var Villages = Backbone.Collection.extend({
    model: Village,

    remote: true,

    local: false,

    url: '/villages'
});


module.exports = Villages;
