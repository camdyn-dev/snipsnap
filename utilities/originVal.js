module.exports = originVal = (url) => {
    const urlVal = /^(http(s)?:\/\/)([w]{3}\.)?([a-zA-Z0-9\-\.]+)(\.)([a-zA-Z]{2,3}|[a-zA-Z]{1,2}\.[a-zA-Z]{1,2})((\/)[a-zA-Z0-9\/&()\-_=+.?%]*)?$/
    return urlVal.test(url)


}
//regex is so fucking aids to look at, i'll try to explain it
//first block: checks if there's http:// or https://, the (s)? means the S is optional
//second block: optionally checks for "www."
//third block: checks for domain name - i googled it and apparently domains can only contain letters, numbers and hyphens
//fourth block: checks for domain extension; either a 2-3 letter extension (like .com or .xyz) or a 2-4 letter with a "." between (like co.uk)
//fifth block: optionally checks for extensions, like "/?youregonnalove=mynuts" or "/secret/launchCodes.txt". requires "/" to start it

//I learned regex just to do this

