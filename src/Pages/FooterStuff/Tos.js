// Tos.js
import React from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import './FooterStuff.css'; // Import the shared CSS file

export const Tos = () => {
  return (
    

      <div className="pagefooter">
      <Nvbr />
      <div className='card'>
      <div className="content">
        <h1>Terms of Service</h1>
        <p>
          Welcome to our website! By using our website, you agree to comply with
          and be bound by the following terms and conditions of use. Please read
          these terms carefully before using our website.
        </p>

        <h2>1. Intellectual Property Rights</h2>
        <p>
          All content and materials on this website, including but not limited
          to text, graphics, logos, icons, images, audio clips, digital
          downloads, data compilations, and software, are the property of our
          company or its content suppliers and are protected by international
          copyright laws.
        </p>

        <h2>2. Use of Website</h2>
        <p>
          This website is for your personal and non-commercial use only. You may
          not modify, copy, distribute, transmit, display, perform, reproduce,
          publish, license, create derivative works from, transfer, or sell any
          information, software, products, or services obtained from this
          website.
        </p>

        <h2>3. User Contributions</h2>
        <p>
          You may submit comments, suggestions, reviews, questions, or other
          information to this website, provided that the content is not illegal,
          obscene, threatening, defamatory, invasive of privacy, infringing of
          intellectual property rights, or otherwise injurious to third parties.
          We reserve the right to remove or edit such content.
        </p>

        <h2>4. Limitation of Liability</h2>
        <p>
          We make no representations or warranties of any kind, express or
          implied, as to the operation of this website or the information,
          content, materials, or products included on this website. You expressly
          agree that your use of this website is at your sole risk.
        </p>

      
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tos;
