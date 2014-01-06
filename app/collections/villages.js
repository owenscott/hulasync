var Backbone = require("backbone"),
    Village = require("../models/village");

var Villages = Backbone.Collection.extend({
    model: Village,

    local: function() {
        return true;
    },

    url: '/villages',

    alertMe : function(){
        alert("You alerted me");
    }
});


module.exports = Villages;
