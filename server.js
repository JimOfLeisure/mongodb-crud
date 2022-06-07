const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

console.log('hi');

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})