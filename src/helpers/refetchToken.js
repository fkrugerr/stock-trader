import axios from 'axios';

const refetchToken = async (refreshToken) => {
  try {
    const res = await axios.post(
      `${process.env.VUE_APP_REFRESH_TOKEN_URL}?key=${process.env.VUE_APP_API_KEY}`, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      },
    );
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
