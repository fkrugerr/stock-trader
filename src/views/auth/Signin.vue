<template>
  <div class="row">
    <div class="col-lg-6 col-md-8 mx-auto">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="values.email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="Password"
            v-model="values.password"
          />
        </div>
        <button type="submit" class="btn btn-dark">Login</button>
      </form>
    </div>
  </div>
</template>
<script>
import { authActions } from '../../store/modules/mapping';

export default {
  data() {
    return {
      values: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...authActions(['signin']),
    onSubmit() {
      const { email, password } = { ...this.values };
      this.signin({ email, password });
    },
  },
};
</script>
