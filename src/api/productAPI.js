// Produk API
import Axios from 'axios'
export default {
  getProduct: async (page, limit, search = '') => {
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json', // Contoh header Content-Type
    //   },
    // };
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/product?limit=${limit}&page=${page}&search=${search}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  deleteProduct: async (barcode) => {
    try {
      const response = await Axios.delete(`http://localhost:8080/api/v1/product/${barcode}`)
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
      const response = await Axios.post(`http://localhost:8080/api/v1/product`, data, config)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  getProductById: async (barcode) => {
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/product/${barcode}`)
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  updateProduct: async (barcode, data) => {
    try {
      const response = await Axios.put(`http://localhost:8080/api/v1/product/${barcode}`, data)
      return response.data
    } catch (error) {
      throw (error)
    }
  }
}