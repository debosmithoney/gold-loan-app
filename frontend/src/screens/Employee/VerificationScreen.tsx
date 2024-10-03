import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/Button';

const VerificationScreen: React.FC = () => {
  const [request, setRequest] = useState({
    id: 'REQ001',
    customerName: 'John Doe',
    goldType: '24 Carat',
    weight: '10 grams',
    status: 'Pending',
  });

  const handleApprove = () => {
    // In a real app, you would call an API to update the request status
    setRequest({ ...request, status: 'Approved' });
    Alert.alert('Request Approved', 'The gold deposit request has been approved.');
  };

  const handleReject = () => {
    // In a real app, you would call an API to update the request status
    setRequest({ ...request, status: 'Rejected' });
    Alert.alert('Request Rejected', 'The gold deposit request has been rejected.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Request</Text>
      <Text>Request ID: {request.id}</Text>
      <Text>Customer Name: {request.customerName}</Text>
      <Text>Gold Type: {request.goldType}</Text>
      <Text>Weight: {request.weight}</Text>
      <Text>Status: {request.status}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Approve" onPress={handleApprove} />
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

export default VerificationScreen;