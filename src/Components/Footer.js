import React from 'react'
import { Link } from 'react-router-dom'
import x from '../img/x.jpg'
import instagram from '../img/instagram.jpg'
import facebook from '../img/facebook.jpg'


export const Footer = () => {
  
	


	return (
    <footer className='footer'>
		<ul>
		<a href="https://twitter.com/mrskillmob" class='prelinknav2' ><img className="profile-jpg" src={x} alt='Profile'></img></a>
		<a href="https://www.facebook.com/" class='prelinknav2' ><img className="profile-jpg" src={facebook} alt='Profile'></img></a>
		<a href="https://www.instagram.com/" class='prelinknav2' ><img className="profile-jpg" src={instagram} alt='Profile'></img></a>

			


			<Link class='prelinknav' to="/shopy/tos">Terms of Service</Link>
			<Link class='prelinknav' to="/shopy/privacypolicy">Privacy Policy</Link>
			<Link class='prelinknav' to="/shopy/refundpolicy" >Refund Policy</Link>
			<Link class='prelinknavML' to="/shopy/feedback" >Rating / Feedback / Bug Report</Link>

		</ul>
	</footer>
  )
}
