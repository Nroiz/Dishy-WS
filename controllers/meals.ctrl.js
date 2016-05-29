'use strict';
var mongoose        = require('mongoose');
var Meal            = require('../models/meal.js');
var Review          = require('../models/review.js');
var Tag             = require('../models/tag.js');

var updateAvg = function(current, amount, newVal){
    var avg = (parseInt(current) * parseInt(amount));
    avg += parseInt(newVal); 
    avg /= parseInt(amount+1); 
    avg = avg.toFixed(1); 
    return parseInt(avg);
}

class Meals{
    constructor(){}
    
    addMeal(mealDetails, callback){
        console.log('>>addMeal');
        
        var newMeal = new Meal({
            name: mealDetails.name,
            description: mealDetails.description,
            price: mealDetails.price,
            owner: mealDetails.owner,
            tags: mealDetails.tags
        });
        
        newMeal.save(function(err, meal){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('success!');
            callback(null, meal);
            console.log('<<addMeal');
        });
    }
    
    getAllMeals(callback){
        console.log('>>getAllMeals');
        
        Meal.find({},function(err,meals){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            callback(null,meals);
            console.log('<<getAllMeals');
        });
    }
    
    getTags(callback){
        console.log('>>getTags');
        Tag.find({},function(err,tags){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            callback(null,tags);
            console.log('<<getTags');
        });
        
    }
    
    getMealbyID(mid,callback){
        console.log('>>getMealbyID');
        
        Meal.findOne({_id: mongoose.Types.ObjectId(mid)},function(err,meal){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            callback(null,meal);
            console.log('<<getMealbyID');
        });
    }
    
    getMealsByTags(tags,callback){
        console.log('>>getMealsByTags');
        var query;
        if(Array.isArray(tags)){
            query = {
                $and:[
                    {tags: tags[0]},
                    {tags: tags[1]}
                ]
            };
        } else {
            query = {tags: tags};
        }
        
        Meal.find(query).exec(function(err,meals){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            callback(null,meals);
            console.log('<<getMealsByTags');
        });
    }
    
    reviewMeal(data, callback){
        console.log('>>reviewMeal');
        if(!data.mid) {
            console.log('There is no meal with this id: '+ data.mid);
            return callback('id error',null);
        }
        Meal.findOne({_id:data.mid}, function(err, doc){
            var avg, query,newReview,reData;
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            if(!doc) {
                console.log('There is no meal with this id: '+ data.mid);
                return callback('no id error',null);
            }
            avg = updateAvg(
                        doc.rate || 0, 
                        doc.reviewsAmount || 0, 
                        data.context.rate);
            newReview = mongoose.model('Review', Review);
            reData = new newReview(data.context);
            query = doc.update({
               $set: {
                   rate: avg
               },
               $inc: {
                   reviewsAmount: 1
               },
               $push: {
                   reviews: reData
               }
            });
            query.exec(function(err, result){
                if(err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log('got data!');
                result.newRate = avg;
                callback(null, result);
                console.log('<<reviewMeal');
            });
        });
    }
    

}

module.exports = Meals;