'use strict';
var mongoose        = require('mongoose');
var Order           = require('../models/order.js');
var Meal            = require('../models/meal.js');
var utils           = require('../assets/utils.js');

class Orders{
    constructor(){}
    
    addOrder(orderDetails, callback){
        console.log('>>addOrder');
        var newOrder;
        console.log(orderDetails);
        if(!orderDetails.pid){
            console.log('id is empty');
            return callback('id is empty', null);
        }
        Meal.findOne({_id:orderDetails.pid}, function(err,meal){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            newOrder = new Order({
                product: orderDetails.pid,
                date: Date.now(),//need to parse the date to more elegant string
                price: meal.price,
                name: meal.name,
                isClosed: false,
                address: orderDetails.address,
                customerId: orderDetails.customer,
                businessId: meal.owner
            });
            
            newOrder.save(function(err, order){
                if(err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log('success!');
                callback(null, order);
                console.log('<<addOrder');
            });
        });  
    }
    
    getBusinessOrders(bid, callback){
        console.log('>>getBusinessOrders');
        
        Order.find({businessId:bid},function(err,orders){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            callback(null,orders);
            console.log('<<getBusinessOrders');
        });
    }
    
    getOrdersHistory(cid, callback){
        console.log('>>getOrdersHistory');
        
        Order.find({customerId:cid},function(err,orders){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('got data!');
            utils.sortBy(orders, {
                prop: "date",
                parser: function (item) {
                    return new Date(item);
                }
            });
            callback(null,orders);
            console.log('<<getOrdersHistory');
        });
    }
    
    closeOrder(orderID, callback){
        console.log('>>closeOrder');
        
        Order.findOne({_id:orderID},function(err, doc){
            var query;
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            if(!doc) {
                console.log('There is no order with this id: '+ data.nealId);
                return callback('no id error',null);
            }
            query = doc.update({
               $set: {
                   isClosed: true
               }
            });
            query.exec(function(err, result){
                if(err) {
                    console.log(err);
                    return callback(err, null);
                }
                console.log('got data!');
                result.isClosed = true;
                callback(null, result);
                console.log('<<closeOrder');
            });
        });
    }
}

module.exports = Orders;