class Pexeso {

    constructor(name, numberOfCards, numberOfRows, numberOfCols, cards) {
        this.name = name;
        this.numberOfCards = numberOfCards;
        this.numberOfRows = numberOfRows;
        this.numberOfCols = numberOfCols;
        this.cards = cards;
    }

    makePairs() {
        const copyOfDeck = this.cards.slice(0);
        copyOfDeck.forEach(card => {
            this.cards.push(card);
        });
    }

    shuffleDeck(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
    }
}

const harryPotterPexeso = new Pexeso('harryPotter', 56, 7, 8, [
    {
        index: 1,
        src: 'harryPotter/1.png'
    },
    {
        index: 2,
        src: '/src/assets/img/harryPotter/2.png'
    },
    {
        index: 3,
        src: './src/assets/img/harry_potter/3.png'
    },
    {
        index: 4,
        src: './src/assets/img/harry_potter/4.png'
    },
    {
        index: 5,
        src: './src/assets/img/harry_potter/5.png'
    },
    {
        index: 6,
        src: './src/assets/img/harry_potter/6.png'
    },
    {
        index: 7,
        src: './src/assets/img/harry_potter/7.png'
    },
    {
        index: 8,
        src: './src/assets/img/harry_potter/8.png'
    },
    {
        index: 9,
        src: './src/assets/img/harry_potter/9.png'
    },
    {
        index: 10,
        src: './src/assets/img/harry_potter/10.png'
    },
    {
        index: 11,
        src: './src/assets/img/harry_potter/11.png'
    },
    {
        index: 12,
        src: './src/assets/img/harry_potter/12.png'
    },
    {
        index: 13,
        src: './src/assets/img/harry_potter/13.png'
    },
    {
        index: 14,
        src: './src/assets/img/harry_potter/14.png'
    },
    {
        index: 15,
        src: './src/assets/img/harry_potter/15.png'
    },
    {
        index: 16,
        src: './src/assets/img/harry_potter/16.png'
    },
    {
        index: 17,
        src: './src/assets/img/harry_potter/17.png'
    },
    {
        index: 18,
        src: './src/assets/img/harry_potter/18.png'
    },
    {
        index: 19,
        src: './src/assets/img/harry_potter/19.png'
    },
    {
        index: 20,
        src: './src/assets/img/harry_potter/20.png'
    },
    {
        index: 21,
        src: './src/assets/img/harry_potter/21.png'
    },
    {
        index: 22,
        src: './src/assets/img/harry_potter/22.png'
    },
    {
        index: 23,
        src: './src/assets/img/harry_potter/23.png'
    },
    {
        index: 24,
        src: './src/assets/img/harry_potter/24.png'
    },
    {
        index: 25,
        src: './src/assets/img/harry_potter/25.png'
    },
    {
        index: 26,
        src: './src/assets/img/harry_potter/26.png'
    },
    {
        index: 27,
        src: './src/assets/img/harry_potter/27.png'
    },
    {
        index: 28,
        src: './src/assets/img/harry_potter/28.png'
    }
]);

export default harryPotterPexeso;