const express = require('express');


const {regester ,userlogin , getprofile , updateprofile ,bookappointment,appointmentslist,cancelappointment} =require('../Contorell/UserController');

const authuser = require('../midellware/AuthUser');

const upload=require('../midellware/Multer');

const userroutes = express.Router();

userroutes.post('/user-resgretration', regester);
userroutes.post('/user-login', userlogin);
userroutes.get('/user-profile',  authuser ,getprofile);
userroutes.post('/user-updateprofile', upload.single('image'), authuser, updateprofile);
userroutes.post('/bookappointment',authuser,bookappointment);
userroutes.get('/user-appointmentslist',authuser, appointmentslist);
userroutes.post('/user-cancelappointment',authuser, cancelappointment);


module.exports =userroutes;