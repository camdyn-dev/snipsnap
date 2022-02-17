module.exports = httpCheck = (originalUrl) => { //checks if http:// or https:// is already prepended to the url
    let prepend;
    if (originalUrl.substring(0, 8) === "https://") {
        prepend = true
    }
    else if (originalUrl.substring(0, 7) === "http://") {
        prepend = true
    }
    else {
        console.log("not prepended chieftan")
        prepend = false
    }
    return prepend
}

//it may seem kinda 1head to do it like this, but it's so someone doesn't do some shit like "alskdfl;ahttps://"