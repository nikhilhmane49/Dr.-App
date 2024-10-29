const express = require('express');

const { addDoctor,adminLogin } = require('../Contorell/AdminController');

const upload = require('../midellware/Multer');
const authadmin = require('../midellware/Authadmin');
const adminrouter = express.Router();

 adminrouter.post('/add-doctor', authadmin, upload.single('image'), addDoctor);
 adminrouter.post('/login',  adminLogin);

module.exports = adminrouter;