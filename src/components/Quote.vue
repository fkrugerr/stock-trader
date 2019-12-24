<template>
  <div class="col-md-4 col-sm-6 col-lg-3">
    <div class="quote p-3">
      <slot />
    </div>
  </div>
</template>

<script>
export default {};
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
