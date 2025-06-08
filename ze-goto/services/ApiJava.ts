import axios from 'axios';

const baseURL = "gs-java-zg-production.up.railway.app";

const ApiJava = axios.create({
  baseURL: baseURL,
});

export default ApiJava;