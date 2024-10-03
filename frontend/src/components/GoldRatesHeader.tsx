import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

interface GoldRate {
  currency: string;
  price: number;
}

const GoldRatesHeader: React.FC = () => {
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

  return (
    <View style={styles.header}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        goldRates.map((rate) => (
          <Text key={rate.currency} style={styles.rate}>
            {rate.currency}: {rate.price.toFixed(2)}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
});

export default GoldRatesHeader;
