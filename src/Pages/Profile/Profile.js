import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import { LogOutButton } from '../../Components/LogOutButton';
import { useAuth } from '../../Components/useAuth';
import './Profile.css';
import { db } from '../../config/firebase-config';
import { collection, getDocs, where, query } from 'firebase/firestore';
import AdminStatusChecker from '../../Components/AdminStatusChecker'; // Import the new component

export const Profile = () => {
  const authUser = useAuth();
  const [userItems, setUserItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (authUser) {
      const getUserItems = async () => {
        const itemsCollectionRef = collection(db, 'items');
        const q = query(itemsCollectionRef, where('uploaderId', '==', authUser.uid));

        try {
          const querySnapshot = await getDocs(q);
          const userItemsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setUserItems(userItemsData);
        } catch (error) {
          console.error('Error fetching user items:', error);
        }
      };

      const checkAdminStatus = async () => {
        const adminsCollectionRef = collection(db, 'admins');
        const q = query(adminsCollectionRef, where('userId', '==', authUser.uid));

        try {
          const querySnapshot = await getDocs(q);
          setIsAdmin(!querySnapshot.empty); // Set isAdmin to true if a match is found
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      };

      getUserItems();
      checkAdminStatus();
    }
  }, [authUser]);

  return (
    <div className="profile-page">
      <Nvbr />
      <div className='card'>
        <div className="profile-container">
          <div className="profile-header">
            <h2>{authUser ? `Welcome, ${authUser.email}!` : 'Profile'}</h2>
          </div>
          <div className="profile-content">
            {authUser ? (
              <>
                <p>This is your profile page where you can manage your account settings and more.</p>
                <div className="profile-details">
                  <div className="detail">
                    <h4>Email:</h4>
                    <p>{authUser.email}</p>
                  </div>
                  <div className="detail">
                    <h4>Membership Status:</h4>
                    <AdminStatusChecker userId={authUser.uid}>
                      {(isAdmin) => <p>{isAdmin ? 'Admin' : 'User'}</p>}
                    </AdminStatusChecker>
                  </div>
                </div>

                <div className="user-items">
                  <h2>Your Uploaded Products</h2>
                  <ul>
                    {userItems.map((item) => (
                      <li key={item.id}>
                        <Link to={`/shopy/item/${item.id}`} key={item.id}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {isAdmin && (
                  <div>
                    <Link to="/shopy/admin"><button type="button" className="btn-logout"> Admin </button></Link>
                  </div>
                )}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>

        <LogOutButton />
      </div>
      <Footer />
    </div>
  );
};
