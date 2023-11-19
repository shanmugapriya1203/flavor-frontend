import React from 'react';

const About = () => {
  return (
    <div className="p-4 md:p-8 rounded-lg shadow-lg ">
      <h1 className="text-xl md:text-3xl font-semibold mb-4 mt-10">About Us</h1>
      <p className="text-base md:text-lg">
        Welcome to our website! We are passionate about sharing our{' '}
        <span className="text-green-500">knowledge and expertise</span> in various fields.
      </p>
      <p className="text-base md:text-lg mt-4">
        Our mission is to provide valuable information and resources to our visitors, helping them to learn and grow.
      </p>
      <p className="text-base md:text-lg mt-4">
        Thank you for choosing us as your trusted source for information.
      </p>
      <div className="mt-4 md:mt-6">
        <h2 className="text-base md:text-xl font-semibold">Contact Us</h2>
        <p className="text-sm md:text-base">Email: <span className="text-green-500">contact@example.com</span></p>
        <p className="text-sm md:text-base">Phone: <span className="text-green-500">+91 98567 *****</span></p>
      </div>
    </div>
  );
};

export default About;