
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    DocId: {
        type: String,
        required: true
    },
    slotDate: {
        type: String,
        required: true
    },
    slotTime: {
        type: String,
        required: true
    },
    userData: {
        type: Object,
        // require:true
    },
    docData: {
        type: Object,
        // required: true
    },
    amount: {
        type: Number,
        // required: true
    },
    date: {
        type: Number,
        // required: true
    },
    cancelled: {
        type: Boolean,
        default: false
    },
    payment: {
        type: Boolean,
        default: false
    },
    iscompleted: {
        type: Boolean,
        default: false
    }


});

const AppointmentModel = mongoose.model('Appointment',appointmentSchema);

module.exports = AppointmentModel;