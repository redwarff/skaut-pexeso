<template>
  <div id="app" class="container-fluid">
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
    <div class="select-pexeso text-center" v-if="pageSelected === 'select-pexeso'">
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
        @click="selectPage('game')">Start Game</button>
    </div>
    <div class="game" v-if="pageSelected === 'game'">
      <div class="score text-center">
        <h3 :class="{'active':isPlayer1Active, 'passive':!isPlayer1Active}"> {{ player1.name }}</h3>
        <h3>{{ player1.score }} | {{ player2.score }}</h3>
        <h3 :class="{'active':!isPlayer1Active, 'passive':isPlayer1Active}"> {{ player2.name }} </h3>
      </div>
      <div class="game-board">
        <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
          <img v-if="activeCard.card1 === i" 
          :class="{'card-img-sm': activeDeck.numberOfCards > 40, 'card-img-lg': activeDeck.numberOfCards <= 40}"
          :src="getCardImage(i)" class="img-fluid">
          <img v-else-if="activeCard.card2 === i" 
          :class="{'card-img-sm': activeDeck.numberOfCards > 40, 'card-img-lg': activeDeck.numberOfCards <=40}"
          :src="getCardImage(i)" class="img-fluid">
          <img v-else-if="discardedCards.includes(i)" 
          :class="{'card-img-sm': activeDeck.numberOfCards > 40, 'card-img-lg': activeDeck.numberOfCards <=40}"
            src="../src/assets/img/end.png" class="img-fluid">
          <img v-else 
          :class="{'card-img-sm': activeDeck.numberOfCards > 40, 'card-img-lg': activeDeck.numberOfCards <=40}"
            src="../src/assets/img/back.png" @click="flipCard(i)" class="img-fluid">
        </div>
      </div>
    </div>
    <div class="result text-center" v-if="pageSelected === 'result'">
      <h1>Result</h1><hr>
      <h4>{{ resultMessage }}</h4><br><br>
      <button class="btn btn-lg btn-danger" @click="newGame()">Start a new game</button>
    </div>
  </div>
</template>

<script>
import pexesoDecks from './pexeso'

export default {
  name: 'app',
  data() {
    return {
      pageSelected: 'menu',
      pexesoDecks: pexesoDecks,
      activeDeck: undefined,
      isPlayer1Active: true,
      wasPlayerSuccessful: false,
      activeCard: {
        card1: undefined,
        card2: undefined,
      },
      player1: {
        name: undefined,
        score: 0,
      },
      player2: {
        name: undefined,
        score: 0,
      },
      loading: false,
      discardedCards: [],
      resultMessage: '',
    }
  },
  methods: {
    newGame() {
      location.reload();
    },
    selectPage(page) {
      this.pageSelected = page;
    },
    selectPexeso(i) {
      this.activeDeck = this.pexesoDecks[i];
    },
    getCardImage(i) {
      return require('../src/assets/img/' + this.activeDeck.pathName + '/' + this.activeDeck.cards[i].cardName + '.png');
    },
    getPexesoImage(i) {
      return require('../src/assets/img/' + this.pexesoDecks[i].pathName + '/main.png');
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
      this.loading = true;
      setTimeout(() => {
        this.countScore();
        this.reset();
      }, 1500);
    },
    countScore() {
      this.wasPlayerSuccessful = false;
      if (this.activeDeck.cards[this.activeCard.card1].cardName === this.activeDeck.cards[this.activeCard.card2].cardName) {
        if (this.isPlayer1Active) {
          this.player1.score += 1;
          this.wasPlayerSuccessful = true;
        }
        else {
          this.player2.score += 1;
          this.wasPlayerSuccessful = true;
        }
        this.discardedCards.push(this.activeCard.card1);
        this.discardedCards.push(this.activeCard.card2);
        if (this.discardedCards.length === this.activeDeck.cards.length) {
          return this.result();
        }
      }
    },
    switchPlayers() {
      this.isPlayer1Active = !this.isPlayer1Active;
    },
    reset() {
      this.activeCard.card1 = undefined;
      this.activeCard.card2 = undefined;
      this.loading = false;
      if (!this.wasPlayerSuccessful) {
        this.switchPlayers()
      }
    },
    result() {
      if (this.player1.score > this.player2.score) {
        this.resultMessage = `${this.player1.name} won with a total of ${this.player1.score} points.`;
      }
      else {
        this.resultMessage = `${this.player2.name} won with a total of ${this.player2.score} points.`;
      }
      this.selectPage('result');
    }
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
