const serviceFunction = require('../function/serviceFunction.js');
const onlineUser = [];

module.exports = {
    setOnlineUser: function(data, id, io) {
        var object = {
            _id: id,
            user: data,
            data: new Date()
        }
        
        if (onlineUser.length === 0) {
            onlineUser.push(object);
        } else {
            var index = onlineUser.findIndex(i => i.user._id.toString() == data._id.toString());
            if (index !== -1) {
                onlineUser[index]._id = id;
                onlineUser[index].data = new Date();
            } else {
                onlineUser.push(object)
            }
        }
        serviceFunction.emit(data.listFriends, data, io, true);
    },
    removeOnline: function(id, io) {
        var index = onlineUser.findIndex(i => i._id.toString() == id.toString());
        if (index !== -1) {
            var user = onlineUser[index].user === undefined ? null : onlineUser[index].user;
            onlineUser.splice(index, 1);
            serviceFunction.emit(user.listFriends, user, io, false)
        }
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
        
        // var io = req.app.get('socket-io')
        // io.emit('user-' + me, listReturn)
        return {status: 200, message: listReturn}
    },
    getAllOnline: function() {
        console.log(onlineUser)
    },
    getAllOnlineById: async function(_id) {
        var friedsList = null;
        onlineUser.forEach(us => {
            if (us.user._id === _id) {
                friedsList = us.user.frieds;
            }
        })
        var listOnlineFriedns = [];
        friedsList.forEach(fr => {
            var _idF = fr;
            onlineUser.forEach(onu => {
                if (onu.user._id === _idF) {
                    listOnlineFriedns.push(onu);
                }
            })
        });
        return listOnlineFriedns;
    },
    logout: function(user) {
        var id = JSON.parse(user)._id;
        // onlineUser.splice()
        var indexO = undefined;
        onlineUser.forEach((element, index) => {
            if (element.user._id.toString() == id.toString()) {
                indexO = index;
                return;
            }
        });
        onlineUser.splice(indexO, 1);
        
        return false;
    }
}