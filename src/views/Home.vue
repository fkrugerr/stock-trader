<template>
  <div class="row">
    <div class="col">
      <div class="jumbotron text-center">
        <h1 class="display-4">Welcome to stock trading place!</h1>
        <p class="lead">You must be registered to get access to your portfolio!</p>
        <p>
          Or you may test your
          <router-link to="/quiz">math knowledge</router-link>!
        </p>
        <hr class="my-4" />
        <router-link to="/signin" class="btn btn-primary btn-lg mr-3">Sign In</router-link>
        <router-link to="/signup" class="btn btn-primary btn-lg">Sign Up</router-link>
      </div>
    </div>
  </div>
</template>
