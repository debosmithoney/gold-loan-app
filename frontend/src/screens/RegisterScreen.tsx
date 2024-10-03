import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitKYC } from '../services/api';

// Define the validation schema using Zod
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

const Register: React.FC = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // Handle registration logic here
    console.log(data);

    // If KYC details are provided, submit them
    if (data.role === 'CUSTOMER' && data.aadhaarNumber && data.panNumber) {
      const kycResponse = await submitKYC(1, data.aadhaarNumber, data.panNumber); // Replace 1 with actual user ID as needed
      console.log('KYC Response:', kycResponse);
    }

    // You can add your registration API call here to save the user details
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Password"
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="role"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Role (CUSTOMER, EMPLOYEE, GOVERNMENT)"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.role && <Text style={styles.error}>{errors.role.message}</Text>}

      <Controller
        control={control}
        name="aadhaarNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Aadhaar Number (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="panNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="PAN Number (optional)"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Register;
