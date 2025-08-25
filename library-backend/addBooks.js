const mongoose = require('mongoose');
require('dotenv').config();
const Book = require('./models/Book');

const books = [
  {
    id: 100,
    title: "Engineering Mechanics: Dynamics",
    author: "J. L. Meriam, L. G. Kraige",
    genre: "Mechanical Engineering",
    quantity: 5,
    totalCopies: 5
  },
  {
    id: 101,
    title: "Thermodynamics: An Engineering Approach",
    author: "Yunus A. Çengel, Michael A. Boles",
    genre: "Mechanical Engineering",
    quantity: 3,
    totalCopies: 3
  },
  {
    id: 102,
    title: "The Art of Electronics",
    author: "Paul Horowitz & Winfield Hill",
    genre: "Electronics Engineering",
    quantity: 4,
    totalCopies: 4
  },
  {
    id: 103,
    title: "Computer Networks",
    author: "Andrew S. Tanenbaum",
    genre: "Computer Engineering",
    quantity: 2,
    totalCopies: 2
  },
  {
    id: 104,
    title: "Introduction to Electrical Engineering",
    author: "Mulukutla S. Sarma",
    genre: "Electrical Engineering",
    quantity: 6,
    totalCopies: 6
  },
  {
    id: 105,
    title: "Civil Engineering Materials",
    author: "Shan Somayaji",
    genre: "Civil Engineering",
    quantity: 1,
    totalCopies: 1
  },
  {
    id: 106,
    title: "Control Systems Engineering",
    author: "Norman S. Nise",
    genre: "Control Engineering",
    quantity: 0,
    totalCopies: 3
  }
];

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');
    
    // Add new books
    for (const bookData of books) {
      const book = new Book(bookData);
      await book.save();
      console.log(`Added: ${book.title} - Quantity: ${book.quantity}`);
    }
    
    console.log('All books added successfully!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });