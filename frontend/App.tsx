import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigations/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { registerForPushNotificationsAsync, listenForNotifications} from './src/services/pushNotifications'

const App: React.FC = () => {
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => console.log(token));
    const unsubscribe = listenForNotifications(notification => {
      console.log(notification);
      // Handle the notification, e.g., update app state or show an alert
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;