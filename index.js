const express = require("express");
const app = express();

const mongoose = require('mongoose');
const Url = require("./models/url")

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/urlShortener');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const crypto = require("crypto-js")

app.get("/", async (req, res) => {
    const originalUrl = req.query.url
    if (typeof (originalUrl) === "string") { //makes sure they're not passing in an array or some other shit that no good

        if (originalUrl.indexOf("$") === -1) { //makes sure there isn't a $ in the string since mongo no likey that
            res.header("Access-Control-Allow-Origin", "*") //this is really annoying, the fetch will not work without it which makes me VERY ANGRY

            const urlCheck = await Url.findOne({ baseUrl: originalUrl })
            if (!urlCheck) { //makes sure there isn't already a URL in that

                //grab original URL

                const wordArray = crypto.SHA256(originalUrl) //for some reason, it returns a word array
                const preHash = wordArray.toString(crypto.enc.Hex) //which we convert to a hex string with this line
                const hash = preHash.substring(0, 6) //truncate it - 6 characters seems to be great, as 32 ** 6 is fuckin LARGE

                const url = new Url({
                    baseUrl: req.query.url,
                    newUrl: hash
                })
                await url.save()

                return res.send(url.newUrl) // 36 ** 6 has like 200 million unique outcomes, so 6 characters should be more than enough
            }

            else { //for line 24
                return res.send(urlCheck.newUrl) //if it already exists, just send it back : I'll find a more elegant solution for this prob
            }

        }

        else { //for line 22
            return res.send("ERROR: DON'T TRY TO INPUT FUCK ME RETARD")
        }

    }

    else { //for line 20
        return res.send("That input is not accepted! F U C K  Y O U ")
    }
}
)

app.get("/:newUrl", async (req, res) => {
    const { newUrl } = req.params
    const url = await Url.findOne({ newUrl: newUrl })
    res.redirect(url.baseUrl)

})


app.listen(3000, () => {
    console.log("listening on p3000")
})