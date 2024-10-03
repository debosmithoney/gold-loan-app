import axios from 'axios';

const BASE_URL = 'http://192.168.1.3:3000'; // Replace with your json-server URL

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to update gold deposit request
export const updateGoldDepositRequest = async (id: string, updatedData: any) => {
  try {
    const response = await api.patch(`/goldDepositRequests/${id}`, updatedData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Update gold deposit request error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};


// Other API functions (for completeness)
export const login = async (username: string, password: string) => {
  try {
    const response = await api.get('/users', { params: { username } });
    if (response.data.length > 0) {
      const user = response.data[0];
      if (user.password === password) {
        return user; 
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

export const getUserProfile = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; 
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: number, userData: any) => {
  try {
    const response = await api.patch(`/users/${userId}`, userData);
    return response.data; 
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

export const submitKYC = async (userId: number, aadhaarNumber: string, panNumber: string) => {
  try {
    const response = await api.post('/kyc', { userId, aadhaarNumber, panNumber });
    return response.data;
  } catch (error) {
    console.error('Error submitting KYC:', error);
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

// Function to get KYC requests
export const getKYCRequests = async (status?: string) => {
  try {
    const response = await api.get('/kycRequests', { params: { status } });
    return response.data;
  } catch (error) {
    console.error('Get KYC requests error:', error);
    throw error;
  }
};

// Function to update KYC request
export const updateKYCRequest = async (id: string, status: string) => {
  try {
    const response = await api.patch(`/kycRequests/${id}`, { status });
    return response.data;
  } catch (error) {
    console.error('Update KYC request error:', error);
    throw error;
  }
};

// Function to register a user
export const registerUser = async (username: string, password: string, role: string) => {
  try {
    const response = await api.post('/users', {
      username,
      password,
      role,
    });

    return response.data; 
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};
