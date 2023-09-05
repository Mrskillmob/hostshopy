import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';
import './AddItems.css';
import { db, storage } from '../../config/firebase-config'; 
import { collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useAuth } from '../../Components/useAuth';


export const AddItems = () => {
  const authUser = useAuth();

  
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPhonenumber, setNewPhonenumber] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newAutorname, setNewAutorname] = useState('');
  const [newSelectedCategory, setNewSelectedCategory] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState('');
  

  const itemsCollectionRef = collection(db, "items");
  
  const handleImageSelect = (event) => {
    const selectedImage = event.target.files[0];
      setNewImage(selectedImage)
    };


    

  const uploadItem = async () => {
    try {
    await 
        addDoc(itemsCollectionRef, { 
                title: newTitle,
                description: newDescription, 
                phonenum: newPhonenumber, 
                location: newLocation, 
                price: newPrice, 
                author: newAutorname, 
                category: newSelectedCategory,
                imageDownloadURL: imageDownloadURL,
                uploaderId: authUser ? authUser.uid : null, });
                console.log("Item uploaded successfully");
        } catch(err) {console.error(err)};
  };

  const uploadImage = () => {
    if (newImage == null) return;

    const imageRef = ref(storage, `images/${newImage.name + v4()}`);
    uploadBytes(imageRef, newImage)
      .then(() => {
        console.log("Image uploaded successfully");
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            setImageDownloadURL(downloadURL);

            uploadItem();
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  


  const uploadFull = async () => {
    try {
      if (newImage === null) {
        console.error("No image selected");
        return;
      }
  
      const imageRef = ref(storage, `images/${newImage.name + v4()}`);
      
      await uploadBytes(imageRef, newImage);
      
      const downloadURL = await getDownloadURL(imageRef);
      
      console.log("Image uploaded successfully. Download URL:", downloadURL);
  
      await addDoc(itemsCollectionRef, {
        title: newTitle,
        description: newDescription,
        phonenum: newPhonenumber,
        location: newLocation,
        price: newPrice,
        author: newAutorname,
        category: newSelectedCategory,
        imageDownloadURL: downloadURL,
        uploaderId: authUser ? authUser.uid : null,
      });
      
      console.log("Item uploaded successfully.");
    } catch (error) {
      console.error("Error uploading item:", error);
    }
  };

  return (
    <div className="add-items-page">
      <Nvbr />
      <div className="add-items-container">
        <div className="form-container">
          <h1 className="form-title">Upload Product</h1>

          <input type="file" id="fileinput" className="form-input" 
            onChange={handleImageSelect} />

          <input type="text" placeholder="Title" className="form-input" 
            onChange={(e) => setNewTitle(e.target.value)} />

          <textarea placeholder="Description" rows="4" className="form-input" 
            onChange={(e) => setNewDescription(e.target.value)} />

          <input type="text" placeholder="Phone Number" className="form-input" 
            onChange={(e) => setNewPhonenumber(e.target.value)}/>

          <input type="text" placeholder="Location" className="form-input" 
            onChange={(e) => setNewLocation(e.target.value)}/>

          <input type="text" placeholder="Price" className="form-input" 
            onChange={(e) => setNewPrice(Number(e.target.value))}/>

          <input type="text" placeholder="Author" className="form-input" 
            onChange={(e) => setNewAutorname(e.target.value)} />

          <select className="form-select" value={newSelectedCategory} 
              onChange={(e) => setNewSelectedCategory(e.target.value)}>
            
            <option value="" disabled> Select Category </option>
            <option> Home Goods  </option>
            <option> Clothing    </option>
            <option> Electronics  </option>
            <option> Books and Stationery</option>
            <option> Automotive</option>
            <option> Toys and Games</option>
            <option> Beauty and Personal Care</option>
            <option> Art</option>
            <option> Collectibles</option>
            <option> Something else</option>
            {/* Add options for categories here */}
          </select>

          <div className="form-button">
             
              <Link to="/shopy/success"><button type="button" onClick={uploadFull} className="submit-button">
                Sell!
              </button> 
              </Link>
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
