
module.exports = {
    emit: function(list, friend, io, status) {
        list.forEach(element => {
            io.emit('user-is-online-' + element, {user: friend, status: status});
        });
    }
}