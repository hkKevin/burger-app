import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://udemy-react-burger-a234c.firebaseio.com/'
});

export default instance;