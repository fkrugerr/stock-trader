<template>
  <li class="nav-item dropdown" :class="{show:show}">
    <a
      class="nav-item nav-link dropdown-toggle mr-md-2"
      href="#"
      id="saveLoad"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="show = !show"
    >Save & Load</a>
    <div class="dropdown-menu dropdown-menu-right" :class="{show:show}" aria-labelledby="saveLoad">
      <a class="dropdown-item" href="#" @click.stop="saveData">Save Data</a>
      <a class="dropdown-item" href="#" @click.stop="loadData">Load Data</a>
    </div>
  </li>
</template>

<script>
import {
  portfolioGetters,
  stockGetters,
  appActions,
} from '../store/modules/mapping';

export default {
  data() {
    return {
      show: false,
    };
  },
  computed: {
    ...portfolioGetters(['funds', 'stockPortfolio']),
    ...stockGetters(['stocks']),
  },
  methods: {
    ...appActions(['loadData', 'storeData']),
    async saveData() {
      const data = {
        funds: this.funds,
        stockPortfolio: this.stockPortfolio,
        stocks: this.stocks,
      };
      const res = await this.storeData(data);
      console.log(res);
    },
  },
};
</script>
