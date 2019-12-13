const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var StatusImpl = require('./serviceImpl/statusImpl.js');
var Status = require('./service/status.js');

var port = process.env.PORT || 8082;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
    next();
});

app.use('/api/status', Status);

var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log('connected 8082:', socket.client.id);
    socket.on('status', function (data) {
        StatusImpl.pushOnline(data);
    });
    socket.on('getOnline', function () {
        StatusImpl.getAllOnline();
    });
    // socket.on('publication', function (data) {
    //     SyncImpl.publication(data);
    // });
});

app.set('socket-io', io);
http.listen(port, () => console.log(`UserServer is start on port: ${ port }`))