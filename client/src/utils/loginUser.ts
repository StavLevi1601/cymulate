import axios from 'axios';
import { LoginSchema } from '../validations/loginSchema';

const API_URL = import.meta.env.VITE_BACKEND_URL;

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
  };
}

export const loginUser = async ({ email, password }: LoginSchema) => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      localStorage.setItem('token', response.data.access_token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      
      return response;
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async ({ email, password }: LoginSchema) => {
  try {
    console.log("API_URL", API_URL);
    
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, {
      email,
      password,
    });

    if (response.status === 201) {
      localStorage.setItem('token', response.data.access_token);
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      
      return response;
    }
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
