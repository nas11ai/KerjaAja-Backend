require('dotenv').config();
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

//api untuk return all messages
app.get("/getMessages", (req, res) => {
  const sender = req.query.sender; // ID pengirim
  const receiver = req.query.receiver; // ID penerima

  const redisKey = `sender_${sender}:${receiver}:messages`;
  console.log(redisKey);
  redisClient.lrange(redisKey, 0, -1, (err, messages) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Gagal mengambil pesan dari Redis"
      });
      return;
    }

    const parsedMessages = messages.map((message) => JSON.parse(message));
    res.status(200).json({
      messages: parsedMessages
    });
  });
});

//api untuk mengambil jumlah pesan yang belum dibaca
app.get("/getUnreadMessages", (req, res) => {
  const sender = req.query.sender; // ID pengirim
  const receiver = req.query.receiver; // ID penerima

  // Ambil jumlah pesan yang belum dibaca
  redisClient.hget(`sender_:${sender}:unread`, `${receiver}:unread_count`, (err, count) => {
    if (err) {
      console.error('Gagal mengambil jumlah pesan yang belum dibaca:', err);
      return res.status(500).json({
        error: 'Gagal mengambil jumlah pesan yang belum dibaca'
      });
    }
    // Emit Socket.IO event to send unread count
    const channel = `sender:${sender}:receiver`;
    io.to(channel).emit('unreadCount', {
      count
    });
    res.status(200).json({
      unreadCount: count || 0
    });
  });
})

//api untuk menandai pesan sudah terbaca
app.post("/readMessages", (req, res) => {
  const sender = req.query.sender; // ID pengirim
  const receiver = req.query.receiver; // ID penerima

  // Reset unread count menjadi 0
  redisClient.hset(`sender:${sender}:unread`, `${receiver}:unread_count`, 0, (err) => {
    if (err) {
      console.error('Gagal menghapus pesan yang sudah dibaca:', err);
      return res.status(500).json({
        error: 'Gagal menghapus pesan yang sudah dibaca'
      });
    }
    // Emit Socket.IO event untuk memberi notif pesan sudah dibaca
    const channel = `sender:${receiver}:receiver`;
    io.to(channel).emit('messageRead', {
      sender,
      receiver
    });

    res.status(201).json({
      message: 'Pesan sudah dibaca'
    });
  });

})


var users = [];

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('userConnected', (username) => {
    users[username] = socket.id;

    io.emit("userConnected", username);

    socket.on("sendMessage", (data) => {
      //send event ro receiver
      var socketId = users[data.receiver];

      io.to(socketId).emit("newMessage", data);
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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:5000');
});