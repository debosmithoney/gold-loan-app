import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { updateUserProfile, getUserProfile } from '../services/api'

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
}

const UserProfileScreen: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userProfile = await getUserProfile(user.id);
      setProfile(userProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      Alert.alert('Error', 'Failed to load user profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      await updateUserProfile(user.id, profile);
      Alert.alert('Success', 'Your profile has been updated successfully.');
    } catch (error) {
      console.error('Error updating user profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <Input
        label="Full Name"
        value={profile.fullName}
        onChangeText={(text) => setProfile({ ...profile, fullName: text })}
        placeholder="Enter your full name"
      />
      <Input
        label="Email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <Input
        label="Phone"
        value={profile.phone}
        onChangeText={(text) => setProfile({ ...profile, phone: text })}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <Button
        title={isLoading ? "Updating..." : "Update Profile"}
        onPress={handleUpdateProfile}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UserProfileScreen;