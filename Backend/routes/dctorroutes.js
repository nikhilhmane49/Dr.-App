const express = require('express');

const {listdoctor}=require('../Contorell/doctorcontroller');

const doctorroutes = express.Router();

doctorroutes.get('/listdoctor',listdoctor)


module.exports = doctorroutes;