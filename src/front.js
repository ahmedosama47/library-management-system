import React, { useState } from "react";
import { FloatingLabel, Form, Button, Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "./auth";
import './login.css';
import './front.css';
import image5 from './image5.png';
import image1 from './image1.png';
import image2 from'./image2.png';
import image3 from'./image3.png';
import image4 from'./image4.png';
import book1 from './Book1.jpg';
import book2 from './Book2.jpg';
import book3 from './Book3.jpg';
import book4 from './Book4.jpg';
import book5 from './Book5.jpg';
import book6 from './Book6.jpg';
import book7 from './Book7.jpg';

function Front() {
  const [showBorrow, setShowBorrow] = useState(false);
  const [showBooks, setShowBooks] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [borrowData, setBorrowData] = useState({
    bookId: '',
    borrowDate: '',
    returnDate: ''
  });
  const { user, logout } = useAuth();

  const searchBook = async (query) => {
    if (!query.trim()) {
      setSearchResult(null);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/books/search?query=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
        setBorrowData({ ...borrowData, bookId: data.id });
      } else {
        setSearchResult({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error searching book:', error);
      setSearchResult({ error: 'Search failed' });
    }
  };

const handleBorrowSubmit = async (e) => {
    e.preventDefault();
    
    if (!borrowData.bookId) {
        alert('Please search and select a book first');
        return;
    }

    if (!borrowData.borrowDate || !borrowData.returnDate) {
        alert('Please fill in borrow and return dates');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); 
        
        const response = await fetch('http://localhost:5000/api/books/borrow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ 
                bookId: borrowData.bookId,
                borrowDate: borrowData.borrowDate,
                returnDate: borrowData.returnDate
            })
        });

        const data = await response.json();
        console.log('Response data:', data); 
        
        if (response.ok) {
            alert(`Book "${data.book.title}" borrowed successfully!\nBorrowed by: ${data.borrowRecord.username}\nReturn by: ${new Date(data.borrowRecord.returnDate).toLocaleDateString()}`);
            setBorrowData({ bookId: '', borrowDate: '', returnDate: '' });
            setSearchResult(null);
            setSearchQuery('');
        } else {
            alert(data.message || 'Failed to borrow book');
        }
    } catch (error) {
        console.error('Full error:', error);
        alert('Error borrowing book: ' + error.message);
    }
};

  const handleNav = (section) => {
    if (section === "borrow") {
      setShowBorrow(true);
      setShowBooks(false);
    } else if (section === "books") {
      setShowBooks(true);
      setShowBorrow(false);
    } else {
      setShowBorrow(false);
      setShowBooks(false);
    }
  };

  return (
    <div className="Front">
      {!user && (
        <Link to={`/login`}>
          <Button type="button" className="sign-in">
            Sign In
          </Button>
        </Link>
      )}

      {user && (
        <Button
          variant="danger"
          className="log-out"
          onClick={logout}
        >
          Log Out
        </Button>
      )}
      
      <Navbar expand="md" className="front-navbar" variant="dark">
        <Container>
          <Navbar.Brand style={{ fontWeight: 700, color: 'black' }}>Library Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="front-navbar" />
          <Navbar.Collapse id="front-navbar">
            <Nav className="me-auto">
              <Nav.Link onClick={() => handleNav("about")} style={{ color: 'black' }}>About Us</Nav.Link>
              <Nav.Link onClick={() => handleNav("books")} style={{ color: 'black' }}>Books</Nav.Link>
              {user && (
                <Nav.Link onClick={() => handleNav("borrow")} style={{ color: 'black' }}>Borrow a Book</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* About Us Section */}
        {!showBorrow && !showBooks && (
          <div style={{ marginTop: "4rem" }}>
            <h1>Welcome to the Library Portal</h1>
            
            <div className="about-partition">
              <img src={image1} alt="Reading Book" className="about-img" />
              <div className="about-text">
                <div className="about-eyebrow">About Us</div>
                <div className="about-headline">
                  Welcome to AAST Library, a place where knowledge, imagination, and community come together.
                </div>
                <div className="about-desc">
                  Our mission is to make reading and learning accessible, enjoyable, and inspiring for everyone.
                </div>
              </div>
            </div>
            
            <div className="about-partition">
              <img src={image2} alt="Reading Book" className="about-img" />
              <div className="about-text">
                <div className="about-eyebrow">About Us</div>
                <div className="about-headline">
                  We believe that a library is more than just a collection of books—it's a gateway to new ideas, lifelong learning, and personal growth.
                </div>
                <div className="about-desc">
                  Whether you're here to borrow a novel, research a topic, attend an event, or simply enjoy a quiet reading corner, our library is designed to meet your needs.
                </div>
              </div>
            </div>
            
            <div className="about-partition">
              <img src={image3} alt="Reading Book" className="about-img" />
              <div className="about-text">
                <div className="about-eyebrow">About Us</div>
                <div className="about-headline">
                  Our collection spans a wide range of genres and formats—from timeless classics to the latest bestsellers, from academic journals to children's picture books.
                </div>
                <div className="about-desc">
                  We also offer digital resources, online catalogs, and interactive tools to make finding and accessing information easier than ever.
                </div>
              </div>
            </div>
            
            <div className="about-partition">
              <img src={image4} alt="Reading Book" className="about-img" />
              <div className="about-text">
                <div className="about-eyebrow">About Us</div>
                <div className="about-headline">
                  Beyond books, we host workshops, reading clubs, cultural events, and educational programs to bring people together and encourage a love of learning.
                </div>
                <div className="about-desc">
                  Our friendly team is always ready to help you find the right book, navigate our digital systems, or recommend something new to explore.
                </div>
              </div>
            </div>
            
            <div className="about-partition">
              <img src={image5} alt="Reading Book" className="about-img" />
              <div className="about-text">
                <div className="about-eyebrow">About Us</div>
                <div className="about-headline">
                  At AAST Library, we're committed to preserving the joy of reading while embracing technology to make knowledge accessible to all.
                </div>
                <div className="about-desc">
                  Together, let's turn every page into a new adventure.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Borrow Section  */}
        {showBorrow && user && !showBooks && (
          <div className="borrow-form">
            <h3 className="mb-4" style={{ textAlign: "center" }}>
              Borrow a Book
            </h3>
            
            
            <div className="mb-4">
              <FloatingLabel controlId="bookSearch" label="Search by Book ID or Name" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Search by Book ID or Name"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    searchBook(e.target.value);
                  }}
                />
              </FloatingLabel>
              
              {searchResult && !searchResult.error && (
                <div className="search-result p-3 border rounded mb-3" style={{ backgroundColor: '#f8f9fa' }}>
                  <h5>{searchResult.title}</h5>
                  <p><strong>Author:</strong> {searchResult.author}</p>
                  <p><strong>Genre:</strong> {searchResult.genre}</p>
                  <p><strong>ID:</strong> {searchResult.id}</p>
                  <p><strong>Available Copies:</strong> 
                    <span style={{ color: searchResult.quantity > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
                      {searchResult.quantity > 0 ? searchResult.quantity : 'Unavailable'}
                    </span>
                  </p>
                </div>
              )}
              
              {searchResult && searchResult.error && (
                <div className="alert alert-danger">{searchResult.error}</div>
              )}
            </div>

            <Form onSubmit={handleBorrowSubmit}>
              <FloatingLabel controlId="selectedBookId" label="Selected Book ID" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Selected Book ID"
                  value={borrowData.bookId}
                  readOnly
                  style={{ backgroundColor: '#e9ecef' }}
                />
              </FloatingLabel>
              <FloatingLabel controlId="borrowDate" label="Borrow Date" className="mb-3">
                <Form.Control 
                  type="date" 
                  placeholder="Borrow Date"
                  value={borrowData.borrowDate}
                  onChange={(e) => setBorrowData({ ...borrowData, borrowDate: e.target.value })}
                  required
                />
              </FloatingLabel>
              <FloatingLabel controlId="returnDate" label="Return Date" className="mb-3">
                <Form.Control 
                  type="date" 
                  placeholder="Return Date"
                  value={borrowData.returnDate}
                  onChange={(e) => setBorrowData({ ...borrowData, returnDate: e.target.value })}
                  required
                />
              </FloatingLabel>
              <Button 
                variant="success" 
                type="submit" 
                className="w-100 mt-2"
                disabled={!borrowData.bookId || (searchResult && searchResult.quantity <= 0)}
              >
                Borrow Book
              </Button>
            </Form>
          </div>
        )}

        {/* Books Section - Keep as is */}
        {!showBorrow && showBooks && (
          <>
          <h2 className="text-center mb-4">Our Top Picks</h2>
          <div className="book-body">
          <div className="slider-container">
            <div className="slider">
              <div className="slide">
                <img src={book1} alt="Book 1" />
              </div>
              <div className="slide">
                <img src={book2} alt="Book 2" />
              </div>
              <div className="slide">
                <img src={book3} alt="Book 3" />
              </div>
              <div className="slide">
                <img src={book4} alt="Book 4" />
              </div>
            </div>
          </div>
          </div>
    <div className="book-cards-container">
      <h3 className="text-center mb-4">Browse Our Collection</h3>
      <div className="book-cards-grid">
        
        <div className="book-card">
          <img src={book1} alt="Book 1" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Engineering Mechanics: Dynamics</h4>
            <p>Author: J. L. Meriam, L. G. Kraige</p>
            <p>Genre: Mechanical Engineering</p>
            <p>ID : 100</p>
          </div>
        </div>

        <div className="book-card">
          <img src={book2} alt="Book 2" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Thermodynamics: An Engineering Approach</h4>
            <p>Author: Yunus A. Çengel, Michael A. Boles</p>
            <p>Genre: Mechanical / Energy Systems</p>
            <p>ID : 101</p>
          </div>
        </div>

        <div className="book-card">
          <img src={book3} alt="Book 3" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>The Art of Electronics</h4>
            <p>Author: Paul Horowitz & Winfield Hill</p>
            <p>Genre: Electronics / Electrical Engineering</p>
            <p>ID : 102</p>
          </div>
        </div>

        <div className="book-card">
          <img src={book4} alt="Book 4" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Computer Networks</h4>
            <p>Author: Andrew S. Tanenbaum, David J. Wetherall </p>
            <p>Genre: Computer Engineering / Networks</p>
            <p>ID : 103 </p>
          </div>
        </div>

        <div className="book-card">
          <img src={book5} alt="Book 5" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Introduction to Electrical Engineering</h4>
            <p>Author: Mulukutla S. Sarma</p>
            <p>Genre: Electrical Engineering</p>
            <p>ID : 104</p>
          </div>
        </div>

        <div className="book-card">
          <img src={book6} alt="Book 6" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Civil Engineering Materials</h4>
            <p>Author: Shan Somayaji</p>
            <p>Genre: Civil Engineering</p>
            <p>ID : 105</p>
          </div>
        </div>
           <div className="book-card">
          <img src={book7} alt="Book 7" className="book-card-img" />
          <div className="book-card-overlay">
            <h4>Control Systems Engineering</h4>
            <p>Author: Norman S. Nise</p>
            <p>Genre: Control Engineering</p>
            <p>ID : 106</p>
          </div>
        </div>

      </div>
    </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default Front;