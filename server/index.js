const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');

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

io.on("connection", socket => {
    const { id } = socket.client;
    console.log(`User connected: ${id}`);
    socket.on("chat message", msg => {
        console.log(msg, 'qweqwe');
        io.emit("chat message", msg);
    });
});


server.listen(8081, () => console.log(`Listen on *: ${PORT}`));

