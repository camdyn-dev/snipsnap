module.exports = inputVal = (req, res, next) => {
    const query = req.query.url
    if (typeof (query) === "string" && query.indexOf("$") === -1) {
        return next()
    } else {
        res.header("Access-Control-Allow-Origin", "*")
        return res.send("ERROR: Invalid input, fucking eeedeeediot")
    }
}

//line 3 serves 2 purposes (WOW I WONDER HOW ANYONE WOULD'VE FUCKING GUESSED THAT?!??!?!@?@!!@);
//1: make sure they're not passing in an array, like /?url=bobs&url=vagana
//2: make sure it doesn't contain a dollar sign, since that can be used for mongo injections apparently