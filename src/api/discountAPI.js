// Produk API
import Axios from 'axios'
export default {
  getDiscount: async (page, limit, search = '') => {
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/discount?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  change_status: async (id) => {
    try {
      const response = await Axios.put(`http://localhost:8080/api/v1/discount/change_status/${id}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  create_discount: async (data) => {
    try {
      const response = await Axios.post(`http://localhost:8080/api/v1/discount`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  }

}