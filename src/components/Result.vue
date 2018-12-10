<template>
  <div class="result text-center" v-if="pageSelected === 'result'">
    <h1>Result</h1><hr>
    <h4 v-if="player1.score > player2.score">{{ player1.name }} won with a total of {{ player1.score }} points.</h4>
    <h4 v-else-if="player2.score > player1.score"> {{ player2.name }} won with a total of {{ player2.score }} points.</h4>
    <h4 v-else> Match ended as a draw.</h4>
    
    <br><br>
    <button class="btn btn-lg btn-danger" @click="newGame()">Start a new game</button>
  </div>
</template>

<script>

export default {
  props: ['pageSelected', 'player1', 'player2'],
  data() {
    return {
      resultMessage: '',
    }
  },
  methods: {
    newGame() {
      location.reload();
    },
  },
}

</script>