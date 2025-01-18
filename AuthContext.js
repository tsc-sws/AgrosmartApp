import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase.Config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userDocRef = doc(db, "UserDetails", currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: userData.name,  // Ensure 'name' is fetched from Firestore
          });
          setUserRole(userData.role);  // Set the role
        } else {
          console.error('User details not found in Firestore');
          setUser(null);  // Clear user if no details are found
        }
      } else {
        setUser(null);  // If no currentUser, set user to null
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;  // Clean up the listener on component unmount
  }, []);

  if (loading) {
    return null; // You can show a loading spinner here
  }

  return (
    <AuthContext.Provider value={{ user, userRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
