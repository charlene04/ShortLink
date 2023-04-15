const { keyExists, getFromMemory } = require("../utils/memory")

exports.statisticsRouteHandler = (req, res) => {
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
}
