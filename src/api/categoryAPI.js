import Axios from 'axios'
export default {
  getCategory: async (page, limit, search = '') => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/category${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createCategory: async (data) => {
    try {
      const response = await Axios.post(`http://localhost:8080/api/v1/category`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await Axios.delete(`http://localhost:8080/api/v1/category/${id}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
}