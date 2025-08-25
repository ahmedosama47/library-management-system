const express = require('express');
const Book = require('../models/Book');
const BorrowRecord = require('../models/BorrowRecord'); 
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }
        
        let book;
        
        
        if (!isNaN(query)) {
            book = await Book.findOne({ id: parseInt(query) });
        } else {
            
            book = await Book.findOne({ 
                title: { $regex: query, $options: 'i' } 
            });
        }
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/borrow', authMiddleware, async (req, res) => {
    try {
        const { bookId, borrowDate, returnDate } = req.body;
        
        console.log('User from middleware:', req.user); 
        
        if (!bookId || !borrowDate || !returnDate) {
            return res.status(400).json({ message: 'Book ID, borrow date, and return date are required' });
        }
        
        const book = await Book.findOne({ id: parseInt(bookId) });
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
        if (book.quantity <= 0) {
            return res.status(400).json({ message: 'Book is not available' });
        }
        
       
        const borrowRecord = new BorrowRecord({
            bookId: book.id,
            bookTitle: book.title,
            userId: req.user._id,
            username: req.user.username,
            borrowDate: new Date(borrowDate),
            returnDate: new Date(returnDate)
        });
        
        await borrowRecord.save();
        
        
        book.quantity -= 1;
        await book.save();
        
        res.json({ 
            message: 'Book borrowed successfully', 
            borrowRecord: {
                id: borrowRecord._id,
                bookTitle: book.title,
                username: req.user.username,
                borrowDate: borrowRecord.borrowDate,
                returnDate: borrowRecord.returnDate
            },
            book: {
                id: book.id,
                title: book.title,
                remainingQuantity: book.quantity
            }
        });
    } catch (error) {
        console.error('Borrow error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;