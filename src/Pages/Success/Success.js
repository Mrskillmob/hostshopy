import React from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import './Success.css'; // Import your custom CSS file for styling

export const Success = () => {
  
    setTimeout(() => { 
        window.location.replace("/shopy/");
      }, 2000);
  
    return (
        <div>
            <Nvbr />

            <div className="success-container">
                <h2 className="success-message">Success!</h2>
            </div>

            <Footer />
        </div>
    );
};
