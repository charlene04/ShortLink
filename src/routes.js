const { Router } = require("express");
const { decodeRouteHandler } = require("./controllers/decodeController");
const { encodeRouteHandler } = require("./controllers/encodeController");
const { statisticsRouteHandler } = require("./controllers/statisticsController");

const router = Router();

router.post('/encode', encodeRouteHandler);
router.post('/decode', decodeRouteHandler);
router.get('/statistic/:key', statisticsRouteHandler);

module.exports = router;
