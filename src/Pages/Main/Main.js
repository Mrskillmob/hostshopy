import React, { useState, useEffect } from 'react'
import { Nvbr } from '../../Components/Nvbr'
import '../../myStyles.css'
import { Footer } from '../../Components/Footer'
import clothing from '../../img/clothing.jpg'
import electronics from '../../img/electronics.jpg'
import home from '../../img/home.jpg'
import { Link } from 'react-router-dom'
import '../Main/Main.css';



export const Main = () => {

  return (
        <div>
            <Nvbr/>
	
	<section class="hero">
		<div class="hero-content">
			<h2>Buy and Sell things now!</h2>
			<h3>Discover new arrivals and your favorite styles in our online store.</h3>
			<Link to="/shopy/shop">
            <button className="btn btn-shop-now">Shop Now</button>
          </Link>
		</div>
	</section>
	<section class="categories">
		<h3>Shop all sorts of things!</h3>
		<div class="category-list">
			<div class="category">
			<Link to="/shopy/shop">
				<img src={clothing} alt='Clothing'/> 
				</Link>
				<h4>Clothing</h4>
			</div>
			<div class="category">
			<Link to="/shopy/shop">
				<img src={electronics} alt='Electronics'/>
				 </Link>
				<h4>Electronics</h4>
			</div>
			<div class="category">
				<Link to="/shopy/shop">
					<img src={home} alt='Home needs'/>
					</Link>
				<h4>Home Goods</h4>
			</div>
		</div>
	</section>
	
	<Footer/>
</div>
    
  )
}
