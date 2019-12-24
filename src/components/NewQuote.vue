<template>
  <div class="row my-5">
    <div class="col-md-6 mx-auto">
      <form>
        <label for="quote">Quote</label>
        <textarea v-model="quote" id="quote" class="form-control" rows="3"></textarea>
        <button class="btn-primary mt-3" @click.prevent="submitQuote">Add a Quote</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quote: '',
    };
  },
  methods: {
    submitQuote() {
      this.$emit('submitQuote', this.quote);
      this.quote = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.quote {
  font-family: 'Arizonia', cursive;
  color: #6e6e6e;
  cursor: pointer;
  font-size: 1.5rem;
  &:hover {
    background-color: #ffe2e2;
  }
}
</style>
