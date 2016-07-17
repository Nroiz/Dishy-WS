'use strict';
var bodyParser          = require('body-parser');
var OrdersController    = require('../controllers/orders.ctrl.js');
var ordersApi           = new OrdersController();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var jsonParser          = bodyParser.json();
var utils               = require('../assets/utils.js');

module.exports = function(app){
    app.post('/addOrder', utils.ensureAuth, jsonParser, function(req, res){
        if (!req.body) return res.sendStatus(400);
        ordersApi.addOrder(req.body, function(err, data){
            if(err) return res.sendStatus(403); //need to send the real error
            res.send(data);
            res.end();
        });
    });

    //when auth works - delete the key
    app.get('/getBusinessOrders/:key', utils.ensureAuth, function(req, res){
        ordersApi.getBusinessOrders(req.params.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
        
    });

    //when auth works - delete the key
    app.get('/getOrdersHistory/:key', utils.ensureAuth,function(req, res){
        ordersApi.getOrdersHistory(req.params.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
    
    app.put('/closeOrder', utils.ensureAuth, jsonParser, function(req, res){
        ordersApi.closeOrder(req.body.oid , function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
}