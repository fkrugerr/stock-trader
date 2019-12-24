<template>
  <div class="col-md-6 mb-4">
    <div class="card">
      <div class="card-header">{{ stock.name }}</div>
      <div class="card-body">
        <h5 class="card-title">Price: {{ stock.price | currency }} | Quantity: {{ stock.quantity }}</h5>
        <div class="d-flex">
          <input type="number" class="form-control" v-model="quantity" :class="{'is-invalid': isOverQuantityLimit || quantity < 0 || !Number.isInteger(+quantity)}" />
          <button
            class="btn btn-primary px-5 ml-3"
            @click="sell"
            :disabled="quantity <= 0 || !Number.isInteger(+quantity) || isOverQuantityLimit"
          >Sell</button>
        </div>
        <transition
          name="custom-classes-transition"
          enter-active-class="animated zoomIn faster"
          leave-active-class="animated zoomOut faster"
          mode="out-in"
        >
          <div class="small mt-2" key="1" v-if="!isOverQuantityLimit">Amount: {{sum | currency}}</div>
          <div class="small mt-2 text-danger" key="2" v-else>Error: over quantity limit!</div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from '../store/modules/portfolioMapper';

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
    sum() {
      return Number.isInteger(+this.quantity)
        ? this.quantity * this.stock.price
        : 0;
    },
    isOverQuantityLimit() {
      return this.quantity > this.stock.quantity;
    },
  },
  methods: {
    ...mapActions(['sellStock']),
    sell() {
      this.sellStock({
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: +this.quantity,
      });
      this.quantity = 0;
    },
  },
};
</script>
