import axios from 'axios';

const BASE_URL = 'http://192.168.1.3:3000'; // Replace with your json-server URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Updated login function with password verification
export const login = async (username: string, password: string) => {
  try {
    const response = await api.get('/users', { params: { username } });
    if (response.data.length > 0) {
      const user = response.data[0];
      // Here, you should implement your password check logic (this is a placeholder)
      if (user.password === password) {
        return user; // Return user if password matches
      } else {
        throw new Error('Incorrect password');
      }
    }
    throw new Error('User not found');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// New function to get the user profile
export const getUserProfile = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; // Return user profile data
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

// New function to update the user profile
export const updateUserProfile = async (userId: number, userData: any) => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data; // Return updated user data
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

export const submitKYC = async (userId: number, aadhaarNumber: string, panNumber: string) => {
  try {
    const response = await api.post('/kycRequests', {
      userId,
      aadhaarNumber,
      panNumber,
      status: 'PENDING',
    });
    return response.data;
  } catch (error) {
    console.error('KYC submission error:', error);
    throw error;
  }
};

export const submitGoldDepositRequest = async (requestData: any) => {
  try {
    const response = await api.post('/goldDepositRequests', {
      ...requestData,
      status: 'PENDING',
    });
    return response.data;
  } catch (error) {
    console.error('Gold deposit request submission error:', error);
    throw error;
  }
};

export const getGoldDepositRequests = async (status?: string) => {
  try {
    const response = await api.get('/goldDepositRequests', { params: { status } });
    return response.data;
  } catch (error) {
    console.error('Get gold deposit requests error:', error);
    throw error;
  }
};

export const updateGoldDepositRequest = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/goldDepositRequests/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update gold deposit request error:', error);
    throw error;
  }
};

export const getKYCRequests = async (status?: string) => {
  try {
    const response = await api.get('/kycRequests', { params: { status } });
    return response.data;
  } catch (error) {
    console.error('Get KYC requests error:', error);
    throw error;
  }
};

export const updateKYCRequest = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/kycRequests/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update KYC request error:', error);
    throw error;
  }
};
