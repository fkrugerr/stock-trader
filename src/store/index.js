import Vue from 'vue';
import Vuex from 'vuex';

import stocksState from './modules/stock';
import portfolioState from './modules/portfolio';
import authState from './modules/auth';
import appState from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app: {
      namespaced: true,
      ...appState,
    },
    auth: {
      namespaced: true,
      ...authState,
    },
    stocks: {
      namespaced: true,
      ...stocksState,
    },
    portfolio: {
      namespaced: true,
      ...portfolioState,
    },
  },
});
