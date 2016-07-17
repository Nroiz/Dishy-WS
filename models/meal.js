'use strict';
var mongoose = require('mongoose');
var review   = require('./review.js');
var Schema   = mongoose.Schema;

var customeSchema = new Schema({
	name: {type:String,required:true, index:1},
	description: {type:String, required:true},
    owner: {type:String},
    img: {type: String},
	price: {type:Number, required:true},
    lastOrder: {type:Date},//optional
    tags: [String],
    reviewsAmount: {type:Number},
    rate: {type:Number},
    reviews: [review]
}, {collection : 'Meals'});

module.exports = mongoose.model('Meal', customeSchema);