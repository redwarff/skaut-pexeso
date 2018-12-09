<template>
  <div id="app container-fluid">
    <div class="game">
      <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
        <img v-if="activeCard===i" :src="getFrontImage(i)" @click="flipCard()" width="140" height="140" class="img-fluid">
        <img v-else :src="getBackImage()" @click="flipCard(i)" width="140" height="140" class="img-fluid">
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
      activeCard: undefined,
    }
  },
  methods: {
    getBackImage() {
      return require('../src/assets/img/back.png');
    },
    getFrontImage(i) {
      return require('../src/assets/img/' + this.activeDeck.name + '/' + this.activeDeck.cards[i].cardName + '.png');
    },
    flipCard(i) {
      this.activeCard = i;
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
