<template>
  <div id="app container-fluid">
    <div class="menu text-center" v-if="pageSelected === 'menu'">
      <h1>Choose your name</h1><hr>
      <h2>Player 1:</h2>
      <input type="text" v-model="player1.name" placeholder="Write your name here...">
      <h2>Player 2:</h2>
      <input type="text" v-model="player2.name" placeholder="Write your name here..."><br><br>
      <button class="btn btn-lg btn-danger" :disabled="player1.name === undefined || player2.name === undefined"
        @click="selectPage('game')">Start Game</button>
    </div>
    <div class="game" v-if="pageSelected === 'game'">
      <div class="score text-center">
        <h3 :class="{'active':isPlayer1Active, 'passive':!isPlayer1Active}"> {{ player1.name }}</h3>
        <h3>{{ player1.points }} | {{ player2.points }}</h3>
        <h3 :class="{'active':!isPlayer1Active, 'passive':isPlayer1Active}"> {{ player2.name }} </h3>
      </div>
      <div class="game-board">
        <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
          <img v-if="activeCard.card1 === i"
          :src="getFrontImage(i)" class="img-fluid">
          <img v-else-if="activeCard.card2 === i"
          :src="getFrontImage(i)" class="img-fluid">
          <img v-else-if="discardedCards.includes(i)"
            :src="getEndImage()" class="img-fluid">
          <img v-else
          :src="getBackImage()" @click="flipCard(i)" class="img-fluid">
        </div>
      </div>
    </div>
    <div class="result" v-if="pageSelected === 'result'"></div>
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
      pageSelected: 'menu',
      activeDeck: harryPotterPexeso,
      isPlayer1Active: true,
      activeCard: {
        card1: undefined,
        card2: undefined,
      },
      player1: {
        name: undefined,
        points: 0,
      },
      player2: {
        name: undefined,
        points: 0,
      },
      loading: false,
      discardedCards: [],
    }
  },
  methods: {
    selectPage(page) {
      this.pageSelected = page;
    },
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
        if (this.isPlayer1Active) {
          this.player1.points += 1;
        }
        else {
          this.player2.points += 1;
        }
        this.discardedCards.push(this.activeCard.card1);
        this.discardedCards.push(this.activeCard.card2);
      }
      this.loading = true;
      setTimeout(() => {
        this.reset();
      }, 2000);
    },
    switchPlayers() {
      this.isPlayer1Active = !this.isPlayer1Active;
    },
    reset() {
      this.switchPlayers();
      this.activeCard.card1 = undefined;
      this.activeCard.card2 = undefined;
      this.loading = false;
    }
  },
}
</script>

<style>
img {
  width: 90px;
  height: 90px;
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

@media (max-width: 800px) {
  .game-board {
    grid-template-columns: repeat(6, 1fr);
  }
}
@media (max-width: 600px) {
  .game-board {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
