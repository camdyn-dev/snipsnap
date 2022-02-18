module.exports = urlVal = /^(http(s)?:\/\/)(www\.)?([a-zA-Z0-9-]+)(\.)([a-z]{2,3})((\/)?[a-zA-Z0-9\/&()-_=+.?]+)?$/
//this is so fucking confusing to look at, but I'll try to sum it up
//first matcher - check if http OR https is present, with the correct formatting afterwords. the (s)? states that it's optional to have one S
//second matcher - looks for www.
//third matcher - looks for the domain name. domain names can only have characters, numbers and a hyphen, so it workie
//fourth matcher - checks for the domain extension. I should probably change it to a list of the most common extensions, since doing "https://www.www.www.www." is allowed
// fifth matcher - checks for the post domain extension /, then anything goes as long as it fits a-z (upper and lower), 0-9 and ()-_=+.?
//i literally watched a regex video just for this lmao

