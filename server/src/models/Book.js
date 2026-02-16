const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    status: {
        type: String,
        enum: ['Available', 'Borrowed'],
        default: 'Available'
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
