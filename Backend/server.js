
const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const mongoDB = require('./config/mongoDB.js');
const connectcloudinary = require('./config/Cloudinary.js');

const adminrouter = require('./routes/adminroutes.js');

const app = express();

const port = process.env.PORT || 4000;

//call

//*mongoDB
mongoDB();
//*cloudinary
connectcloudinary();



//midleware

app.use(express.json());
app.use(cors())



//APi end point

app.use('/api/admin',adminrouter)





//listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})