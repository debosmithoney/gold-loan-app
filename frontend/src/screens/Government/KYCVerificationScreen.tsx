import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/Button';
import { getKYCRequests, updateKYCRequest } from '../../services/api';

const GovernmentKYCVerificationScreen: React.FC = () => {
  const [kycRequest, setKycRequest] = useState<any>(null); // Initially null, until data is fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKYCRequests = async () => {
      try {
        const requests = await getKYCRequests('Pending'); // Fetch pending requests
        if (requests.length > 0) {
          setKycRequest(requests[0]); // Display the first pending request
        } else {
          Alert.alert('No pending KYC requests.');
        }
      } catch (error) {
        console.error('Error fetching KYC requests:', error);
        Alert.alert('Error', 'Failed to fetch KYC requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchKYCRequests();
  }, []);

  const handleVerify = async () => {
    try {
      await updateKYCRequest(kycRequest.id, 'Verified');
      setKycRequest({ ...kycRequest, status: 'Verified' });
      Alert.alert('KYC Verified', 'The KYC details have been verified successfully.');
    } catch (error) {
      console.error('Error verifying KYC request:', error);
      Alert.alert('Error', 'Failed to verify KYC request.');
    }
  };

  const handleReject = async () => {
    try {
      await updateKYCRequest(kycRequest.id, 'Rejected');
      setKycRequest({ ...kycRequest, status: 'Rejected' });
      Alert.alert('KYC Rejected', 'The KYC details have been rejected.');
    } catch (error) {
      console.error('Error rejecting KYC request:', error);
      Alert.alert('Error', 'Failed to reject KYC request.');
    }
  };

  if (loading || !kycRequest) {
    return <Text>Loading KYC request...</Text>;
  }

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
