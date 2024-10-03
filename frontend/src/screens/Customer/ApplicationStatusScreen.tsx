
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
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

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getGoldDepositRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
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
});

export default ApplicationStatusScreen;