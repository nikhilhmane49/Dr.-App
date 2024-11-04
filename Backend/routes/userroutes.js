const express = require('express');


const {regester} =require('../Contorell/UserController');

const userroutes = express.Router();

userroutes.post('/user-resgretration', regester);


module.exports =userroutes;