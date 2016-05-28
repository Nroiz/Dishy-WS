'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var review = new Schema({
    rate: {type:Number,required:true},
    author: {type:String,required:true},
    description: {type:String}
});

module.exports = review;