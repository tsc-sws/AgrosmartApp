import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';

//common
import LoginScreen from './screens/Auth/LoginScreen';
import SignUpScreen from './screens/Auth/SignupScreen';
import NotificationsPage from './screens/models/NotificationsPage';

//import IntermediaryHomeScreen from '../models/Intermediaries/IntermediaryHomeScreen';
//import SellerHomeScreen from "../models/Seller/SellerHomeScreen";


//farmer
import FarmerHomeScreen from "./screens/models/Farmer/FarmerHomeScreen"
import AddingProducts from './screens/models/Farmer/AddingProdut';
import SalesAnalytics from './screens/models/Farmer/SalesAnalytics';
import ManageProducts from './screens/models/Farmer/ManageProducts';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { user, userRole } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (user) {
      if (!userRole || !['Intermediator', 'Farmer', 'Seller'].includes(userRole)) {
        Alert.alert(
          "Invalid Role",
          "Your role is not recognized. Please log in again.",
          [{ text: "OK", onPress: redirectToLogin }]
        );
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [user, userRole]);

  const redirectToLogin = () => {
    setIsLoggedIn(false);
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          {/* Render role-based screens */}
          {userRole === 'Intermediator' && (
            <Stack.Screen
              name="IntermediaryHomeScreen"
              component={IntermediaryHomeScreen}
            />
          )}
          {userRole === 'Farmer' && (
            <>
              <Stack.Screen
                name="FarmerHomeScreen"
                component={FarmerHomeScreen}
              />
              <Stack.Screen
                name="AddingProducts"
                component={AddingProducts}
                options={{
                  headerShown: true, // Enable header for AddingProducts
                  title: "Add Products", // Customize the header title
                }}
              />
              <Stack.Screen
                name="SalesAnalytics"
                component={SalesAnalytics}
                options={{
                  headerShown: true, // Enable header for AddingProducts
                  title: "Farmer Sales Analytics", // Customize the header title
                }}
              />
              <Stack.Screen
                name="ManageProducts"
                component={ManageProducts}
                options={{
                  headerShown: true, // Enable header for AddingProducts
                  title: "Resent Addings", // Customize the header title
                }}
              />
            </>
          )}
          {userRole === 'Seller' && (
            <Stack.Screen
              name="SellerHomeScreen"
              component={SellerHomeScreen}
              options={{
                headerShown: true, // Enable header for SellerHomeScreen
                title: "Seller Dashboard", // Customize the header title
              }}
            />
          )}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
