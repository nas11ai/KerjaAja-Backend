var express = require('express');
var router = express.Router();

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = (io) => {
  router.use('/', (req, res, next) => {
    res.send("Chat is running");
    next();
  });
  
  const chatIo = io.of('/chat-feature');
  var users = [];
  
  chatIo.on('connection', (socket) => {
    console.log('User connected', socket.id);
    
    socket.on('userConnected', (userId) => {
      const socketId = socket.id;
      users[userId] = socketId;
      
      redisClient.hmset("online_users", userId, socketId, (err, reply) => {
        if (err) {
          console.error('Gagal menyimpan data user online:', err);
        }
      });

      chatIo.emit('userConnected', userId);
    });
  
    socket.on('getMessages', ({ receiver, sender }, callback) => {


      redisClient.lrange(`sender_${sender}:${receiver}:messages`, 0, -1, (err, senderToReceiverMessages) => {
        if (err) {
          console.error(err);
          return callback([]);
        }

        redisClient.lrange(`sender_${receiver}:${sender}:messages`, 0, -1, (err, receiverToSenderMessages) => {
          if (err) {
            console.error(err);
            return callback([]);
          }

          const SenderToReceiver = senderToReceiverMessages.map((message) => JSON.parse(message));
          const ReceiverToSender = receiverToSenderMessages.map((message) => JSON.parse(message));
          const allMessages = SenderToReceiver.concat(ReceiverToSender);
          const sortedMessages = allMessages.sort((a, b) => a.timestamp - b.timestamp);
          callback(sortedMessages);

        });
      });
    });
  
    socket.on("sendMessage", (data) => {
      const { sender, receiver, message } = data;
      const messageData = {
        sender,
        message,
        timestamp: Date.now()
      };
      
      if (users.hasOwnProperty(receiver)) {
        const socketId = users[receiver];
        chatIo.to(socketId).emit("newMessage", data);
        
      }

      redisClient.rpush(`sender_${sender}:${receiver}:messages`, JSON.stringify(messageData), (err) => {
        if (err) {
          console.error(err);
        }
      });
  
      redisClient.hincrby(`sender_:${sender}:unread`, `${receiver}:unread_count`, 1, (err) => {
        if (err) {
          console.error('Gagal menambahkan unread count:', err);
        }
      });
    });
  
    socket.on('messageRead', (data) => {
      const { sender, receiver } = data;
      redisClient.hset(`sender:${sender}:unread`, `${receiver}:unread_count`, 0, (err) => {
        if (err) {
          console.error('Gagal menghapus unread :', err);
        }
        const channel = `sender:${receiver}:receiver`;
        chatIo.to(channel).emit('messageRead', { sender, receiver });
      });
    });
  
    socket.on('getUnreadMessages', (data) => {
      const { sender, receiver } = data;
      redisClient.hget(`sender_:${sender}:unread`, `${receiver}:unread_count`, (err, count) => {
        if (err) {
          console.error('Gagal mengambil jumlah pesan yang belum dibaca:', err);
        }
        const channel = `sender:${sender}:receiver`;
        io.to(channel).emit('unreadCount', { count });
      });
    });
  
    socket.on('disconnected', () => {
      const userId = Object.keys(users).find(key => users[key] === socket.id);

      // Hapus data pengguna online dari Redis menggunakan userId sebagai kunci
      if (userId) {
        redisClient.hdel("online_users", userId, (err) => {
          if (err) {
            console.error('Gagal menghapus data pengguna online:', err);
          }
        });
      }
    });
  });

 
return router;
};