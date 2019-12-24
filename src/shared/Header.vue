<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link to="/" class="navbar-brand text-white" exact>Stock Trader</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" v-if="isAuthorized">
          <router-link to="/portfolio" class="nav-link">Portfolio</router-link>
        </li>
        <li class="nav-item" v-if="isAuthorized">
          <router-link to="/stocks" class="nav-link">Stocks</router-link>
        </li>
        <li v-if="isAuthorized" class="nav-item pl-md-5">
          <a class="nav-link" href="#" @click.stop="logout">Logout</a>
        </li>
        <li class="nav-item" v-if="!isAuthorized">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthorized">
          <router-link to="/signin" class="nav-link">Sign In</router-link>
        </li>
      </ul>
    </div>
    <ul class="navbar-nav ml-auto d-none d-md-flex flex-row">
      <li class="nav-item" v-if="isAuthorized">
        <a class="nav-link px-3" href="#" @click.stop="randomizeStocks">End Day</a>
      </li>
      <li class="nav-item" v-if="!isAuthorized">
        <router-link to="/quiz" class="nav-link">Super Quiz</router-link>
      </li>
      <dropdown-menu v-if="isAuthorized" />
    </ul>
    <div class="text-white pl-3" v-if="isAuthorized">Funds: {{ funds | currency }}</div>
  </nav>
</template>

<script>
import {
  portfolioGetters,
  stockActions,
  authActions,
  authGetters,
} from '../store/modules/mapping';
import dropdownMenu from './Dropdown.vue';

export default {
  components: {
    dropdownMenu,
  },
  computed: {
    ...portfolioGetters(['funds']),
    ...authGetters(['isAuthorized']),
  },
  methods: {
    ...stockActions(['randomizeStocks']),
    ...authActions(['logout']),
  },
};
</script>
