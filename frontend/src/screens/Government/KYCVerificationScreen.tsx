import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/Button';

const GovernmentKYCVerificationScreen: React.FC = () => {
  const [kycRequest, setKycRequest] = useState({
    id: 'KYC001',
    customerName: 'Jane Doe',
    aadhaarNumber: '1234 5678 9012',
    panNumber: 'ABCDE1234F',
    status: 'Pending',
  });

  const handleVerify = () => {
    // In a real app, you would call an API to verify the KYC details
    setKycRequest({ ...kycRequest, status: 'Verified' });
    Alert.alert('KYC Verified', 'The KYC details have been verified successfully.');
  };

  const handleReject = () => {
    // In a real app, you would call an API to reject the KYC details
    setKycRequest({ ...kycRequest, status: 'Rejected' });
    Alert.alert('KYC Rejected', 'The KYC details have been rejected.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification Request</Text>
      <Text>Request ID: {kycRequest.id}</Text>
      <Text>Customer Name: {kycRequest.customerName}</Text>
      <Text>Aadhaar Number: {kycRequest.aadhaarNumber}</Text>
      <Text>PAN Number: {kycRequest.panNumber}</Text>
      <Text>Status: {kycRequest.status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Verify" onPress={handleVerify} />
        <Button title="Reject" onPress={handleReject} />
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default GovernmentKYCVerificationScreen;