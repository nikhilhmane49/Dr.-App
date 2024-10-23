const express = require('express');

const { addDoctor } = require('../Contorell/AdminController');

const upload = require('../midellware/Multer');

const adminrouter = express.Router();

 adminrouter.post('/add-doctor', upload.single('image'), addDoctor);

module.exports = adminrouter;