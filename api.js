const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient, ObjectID } = require('mongodb');
const path = require('path');

const myapp = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = 'mongodb+srv://cpride829:<password>@snowcatcluster.pnatmvc.mongodb.net/';

myapp.use(bodyParser.json());

let db;

MongoClient.connect(MONGO_URL, 
    { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    console.log('Connected to MongoDB');
    db = client.db('game-chars-database'); // mongodb database name
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Serve static files from the 'public' directory
myapp.use(express.static(path.join(__dirname, 'public')));

// Game character data
let characters = [
    { id: 1, name: 'Luigi', game: 'Super Mario Bros' },
    { id: 2, name: 'Link', game: 'The Legend of Zelda' },
    { id: 3, name: 'Kratos', game: 'God of War' },
];

// Get request to fetch all characters
myapp.get('/characters', async (req, res) => {
    try{ 
        const characters = await db.collection('characters').find().toArray();
        res.status(200).send(characters);
    } catch (err) {
        console.error('Error getting characters:', err);
        res.status(500).send('Error getting characters');
    }
    res.end();
});

// Get request to fetch a single character
myapp.get('/character/:id', async (req, res) => {
    try {
        const character = await db.collection('characters').findOne({ _id: ObjectID(req.params.id) });
        if (!character) {
            res.status(404).send('Character not found');
        } else {
            res.status(200).send(character);
        }
    }
    catch (err) {
        console.error('Error getting character:', err);
        res.status(500).send('Error getting character');
    }
    res.end();
});

// Post request to add a new character
myapp.post('/characters', async (req, res) => {
    try {
    const { name, game } = req.body;
    const result = db.collection('characters').insertOne({ name, game });
    const newCharacter = await db.collection('characters').findOne({ _id: result.insertedId });
    res.status(201).send(newCharacter);
    } catch (err) {
        console.error('Error adding character:', err);
        res.status(500).send('Error adding character');
    }
    res.end();
});

// Put request to update a character
myapp.put('/characters/:id', async (req, res) => {
    try {
        const { name, game } = req.body;
        const result = db.collection('characters').updateOne(
            { _id: ObjectID(req.params.id) }, 
            { $set: { name, game } 
        });
        if (result.modifiedCount === 0) {
            res.status(404).send('Character not found');
        } else {
            const updatedCharacter = await db.collection('characters').findOne({ _id: ObjectID(req.params.id) });
            res.status(200).send(updatedCharacter);
        }
    } catch (err) {
        console.error('Error updating character:', err);
        res.status(500).send('Error updating character');   
    }
    res.end();
});

// Delete request to remove a character
myapp.delete('/characters/:id', (req, res) => {
    try {
        const result = db.collection('characters').deleteOne(
            { _id: ObjectID(req.params.id) });
        if (result.deletedCount === 0) {
            res.status(404).send('Character not found');
        } else {
            res.status(200).send('Character deleted');
        }
    }
    catch (err) {
        console.error('Error deleting character:', err);
        res.status(500).send('Error deleting character');
    }
    res.end();
});

myapp.listen(8080);