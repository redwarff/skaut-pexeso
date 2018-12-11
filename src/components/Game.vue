<template>
  <div>
    <div class="game text-center" v-if="pageSelected === 'game'">
      <h1>Select Pexeso</h1><hr>
      <div class="pexeso-show">
        <div class="each-pexeso" v-for="(pexeso, i) in pexesoDecks" :key="i"
        :class="{'pexeso-active': activeDeck === pexesoDecks[i]}"
          @click="selectPexeso(i)">
          <h3 class="pexeso-header">{{ pexeso.name }}</h3><br>
          <img class="pexeso-main img-fluid" :src="getPexesoImage(i)" alt="pexeso">
        </div>
      </div>
      <button class="btn btn-lg btn-danger margin-top-60" :disabled="activeDeck === undefined"
        @click="selectPage('board')">Start Game</button>
    </div>
    <board :selectPage="selectPage" :pageSelected="pageSelected" :pexesoDecks="pexesoDecks"
      :activeDeck="activeDeck" :player1="player1" :player2="player2"></board>
  </div>
</template>

<script>
import pexesoDecks from '../pexeso';
import Board from './Board.vue'

export default {
  components: {
    Board,
  },
  props: ['selectPage', 'pageSelected', 'player1', 'player2'],
  data() {
    return {
      pexesoDecks: pexesoDecks,
      activeDeck: undefined,
    }
  },
  methods: {
    getPexesoImage(i) {
      return require('../assets/img/' + this.pexesoDecks[i].pathName + '/main.png');
    },
    selectPexeso(i) {
      this.activeDeck = this.pexesoDecks[i];
    },
  },
}

</script>