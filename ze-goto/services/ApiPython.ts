import axios from 'axios';

const baseURL = "https://gs-py-api.onrender.com";

const ApiPython = axios.create({
  baseURL: baseURL,
});

export default ApiPython;