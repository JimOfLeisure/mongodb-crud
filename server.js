const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();

const PORT = process.env.PORT || 3000;

MongoClient.connect(`mongodb+srv://pawn:${encodeURIComponent(process.env.MONGOPW)}@cluster0.b8f63.mongodb.net/?retryWrites=true&w=majority`, (err, client) => {
    console.log('Connected to Mongo Atlas');
    const db = client.db('star-wars-quotes');
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    console.log(req.body);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})