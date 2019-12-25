import axios from 'axios';

import { API_KEY } from './api';

const refetchToken = async (refreshToken) => {
  try {
    const res = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${API_KEY}`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });
    if (res.status === 200) {
      return res.data;
    }
    const errorObj = {
      code: res.status, message: res.status_text || 'Auth Error', error: true,
    };
    throw errorObj;
  } catch (error) {
    console.log(error);
    return error.code ? error : {
      error: true,
    };
  }
};

export default refetchToken;
