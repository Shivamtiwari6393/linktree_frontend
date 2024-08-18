import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import tree from '../assets/tree.png'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
 
        <Link to="/" className="navbar-logo">
          <img src={tree} alt="tree_logo" />
        </Link>
        <div className={`burger-menu ${isMenuOpen ? 'active' : ''}`} onClick={handleMenuToggle}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleMenuToggle}>
              Home
            </Link>
            <hr />
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-links" onClick={handleMenuToggle}>
              Sign In
            </Link>
            <hr />
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-links" onClick={handleMenuToggle}>
              Sign Up
            </Link>
            <hr />
          </li>
        </ul>
    </nav>
  );
};

export default Navbar;
