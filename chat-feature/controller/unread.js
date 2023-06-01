const router = require('express').Router();

router.get("/", (req, res) => {
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
});

module.exports = router;