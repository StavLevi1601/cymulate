import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const sendPhishingEmail = async (data: { targetEmail: string }) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await axios.post(
      `${API_URL}/phishing/send`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error sending phishing email:', error);
    throw error;
  }
};


export const fetchPhishingAttempts = async (): Promise<any> => {
  try {
      const token = localStorage.getItem('token');

      const response = await axios.post(
          `${API_URL}/phishing/attempts`,
          {}, 
          {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
          }
      );

      if (response.data.success) {
          return response.data.data;
      } else {
          throw new Error(response.data.message || 'Failed to fetch phishing attempts');
      }
  } catch (error) {
      console.error('Error in fetchPhishingAttempts:', error);
      throw error; 
  }
};