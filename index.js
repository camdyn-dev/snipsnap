const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Url = require("./models/url")

const inputVal = require("./utilities/inputVal")
const httpCheck = require("./utilities/httpCheck")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/urlShortener');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const crypto = require("crypto-js")

app.get("/", inputVal, async (req, res) => {
    let originalUrl = req.query.url //grab inputted url
    res.header("Access-Control-Allow-Origin", "*") //this is really annoying, the fetch will not work without it which makes me VERY ANGRY

    originalUrl = httpCheck(originalUrl) //maybe a bit of a finnicky way of doing it? reason for putting it out here is so it won't make dupes, like
    //if https://amazon.com is in DB, if it was under line 28, amazon.com would be allowed. maybe I want to check for www as well?

    const urlCheck = await Url.findOne({ baseUrl: originalUrl })
    if (!urlCheck) { //makes sure there isn't already a URL in that



        const wordArray = crypto.SHA256(originalUrl) //for some reason, it returns a word array
        const preHash = wordArray.toString(crypto.enc.Hex) //which we convert to a hex string with this line
        const hash = preHash.substring(0, 6) //truncate it - 6 characters seems to be great, as 32 ** 6 is fuckin LARGE

        const url = new Url({
            baseUrl: originalUrl,
            newUrl: hash
        })
        await url.save()

        return res.send({ newUrl: url.newUrl }) // 36 ** 6 has like 200 million unique outcomes, so 6 characters should be more than enough
    }

    else { //for line 24
        return res.send({ newUrl: urlCheck.newUrl, urlCheck: "Already in database!" }) //if it already exists, just send it back : I'll find a more elegant solution for this prob
    }

}
)

app.get("/:newUrl", async (req, res) => {
    const { newUrl } = req.params
    console.log(newUrl)
    const url = await Url.findOne({ newUrl })
    console.log(url.baseUrl)
    console.log(url)
    res.redirect(url.baseUrl)

})


app.listen(3000, () => {
    console.log("listening on p3000")
})