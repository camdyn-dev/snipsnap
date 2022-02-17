module.exports = httpCheck = (originalUrl) => { //checks if http:// or https:// is already prepended to the url
    let prepend;
    if (originalUrl.substring(0, 8) === "https://") {
        prepend = true
    }
    else if (originalUrl.substring(0, 7) === "http://") {
        prepend = true
    }
    else {
        prepend = false
        originalUrl = "https://" + originalUrl
    }
    console.log(prepend)
    return originalUrl
}

//it may seem kinda 1head to do it with substring, but it's so someone doesn't do some shit like "alskdfl;ahttps://"
//unsure if I want to prepend the url directly in the program or write another function for it, or maybe do it directly in the route instead?