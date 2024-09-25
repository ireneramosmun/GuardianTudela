const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    date: String,
    guests: Number,
    allergies: String
});

module.exports = mongoose.model('Reservation', reservationSchema);
