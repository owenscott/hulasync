// Copyright 2013 Anya Elise Marshall

/***** SETUP *****/
var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    app = express();

var Schema = mongoose.Schema;


/***** APP CONFIG *****/
app.set('port', process.env.PORT || 4444);
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.bodyParser());
app.use(express.static(__dirname));


/***** DB CONFIG *****/
/* Schemas */
var villageSchema = new Schema({
    villageName: String,
    district: String,
    population: Number,
    basicLatrines: Number,
    improvedLatrines: Number,
    functionalWPs: Number,
    nonFunctionalWPs: Number,
    _lastChange: Date
},
{
    collection: 'villages'
});

var districtSchema = new Schema({
    name: String,
    population: Number,
    boundary: String,
    _lastChange: Date
},
{
    collection: 'districts'
});

/* Models */
var Village = mongoose.model('Village', villageSchema);
var District = mongoose.model('District', districtSchema);


/***** APP IMPLEMENTATION *****/
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/villages', function(req, res) {
   Village.find(function(err, villages) {
       if(err) {
           console.log("Error retrieving!");
           throw(err);
       }
       res.send(villages); 
   });
});

app.post('/villages', function(req, res) {
   var village = new Village(req.body);
   village._lastChange = new Date();
   village.save(function(err, village) {
        if (err) {
           console.log("Error saving!");
           throw(err);
       }
       res.send(village);
    });
});

app.delete('/villages/:id', function(req, res) {
   Village.findOne({_id: req.params.id}, function(err, village) {
       if (err) {
           console.log("Error finding village to delete!");
           throw(err);
       }
       village.remove(function(err) {
           if(err) {
               console.log("Error deleting village!");
               throw(err);
           }
           res.send({deleted: 1});           
        });
   });
});

app.listen(app.get('port'), function() {
    mongoose.connect('mongodb://localhost/hulasync');
    console.log('Express server listening on port ' + app.get('port'));
});