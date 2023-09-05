import React, { useState, useEffect } from 'react';
import { Footer } from '../../Components/Footer';
import { Nvbr } from '../../Components/Nvbr';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../config/firebase-config';
import { getDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore'; // Import updateDoc
import AdminStatusChecker from '../../Components/AdminStatusChecker';
import './Item.css';
import { useAuth } from '../../Components/useAuth';
import { Link } from 'react-router-dom';

export const Item = () => {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // State for edit mode
  const [updatedItem, setUpdatedItem] = useState({}); // State to store updated item data
  const authUser = useAuth();
  const history = useNavigate();

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const itemDocRef = doc(db, 'items', itemId);
        const itemDocSnapshot = await getDoc(itemDocRef);

        if (itemDocSnapshot.exists()) {
          const itemData = itemDocSnapshot.data();
          setItemDetails(itemData);
        } else {
          setError('Item not found');
        }
      } catch (error) {
        setError('Error fetching item details');
      } finally {
        setLoading(false);
      }
    };

    getItemDetails();
  }, [itemId]);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'items', itemId));
      history('/shopy/'); // Redirect to home page after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true); // Show the edit form
    // Set initial values in the updatedItem state
    setUpdatedItem({
      title: itemDetails.title,
      category: itemDetails.category,
      description: itemDetails.description,
      price: itemDetails.price,
      author: itemDetails.author,
      phonenum: itemDetails.phonenum,
      location: itemDetails.location,
    });
  };

  const handleEditSubmit = async () => {
    try {
      // Update the item details in Firestore using updatedItem data
      await updateDoc(doc(db, 'items', itemId), updatedItem);
      setIsEditMode(false); // Hide the edit form
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  return (
    <div>
      <Nvbr />
      <div className="itemjs-page">
        <div className="itemjs-details">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="itemjs-content">
              <div className="itemjs-image-container">
                <img
                  src={itemDetails.imageDownloadURL}
                  alt={itemDetails.title}
                  className="itemjs-image"
                />
              </div>
              <div className="itemjs-text">
                <h1 className="itemjs-title">{itemDetails.title}</h1>
                <p className="itemjs-category">
                  Category: {itemDetails.category}
                </p>
                <h3 className="itemjs-description">
                  Description: {itemDetails.description}
                </h3>
                <h2 className="itemjs-price">Price: {itemDetails.price}€</h2>
                <h5 className="itemjs-author">Author: {itemDetails.author}</h5>
                <p className="itemjs-contact">Contact: {itemDetails.phonenum}</p>
                <p className="itemjs-location">
                  Location: {itemDetails.location}
                </p>
                <AdminStatusChecker userId={authUser?.uid}>
                  {(isAdmin) =>
                    (isAdmin || (authUser && authUser.uid === itemDetails.uploaderId)) && (
                      <>
                        <button className="buy-button" onClick={handleEdit}>
                          Edit
                        </button>
                        <button
                          className="buy-button"
                          onClick={() => setShowDeletePrompt(true)}
                        >
                          Delete
                        </button>
                        {showDeletePrompt && (
                          <div className="delete-prompt">
                            <p className="confirmation-message">Are you sure you want to delete this product?</p>
                            <Link to="/shopy/success">
                              <button className="delete-button" onClick={handleDelete}>Yes</button>
                            </Link>
                            <button className="cancel-button" onClick={() => setShowDeletePrompt(false)}>No</button>
                          </div>
                        )}
                      </>
                    )
                  }
                </AdminStatusChecker>
                {isEditMode && (
                  <div className="edit-form">
                    {/* Edit Form */}
                    <input
                      type="text"
                      value={updatedItem.title}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, title: e.target.value })}
                      placeholder="Title"
                    />
                    <input
                      type="text"
                      value={updatedItem.category}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, category: e.target.value })}
                      placeholder="Category"
                    />
                    <input
                      type="text"
                      value={updatedItem.description}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, description: e.target.value })}
                      placeholder="Description"
                    />
                    <input
                      type="text"
                      value={updatedItem.price}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, price: e.target.value })}
                      placeholder="Price"
                    />
                    <input
                      type="text"
                      value={updatedItem.author}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, author: e.target.value })}
                      placeholder="Author"
                    />
                    <input
                      type="text"
                      value={updatedItem.phonenum}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, phonenum: e.target.value })}
                      placeholder="Contact"
                    />
                    <input
                      type="text"
                      value={updatedItem.location}
                      onChange={(e) => setUpdatedItem({ ...updatedItem, location: e.target.value })}
                      placeholder="Location"
                    />
                    
                    <Link  className="edit-button-item" onClick={handleEditSubmit} to="/shopy/success">
                      Apply Changes
                    </Link>
                  

                    <button className="edit-button-item" onClick={() => setIsEditMode(false)}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Item;
