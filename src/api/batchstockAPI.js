import Axios from 'axios'
export default {
  get_batch: async (page, limit, search) => {
    const params = `${limit || page || search ? `?limit=${limit}&page=${page}&search=${search}` : ''}`;
    try {
      const response = await Axios.get(`http://localhost:8080/api/v1/batch${params}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  adjust_stock: async (batch_id, new_stock) => {
    try {
      const response = await Axios.put(`http://localhost:8080/api/v1/batch/${batch_id}`, {
        new_stock: new_stock
      });
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  create_batch: async (data) => {
    try {
      const response = await Axios.post(`http://localhost:8080/api/v1/batch`, data);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  delete_batch: async (batch_id) => {
    try {
      const response = await Axios.delete(`http://localhost:8080/api/v1/batch/${batch_id}`);
      return response.data;
    } catch (err) {
      throw (err)
    }
  }

}