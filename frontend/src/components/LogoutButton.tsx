import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const { logout } = useAuth(); 
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return <Button title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;
