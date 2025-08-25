const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    totalCopies: {
        type: Number,
        required: true,
        min: 1
    },
        borrowedBy: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String,
        borrowDate: Date,
        returnDate: Date,
        returned: {
            type: Boolean,
            default: false
        }
    }]
}, {
    timestamps: true 
});

module.exports = mongoose.model('Book', bookSchema);