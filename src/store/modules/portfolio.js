import { createNamespacedHelpers } from 'vuex';

const { mapActions, mapGetters } = createNamespacedHelpers('portfolio');

export { mapActions, mapGetters };

const initialState = {
  funds: 10000,
};

export default {
  state: {
    funds: 0,
    stocks: [],
  },
  getters: {
    funds: (state) => state.funds,
    stockPortfolio: (state, getters, rootState, rootGetters) => state.stocks.map((stock) => {
      const record = rootGetters['stocks/stocks'].find((item) => item.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price,
      };
    }),
  },
  mutations: {
    setFunds(state, payload) {
      state.funds = payload;
    },
    setPortfolio(state, payload) {
      state.stocks = payload;
    },
    buyStock(state, { stockId, quantity, stockPrice }) {
      const record = state.stocks.find((item) => item.id === stockId);
      if (record) {
        record.quantity += quantity;
      } else {
        state.stocks.push({
          id: stockId,
          quantity,
        });
      }
      state.funds -= stockPrice * quantity;
    },
    sellStock(state, { stockId, quantity, stockPrice }) {
      const record = state.stocks.find((item) => item.id === stockId);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        state.stocks = state.stocks.filter((item) => item.id !== stockId);
      }
      state.funds += stockPrice * quantity;
    },
  },
  actions: {
    initFunds({ commit }) {
      commit('setFunds', initialState.funds);
    },
    sellStock({ commit }, order) {
      commit('sellStock', order);
    },
    buyStock({ commit }, order) {
      commit('buyStock', order);
    },
  },
};
