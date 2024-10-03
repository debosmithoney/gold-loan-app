import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface GoldRate {
  currency: string;
  price: number;
}

const GoldRatesScreen: React.FC = () => {
  const [goldRates, setGoldRates] = useState<GoldRate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGoldRates();
  }, []);

  const fetchGoldRates = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://api.metals.live/v1/spot/gold');
      const rates: GoldRate[] = Object.entries(response.data).map(([currency, price]) => ({
        currency,
        price: price as number,
      }));
      setGoldRates(rates);
    } catch (error) {
      console.error('Error fetching gold rates:', error);
      setError('Failed to fetch gold rates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: GoldRate }) => (
    <View style={styles.item}>
      <Text style={styles.currency}>{item.currency}</Text>
      <Text style={styles.price}>{item.price.toFixed(2)}</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading gold rates...</Text>
      </View>
    );
}

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Gold Rates</Text>
      <FlatList
        data={goldRates}
        renderItem={renderItem}
        keyExtractor={(item) => item.currency}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  currency: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});

export default GoldRatesScreen;