import { createNamespacedHelpers } from 'vuex';

import { getPositiveRandomNumber } from '../../helpers/maths';

const { mapActions, mapGetters } = createNamespacedHelpers('stocks');

export {
  mapActions, mapGetters,
};

const initialState = {
  stocks: [
    { id: 1, name: 'BMW', price: 110 },
    { id: 2, name: 'Audi', price: 90 },
    { id: 3, name: 'VW', price: 120 },
    { id: 4, name: 'Opel', price: 70 },
  ],
};

export default {
  state: {
    stocks: [],
  },
  getters: {
    stocks: (state) => state.stocks,
  },
  mutations: {
    setStocks(state, stocks) {
      state.stocks = stocks;
    },
    randomizeStocks(state) {
      /* eslint-disable */
      state.stocks.forEach((item) => {
        item.price = getPositiveRandomNumber(item.price);
      });
    },
  },
  actions: {
    initStocks({ commit }) {
      commit('setStocks', initialState.stocks);
    },
    randomizeStocks({ commit }) {
      commit('randomizeStocks');
    },
  },
};
