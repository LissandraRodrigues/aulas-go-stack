import axios from 'axios';

// Instância do Axios.
const api = axios.create({

    baseURL: 'http://localhost:3333'    

});

export default api;