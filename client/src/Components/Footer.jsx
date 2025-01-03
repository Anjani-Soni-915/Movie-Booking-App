import React from 'react';
import Logo from "/spotLyte.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <ul>
            <li><a href="#">About BookMyShow</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help</h4>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><img src="https://e7.pngegg.com/pngimages/991/568/png-clipart-facebook-logo-computer-icons-facebook-logo-facebook-thumbnail.png" alt="Facebook" /></a>
            <a href="#"><img src="https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png" alt="Twitter" /></a>
            <a href="#"><img src="https://i.pinimg.com/736x/24/37/73/2437730f7e3a5705e205e67fa2cd1020.jpg" alt="Instagram" /></a>
            <a href="#"><img src="https://img.freepik.com/premium-vector/linkedin-round-logo-vector_667864-108.jpg" alt="LinkedIn" /></a>
          </div>
        </div>
      </div>
      <div className="footer-line">
        <img src={Logo} alt="BookMyShow Logo" className="footer-logo" />
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SpotLyte. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
