<template>
  <div id="app">
    <div class="game">
      <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
        <img :src="getImage(i)">
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
    }
  },
  methods: {
    getImage(i) {
      return require('../src/assets/img/' + this.activeDeck.name + '/' + this.activeDeck.cards[i].index + '.png')
    }
  }
}
</script>

<style>

</style>
