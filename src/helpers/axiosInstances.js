import axios from 'axios';

export const authAxios = axios.create({
  baseURL: process.env.VUE_APP_AUTH_API_URL,
});

export const globalAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});
