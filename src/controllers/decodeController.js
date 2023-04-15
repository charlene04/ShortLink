const { decode } = require("../utils/codec");

exports.decodeRouteHandler = (req, res) => {
    let url = decode(req.body.url);
    if (url) {
        return res.status(200).json({ originalUrl: url });
    }
    return res.status(404).json({
        status: 404,
        message: 'Not Found'
    });
} 
