import React from 'react';
import heroBackground from '../images/test.jpg';  // Importing the image
//<button className="order-now-btn">Order Now</button> (under h1)
function Hero() {
    return (
        <header className="hero" style={{ backgroundImage: `url(${heroBackground})` }}>
            <h1>Welcome to Taqueria Diegolin</h1>
            
        </header>
    );
}

export default Hero;
