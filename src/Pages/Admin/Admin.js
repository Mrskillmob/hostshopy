import React, { useState, useEffect } from 'react';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import { db } from '../../config/firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'; 
import { useAuth } from '../../Components/useAuth';
import './Admin.css';

export const Admin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const authUser = useAuth();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const feedbacksRef = collection(db, 'feedbacks');
      const feedbacksSnapshot = await getDocs(feedbacksRef);
      const feedbacksData = feedbacksSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
      setFeedbacks(feedbacksData);
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'feedbacks', id));
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback.id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const feedbackList = feedbacks.filter((feedback) => feedback.rating !== 'Bug');
  const bugReportList = feedbacks.filter((feedback) => feedback.rating === 'Bug');

  return (
    <div>
      <Nvbr />
      <div className="admin-page">
        <div className="admin-content">
          <h2>Welcome to Admin Panel</h2>
          <div className="admin-card">
          <div className="admin-section">
              <h3>Bug Reports</h3>
              <div className="feedback-list">
                {bugReportList.map((bug, index) => (
                  <div key={index} className="feedback">
                    <p>
                      Bug Report by: {bug.userEmail}
                    </p>
                    <p>{bug.feedback}</p>
                    <button
                      className="delete-button-admin"
                      onClick={() => handleDelete(bug.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-section">
              <h3>Feedbacks</h3>
              <div className="feedback-list">
                {feedbackList.map((feedback, index) => (
                  <div key={index} className="feedback">
                    <p>
                      Rating: {feedback.rating} by: {feedback.userEmail}
                    </p>
                    <p>{feedback.feedback}</p>
                    <button
                      className="delete-button-admin"
                      onClick={() => handleDelete(feedback.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
