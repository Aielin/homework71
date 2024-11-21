import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://pizza-63258-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;