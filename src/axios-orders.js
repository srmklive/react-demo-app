import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-demo-app-c5cd3.firebaseio.com/'
});

export default instance;