import Axios from 'axios'
export default {
  getConfig: async () => {
    try {
      // await Axios.get(`http://localhost:8080/api/v1/db-setting`).then(response => {
      //   return response.data
      // })
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/db-setting`);
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  getConnection: async (query) => {
    try {
      const response = await Axios.get(`${process.env.REACT_APP_BASE_URL}/db-setting/connection`, {
        params: query
      });
      return response.data
    } catch (error) {
      throw (error)
    }
  },
  updateConfig: async (data) => {
    try {
      const response = await Axios.post(`${process.env.REACT_APP_BASE_URL}/db-setting/update`, data);
      return response.data
    } catch (error) {
      throw (error)
    }
  }
}