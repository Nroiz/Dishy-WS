'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var customeSchema = new Schema({
   name: {type:String, required:true},
	product: {type:String, required:true, index:1},
	date: {type:Date, required:true},
	price: {type:Number, required:true},
    address: {type:String, required:true},
    isClosed: {type:Boolean, default: false},
    customerId: {type:String, required:true},
    businessId: {type:String, required:true}
}, {collection : 'Orders'});

module.exports = mongoose.model('Order', customeSchema);