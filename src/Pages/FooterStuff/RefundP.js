// RefundP.js
import React from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import './FooterStuff.css'; // Import the shared CSS file

export const RefundP = () => {
  return (
    <div className="pagefooter">
      <Nvbr />

      <div className='card'>
      <div className="content">
        <h1>Refund Policy</h1>
        <p>
            Since this page works on a deal between customers, we are not able to refund 
            anything you purchased on this site.


        </p>

  
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about our Refund Policy, please
          contact us at admin@shopy.com. Our customer support team will be happy
          to assist you.
        </p>

      </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundP;
