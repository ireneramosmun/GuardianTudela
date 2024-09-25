require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el modelo de reservas
const reservationSchema = new mongoose.Schema({
    date: String,
    guests: Number,
    allergies: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Ruta para crear una reserva
app.post('/api/reservations', (req, res) => {
    const { date, guests, allergies } = req.body;

    const newReservation = new Reservation({ date, guests, allergies });

    newReservation.save()
        .then(() => res.status(200).json({ message: 'Reserva confirmada', date, guests, allergies }))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Ruta para obtener todas las reservas
app.get('/api/reservations', (req, res) => {
    Reservation.find()
        .then(reservations => res.status(200).json(reservations))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
