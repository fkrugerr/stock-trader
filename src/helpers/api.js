import { authAxios, globalAxios } from './axiosInstances';
import { get as getLocalStorageItem } from '../store/localStorage';

export const API_KEY = 'AIzaSyAQaoNRg9WLfqVSChZRjkbrtWVRWqJtIQo';

const getUserData = (data) => {
  const { email, idToken, refreshToken, localId } = data;
  return {
    email, idToken, refreshToken, localId,
  };
};

const AUTH_END_POINTS = {
  signup: 'signUp',
  signin: 'signInWithPassword',
};

export const authAPICall = async (mode, payload) => {
  try {
    const response = await authAxios.post(`accounts:${AUTH_END_POINTS[mode]}?key=${API_KEY}`, {
      ...payload,
      returnSecureToken: true,
    });
    if (response.status === 200) {
      return getUserData(response.data);
    }
    const errorObj = {
      code: response.status, message: 'Auth Error', error: true,
    };
    throw errorObj;
  } catch (error) {
    console.log(error);
    return error.code ? error : {
      error: true,
    };
  }
};

export const globalAPICall = async (endpoint, method = 'get', payload, params = {
}) => {
  // const params = {
  //   orderBy: 'id',
  //   equalTo: '55555555',
  // };
  const token = getLocalStorageItem('idToken');
  const config = {
    method,
    url: endpoint,
    params: {
      auth: token,
      ...params,
    },
    ...(payload ? {
      data: payload,
    } : {
    }),
  };
  try {
    const response = await globalAxios(config);
    if (response.status === 200) {
      return response.data;
    }
    const errorObj = {
      code: response.status, message: 'API Error', error: true,
    };
    throw errorObj;
  } catch (error) {
    console.log(error);
    return error.code ? error : {
      error: true,
    };
  }
};
