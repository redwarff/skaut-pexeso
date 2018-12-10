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

<style>
.card-img-sm {
  width: 90px;
  height: 90px;
}
.card-img-lg {
  width: 130px;
  height: 130px;
}
.pexeso-main {
  width: 300px;
  height: 300px;
}
.pexeso-show {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.each-pexeso {
  padding: 20px;
  border-radius: 20px;
}
.each-pexeso:hover {
  background-color: rgb(192, 192, 192);
  cursor: pointer;
}
.pexeso-active {
  background-color: rgb(192, 192, 192);
}
.game-board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 10px;
  padding: 10px;
}
.card {
  border: none;
}
.active {
  color: rgb(124, 12, 12);
  font-weight: bold;
}
.passive {
  color: black;
  font-weight: normal;
}
h3 {
  display: inline;
  padding: 0px 20px 0px 20px;
}
h2 {
  margin-top: 30px;
  margin-bottom: 20px;
}
h1 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.margin-top-60 {
  margin-top: 60px;
}
.pexeso-header {
  display: block;
  margin-bottom: 0px;
}

@media (max-width: 1000px) {
  .pexeso-show {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .game-board {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 700px) {
  .pexeso-show {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 1fr);
  }
  .card-img-lg {
    width: 70px;
    height: 70px;
  }
  .card-img-sm {
    width: 70px;
    height: 70px;
  }
}
@media (max-width: 350px) {
  .card-img-lg {
    width: 60px;
    height: 60px;
  }
  .card-img-sm {
    width: 60px;
    height: 60px;
  }
}

</style>
