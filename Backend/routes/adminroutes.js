const express = require('express');

const { addDoctor,adminLogin, getalldoctor ,appointmentslist , adminregester} = require('../Contorell/AdminController');

const {changeavaliblity}=require('../Contorell/doctorcontroller');

const upload = require('../midellware/Multer');
const authadmin = require('../midellware/Authadmin');
const adminrouter = express.Router();

 adminrouter.post('/add-doctor', authadmin, upload.single('image'), addDoctor);
 adminrouter.post('/login',  adminLogin);
 adminrouter.post('/regester',  adminregester);
 adminrouter.post('/all-doctors', authadmin,getalldoctor);
adminrouter.post('/changeavaliblity', authadmin, changeavaliblity);
adminrouter.get('/appointmentslist', authadmin, appointmentslist);
 

module.exports = adminrouter;