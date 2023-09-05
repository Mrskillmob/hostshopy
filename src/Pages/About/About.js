import React from 'react'
import { Nvbr } from '../../Components/Nvbr'
import { Footer } from '../../Components/Footer'
import './About.css';


export const About = () => {
  return (
    <div className='pagefooter'>
      <Nvbr/>
      
      <div className='card' >
      <section className="card-content">
        <h3>About Us</h3>
        <p>
          Welcome to my online store! I am a passionate individual
          dedicated to provide you with the latest trends and high-quality
          products. My mission is to make your shopping experience enjoyable
          and convenient.
        </p>
        <p>
          Whether you're looking for stylish clothing, cutting-edge electronics,
          or essential home goods, we've got you covered. Our curated selection
          of products ensures you'll find something you'll love.
        </p>
        <p>
          If you have any questions or need assistance, feel free to contact me
          using the information provided below. I am always here to help you!
        </p>
        
      

      
        <h3>Contact me</h3>
        <p>Email: admin@shopy.com</p>
        <p>Phone: +421 948425060</p>
       
        
        </section>

      
    </div>
      


        <Footer/>
        </div>
  )
}
