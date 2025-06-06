import axios from 'axios';

const baseURL = "https://pyhon-api.onrender.com";

const ApiPython = axios.create({
  baseURL: baseURL,
});

export default ApiPython;