<template>
  <div class="card">
    <h5 class="card-header text-center">{{ question }}</h5>
    <div class="card-body py-4">
      <div class="row justify-content-around">
        <div class="col-auto">
          <button
            class="btn btn-primary"
            @click="handleAnswer(qData[0].correct)"
          >{{ qData[0].value }}</button>
        </div>
        <div class="col-auto">
          <button
            class="btn btn-primary"
            @click="handleAnswer(qData[1].correct)"
          >{{ qData[1].value }}</button>
        </div>
      </div>

      <div class="row justify-content-around mt-5">
        <div class="col-auto">
          <button
            class="btn btn-primary"
            @click="handleAnswer(qData[2].correct)"
          >{{ qData[2].value }}</button>
        </div>
        <div class="col-auto">
          <button
            class="btn btn-primary"
            @click="handleAnswer(qData[3].correct)"
          >{{ qData[3].value }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { range } from 'ramda';
import shuffle from 'shuffle-array';

const MODE_ADDITION = 1;
const MODE_SUBSTRACTION = 2;
export default {
  data() {
    return {
      question: 'Oops, an error ocurred',
      qData: [
        {
          correct: false,
          value: 0,
        },
        {
          correct: false,
          value: 0,
        },
        {
          correct: false,
          value: 0,
        },
        {
          correct: true,
          value: 0,
        },
      ],
    };
  },
  methods: {
    generateQuestion() {
      const firstNum = this.getRandomNumber(1, 100);
      const secondNum = this.getRandomNumber(1, 100);
      const modeNum = this.getRandomNumber(1, 3);

      let correctAnswer = 0;

      switch (modeNum) {
        case MODE_ADDITION:
          this.question = `What is ${firstNum} + ${secondNum}?`;
          correctAnswer = firstNum + secondNum;
          break;
        case MODE_SUBSTRACTION:
          this.question = `What is ${firstNum} - ${secondNum}?`;
          correctAnswer = firstNum - secondNum;
          break;
        default:
          this.question = 'Oops, an error ocurred';
          correctAnswer = 0;
      }

      const correctBtnIndex = this.getRandomNumber(0, this.qData.length);
      this.qData = [0, 1, 2, 3].map((item) => (
        item === correctBtnIndex
          ? {
            correct: true,
            value: correctAnswer,
          }
          : {
            correct: false,
            value: this.getIncorrectAnswer(correctAnswer),
          }
      ));
    },
    getIncorrectAnswer(val) {
      return this.getRandomNumber(val - 10, val + 10, val);
    },
    getRandomNumber(min, max, except) {
      const num = shuffle.pick(range(min, max));
      return num !== except ? num : this.getRandomNumber(min, max, except);
    },
    handleAnswer(correct) {
      this.$emit('answered', correct);
    },
  },
  created() {
    this.generateQuestion();
  },
};
</script>
