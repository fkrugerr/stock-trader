<template>
  <div class="row">
    <div class="col-lg-6 col-md-8 mx-auto">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            :class="{'is-invalid': $v.values.email.$error,
            'is-valid': !$v.values.email.$invalid}"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model.trim.lazy="$v.values.email.$model"
          />
          <small
            v-if="!$v.values.email.$error"
            id="emailHelp"
            class="form-text text-muted"
          >We'll never share your email with anyone else.</small>
          <small v-else id="emailError" class="form-text text-danger">Invalid or not unique email!</small>
        </div>
        <div class="form-group">
          <label for="email">Age</label>
          <input
            type="number"
            class="form-control"
            :class="{'is-invalid': $v.values.age.$error,
            'is-valid': !$v.values.age.$invalid}"
            id="age"
            placeholder="Your Age"
            v-model.trim="$v.values.age.$model"
          />
          <small
            v-if="!$v.values.age.minValue"
            id="ageError"
            class="form-text text-danger"
          >You must be at least {{ $v.values.age.$params.minValue.min}} years old!</small>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            :class="{'is-invalid': $v.values.password.$error,
            'is-valid': !$v.values.password.$invalid}"
            id="password"
            placeholder="Password"
            v-model.trim="$v.values.password.$model"
          />
        </div>
        <div class="form-group">
          <label for="confirm">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            :class="{'is-invalid': $v.values.confirm.$error,
            'is-valid': !$v.values.confirm.$invalid}"
            id="confirm"
            placeholder="Confirm Password"
            v-model.trim.lazy="$v.values.confirm.$model"
          />
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <select class="form-control" v-model="values.country" id="country">
            <option v-for="item in countriesList" :value="item" :key="item">{{ item }}</option>
          </select>
        </div>
        <div class="custom-control custom-checkbox mb-4">
          <input
            type="checkbox"
            class="custom-control-input"
            v-model="$v.values.terms.$model"
            id="accept"
          />
          <label
            class="custom-control-label"
            :class="{'text-danger': $v.values.terms.$error}"
            for="accept"
          >I accept the terms.</label>
        </div>
        <button type="submit" :disabled="$v.$invalid" class="btn btn-dark">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import {
  email as emailValidator,
  required,
  integer,
  minValue,
  minLength,
  alphaNum,
  sameAs,
} from 'vuelidate/lib/validators';
import { isEmpty } from 'ramda';
import { globalAxios as axios } from '../../helpers/axiosInstances';
import { authActions } from '../../store/modules/mapping';
import countriesList from '../../constants/countries';

export default {
  data() {
    return {
      values: {
        email: '',
        age: 18,
        password: '',
        confirm: '',
        country: 'United States',
        terms: true,
      },
      countriesList,
    };
  },
  validations: {
    values: {
      email: {
        required,
        email: emailValidator,
        unique: (val) => {
          if (!val) return true;
          return axios
            .get(`users.json?orderBy="email"&equalTo="${val}"`)
            .then((res) => isEmpty(res.data));
        },
      },
      age: {
        required,
        integer,
        minValue: minValue(18),
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6),
      },
      confirm: {
        // same: sameAs('password'),
        same: sameAs((vm) => vm.password),
      },
      terms: {
        same: sameAs(() => true),
      },
    },
  },
  methods: {
    ...authActions(['signup']),
    onSubmit() {
      const { email, password, age, country } = this.values;
      this.signup({
        email,
        password,
        age,
        country,
      });
    },
  },
};
</script>
