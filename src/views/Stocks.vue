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
import { stockGetters } from '../store/modules/mapping';
import stockItem from '../shared/Stock.vue';

export default {
  name: 'stocks',
  computed: {
    ...stockGetters(['stocks']),
  },
  components: {
    stockItem,
  },
};
</script>
