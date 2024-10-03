import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { updateGoldDepositRequest } from '../../services/api';

const GoldEvaluationScreen: React.FC = () => {
  const [requestId, setRequestId] = useState('');
  const [goldQuality, setGoldQuality] = useState('');
  const [evaluatedWeight, setEvaluatedWeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!requestId.trim()) {
      Alert.alert('Error', 'Please enter a request ID');
      return false;
    }
    if (!goldQuality.trim()) {
      Alert.alert('Error', 'Please enter the gold quality');
      return false;
    }
    if (!evaluatedWeight.trim() || isNaN(Number(evaluatedWeight))) {
      Alert.alert('Error', 'Please enter a valid weight');
      return false;
    }
    return true;
  };

  const handleEvaluate = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const updatedRequest = await updateGoldDepositRequest(requestId, 'EVALUATED');
      Alert.alert('Success', `Request ${requestId} has been evaluated and updated.`);
      // Clear form after successful submission
      setRequestId('');
      setGoldQuality('');
      setEvaluatedWeight('');
    } catch (error) {
      console.error('Error updating request:', error);
      Alert.alert('Error', 'Failed to update the request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gold Evaluation</Text>
      <Input
        label="Request ID"
        value={requestId}
        onChangeText={setRequestId}
        placeholder="Enter the request ID"
      />
      <Input
        label="Gold Quality"
        value={goldQuality}
        onChangeText={setGoldQuality}
        placeholder="Enter the evaluated gold quality"
      />
      <Input
        label="Evaluated Weight (grams)"
        value={evaluatedWeight}
        onChangeText={setEvaluatedWeight}
        placeholder="Enter the evaluated weight"
        keyboardType="numeric"
      />
      <Button 
        title={isLoading ? "Submitting..." : "Submit Evaluation"} 
        onPress={handleEvaluate} 
        disabled={isLoading}
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
});

export default GoldEvaluationScreen;