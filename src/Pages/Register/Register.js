import React, { useState } from 'react';
import './Register.css';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import { auth, googleProvider } from '../../config/firebase-config';
import { createUserWithEmailAndPassword, signInWithPopup  } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

 
export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State to hold error messages

  const navigate = useNavigate();

  const signIn = async () => {
    try {
      setError(null); // Clear any previous errors
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/shopy/success');
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null); // Clear any previous errors
      await signInWithPopup(auth, googleProvider);
      navigate('/shopy/success');
    } catch (err) {
      setError(err.message); // Set the error message
    }
  };

  

  return (
    <div className="register-page">
      <Nvbr />
      <div className="register-container">
        <form className="register-form">
          <h2>Register</h2>
          {/* Display error message if there is an error */}
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="button" className="btn-register" onClick={signIn}>
            Register
          </button>

          <button
            type="button"
            className="btn-google"
            onClick={signInWithGoogle}
          >
            Register with Google instead!
          </button>

          

          <div className="login-link">
            <p>
              Already have an account? <Link to="/shopy/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};


export default Register;
