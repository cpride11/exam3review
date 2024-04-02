const express = require('express');
const bodyParser = require('body-parser');

const myapp = express();

myapp.use(bodyParser.json());

// Game character data
let characters = [
    { id: 1, name: 'Luigi', game: 'Super Mario Bros' },
    { id: 2, name: 'Link', game: 'The Legend of Zelda' },
    { id: 3, name: 'Kratos', game: 'God of War' },
];

// Get request
myapp.get(['/', '/index.html'], (req, res) => {
    console.log('req for root, sending file ${__dirname}/public/index.html');
    res.sendFile('${__dirname}/public/index.html'); 
});

myapp.get('/characters', (req, res) => {
    res.status(200).send(characters);
    res.end();
});

myapp.get('/characters/:id', (req, res) => {
    const givenID = req.params.id;  
    const character = characters.find(char => char.id === parseInt(givenID));

    if (!character) {
        res.status(404).send('Character not found');
    } else {
        res.status(200).send(character);
    }
    res.end();
});

// Post request
myapp.post('/characters', (req, res) => {
    const { name, game } = req.body;
    const id = characters.length + 1;

    characters.push({ id, name, game });
    res.status(201).send({ id, name, game });
    res.end();
});

// Put request
myapp.put('/characters/:id', (req, res) => {
    const givenID = req.params.id;
    const { name, game } = req.body;
    const character = characters.find(char => char.id === parseInt(givenID));

    if (!character) {
        res.status(404).send('Character not found');
    } else {
        character.name = name;
        character.game = game;
        res.status(200).send(character);
    }
    res.end();
});

// Delete request
myapp.delete('/characters/:id', (req, res) => {
    const givenID = req.params.id;
    const character = characters.find(char => char.id === parseInt(givenID));

    if (!character) {
        res.status(404).send('Character not found');
    } else {
        characters = characters.filter(char => char.id !== parseInt(givenID));
        res.status(200).send('Character deleted');
    }
    res.end();
});

myapp.listen(8080);




/*myapp.get(['/', '/index.html'], (req, res) => {
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

myapp.listen(8080);*/
