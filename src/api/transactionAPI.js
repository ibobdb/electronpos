import Axios from 'axios'
export default {
  getTransaction: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/transaction${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createTransaction: async (data) => {
    try {
      const response = await Axios.post(`http://localhost:8080/api/v1/transaction`, data);
      return response.data;
    } catch (error) {
      throw error
    }
  }
}