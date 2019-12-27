const express = require('express');
const http = require("http");
var jwt = require('jwt-simple');
const router = express.Router();

var statusImpl = require('../serviceImpl/statusImpl.js');

var ioc = require('socket.io-client');
var socketc = ioc.connect('localhost:8084', {reconnect: true});

router
    /**
     * Verify router is life
     */
    .get('/', async function(req, res) {
        console.log('upao')
        var token = req.body.token || req.query.token || req.headers['authorization'];
        var decoded = jwt.decode(token, 'XWSMeanDevelopment');
        var user = await statusImpl.getAllOnlineById(decoded._id);
        socketc.emit('notify-show-messages', {users: user, client: decoded._id});
        return res.status(200).send({message: user})
    })
    .get('/logout', function(req, res) {
        var token = req.body.token || req.query.token || req.headers['authorization'];
        var data = JSON.stringify({email: 'nole0223@gmail.com', password: '123'})
        var options = {
            host: 'https://twoway-usersservice.herokuapp.com',
            port: 80,
            path: '/api/sync/',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(data),
              'authorization': token,
            }
        };
        var httpreq = http.request(options, function (response) {
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                var logout = statusImpl.logout(chunk);
                return res.status(200).send({message: 'logout'});
            });
        });
        httpreq.write(data);  
    })
    .get('/status/profile', function(req, res) {
        return res.status(200).send({message: 'radi'});
    })
module.exports = router;