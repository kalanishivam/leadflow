import axios from '../utils/axios';

export const authService = {
  async login(email: string, password: string) {
    const response = await axios.post('/auth/login', { email, password });
    return response.data;
  },

  async verifyToken() {
    const response = await axios.get('verfifyurl');
    return response.data;
  },

  async logout() {
    const response = await axios.post('.logut url');
    return response.data;
  }
};