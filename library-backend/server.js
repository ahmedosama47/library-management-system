const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);


app.get('/', (req, res) => {
    res.json({ message: 'Backend Server Running!' });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});