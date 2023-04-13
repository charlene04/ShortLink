const express = require("express");
const app = express();

const { encode } = require("./utils/codec");

app.use(express.json());       
app.use(express.urlencoded({ extended: true }));

app.post('/encode', (req, res) => {
    let longUrl = req.body.url;
    return res.status(200).json({ shortUrl: encode(longUrl) }); 
})


app.listen(3000, () => {
    console.log("Sever running on port 3000");
});
