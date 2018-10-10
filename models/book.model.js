const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
    title: { type: String, required: true },
    page: { type: Number, required: true },
    year: { type: Number, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);