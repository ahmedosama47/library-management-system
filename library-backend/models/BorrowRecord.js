const mongoose = require('mongoose');

const borrowRecordSchema = new mongoose.Schema({
    bookId: {
        type: Number,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    borrowDate: {
        type: Date,
        required: true
    },
    returnDate: {
        type: Date,
        required: true
    },
    actualReturnDate: {
        type: Date,
        default: null
    },
    returned: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['borrowed', 'returned', 'overdue'],
        default: 'borrowed'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('BorrowRecord', borrowRecordSchema);