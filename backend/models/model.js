
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProjectSchema = Schema({
    name: String,
    age: Number,
    duration: Number,
    genre: String,
    description: String,
    image: String,
    png: String,
    video: String
});

module.exports = mongoose.model('peliculas', ProjectSchema);

