import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitKYC, registerUser } from '../services/api';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['CUSTOMER', 'EMPLOYEE', 'GOVERNMENT'], {
    required_error: 'Role is required',
  }),
  aadhaarNumber: z.string().optional(),
  panNumber: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const RegisterScreen: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const registrationResponse = await registerUser(data.username, data.password, data.role);
      console.log('Registration Response:', registrationResponse);

      if (data.role === 'CUSTOMER' && data.aadhaarNumber && data.panNumber) {
        const kycResponse = await submitKYC(registrationResponse.id, data.aadhaarNumber, data.panNumber);
        console.log('KYC Response:', kycResponse);
      }

      Alert.alert('Success', 'Registration successful!');
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Username"
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''} 
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Password"
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''} 
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Role" 
            placeholder="Role (CUSTOMER, EMPLOYEE, GOVERNMENT)"
            onChangeText={onChange}
            value={value || ''} 
          />
        )}
      />
      {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}

      <Controller
        control={control}
        name="aadhaarNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="Aadhaar Number" 
            placeholder="Aadhaar Number (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''} 
          />
        )}
      />

      <Controller
        control={control}
        name="panNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            label="PAN Number" 
            placeholder="PAN Number (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value || ''} 
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default RegisterScreen;
