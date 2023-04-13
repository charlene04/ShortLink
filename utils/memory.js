const NodeCache = require("node-cache");

const myCache = new NodeCache({ stdTTL: 1800 }); // Time To Live: 30 minutes

// save key, value to memory 
exports.saveToMemory = function (key, value) {
    myCache.set(key, value);
}

// Get value from memory using key
exports.getFromMemory = function (key) {
    if (myCache.has(key)) {
        return myCache.get(key);
    }
    return null;
}

// Checks if key exists in order not to override existing keys
exports.keyExists = function (key) {
    return myCache.has(key);
}
