// Produk API
import Axios from 'axios'
export default {
  getProduct: async (page, limit, search = '') => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/product?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteProduct: async (barcode) => {
    try {
      const response = await Axios.delete(`${process.env.REACT_APP_BASE_URL}/product/${barcode}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  addProduct: async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json', // Contoh header Content-Type
      },
    };
    try {
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/product`, data, config)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  getProductById: async (barcode) => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/product/${barcode}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  updateProduct: async (barcode, data) => {
    try {
      const response = await Axios.put(`${process.env.REACT_APP_BASE_URL}/product/${barcode}`, data)
      return response.data
    } catch (error) {
      throw (error)
    }
  }
}