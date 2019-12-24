import { createNamespacedHelpers } from 'vuex';
import { authAPICall, globalAPICall } from '../../helpers/api';
import {
  set as saveToLocalStorage,
  clear as removeLocalStorageData,
  get as getStorageKey,
} from '../localStorage';

const { mapActions, mapGetters } = createNamespacedHelpers('auth');

export {
  mapActions, mapGetters,
};

const initialState = {
  userId: null,
  token: getStorageKey('idToken'),
  data: null,
  isStored: false,
};

export default {
  state: {
    ...initialState,
  },
  getters: {
    isAuthorized: (state) => !!state.token,
    authToken: (state) => state.token,
    user: (state) => ({
      userId: state.userId,
      data: state.data,
    }),
  },
  mutations: {
    setUser(state, userData) {
      state.token = userData.idToken;
      state.userId = userData.localId;
      state.data = {
        email: userData.email,
      };
    },
    removeUser(state) {
      state.token = null;
      state.userId = null;
      state.data = null;
      state.isStored = false;
    },
    setIsStored(state) {
      state.isStored = true;
    },
  },
  actions: {
    async storeUser({ commit }, payload) {
      const res = await globalAPICall('users.json', 'post', {
        id: payload.localId,
        email: payload.email,
      });
      return res && !res.error && commit('setIsStored');
    },
    async signup({ commit, dispatch }, payload) {
      const result = await authAPICall('signup', payload);
      if (result.error) {
        dispatch('logout');
      } else {
        saveToLocalStorage(result);
        commit('setUser', result);
        dispatch('storeUser', result);
      }
    },
    async signin({ commit, dispatch }, payload) {
      const result = await authAPICall('signin', payload);
      if (result.error) {
        dispatch('logout');
      } else {
        saveToLocalStorage(result);
        commit('setUser', result);
      }
    },
    logout({ commit }) {
      removeLocalStorageData();
      commit('removeUser');
    },
  },
};
