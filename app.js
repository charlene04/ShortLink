const express = require("express");
const app = express();

const { encode, decode } = require("./utils/codec");
const { keyExists, getFromMemory } = require("./utils/memory");

app.use(express.json());       
app.use(express.urlencoded({ extended: true }));

app.post('/encode', (req, res) => {
    let longUrl = req.body.url;
    return res.status(200).json({ shortUrl: encode(longUrl) }); 
})

app.post('/decode', (req, res) => {
    let url = decode(req.body.url);
    if (url) {
        return res.status(200).json({ originalUrl: url });
    }
    return res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
})

app.get('/statistic/:key', (req, res) => {
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


module.exports = app.listen(3000, () => {
    console.log("Sever running on port 3000");
});
