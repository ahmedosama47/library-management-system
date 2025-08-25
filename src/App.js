import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './footer';
import Front from './front';
import Login from './login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './auth';

function App() {


  return (
    <div className="App">
      
    <AuthProvider>
    <Router>
      <Routes>
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />
      
      </Routes>
    </Router>
    </AuthProvider>
      <Footer />
      
    

      
      
      
    </div>

  );
}

export default App;