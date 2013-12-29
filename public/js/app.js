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
    urlRoot: '/villages',
    idAttribute: '_id'
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
        'click .close': 'deleteVillage',
        'click .editrow': 'editVillage'
    },
    deleteVillage: function(ev) {
        var villageID = $(ev.currentTarget).parents('tr').attr('id');
        var village = new Village({id: villageID});
        village.destroy( {
            success: function(resp) {
                router.navigate('', {trigger:true});
            },
            error: function(resp) {
                console.log("Error deleting village!");
            }
        });
    },
    editVillage: function(ev) {
        var editButton = $(ev.currentTarget);
        var state = $(editButton).text();
        var row = $(editButton).parents('tr');
        var villageID = $(row).attr('id');                
        var model = { '_id': villageID }; //initialize the [updated] model that will be sent to the server
        
        if( state === "Edit") { // begin editing row
            $(editButton).text("Done");
            $(row).children('td.datablock').each( function() {
               var tdText = $(this).text();
               $(this).html('<input type="text" placeholder="'+ tdText +'">');
            });
        }
        else if (state === "Done") { // done editing row    
            $(row).children('td.datablock').each( function() {
                var key, value;
                var classText = $(this).attr('class');
                var classes = classText.split(" ");
                
                /* get key for current attribute in edited model */
                $(classes).each(function(index, element) { 
                    if(element.match(/attr/)) {
                        key = element.substr(5);
                    }
                });                
                /* get value for current attribute in edited model */
                $(this).children('input[type=text]').each( function(index, element) { //get value for edited model
                    if($(element).val() !== "") {
                        value = $(element).val();
                    }
                    else {
                        value = $(element).attr('placeholder');
                    }
                });                
                /* update model */
                model[key] = value.trim();
                /* restore text */
                $(this).html(value.trim());
            });
            /* send model to server */
            var village = new Village();
            village.save(model, {
                patch: true
            });
            
            $(editButton).text("Edit"); //reset Edit button
        }
        
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