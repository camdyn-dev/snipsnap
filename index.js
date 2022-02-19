if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const app = express();
const rateLimit = require('express-rate-limit')

const mongoose = require('mongoose');
const Url = require("./models/url")

const preVal = require("./utilities/preVal")
const originVal = require("./utilities/originVal")
const retrieveVal = require("./utilities/retrieveVal")

const httpCheck = require("./utilities/httpCheck")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_LINK);
}
//mongodb://localhost:27017/urlShortener

const limit = rateLimit({ //express rate limit
    windowMs: 60 * 60 * 1000, // one hour
    max: 50, // 50 address creations per hour
    message: "Too many requests in the past hour! Please try again later",
    standardHeaders: true, // honeslty dunno what these two do
    legacyHeaders: false, // but they're on in the docs so they're probably good
})


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const crypto = require("crypto-js")

app.get("/", limit, preVal, async (req, res) => {
    let originalUrl = req.query.url //grab inputted url
    res.header("Access-Control-Allow-Origin", "*") //this is really annoying, the fetch will not work without it which makes me VERY ANGRY

    originalUrl = httpCheck(originalUrl) //maybe a bit of a finnicky way of doing it? reason for putting it out here is so it won't make dupes, like
    //if https://amazon.com is in DB, if it was under line 28, amazon.com would be allowed. maybe I want to check for www as well?

    if (originVal(originalUrl)) {


        const dupeCheck = await Url.findOne({ baseUrl: originalUrl })
        if (!dupeCheck) { //makes sure there isn't already a URL in that



            const wordArray = crypto.SHA256(originalUrl) //for some reason, it returns a word array
            const preHash = wordArray.toString(crypto.enc.Hex) //which we convert to a hex string with this line
            const hash = preHash.substring(0, 7) //truncate it - 7 characters seems to be great, as 16 ** 7 is fuckin LARGE
            const url = new Url({
                baseUrl: originalUrl,
                newUrl: hash
            })
            await url.save()

            return res.send({ result: `${process.env.DOMAIN}${url.newUrl}` })
        }

        else { //for line 34
            return res.send({ result: `${process.env.DOMAIN}${dupeCheck.newUrl}`, extras: "Already in DB!" }) //if it already exists, just send it back : I'll find a more elegant solution for this prob
        }

    }

    else { //for line 31
        return res.send({ result: "ERROR: Input not formatted correctly!" })
    }
}
)

app.get("/:newUrl", async (req, res) => {
    const { newUrl } = req.params
    if (retrieveVal(newUrl)) {
        const url = await Url.findOne({ newUrl })
        if (url) {
            return res.redirect(url.baseUrl)
        }
        else {
            return res.send("That URL isn't valid! Please try again")
        }
    }
    else {
        return res.send("That URL isn't valid! Please try again")
    }


})


app.listen(process.env.PORT, () => {
<<<<<<< HEAD
    console.log("listening on whatever port is in the env")
=======
    console.log("listening on whatever port in da ENV")
>>>>>>> heroku
})