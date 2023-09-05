import {Link} from 'react-router-dom'
import '../myStyles.css'
import React  from 'react'
import { useAuth } from './useAuth';
import profile from '../img/profile.jpg'


export const Nvbr = () => {
	
	const authUser = useAuth();

	return (
    <div>
		<header>
						<Link class="logo" to='/shopy/'> <div >Shopy</div> </Link>
						
				<nav>
					<ul>
						<Link class='prelinknav' to='/shopy/'>Home</Link>
						<Link class='prelinknav' to='/shopy/shop'>Shop</Link>
						<Link class='prelinknav' to='/shopy/about'>About</Link>
						
						
						

						<ul> 
							{authUser ? 
							<Link class='prelinknav' to='/shopy/profile'>	<img className="profile-jpg" src={profile} alt='Profile'></img></Link> 
								: 
							<Link class='prelinknav' to='/shopy/login'>Login</Link>}	
						</ul>
							
					</ul>
				</nav>		
		</header>
    </div>
  )
}



