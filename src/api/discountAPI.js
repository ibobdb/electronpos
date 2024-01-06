// Produk API
import Axios from 'axios'
export default {
  getDiscount: async (page, limit, search = '') => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/discount?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  change_status: async (id) => {
    try {
      const response = await Axios.put(`${process.env.REACT_APP_BASE_URL}/discount/change_status/${id}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  create_discount: async (data) => {
    try {
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/discount`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  }

}