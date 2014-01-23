var Backbone = require('backbone'),
    VillageRow = require('./VillageRow'),
    Village = require("../models/village"),
    Stickit = require('../../public/js/backbone.stickit.js'),
    Storage = require('../../public/js/backbone.dualstorage.js'),
    _ = require('underscore'),
    $ = require('jquery-browserify');

var VillageFrm = Backbone.View.extend({

    el: '#villagesFrm',

    bindings: {
        '#villageName': 'villageName',
        '#district': 'district',
        '#population': 'population',
        '#basicLatrines': 'basicLatrines',
        '#imprvLatrines': 'imprvLatrines',
        '#funcWPs': 'funcWPs',
        '#nonFuncWPs': 'nonFuncWPs',
    },

    events: {
        'click #add': 'addVillage'
    },

    template: _.template($('#villageFrmTemplate').html()),

    initialize: function() {
        this.render();
    },

    render: function() {

        this.$el.html(this.template());

        this.model = new Village();
        this.stickit();

        return this;
    },

    addVillage: function(e) {
        e.preventDefault();

        //Add new village
        this.collection.add(this.model);
        this.model.save();

        // //New instance for next set of data
        this.model = new Village();

        //Rebind model -> UI
        this.stickit();
    }

});

module.exports = VillageFrm;
