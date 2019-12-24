<template>
  <div class="row">
    <div class="col">
      <div class="jumbotron">
        <h1 class="display-4">Trade or view your portfolio!</h1>
        <p class="lead">You may Save & Load your data!</p>
        <p>Click 'End Day' to begin a new trade day!</p>
        <hr class="my-4" />
        <h3 class="mb-4">Your Funds: {{ funds | currency }}</h3>
        <router-link to="/stocks" class="btn btn-primary btn-lg">Get Started</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from '../store/modules/portfolioMapper';

export default {
  computed: {
    ...mapGetters(['funds']),
  },
};
</script>
