const router = require('express').Router();

const redis = require("redis");
const redisClient = redis.createClient(process.env.REDIS_URL);

router.delete("/", (req, res) => {
    const sender = req.query.sender; // ID pengirim
    const receiver = req.query.receiver; // ID penerima

    // Ambil jumlah pesan yang belum dibaca
    redisClient.del(`sender_${sender}:${receiver}:messages`, (err, count) => {
        if (err) {
            console.error('Gagal menghapus pesan:', err);
            return res.status(500).json({
                error: 'Gagal menghapus pesan'
            });
        }
    });
});

module.exports = router;