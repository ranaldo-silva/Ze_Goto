import axios from 'axios';

const baseURL = "https://gs-java-zg-production.up.railway.app";

const ApiJava = axios.create({
  baseURL: baseURL,
});

export default ApiJava;