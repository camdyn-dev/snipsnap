const express = require("express");
const app = express();

const crypto = require("crypto-js")

app.get("/", (req, res) => {
    const wordArray = crypto.SHA256("hello") //for some reason, it returns a word array
    const hash = wordArray.toString(crypto.enc.Hex) //which we convert to a hex string with this line
})


app.listen(3000, () => {
    console.log("listening on p3000")
})