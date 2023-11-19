import React from 'react';
import B1 from '../images/B1.jpg';
import B2 from '../images/B2.jpg';
import B3 from '../images/B3.jpg';
import B4 from '../images/B4.jpg';
import B5 from '../images/B5.jpg';

const images = [B1, B2, B3, B4, B5];

const Banner = () => {
  const randomImage = images[Math.floor(Math.random() * images.length)];

  const bannerStyle = {
    backgroundImage: `url(${randomImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  const titleStyle = {
    fontFamily: 'Arial, sans-serif', // Use your desired font-family
    fontSize: '2rem', // Adjust the font size as needed
    fontWeight: 'bold',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    padding: '1rem',
  };

  const descriptionStyle = {
    fontFamily: 'Arial, sans-serif', // Use your desired font-family
    fontSize: '1rem', // Adjust the font size as needed
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '0.5rem',
    borderRadius: '10px',
  };

  return (
    <div className="w-full h-screen relative">
      <div style={bannerStyle}></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ backgroundColor: 'transparent' }}>
        <h1 style={titleStyle}>
          Explore Global Flavors with FlavorFusion
        </h1>
        <p style={descriptionStyle}>
          Discover a world of delicious recipes from around the globe.
        </p>
      </div>
    </div>
  );
};

export default Banner;
