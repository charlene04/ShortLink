const { Router } = require("express");
const router = Router();

const { encode, decode } = require("./utils/codec");
const { keyExists, getFromMemory } = require("./utils/memory");

router.post('/encode', (req, res) => {
    let longUrl = req.body.url;
    return res.status(200).json({ shortUrl: encode(longUrl) }); 
})

router.post('/decode', (req, res) => {
    let url = decode(req.body.url);
    if (url) {
        return res.status(200).json({ originalUrl: url });
    }
    return res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
})

router.get('/statistic/:key', (req, res) => {
    let key = req.params.key;
    if (keyExists(key)) {
        return res.status(200).json({
            stats: getFromMemory(key)
        }); 
    }
    return res.status(404).json({
        status: 404,
        message: 'No Stats Found'
    });
})

module.exports = router;
