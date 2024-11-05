const express = require('express');


const {regester ,userlogin , getprofile , updateprofile} =require('../Contorell/UserController');

const authuser = require('../midellware/AuthUser');

const upload=require('../midellware/Multer');

const userroutes = express.Router();

userroutes.post('/user-resgretration', regester);
userroutes.post('/user-login', userlogin);
userroutes.get('/user-profile',  authuser ,getprofile);
userroutes.post('/user-updateprofile', upload.single('image'),  authuser ,updateprofile);


module.exports =userroutes;