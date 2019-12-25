import { isEmpty, keys } from 'ramda';
import { createNamespacedHelpers } from 'vuex';

import refetchToken from '../../helpers/refetchToken';
import { globalAPICall } from '../../helpers/api';
import {
  deserializeStore as getPersistentStore,
  set as setLocalStorageValues,
  get as getLocalStorageValue,
  clear as clearLocalStorage,
} from '../localStorage';

const { mapActions, mapGetters } = createNamespacedHelpers('app');

export { mapActions, mapGetters };

const initialState = {
  funds: 10000,
  stocks: [
    {
      id: 1, name: 'BMW', price: 110,
    },
    {
      id: 2, name: 'Audi', price: 90,
    },
    {
      id: 3, name: 'VW', price: 120,
    },
    {
      id: 4, name: 'Opel', price: 70,
    },
  ],
};
/* eslint-disable */
export default {
  state: {
    initialized: false,
  },
  getters: {
    isInitialized: state => state.initialized,
  },
  mutations: {
    initialize: state => state.initialized = true
  },
  actions: {
    loadData: async ({ commit, rootGetters }) => {
      const userId = rootGetters['auth/user'].userId;
      const response = await globalAPICall(`portfolio.json?orderBy="userId"&equalTo="${userId}"`, 'get', null);

      let { funds, stocks } = initialState;
      let stockPortfolio = [];

      if (response && !response.error) {
        const portfolioId = keys(response)[0];
        setLocalStorageValues({ portfolioId });
        const res = response[portfolioId];
        void (res.stocks && (stocks = res.stocks));
        void (res.funds && (funds = res.funds));
        void (res.stockPortfolio && (stockPortfolio = res.stockPortfolio));
      }

      commit('stocks/setStocks', stocks || [], { root: true });
      commit('portfolio/setFunds', funds || 10000, { root: true });
      commit('portfolio/setPortfolio', stockPortfolio || [], { root: true });
    },
    storeData: async ({ rootGetters }, payload) => {
      const userId = rootGetters['auth/user'].userId;
      const portfolioId = getLocalStorageValue('portfolioId');
      const url = portfolioId ? `portfolio/${portfolioId}/.json` : 'portfolio.json';
      const method = portfolioId ? 'patch' : 'post';
      const res = await globalAPICall(url, method, {
        ...payload,
        userId,
      });
      
      return {
        success: res && !res.error,
      };
    },
    initApp: async ({ commit }) => {
      console.log('init app...');
      const storage = getPersistentStore();
      if (isEmpty(storage)) {
        commit('initialize');
        return false;
      }
      const result = await refetchToken(storage.refreshToken);
      if (result.error) {
        clearLocalStorage();
      } else {
        const data = {
          ...storage,
          idToken: result.id_token,
          refreshToken: result.refresh_token,
        };
        setLocalStorageValues(data);
        commit('auth/setUser', data, { root: true });
      }
      commit('initialize');
    },
  },
};
