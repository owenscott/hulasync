//app entry point

/***** UTILS *****/
/* serializeObject function, author unknown */
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

/***** ROUTING *****/
var Router = Backbone.Router.extend({
   routes: {
       '': 'data',
       'data': 'data',
       'add': 'addVillage',
       'dashboard': 'dashboard',
       'about': 'about'
   } 
});


/***** COLLECTIONS *****/
var villageData = Backbone.Collection.extend({
   url: '/villages' 
});


/***** MODELS *****/
var Village = Backbone.Model.extend({
    urlRoot: '/villages'    
});

/***** VIEWS *****/
var VillageDisplay = Backbone.View.extend({
    el: '.page',
    render: function() {
        var that = this;
        var villages = new villageData();
        villages.fetch({
            success: function(villages) {
                var dummyModel = villages.models[0];
                var attrs = dummyModel.attributes;
                var template = _.template($('#data-list').html(), {attrs: attrs, villages: villages.models});
                that.$el.html(template);
            }
        });
    },
    events: {
        'click .close': 'deleteVillage'
    },
    deleteVillage: function(ev) {
        var villageID = $(ev.currentTarget).attr('id');
        var village = new Village({id: villageID});
        village.destroy( {
            success: function(resp) {
                router.navigate('', {trigger:true});
            },
            error: function(resp) {
                console.log("Error deleting village!");
            }
        });
    }
});

var VillageAdd = Backbone.View.extend({
    el: '.page',
    render: function() {
        var template = _.template($('#village-add').html(), {});
        this.$el.html(template);
    },
    events: {
        'submit .village-add-form': 'addVillage'
    },
    addVillage: function(ev) {
        var villageDetails = $(ev.currentTarget).serializeObject(); 
        var village = new Village();
        village.save(villageDetails, {
            success: function(village) {
                router.navigate('', {trigger:true});
            }            
        });
        return false;
    }
});


/***** APP LOGIC *****/
var router = new Router();
var display = new VillageDisplay();
var add = new VillageAdd();

router.on('route:data', function() {
    display.render();
});
router.on('route:addVillage', function() {
    add.render();
});

Backbone.history.start();