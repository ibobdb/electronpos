import Axios from 'axios'
export default {
  getTransaction: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/transaction${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createTransaction: async (data) => {
    try {
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/transaction`, data);
      return response.data;
    } catch (error) {
      throw error
    }
  }
}