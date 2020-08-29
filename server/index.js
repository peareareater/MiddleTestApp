const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
const db = require('./helpers/db');
const History = db.History;
const UserList = db.UserList;
const User = db.User;

const app = express();
const PORT = 8080;
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(jwt());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/user', require('./user/controller'));

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

io.on("connection", async socket => {
    const { id } = socket.client;
    io.emit('messages', await History.find());
    io.emit('clients', await UserList.find());
    io.emit('allClients', await User.find());
    io.emit('send-nickname');

    console.log(`User connected: ${id}`);

    socket.on("chat message", msg => {
        io.emit("chat message", msg);
        const message = new History(msg);
        message.save();
    });

    socket.on('send-nickname', async function(username) {
        try {
            socket.nickname = username;
            const user = new UserList({username});
            await user.save();
            io.emit('clients', await UserList.find());
        }catch (e) {
            console.log(e.message);
        }
    });

    socket.on('disconnect', async function(username) {
        await UserList.remove({ username });
        io.emit('clients', await UserList.find());
    });
});


server.listen(8081, () => console.log(`Listen on *: ${PORT}`));

