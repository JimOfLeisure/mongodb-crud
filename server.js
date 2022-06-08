const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const figlet = require('figlet');
const app = express();

const PORT = process.env.PORT || 3000;

MongoClient.connect(`mongodb+srv://pawn:${encodeURIComponent(process.env.MONGOPW)}@cluster0.b8f63.mongodb.net/?retryWrites=true&w=majority`, (err, client) => {
    console.log('Connected to Mongo Atlas');
    const db = client.db('star-wars-quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view-engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.static('public', { fallthrough: false }));
    // Custom 404 page
    app.use((err, req, res, next) => {
        console.log('error middleware!', err);
        if (err.statusCode === 404) {
            console.log('404!');
            figlet('404!!', function (err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                res.send(data);
            })
        } else {
            next();
        }
    });
    app.get('/', (req, res) => {
        const cursor = quotesCollection.find().toArray()
            .then(results => {
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

    app.delete('/quotes', (req, res) => {
        quotesCollection.findOneAndDelete({ name: req.body.name })
            .then(dbRes => {
                res.json({ result: 'Success' });
            })
            .catch(err => { console.error(err) });
    });

    app.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    })
});
