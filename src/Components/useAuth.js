import { useEffect, useState } from 'react';
import { auth } from '../config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return authUser;
};
