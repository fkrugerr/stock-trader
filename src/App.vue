<template>
  <div id="app">
    <header-nav v-if="isInitialized" />

    <div class="container mt-5" v-if="isInitialized">
      <div class="row">
        <div class="col">
          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeIn faster"
            leave-active-class="animated fadeOut faster"
            mode="out-in"
          >
            <router-view />
          </transition>
        </div>
      </div>

      <footer class="pt-4 my-md-5 pt-md-5 border-top" v-if="isInitialized">
        <div class="row">
          <div class="col-12 col-md">
            <small class="d-block mb-3 text-muted">© 2017-2019</small>
          </div>
        </div>
      </footer>
    </div>

    <div class="loader d-flex align-items-center justify-content-center" v-if="!isInitialized">
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import headerNav from './shared/Header.vue';

export default {
  components: {
    headerNav,
  },
  computed: {
    ...mapGetters({
      isInitialized: 'app/isInitialized',
      isAuthorized: 'auth/isAuthorized',
    }),
  },
  methods: {
    ...mapActions({
      loadData: 'app/loadData',
    }),
  },
  watch: {
    isAuthorized(next, prev) {
      if (!prev && next) {
        this.$router.push({ name: 'dashboard' });
        this.loadData();
      }
      if (prev && !next) {
        this.$router.push({ name: 'signin' });
      }
    },
    isInitialized(next) {
      if (next && this.isAuthorized) this.loadData();
    },
  },
  // created() {
  //   if (this.isAuthorized) {
  //     this.loadData();
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(#fff, 0.6);
  z-index: 999;
}
</style>
