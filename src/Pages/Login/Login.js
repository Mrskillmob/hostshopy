import React, { useState } from 'react';
import './Login.css';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import { auth, googleProvider } from '../../config/firebase-config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom'


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials);
        navigate('/shopy/success');
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      navigate('/shopy/success');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <Nvbr />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
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
          <button type="submit" className="btn-login">
            Login
          </button>
          <button type="button" className="btn-google" onClick={handleGoogleLogin}>
            Login with Google
          </button>
          {error && <p className="error-message">{error}</p>}
          <div className="login-link">
            <p>Don't have an account? <Link to="/shopy/register">Register here</Link></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
