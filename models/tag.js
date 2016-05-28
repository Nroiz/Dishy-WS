'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var customeSchema = new Schema({
    // tagId: {type:Schema.ObjectId, index:1, unique:true},
	title: {type:String,required:true}
}, {collection : 'tags'});

module.exports = mongoose.model('Tag', customeSchema);