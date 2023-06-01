const router = require('express').Router();

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

router.post("/", (req, res) => {
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

  module.exports =router;