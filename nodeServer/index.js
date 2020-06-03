// Node Server to handle socket io connections

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name =>{
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    socket.on('send', message=>{
        socket.broadcast.emit('recieve', {name: users[socket.id], message: message})
    });

    socket.on('disconnect', name=>{
        name = users[socket.id]
        socket.broadcast.emit('leave', name)
        delete users[socket.id]
    });
    
})