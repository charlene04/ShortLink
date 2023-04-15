const { encode } = require("../utils/codec");

exports.encodeRouteHandler = (req, res) => {
    let longUrl = req.body.url;
    return res.status(200).json({ shortUrl: encode(longUrl) }); 
}
