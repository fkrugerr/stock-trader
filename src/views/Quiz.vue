<template>
  <div>
    <h1 class="text-center my-4">Super Quiz</h1>
    <div class="row">
      <div class="col-md-8 mx-auto mb-4">
        <transition name="flip" mode="out-in">
          <component :is="mode" @answered="handleAnswer($event)" @confirmed="handleConfirm" />
        </transition>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 mx-auto mb-4">
        <transition enter-active-class="animated flipInX" leave-active-class="animated flipOutX">
          <div class="alert alert-danger" v-if="isError">
            Wrong Answer :(. Try again
            <button
              type="button"
              class="close"
              aria-label="Close"
              @click="isError=false"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Answer from '../components/quiz/Answer.vue';
import Question from '../components/quiz/Question.vue';

export default {
  data() {
    return {
      mode: 'q-question',
      isError: false,
    };
  },
  components: {
    qAnswer: Answer,
    qQuestion: Question,
  },
  methods: {
    handleAnswer(val) {
      if (val) {
        this.mode = 'q-answer';
        this.isError = false;
      } else {
        this.isError = true;
      }
    },
    handleConfirm() {
      this.mode = 'q-question';
    },
  },
};
</script>

<style lang="scss" scoped>
.flip-enter-active {
  animation: flip-in 0.5s ease-out forwards;
}

.flip-leave-active {
  animation: flip-out 0.5s ease-out forwards;
}

@keyframes flip-out {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(90deg);
  }
}

@keyframes flip-in {
  from {
    transform: rotateY(90deg);
  }
  to {
    transform: rotateY(0deg);
  }
}
</style>
