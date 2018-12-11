<template>
  <div class="game" v-if="pageSelected === 'board'">
    <div class="score text-center">
      <h3 :class="{'active':isPlayer1Active, 'passive':!isPlayer1Active}"> {{ player1.name }}</h3>
      <h3>{{ player1.score }} | {{ player2.score }}</h3>
      <h3 :class="{'active':!isPlayer1Active, 'passive':isPlayer1Active}"> {{ player2.name }} </h3>
    </div>
    <div class="game-board">
      <div class="card" v-for="(card, i) in activeDeck.cards" :key="i">
        <img :class="{'card-img-sm': activeDeck.numberOfCards > 40, 'card-img-lg': activeDeck.numberOfCards <= 40}"
        :src="imgSrc(i)" @click="onImgClick(i)" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ['selectPage', 'pageSelected', 'pexesoDecks', 'activeDeck', 'player1', 'player2'],
  data() {
    return {
      isPlayer1Active: true,
      wasPlayerSuccessful: false,
      activeCard: {
        card1: undefined,
        card2: undefined,
      },
      loading: false,
      discardedCards: [],
    }
  },
  methods: {
    imgSrc(i) {
      if (this.activeCard.card1 === i || this.activeCard.card2 === i) {
        return require('../assets/img/' + this.activeDeck.pathName + '/' + this.activeDeck.cards[i].cardName + '.png');
      }
      else if (this.discardedCards.includes(i)) return require('../assets/img/end.png');
      else return require('../assets/img/back.png');
    },
    onImgClick(i) {
      if (this.activeCard.card1 === i || this.activeCard.card2 === i || this.discardedCards.includes(i)) return;
      this.flipCard(i)
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
        this.evaluate();
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
          return this.selectPage('result');
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
        this.switchPlayers();
      }
    },
  },
}

</script>