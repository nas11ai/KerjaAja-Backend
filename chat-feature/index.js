var express = require('express');
var router = express.Router();

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = (io) => {
router.get('/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", " * ");
  const socket = io.of('/chat-feature');

  var users = [];

  socket.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('userConnected', (username) => {
      users[username] = socket.id;

      socket.emit("userConnected", username);

      socket.on('getMessages', ({
        sender,
        receiver
      }, callback) => {
        // Ambil pesan dari Redis berdasarkan sender dan receiver
        redisClient.lrange(`sender_${sender}:${receiver}:messages`, 0, -1, (err, messages) => {
          if (err) {
            console.error(err);
            return callback([]);
          }

          // Parse pesan dari JSON strings ke objects
          const parsedMessages = messages.map((message) => JSON.parse(message));
          callback(parsedMessages);
        });
      });

      socket.on("sendMessage", (data) => {
        //kirim pesan ke receiver
        var socketId = users[data.receiver];

        socket.to(socketId).emit("newMessage", data);
        const {
          sender,
          receiver,
          message
        } = data;

        console.log('sender:' + sender + 'receiver:' + receiver + ' message: ' + message);

        const messageData = {
          sender,
          message,
          timestamp: Date.now()
        };

        // Simpan pesan ke Redis
        redisClient.rpush(`sender_${sender}:${receiver}:messages`, JSON.stringify(messageData), (err) => {
          if (err) {
            console.error(err);
          }
          console.log('berhasil diinput ke redis')
        });

        // Menambahkan/increment unread count
        redisClient.hincrby(`sender_:${sender}:unread`, `${receiver}:unread_count`, 1, (err) => {
          if (err) {
            console.error('Gagal menambahkan unread count:', err);
            return res.status(500).json({
              error: 'Gagal menambahkan unread count'
            });
          }
        });
      });
    });

    req.socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });

  res.send("Chat is running");

});
return router;
};