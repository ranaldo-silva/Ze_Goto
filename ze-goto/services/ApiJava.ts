import axios from 'axios';

const baseURL = "https://java-apis-production.up.railway.app";

const ApiJava = axios.create({
  baseURL: baseURL,
});

export default ApiJava;