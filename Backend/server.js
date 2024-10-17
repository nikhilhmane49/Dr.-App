
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const mongoDB = require('./config/mongoDB.js');


const app = express();

const port = process.env.PORT || 4000;

//call
mongoDB();



//midleware

app.use(express.json());
app.use(cors())

//listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})