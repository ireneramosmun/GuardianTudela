const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

let reservations = {};

app.post('/api/reservations', (req, res) => {
    const { date, guests, allergies } = req.body;

    if (!reservations[date]) {
        reservations[date] = 0;
    }
    reservations[date] += guests;

    res.status(200).json({
        message: 'Reserva confirmada',
        date,
        guests,
        allergies
    });
});

app.get('/api/reservations', (req, res) => {
    res.status(200).json(reservations);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
