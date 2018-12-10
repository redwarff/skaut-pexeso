<template>
  <div id="app" class="container-fluid">
    <main-menu :selectPage="selectPage" :pageSelected="pageSelected" :player1="player1" :player2="player2"></main-menu>

    <game :selectPage="selectPage" :pageSelected="pageSelected"
     :player1="player1" :player2="player2"></game>

    <result :pageSelected="pageSelected" :player1="player1" :player2="player2"></result>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue';
import Game from './components/Game.vue';
import Result from './components/Result.vue';


export default {
  name: 'app',
  components: {
    MainMenu,
    Game,
    Result,
  },
  data() {
    return {
      pageSelected: 'menu',
      player1: {
        name: undefined,
        score: 0,
      },
      player2: {
        name: undefined,
        score: 0,
      },
    }
  },
  methods: {
    selectPage(page) {
      this.pageSelected = page;
    },
  },
}
</script>

