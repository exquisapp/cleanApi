// const Book = require('../models/book.model');
const db = require('../helpers/db');

const Book = db.Book;

module.exports = {
    getBooks: function(req, res, next) {
        Book.find().exec()
            .then(books => {
                res.status(200).json({
                    count: books.length,
                    books: books
                });
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
                next();
            })
    },
    addBook: function(req, res, next) {
        new Book({
            title: req.body.title,
            page: req.body.page,
            year: req.body.year,
            author: req.body.author,
            genre: req.body.genre
        }).save()
            .then(result => {
                res.status(200).json({ message: 'New book has been added', book: result });
                next();
            })
            .catch(err => {
                res.status(500).json({ error: err });
                next();
            });
    },
    changeBook: function(req, res, next) {
        Book.findOneAndUpdate({ _id: req.params.bookId }, req.body )
            .then(result => {
                res.status(200).json({ message: 'Book has been updated', book: result })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    },
    removeBook: function(req, res, next) {
        Book.findByIdAndRemove({_id: req.params.bookId }).exec()
            .then(result => {
                res.status(200).json({ message: 'Book has been deleted' })
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    },
    getBook: function(req, res, next) {
        Book.findById({ _id: req.params.bookId }).exec()
            .then(book => {
                if (book) return res.status(200).json({ message: 'Here is the book details', book: book });
                res.status(409).json({ message: 'Book not available' });
                next();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: err });
            })
    }
}