'use strict';
var bodyParser          = require('body-parser');
var OrdersController    = require('../controllers/orders.ctrl.js');
var ordersApi           = new OrdersController();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var jsonParser          = bodyParser.json();
var utils               = require('../assets/utils.js');

module.exports = function(app){
    app.post('/addOrder', jsonParser, function(req, res){
        if (!req.body) return res.sendStatus(400);
        ordersApi.addOrder(req.body, function(err, data){
            if(err) return res.sendStatus(403); //need to send the real error
            res.send(data);
            res.end();
        });
    });

    //when auth works - delete the key
    app.get('/getBusinessOrders/:key', function(req, res){
        if(req.user.type == 'business') {
            ordersApi.getBusinessOrders(req.params.key, function(err,data){
                if(err) return res.sendStatus(400);
                res.send(data);
                res.end();
            });
        } else {
            res.status(401);
            res.send('authentication problem - you don\'t have business premissions');
        }
        
    });

    //when auth works - delete the key
    app.get('/getOrdersHistory/:key',function(req, res){
        ordersApi.getOrdersHistory(req.params.key, function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
    
    app.put('/closeOrder', jsonParser, function(req, res){
        ordersApi.closeOrder(req.body.oid , function(err,data){
            if(err) return res.sendStatus(400);
            res.send(data);
            res.end();
        });
    });
}