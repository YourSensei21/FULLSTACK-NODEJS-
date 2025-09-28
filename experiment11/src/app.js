const express = require('express');
const app = express();
const port = 3000;

const cardsRouter = require('./routes/cards');

app.use(express.json());

app.use('/cards', cardsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
