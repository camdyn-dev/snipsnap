module.exports = retrieveVal = (url) => {
    const hexVal = /^[a-f0-9]{7}$/
    return hexVal.test(url)
}

//main file converts the sha256 word array to hexadecimal then truncates it to 7 characters, so this uses regex to make sure it's both hexadecimal and 7 characters