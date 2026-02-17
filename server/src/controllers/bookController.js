const Book = require('../models/Book');
const { validationResult } = require('express-validator');

// @desc    Get all books
// @access  Public (or Private)
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a book
// @access  Private/Admin
exports.createBook = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, description, image } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            description,
            image
        });

        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a book
// @access  Private/Admin
exports.updateBook = async (req, res) => {
    const { title, author, description, status, image } = req.body;

    // Build contact object
    const bookFields = {};
    if (title) bookFields.title = title;
    if (author) bookFields.author = author;
    if (description) bookFields.description = description;
    if (image) bookFields.image = image;
    if (status) bookFields.status = status;

    try {
        let book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ msg: 'Book not found' });

        book = await Book.findByIdAndUpdate(
            req.params.id,
            { $set: bookFields },
            { returnDocument: 'after' }
        );

        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a book
// @access  Private/Admin
exports.deleteBook = async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) return res.status(404).json({ msg: 'Book not found' });

        await Book.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Book removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Borrow a book
// @access  Private (User)
exports.borrowBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        if (book.status === 'Borrowed') {
            return res.status(400).json({ msg: 'Book already borrowed' });
        }

        book.status = 'Borrowed';
        await book.save();

        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Return a book
// @access  Private (User/Admin)
exports.returnBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ msg: 'Book not found' });

        book.status = 'Available';
        await book.save();

        res.json(book);
    } catch (err) {
        // console.error(err.message);
        res.status(500).send('Server Error');
    }
};
