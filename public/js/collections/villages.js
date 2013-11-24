var Backbone = require("backbone"),
    Village = require("../models/village");

var VillagesCollection = Backbone.Collection.extend({
    model: Village,

    url: '/villages'
});

module.exports = VillagesCollection;
