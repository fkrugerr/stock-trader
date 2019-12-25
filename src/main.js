import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuelidate);

Vue.use(VueCurrencyFilter,
  {
    symbol: '$',
    thousandsSeparator: '.',
    fractionCount: 0,
    fractionSeparator: ',',
    symbolPosition: 'front',
    symbolSpacing: false,
  });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  mounted() {
    store.dispatch('app/initApp');
  },
  render: (h) => h(App),
}).$mount('#app');
