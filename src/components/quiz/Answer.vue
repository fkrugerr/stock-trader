<template>
  <div class="alert alert-success text-center">
    <h1>That is correct!</h1>
    <div class="btn btn-info my-3" @click="onNext">Next Question</div>
  </div>
</template>

<script>
export default {
  methods: {
    onNext() {
      this.$emit('confirmed');
    },
  },
};
</script>
