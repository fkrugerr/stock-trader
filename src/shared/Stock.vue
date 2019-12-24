<template>
  <div class="col-md-6 mb-4">
    <div class="card">
      <div class="card-header">{{ stock.name }}</div>
      <div class="card-body">
        <h5 class="card-title">Price: {{ stock.price | currency }}</h5>
        <div class="d-flex">
          <input
            type="number"
            class="form-control"
            :class="{'is-invalid': isOverFundsLimit || quantity < 0 || !Number.isInteger(+quantity)}"
            v-model="quantity"
          />
          <button
            class="btn btn-success px-5 ml-3"
            @click="buy"
            :disabled="isOverFundsLimit || quantity <= 0 || !Number.isInteger(+quantity)"
          >Buy</button>
        </div>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated zoomIn faster"
          leave-active-class="animated zoomOut faster"
          mode="out-in"
        >
          <div class="small mt-2" key="1" v-if="!isOverFundsLimit">Amount: {{sum | currency}}</div>
          <div class="small mt-2 text-danger" key="2" v-else>Error: over funds limit!</div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import uuidv4 from 'uuid/v4';
import { mapActions, mapGetters } from '../store/modules/portfolioMapper';

export default {
  props: {
    stock: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    quantity: 0,
  }),
  computed: {
    ...mapGetters(['funds']),
    sum() {
      return Number.isInteger(+this.quantity)
        ? this.quantity * this.stock.price
        : 0;
    },
    isOverFundsLimit() {
      return this.sum > this.funds;
    },
  },
  methods: {
    ...mapActions(['buyStock']),
    buy() {
      this.buyStock({
        id: uuidv4(),
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: +this.quantity,
      });
      this.quantity = 0;
    },
  },
};
</script>
