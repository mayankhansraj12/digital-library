const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const bookController = require('../controllers/bookController');
const { check } = require('express-validator');

// Public/Private: Get all books
router.get('/', auth, bookController.getBooks);

// Admin: Add Book
router.post(
    '/',
    [
        auth,
        role('admin'),
        [
            check('title', 'Title is required').not().isEmpty(),
            check('author', 'Author is required').not().isEmpty()
        ]
    ],
    bookController.createBook
);

// Admin: Update Book
router.put('/:id', [auth, role('admin')], bookController.updateBook);

// Admin: Delete Book
router.delete('/:id', [auth, role('admin')], bookController.deleteBook);

// @route   PUT /api/books/:id/borrow
// @desc    Borrow a book
// @access  Private/Admin
router.put('/:id/borrow', auth, role('admin'), bookController.borrowBook);

// @route   PUT /api/books/:id/return
// @desc    Return a book
// @access  Private/Admin
router.put('/:id/return', auth, role('admin'), bookController.returnBook);

module.exports = router;
