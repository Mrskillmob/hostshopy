import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './Shop.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Components/useAuth';
import { Nvbr } from '../../Components/Nvbr';
import { Footer } from '../../Components/Footer';

export const Shop = () => {
  const authUser = useAuth(); // Get the user's authentication status

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for lowest to highest, 'desc' for highest to lowest

  const [itemsList, setItemsList] = useState([]);
  const itemsCollectionRef = collection(db, 'items');

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const data = await getDocs(itemsCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setItemsList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    getItemsList();
  }, []);

  const filteredItems = selectedCategory === 'All'
    ? itemsList
    : itemsList.filter((item) => item.category === selectedCategory);

  const sortedItems = filteredItems
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

  return (
    <div>
      <Nvbr />
      <div className="shop-page">
        <div className="search-bar">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Home Goods">Home Goods</option>
            <option value="Books and Stationery">Books and Stationery</option>
            <option value="Automotive">Automotive</option>
            <option value="Toys and Games">Toys and Games</option>
            <option value="Beauty and Personal Care">Beauty and Personal Care</option>
            <option value="Art">Art</option>
            <option value="Collectibles">Collectibles</option>
            <option value="Something else">Something else</option>
          </select>
          <input
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="sort-buttons">
          <button
            onClick={() => setSortOrder('asc')}
            className={sortOrder === 'asc' ? 'active' : ''}
          >
            Sort by Lowest Price
          </button>
          <button
            onClick={() => setSortOrder('desc')}
            className={sortOrder === 'desc' ? 'active' : ''}
          >
            Sort by Highest Price
          </button>
        </div>

        <div className="item-list">
          {sortedItems.map((item) => (
            <Link to={`/shopy/item/${item.id}`} key={item.id} className="item-link">
              <div className="item">
                <img src={item.imageDownloadURL} alt={item.title} className="item-image" />
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price">Price: ${item.price}</p>
              </div>
            </Link>
          ))}
        </div>

        {authUser && (
          <Link to="/shopy/addItem">
            <button className="add-button">Add</button>
          </Link>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
