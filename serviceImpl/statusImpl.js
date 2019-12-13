const onlineUser = [];

module.exports = {
    pushOnline: function(data) {
        /**
         * Ovo jos treba srediti da se zna sa kog uredjaja
         * dolazi zahtjev ali to treba prckati po klijentu
         * pa po serveru jednom pa po ovom
         * to neki drugi put
         */
        var user = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            otherInformation: {
                publicMedia: {
                    profileImage: data.otherInformation.publicMedia.profileImage
                }
            },
            username: data.username,
            frieds: data.friends.listFriends
        }
        var isPush = true;
        onlineUser.forEach(us => {
            if (us.user._id === data._id) {
                us.device.push('pc');
                isPush = false;
            }
        })
        if (isPush) {
            onlineUser.push({user: user, device: ['pc']})
        }
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