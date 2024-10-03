import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { submitKYC } from '../../services/api'; 
import { useAuth } from '../../context/AuthContext';

const KYCVerificationScreen: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!aadhaarNumber || !panNumber) {
      Alert.alert('Error', 'Please enter both Aadhaar and PAN numbers.');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'User is not authenticated.');
      return;
    }

    try {
      const response = await submitKYC(user.id, aadhaarNumber, panNumber); // Using user.id from context
      console.log('KYC Submitted:', response);
      Alert.alert('KYC Submitted', 'Your KYC details have been submitted for verification.');
      clearForm();
    } catch (error) {
      Alert.alert('Error', 'Failed to submit KYC. Please try again.');
    }
  };

  const clearForm = () => {
    setAadhaarNumber('');
    setPanNumber('');
  };

  return (
    <View style={styles.container}>
      <Input
        label="Aadhaar Number"
        value={aadhaarNumber}
        onChangeText={setAadhaarNumber}
        placeholder="Enter 12-digit Aadhaar number"
      />
      <Input
        label="PAN Number"
        value={panNumber}
        onChangeText={setPanNumber}
        placeholder="Enter 10-digit PAN number"
      />
      <Button title="Submit KYC" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default KYCVerificationScreen;
