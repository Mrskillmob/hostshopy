import React from 'react'
import { useState } from 'react';
import { auth   } from '../config/firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const LogOutButton = () => {

    const navigate = useNavigate();

    const [error, setError] = useState(null); // State to hold error messages

    const logOut = async () => {
        try {
          setError(null); // Clear any previous errors
          await signOut(auth);
          navigate('/shopy/success');
        } catch (err) {
          setError(err.message); // Set the error message
        }
      };

  return (
    <div>
    <button type="button" className="btn-logout" onClick={logOut}>
            Log out
          </button>
    </div>
  )
}
