'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Account = new Schema({
    oauthID: {type:Number, required:true},
    displayName: {type:String, required:true},
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    gender: {type:String, required:true},
    created: {type:Date, required:true},
    type: {type:String, required:true},
    exp: {type:Number},
    businessDetails: {
        name: {type:String},
        address: {type:String},
        phone: {type:String}
    }
}, {collection : 'Accounts'});

module.exports = mongoose.model('Account', Account);