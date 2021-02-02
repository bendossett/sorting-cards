const express = require('express');

const app = express();

app.use(express.static('./dist/sorting-cards'));

app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: 'dist/sorting-cards/'});
});

app.listen(process.env.PORT || 8080);