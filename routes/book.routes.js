const express = require('express');
const router = express.Router();

const controller = require('../controllers/book.controllers');
const jwtAuth = require('../middleware/auth');

module.exports = router;

router.get('/books', controller.getBooks);
router.post('/books', jwtAuth, controller.addBook);
router.put('/books/:bookId', jwtAuth, controller.changeBook);
router.delete('/books/:bookId', jwtAuth, controller.removeBook);
router.get('/books/:bookId', controller.getBook);
