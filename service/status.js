const express = require('express');
const router = express.Router();

var statusImpl = require('../serviceImpl/statusImpl.js');

router
    /**
     * Verify router is life
     */
    .get('/', async function(req, res) {
        var listItem = JSON.parse(req.query.item);
        var me = JSON.parse(req.query.me);

        var resData = await statusImpl.getOnlineById(listItem, req, me);
        return res.status(200).send({message: resData.message, socket: 'SOCKET_NULL_POINT'})
    })
    .post('/', function(req, res) {
        console.log('ulogovao se ')
        console.log(req.body)
        statusImpl.setOnlineUser(req.body);
        return res.status(200).send({message: '', socket: 'SOCKET_NULL_POINT'})
    })
    .delete('/', async function(req, res) {
        console.log('izlogovao se ')
        console.log(req.body)
        var resDate = await statusImpl.removeOnline(req.body['client_id'])
        return res.status(200).send({message: resDate.message, socket: 'SOCKET_NULL_POINT'})
    })
module.exports = router;