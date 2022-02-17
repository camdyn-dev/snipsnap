const express = require("express");
const app = express();

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/urlShortener');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const crypto = require("crypto-js")

app.get("/", (req, res) => {
    if (typeof (req.query.url) === "string") { //makes sure they're not passing in an array or some other shit that no good

        if (req.query.url.indexOf("$") === -1) { //makes sure there isn't a $ in the string since mongo no likey that

            const wordArray = crypto.SHA256(req.query.url) //for some reason, it returns a word array
            const hash = wordArray.toString(crypto.enc.Hex) //which we convert to a hex string with this line

            res.header("Access-Control-Allow-Origin", "*") //this is really annoying, the fetch will not work without it which makes me VERY ANGRY
            res.send(hash.substring(0, 6)) // 36 ** 6 has like 200 million unique outcomes, so 6 characters should be more than enough
        }
        else {
            res.send("That input is not accepted! F U C K  Y O U ")
        }
    }
})


app.listen(3000, () => {
    console.log("listening on p3000")
})