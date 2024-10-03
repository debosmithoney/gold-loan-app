import React from 'react';
import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';

// Extend TextInputProps to include keyboardType and other native props
interface InputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ 
  label, 
  value, 
  onChangeText, 
  secureTextEntry, 
  placeholder, 
  keyboardType, // Include keyboardType in the props
  ...rest // Capture any additional TextInput props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        keyboardType={keyboardType} // Use keyboardType here
        {...rest} // Spread additional props to TextInput
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default Input;
