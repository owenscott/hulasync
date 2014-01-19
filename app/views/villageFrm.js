var Backbone = require('backbone'),
    VillageRow = require('./villageRow'),
    Village = require("../models/village"),
    BackboneStickit = require('../../public/js/backbone.stickit.js'),
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

        //New instance for next set of data
        this.model = new Village();

        //Rebind model -> UI
        this.stickit();
    }

});

module.exports = VillageFrm;
