'use strict';
var bodyParser          = require('body-parser');
var MealsController     = require('../controllers/meals.ctrl.js');
var mealsApi            = new MealsController();
var jsonParser          = bodyParser.json();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var utils               = require('../assets/utils.js');
var passport            = require('passport');

module.exports = function(app){
    app.post('/addMeal', jsonParser, function(req, res){
        if (!req.body) return res.sendStatus(400);
        mealsApi.addMeal(req.body, function(err, data){
            if(err) return res.sendStatus(403); //need to send the real error
            res.send(data);
            res.end();
        });
    });

    //upgrade - need to get amount of meals, 
    //          few meals each time (remember the last one)
    app.get('/getAllMeals', utils.ensureAuth , function(req, res){
        mealsApi.getAllMeals(function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    app.get('/getTags', function(req, res){
        mealsApi.getTags(function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    app.get('/getMealbyID/:mid', function(req, res){
        mealsApi.getMealbyID(req.params.mid, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
    
    //recive meals that contains both tags
    app.get('/getMealsByTags/:tagOne/:tagTwo', function(req, res){
        var tags = [
            req.params.tagOne,
            req.params.tagTwo
        ];
        mealsApi.getMealsByTags(tags, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
    
    app.get('/getMealsByTags/:tag', function(req, res){
        mealsApi.getMealsByTags(req.params.tag, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });

    app.put('/reviewMeal', jsonParser, function(req, res){
        mealsApi.reviewMeal(req.body, function(err,data){
            if(err) return res.sendStatus(400);
            console.log('body - '+req.body);
            res.send(data);
            res.end();
        });
    });  
}