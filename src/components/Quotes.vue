<template>
  <transition-group
    class="row"
    name="custom-classes-transition"
    enter-active-class="animated fadeInDown"
    leave-active-class="animated fadeOutUp position-absolute"
    move-class="onMove"
  >
    <quote-item
      v-for="(item) in quotes"
      :key="item.id"
      @click.native="deleteQuote(item.id)"
    >{{ item.text }}</quote-item>
  </transition-group>
</template>

<script>
import Quote from './Quote.vue';

export default {
  props: ['quotes', 'deleteQuote'],
  components: {
    quoteItem: Quote,
  },
};
</script>

<style lang="scss">
.onMove {
  transition: transform 1s;
}
</style>
