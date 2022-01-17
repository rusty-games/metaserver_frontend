var app = require('express')();
const server = require("http").createServer(app);
const PORT = 3001;
const io = require("socket.io")(server);
const users = {};
let rooms = [];
server.listen(PORT, () => {
  console.log("Serwer śmiga");
});

io.on("connection", client => {
  console.log("Udało sie");
  client.emit('connection', null);
    client.on("username", username => {
      const user = {
        name: username,
        id: client.id
      };
      users[client.id] = user;
      io.emit("connected", user);
      io.emit("users", Object.values(users)); 
    });
  
  //   client.on("disconnect", () => {
  //     const username = users[client.id];
  //     delete users[client.id];
  //     io.emit("disconnected", client.id);
  //   });
  });

