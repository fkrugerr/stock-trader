import { range } from 'ramda';
import shuffle from 'shuffle-array';

export const getRandomNumber = (min, max, except) => {
  const num = shuffle.pick(range(min, max));
  return num !== except ? num : this.getRandomNumber(min, max, except);
};

export const getRange = (min, max) => range(min, max);

export const getPositiveRandomNumber = (num) => (
  Math.round(num * (0.5 + Math.random()))
);
