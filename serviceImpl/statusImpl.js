const serviceFunction = require('../function/serviceFunction.js');
const onlineUser = [];

module.exports = {
    setOnlineUser: function(data) {
        var object = {
            _id: data['client_id'],
            user: data['user'],
            data: new Date()
        }
        
        if (onlineUser.length === 0) {
            onlineUser.push(object);
        } else {
            var index = onlineUser.findIndex(i => i.user._id.toString() == data['user']._id.toString());
            if (index !== -1) {
                onlineUser[index]._id = data['client_id'];
                onlineUser[index].data = new Date();
            } else {
                onlineUser.push(object)
            }
        }
    },
    removeOnline: async function(id, io) {
        var index = onlineUser.findIndex(i => i._id.toString() == id.toString());
        if (index !== -1) {
            var user = onlineUser[index].user === undefined ? null : onlineUser[index].user;
            onlineUser.splice(index, 1);
            return {status: true, message: {user: user.listFriends, user: user, status: false}};
        }
        return {status: false, message: {}}
    },
    getOnlineById: async function(list, req, me) {
        listReturn = []
        list.forEach(element => {
            var object = {
                chater: element.chater,
                status: false
            }
            var index = onlineUser.findIndex(i => i.user._id.toString() == element.friend.toString());
            if (index !== -1) {
                object.status = true;
            }
            listReturn.push(object)
        })
        return {status: 200, message: listReturn}
    }
}