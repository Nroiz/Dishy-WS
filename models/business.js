'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Businss = new Schema({
    name: {type:String, required:true},
    address: {type:String, required:true},
    phone: {type:String, required:true}
});

module.exports = Businss;