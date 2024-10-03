import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getGoldDepositRequests } from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

interface GoldDepositRequest {
  id: string;
  goldType: string;
  weight: number;
  status: string;
}

const ApplicationStatusScreen: React.FC = () => {
  const [requests, setRequests] = useState<GoldDepositRequest[]>([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState<string | null>(null); // State to handle errors

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getGoldDepositRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
      setError('Failed to fetch requests. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const renderItem = ({ item }: { item: GoldDepositRequest }) => (
    <View style={styles.item}>
      <Text style={styles.requestId}>Request ID: {item.id}</Text>
      <Text>Gold Type: {item.goldType}</Text>
      <Text>Weight: {item.weight} grams</Text>
      <StatusBadge status={item.status} />
    </View>
  );

  // Render loading or error state
  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorMessage}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Gold Deposit Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 8,
    borderRadius: 5,
  },
  requestId: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ApplicationStatusScreen;
