let reservations = {};

document.getElementById('cateringForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guests = parseInt(document.getElementById('guests').value);
    const date = document.getElementById('date').value;
    const allergies = document.getElementById('allergies').value;

    if (!reservations[date]) {
        reservations[date] = 0;
    }
    reservations[date] += guests;

    const reservationDetails = `
        Reserva confirmada:
        Número de comensales: ${guests}
        Fecha de la comida: ${date}
        Alergias: ${allergies || 'Ninguna especificada'}
    `;

    alert(reservationDetails);
    updateCalendar();
});

document.getElementById('showCalendar').addEventListener('click', function() {
    const calendar = document.getElementById('calendar');
    calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
    if (calendar.style.display === 'block') {
        updateCalendar();
    }
});

function updateCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    document.getElementById('calendarMonth').textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.classList.add('calendar-day', 'header');
        calendarGrid.appendChild(dayElement);
    });

    for (let i = 0; i < firstDay.getDay(); i++) {
        calendarGrid.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        const currentDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        if (reservations[currentDate]) {
            const guestsElement = document.createElement('div');
            guestsElement.classList.add('guests');
            guestsElement.textContent = `Comensales: ${reservations[currentDate]}`;
            dayElement.appendChild(guestsElement);
        }

        calendarGrid.appendChild(dayElement);
    }
}
