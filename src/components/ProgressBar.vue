<template>
  <div class="row my-4">
    <div class="col">
      <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{width: (count / limit *100) + '%'}"
          aria-valuenow="20"
          aria-valuemin="0"
          aria-valuemax="100"
        >{{ count }} / {{ limit }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['limit', 'count'],
};
</script>

<style lang="scss">
</style>
