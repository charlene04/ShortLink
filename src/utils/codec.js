const { getFromMemory, keyExists } = require("./memory");

exports.decode = function (shortUrl) {
    let key = new URL(shortUrl).pathname.split('/')[1];
    if (keyExists(key)) return getFromMemory(key).url;
    return null;
}

exports.encode = function () {
    let key;
    do {
        key = generateString(6);
    } while (keyExists(key));

    let shortUrl = 'http://short.est/' + key;
    return shortUrl;
}

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) { // helper func
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
