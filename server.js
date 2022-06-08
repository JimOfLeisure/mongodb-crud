const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();

const PORT = process.env.PORT || 3000;

MongoClient.connect(`mongodb+srv://pawn:${encodeURIComponent(process.env.MONGOPW)}@cluster0.b8f63.mongodb.net/?retryWrites=true&w=majority`, (err, client) => {
    console.log('Connected to Mongo Atlas');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view-engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public'));

    app.get('/', (req, res) => {
        // res.sendFile(__dirname + '/index.html');
        const cursor = quotesCollection.find().toArray()
            .then(results => {
                console.log(results);
                res.render('index.ejs', { quotes: results });
            });
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/');
            })
            .catch(err => console.error(err));
    });

    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'Yoda' },
            {
                $set: {
                    name: req.body.name,
                    quote: req.body.quote,
                }
            },
            {
                upsert: true,
            }
        )
            .then(dbRes => {
                res.json({ result: 'Success' });
            })
            .catch(err => { console.error(err) });
    });

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
