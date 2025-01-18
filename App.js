import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './AuthContext'; // Adjust path as per your project structure
import AppNavigator from './AppNavigator';
import { Provider } from 'react-native-paper'; // Import the Provider from react-native-paper

export default function App() {
  return (
    <Provider> {/* Apply the custom greenish theme */}
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}