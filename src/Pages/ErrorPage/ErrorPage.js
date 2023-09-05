import React from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import Sad from '../../img/sad.jpg';
import './ErrorPage.css'; // Import the CSS file

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <Nvbr />

      <div className="error-content">
        <h1>Error 404</h1>
        <h2>This link doesn't exist</h2>
        <img src={Sad} alt="Sad Face" />
      </div>

      <Footer />
    </div>
  );
};
