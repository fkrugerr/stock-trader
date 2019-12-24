import Vue from 'vue';
import { isEmpty } from 'ramda';

import { deserializeStore as getPersistentStore } from '../localStorage';

const initialState = {
  funds: 10000,
  stocks: [
    { id: 1, name: 'BMW', price: 110 },
    { id: 2, name: 'Audi', price: 90 },
    { id: 3, name: 'VW', price: 120 },
    { id: 4, name: 'Opel', price: 70 },
  ],
};
/* eslint-disable */
export const loadData = async ({ commit }) => {
  const response = await Vue.http.get('data.json');
  const result = await response.json();
  let { funds, stocks } = initialState;
  let stockPortfolio = [];

  if (result) {
    void (result.stocks && (stocks = result.stocks));
    void (result.funds && (funds = result.funds));
    void (result.stockPortfolio && (stockPortfolio = result.stockPortfolio));
  }
  commit('stocks/setStocks', stocks || []);
  commit('portfolio/setFunds', funds || 10000);
  commit('portfolio/setPortfolio', stockPortfolio || []);
};

export const initApp = ({ commit, dispatch }) => {
  const storage = getPersistentStore();
  if (isEmpty(storage)) {
    console.log(commit, dispatch);
  }
};
