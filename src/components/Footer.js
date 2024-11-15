import React from 'react';
import './Footer.css'; // You will create this CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      {/* Left: Social Media Icons */}
      <div className="footer-section social-media">
        <h4>Follow Us</h4>
        <a href="https://www.facebook.com/people/Taqueria-Diegolin/61560198725696/?sk=photos" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i> Facebook
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-tiktok"></i> TikTok
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i> Instagram
        </a>
      </div>

      {/* Center: Open Hours */}
      <div className="footer-section open-hours">
        <h4>Open Hours</h4>
        <p>Mon-Sat: 11 AM - 9 PM</p>
        <h4>Contact Us</h4>
        <p>email</p>
      </div>

      {/* Right: Google Maps Location */}
      <div className="footer-section location">
        <h4>Our Location</h4>
        <iframe
          title="Google Maps Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509674!2d144.9537363153165!3d-37.817209979751954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5778c8d9053eab3!2sYour%20Location!5e0!3m2!1sen!2sus!4v1620972450124!5m2!1sen!2sus"
          width="250"
          height="150"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
