const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
    console.log("woo");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})