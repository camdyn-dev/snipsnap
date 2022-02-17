const mongoose = require('mongoose');

const { Schema } = mongoose

const urlSchema = new Schema({
    baseUrl: String,
    newUrl: String
})

const Url = mongoose.model("Url", urlSchema)

module.exports = Url
