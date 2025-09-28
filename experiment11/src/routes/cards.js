const express = require('express');
const router = express.Router();

let cards = [
    { id: 1, suit: "Hearts", value: "Ace" },
    { id: 2, suit: "Spades", value: "King" },
    { id: 3, suit: "Diamonds", value: "Queen" }
];

let nextId = 4;

router.get('/', (req, res) => {
    res.status(200).json(cards);
});

router.get('/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));
    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
});

router.post('/', (req, res) => {
    const { suit, value } = req.body;
    if (!suit || !value) {
        return res.status(400).json({ message: "Suit and value are required" });
    }
    const newCard = {
        id: nextId++,
        suit,
        value
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});

router.delete('/:id', (req, res) => {
    const cardId = parseInt(req.params.id);
    const cardIndex = cards.findIndex(c => c.id === cardId);
    
    if (cardIndex === -1) {
        return res.status(404).json({ message: "Card not found" });
    }

    const [removedCard] = cards.splice(cardIndex, 1);
    res.status(200).json({ message: `Card with ID ${cardId} removed`, card: removedCard });
});

module.exports = router;
