const { encode } = require("../utils/codec");
const { saveToMemory } = require("../utils/memory");

exports.encodeRouteHandler = (req, res) => {
    let longUrl = req.body.url;
    let shortUrl = encode();
    
    // save to memory
    let obj = {
        url: longUrl,
        shortUrl: shortUrl,
        date_encoded: new Date().toLocaleString()
    };
    saveToMemory(key, obj);

    return res.status(200).json({ shortUrl }); 
}
