import React, { useState } from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import { db } from '../../config/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../../Components/useAuth';
import './Feedback.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useHistory

export const Feedback = () => {
  const [rating, setRating] = useState(1);
  const [feedback, setFeedback] = useState('');
  const authUser = useAuth();
  
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const auth = getAuth();
      const feedbackData = {
        rating: rating,
        feedback: feedback,
        userId: authUser.uid, 
        userEmail: ''
      };
  
      onAuthStateChanged(auth, (user) => {
        if (user) {
          feedbackData.userEmail = user.email;
          // Add the feedback data to the "feedbacks" collection
          addDoc(collection(db, 'feedbacks'), feedbackData)
            .then(() => {
              // Clear the form
              setRating(1);
              setFeedback('');

              // Redirect to "/shopy/success"
              navigate('/shopy/success');
            })
            .catch((error) => {
              console.error('Error submitting feedback:', error);
            });
        }
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <Nvbr />
      <div className="feedback-page">
        <div className="feedback-form">
          <h2>Leave Feedback</h2>
          <p>Or Report a Bug</p>
          <form onSubmit={handleSubmit}>
            <div className="rating">
              <label>Rating:</label>
              <label>If you want to report a bug, choose option: Bug</label>
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="Bug">Bug</option>
              </select>
            </div>
            <div className="feedback-text">
              <label>Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Leave your feedback here... (or report a bug)"
              />
            </div>
            
            <button type="submit" className="btn-submit">
              Submit Feedback
            </button>
            
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Feedback;
