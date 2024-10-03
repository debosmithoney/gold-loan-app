import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import Button from '../../components/Button';
import { getGoldDepositRequests, updateGoldDepositRequest } from '../../services/api';

const VerificationScreen: React.FC = () => {
  const [request, setRequest] = useState<any>(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoldDepositRequests = async () => {
      try {
        const requests = await getGoldDepositRequests('PENDING'); 
        if (requests.length > 0) {
          setRequest(requests[0]); 
        } else {
          Alert.alert('No pending gold deposit requests.');
        }
      } catch (error) {
        console.error('Error fetching gold deposit requests:', error);
        Alert.alert('Error', 'Failed to fetch gold deposit requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoldDepositRequests();
  }, []);

  const handleApprove = async () => {
    if (request) {
      try {
        await updateGoldDepositRequest(request.id, 'Approved'); // Update status to Approved
        setRequest({ ...request, status: 'Approved' });
        Alert.alert('Request Approved', 'The gold deposit request has been approved.');
      } catch (error) {
        console.error('Error approving request:', error);
        Alert.alert('Error', 'Failed to approve gold deposit request.');
      }
    }
  };

  const handleReject = async () => {
    if (request) {
      try {
        await updateGoldDepositRequest(request.id, 'Rejected'); // Update status to Rejected
        setRequest({ ...request, status: 'Rejected' });
        Alert.alert('Request Rejected', 'The gold deposit request has been rejected.');
      } catch (error) {
        console.error('Error rejecting request:', error);
        Alert.alert('Error', 'Failed to reject gold deposit request.');
      }
    }
  };

  if (loading || !request) {
    return <Text>Loading gold deposit request...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gold Deposit Verification Request</Text>
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
