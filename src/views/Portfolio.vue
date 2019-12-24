<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <stock-item v-for="item in stocks" :key="item.id" :stock="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from '../store/modules/portfolioMapper';
import stockItem from '../shared/PortfolioStock.vue';

export default {
  name: 'portfolio',
  computed: {
    ...mapGetters({ stocks: 'stockPortfolio' }),
  },
  components: {
    stockItem,
  },
};
</script>
