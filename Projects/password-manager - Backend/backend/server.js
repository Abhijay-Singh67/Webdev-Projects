const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const url = "mongodb://localhost:27017/"
const cors = require("cors")
const client = new MongoClient(url);
const app = express()
const port = 3000
app.use(bodyparser.json())
app.use(cors())
client.connect();

//Get all the passwords
app.get('/', async (req, res) => {
    const db = client.db("PassGrid")
    const collection = db.collection("passwords");
    const data = await collection.find({}).toArray();
    res.json(data);
})

//Save a password
app.post('/', async (req, res) => {
    const password=req.body;
    const db = client.db("PassGrid")
    const collection = db.collection("passwords");
    await collection.insertOne(password);
    res.send("Success");
})

//Delete password
app.delete('/', async (req, res) => {
    const password=req.body;
    const db = client.db("PassGrid")
    const collection = db.collection("passwords");
    await collection.deleteOne(password);
    res.send("Success");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})