const express = require('express');

const myapp = express();

myapp.get(['/', '/index.html'], (req, res) => {
    console.log('req for root, sending file ${__dirname}/public/index.html');
    res.sendFile('${__dirname}/public/index.html'); 
});

myapp.get('/student/:id', (req, res) => {
    res.status(200).send({"id": "665343"});
    res.end();
});

myapp.post('/student/:id', (req, res) => {
    const givenID = req.params.id;
    res.status(200).send({"id": givenID});
    res.end();
});

myapp.listen(8080);
