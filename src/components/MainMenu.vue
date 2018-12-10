<template>
  <div class="menu text-center" v-if="pageSelected === 'menu'">
    <h1>Choose your name</h1><hr>
    <h2>Player 1:</h2>
    <input type="text" v-model="player1.name" placeholder="Write your name here...">
    <h2>Player 2:</h2>
    <input type="text" v-model="player2.name" placeholder="Write your name here..."
    @keydown.enter="selectPage('select-pexeso')"><br><br><br>
    <button class="btn btn-lg btn-danger" :disabled="player1.name === undefined || player2.name === undefined"
      @click="selectPage('select-pexeso')">Next screen</button>
  </div>
</template>

<script>

export default {
  props: ['selectPage', 'pageSelected', 'player1', 'player2'],
}

</script>

<style>
  input {
    padding-left: 3px;
  }
</style>

