<template>
  <div class="row">
    <div class="col">
      <progress-bar :limit="limit" :count="quotes.length" />
      <new-quote @submitQuote="addQuote" />
      <quotes-grid :quotes="quotes" :deleteQuote="deleteQuote" />
      <div class="row my-4">
        <div class="col">
          <div
            class="alert alert-info text-center"
            v-myon:mouseover="handleClick"
          >Click Quote to delete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Quotes from '../components/Quotes.vue';
import ProgressBar from '../components/ProgressBar.vue';
import NewQuote from '../components/NewQuote.vue';

const uuidv4 = require('uuid/v4');

export default {
  name: 'home',
  data() {
    return {
      quotes: [
        {
          id: uuidv4(),
          text: 'Initial quote!',
        },
      ],
      limit: 10,
    };
  },
  components: {
    quotesGrid: Quotes,
    NewQuote,
    ProgressBar,
  },
  methods: {
    addQuote(quote) {
      if (this.quotes.length >= this.limit) {
        console.log('over limit');
      } else {
        this.quotes.push({
          id: uuidv4(),
          text: quote,
        });
      }
    },
    deleteQuote(id) {
      this.quotes = this.quotes.filter((item) => item.id !== id);
    },
    handleClick() {
      console.log('clicked');
    },
  },
  directives: {
    myon: {
      bind(elem, binding) {
        const { arg, value } = binding;
        elem.addEventListener(arg, value);
      },
    },
  },
};
</script>
