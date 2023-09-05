// PrivacyP.js
import React from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import './FooterStuff.css'; // Import the shared CSS file


export const PrivacyP = () => {
  return (
    <div className="pagefooter">
      <Nvbr />

      <div className="card">
        <div className="card-content">
          <h1>Privacy Policy</h1>
          <p>
            At Shopy, we are committed to protecting your privacy
            and ensuring the security of your personal information. This Privacy
            Policy outlines the types of personal information we collect, how we
            use and safeguard your information, and your rights concerning your
            personal data.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We may collect certain personal information from you, including but
            not limited to your name, email address, mailing address, phone
            number, and payment details when you use our services or make a
            purchase on our website.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            We use the information we collect to process your orders, provide
            customer support, improve our services, and communicate with you about
            promotions and updates related to our products and services.
          </p>

          <h2>3. Security of Your Information</h2>
          <p>
            We take reasonable precautions to protect your personal information
            from unauthorized access, use, or disclosure. However, no method of
            transmission over the internet or electronic storage is completely
            secure, and we cannot guarantee absolute security.
          </p>

          <h2>4. Third-Party Disclosure</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as required
            by law or as necessary to provide our services to you.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyP;
