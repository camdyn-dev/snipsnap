const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Url = require("./models/url")

const preVal = require("./utilities/preVal")
const originVal = require("./utilities/originVal")
const retrieveVal = require("./utilities/retrieveVal")

const httpCheck = require("./utilities/httpCheck")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/urlShortener');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const crypto = require("crypto-js")

app.get("/", preVal, async (req, res) => {
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

            return res.send({ result: url.newUrl }) // 36 ** 6 has like 200 million unique outcomes, so 6 characters should be more than enough
        }

        else { //for line 34
            return res.send({ result: dupeCheck.newUrl }) //if it already exists, just send it back : I'll find a more elegant solution for this prob
        }

    }

    else { //for line 31
        console.log("fuckin idiot didn't put the shit in correctly KEKEKEKEKEKEKEKEKEKE ")
        return res.send({ result: "ERROR: Input not formatted correctly!" })
    }
}
)

app.get("/:newUrl", async (req, res) => {
    const { newUrl } = req.params
<<<<<<< HEAD
    if (retrieveVal(newUrl)) {
        const url = await Url.findOne({ newUrl })
        if (url) {
            return res.redirect(url.baseUrl)
        }
        else {
            return res.send("That URL isn't valid! Please try again")
        }
=======
    console.log(retrieveVal(newUrl))
    const url = await Url.findOne({ newUrl })
    if (url) {
        return res.redirect(url.baseUrl)
>>>>>>> 862c1eff22a5a35eb728a8714f040b9bf3f3a969
    }
    else {
        return res.send("That URL isn't valid! Please try again")
    }


})


app.listen(3000, () => {
    console.log("listening on p3000")
})