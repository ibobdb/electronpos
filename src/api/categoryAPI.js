import Axios from 'axios'
export default {
  getCategory: async (page, limit, search = '') => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/category${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  createCategory: async (data) => {
    try {
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/category`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteCategory: async (id) => {
    try {
      const response = await Axios.delete(`${process.env.REACT_APP_BASE_URL}/category/${id}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
}