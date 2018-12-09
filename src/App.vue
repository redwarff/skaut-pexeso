<template>
  <div id="app container-fluid">
    <h3 class="text-center"> {{ points }}</h3>
    <div class="game">
      <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
        <img v-if="activeCard.card1===i"
         :src="getFrontImage(i)" width="100" height="100" class="img-fluid">
        <img v-else-if="activeCard.card2===i"
         :src="getFrontImage(i)" width="100" height="100" class="img-fluid">
        <img v-else-if="discardedCards.includes(i)"
          :src="getEndImage()" width="100" height="100" class="img-fluid">
        <img v-else
        :src="getBackImage()" @click="flipCard(i)" width="100" height="100" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
import harryPotterPexeso from './pexeso'

export default {
  name: 'app',
  components: {
    
  },
  data() {
    return {
      activeDeck: harryPotterPexeso,
      activeCard: {
        card1: undefined,
        card2: undefined,
      },
      points: 0,
      loading: false,
      discardedCards: [],
    }
  },
  methods: {
    getBackImage() {
      return require('../src/assets/img/back.png');
    },
    getFrontImage(i) {
      return require('../src/assets/img/' + this.activeDeck.name + '/' + this.activeDeck.cards[i].cardName + '.png');
    },
    getEndImage(i) {
      return require('../src/assets/img/end.png')
    },
    flipCard(index) {
      if (this.loading) return;
      if (this.activeCard.card1 === undefined ) {
        this.activeCard.card1 = index;
      }
      else {
        this.activeCard.card2 = index;
        if (this.activeCard.card2===this.activeCard.card1) {
          return;
        }
        this.evaluate()
      }
    },
    evaluate() {
      if (this.activeDeck.cards[this.activeCard.card1].cardName === this.activeDeck.cards[this.activeCard.card2].cardName) {
        this.points += 1;
        this.discardedCards.push(this.activeCard.card1);
        this.discardedCards.push(this.activeCard.card2);
      }
      this.loading = true;
      setTimeout(() => {
        this.reset();
      }, 2000);
    },
    reset() {
      this.activeCard.card1 = undefined;
      this.activeCard.card2 = undefined;
      this.loading = false;
    }
  },
}
</script>

<style>
.game {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  padding: 10px;
}
.card {
  border: none;
}
</style>
