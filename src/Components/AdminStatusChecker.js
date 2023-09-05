import { useState, useEffect } from 'react';
import { db } from '../config/firebase-config';
import { collection, getDocs, where, query } from 'firebase/firestore';

const AdminStatusChecker = ({ userId, children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdminStatus = async () => {
    if (!userId) return;

    const adminsCollectionRef = collection(db, 'admins');
    const q = query(adminsCollectionRef, where('userId', '==', userId));

    try {
      const querySnapshot = await getDocs(q);
      setIsAdmin(!querySnapshot.empty);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, [userId]);

  return children(isAdmin);
};

export default AdminStatusChecker;
