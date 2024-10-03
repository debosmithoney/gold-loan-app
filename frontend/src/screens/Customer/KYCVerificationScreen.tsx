import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

const KYCVerificationScreen: React.FC = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');

  const handleSubmit = () => {
    // In a real app, you would call an API to verify the KYC details
    console.log('Submitting KYC:', { aadhaarNumber, panNumber });
    Alert.alert('KYC Submitted', 'Your KYC details have been submitted for verification.');
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