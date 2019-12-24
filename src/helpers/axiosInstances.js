import axios from 'axios';

export const authAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/',
});

export const globalAxios = axios.create({
  baseURL: 'https://vue-http-2aacd.firebaseio.com/',
});
