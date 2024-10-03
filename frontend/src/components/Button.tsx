import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean; // Optional loading state
  color?: string; // Optional button color
  textColor?: string; // Optional text color
  disabled?: boolean; // Optional disabled state
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  loading = false,
  color = '#007AFF', // Default color
  textColor = 'white', // Default text color
  disabled = false, // Default disabled state
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#A9A9A9' : color }]} // Change color when disabled
      onPress={disabled ? undefined : onPress} // Disable onPress if disabled
      activeOpacity={0.7} // Slightly lower opacity when pressed
      disabled={disabled} // Disable touch when disabled
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} /> // Show loading indicator
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text> // Change text color
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12, // Increased vertical padding
    paddingHorizontal: 20, // Added horizontal padding
    borderRadius: 8, // Slightly rounded corners
    alignItems: 'center',
    justifyContent: 'center', // Centering text and loading indicator
    marginVertical: 5, // Space between buttons if multiple are used
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Button;
