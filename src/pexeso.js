class Pexeso {

    constructor(name, pathName, numberOfCards) {
        this.name = name;
        this.pathName = pathName;
        this.numberOfCards = numberOfCards;
        this.cards = [];
    }

    createCards() {
        for (let i = 1; i <= this.numberOfCards / 2; i++) {
            this.cards.push({
                cardName: i
            })
        }
    }

    makePairs() {
        const copyOfDeck = this.cards.slice(0);
        copyOfDeck.forEach(card => {
            this.cards.push(card);
        });
    }

    shuffleDeck() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]]
        }
    }
}

const harryPotterPexeso = new Pexeso('Harry Potter', 'harryPotter', 56);

harryPotterPexeso.createCards();
harryPotterPexeso.makePairs();
harryPotterPexeso.shuffleDeck();

export default harryPotterPexeso;