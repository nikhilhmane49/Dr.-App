const express = require('express');


const {regester ,userlogin} =require('../Contorell/UserController');

const userroutes = express.Router();

userroutes.post('/user-resgretration', regester);
userroutes.post('/user-login', userlogin);


module.exports =userroutes;