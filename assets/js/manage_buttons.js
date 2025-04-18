// Elenco dei mesi
const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

// Elementi del form
const incrementButtonDays = document.getElementById('btn-inc-days');
const decrementButtonDays = document.getElementById('btn-dec-days');
const counterInputDays = document.getElementById('number_days');

const incrementButtonArrival = document.getElementById('btn-inc-arrival');
const decrementButtonArrival = document.getElementById('btn-dec-arrival');
const counterInputArrival = document.getElementById('arrival_day');

const incrementButtonMonth = document.getElementById('btn-inc-month');
const decrementButtonMonth = document.getElementById('btn-dec-month');
const monthInput = document.getElementById('month');

const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth();

counterInputArrival.value = currentDay; // Imposta il giorno corrente nel campo di input
monthInput.value = months[currentMonth]; // Imposta il mese corrente nel campo di input

// Funzione per incrementare la durata del soggiorno
incrementButtonDays.addEventListener('click', (event) => {
    event.preventDefault();
    let currentValue = parseInt(counterInputDays.value, 10);
    const arrivalDay = parseInt(counterInputArrival.value, 10);
    const month = monthInput.value;
    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();

    // Verifica che la durata non superi il numero di giorni nel mese
    if (arrivalDay + currentValue - 1 < daysInMonth) {
        counterInputDays.value = currentValue + 1;
    } else {
        alert(`La durata del soggiorno non può superare i ${daysInMonth} giorni del mese di ${month}.`);
    }
});

// Funzione per decrementare la durata del soggiorno
decrementButtonDays.addEventListener('click', (event) => {
    event.preventDefault();
    let currentValue = parseInt(counterInputDays.value, 10);
    if (currentValue > 3) {
        counterInputDays.value = currentValue - 1;
    }
});

// Funzione per incrementare il giorno di arrivo
incrementButtonArrival.addEventListener('click', (event) => {
    event.preventDefault();
    let currentValue = parseInt(counterInputArrival.value, 10);
    const month = monthInput.value;
    const monthIndex = months.indexOf(month);
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();

    // Verifica che il giorno di arrivo non superi il numero di giorni del mese
    if (currentValue < daysInMonth) {
        counterInputArrival.value = currentValue + 1;
    } else {
        alert(`Il giorno selezionato non può essere maggiore di ${daysInMonth} per il mese di ${month}.`);
    }
});

// Funzione per decrementare il giorno di arrivo
decrementButtonArrival.addEventListener('click', (event) => {
    event.preventDefault();
    let currentValue = parseInt(counterInputArrival.value, 10);
    if (currentValue > 1) {
        counterInputArrival.value = currentValue - 1;
    }
});

// Funzione per incrementare il mese
incrementButtonMonth.addEventListener('click', (event) => {
    event.preventDefault();

    let currentMonth = monthInput.value;
    let currentIndex = months.indexOf(currentMonth);
    const arrivalDay = parseInt(counterInputArrival.value, 10);
    const numberOfDays = parseInt(counterInputDays.value, 10);

    // Otteniamo il numero di giorni nel mese corrente
    const monthIndex = months.indexOf(currentMonth);
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();

    // Verifica che l'incremento del mese sia valido
    if (arrivalDay + numberOfDays - 1 <= daysInMonth) {
        currentIndex = (currentIndex + 1) % months.length;  // Se arriva a Dic, torna a Gen
        monthInput.value = months[currentIndex];
    } else {
        alert(`Non puoi incrementare il mese, poiché la durata del soggiorno supera i giorni disponibili nel mese.`);
    }
});

// Funzione per decrementare il mese
decrementButtonMonth.addEventListener('click', (event) => {
    event.preventDefault();

    let currentMonth = monthInput.value;
    let currentIndex = months.indexOf(currentMonth);
    const arrivalDay = parseInt(counterInputArrival.value, 10);

    // Otteniamo il numero di giorni nel mese corrente
    const monthIndex = months.indexOf(currentMonth);
    const daysInMonth = new Date(today.getFullYear(), monthIndex + 1, 0).getDate();

    // Verifica se è possibile decrementare il mese
    if (arrivalDay <= daysInMonth) {
        currentIndex = (currentIndex - 1 + months.length) % months.length;  // Se arriva a Gen, torna a Dic
        monthInput.value = months[currentIndex];
    } else {
        alert(`Non puoi decrementare il mese, poiché il giorno di arrivo non è valido nel mese selezionato.`);
    }
});

// Gestione dell'invio del form
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('search_form').addEventListener('submit', function (event) {
        event.preventDefault();

        const arrivalDay = parseInt(document.getElementById('arrival_day').value, 10);
        const numberOfDays = parseInt(document.getElementById('number_days').value, 10);
        const monthAbbr = document.getElementById('month').value;

        // Elenco dei mesi
        const months = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

        // Ottieni l'indice del mese
        const monthIndex = months.indexOf(monthAbbr);
        if (monthIndex === -1 || isNaN(arrivalDay) || isNaN(numberOfDays)) {
            alert('Per favore, inserisci valori validi per giorno, mese e numero di notti.');
            return;
        }

        const today = new Date();
        let year = today.getFullYear();

        // Se il mese selezionato è precedente al mese corrente, ipotizza l'anno successivo
        if (monthIndex < today.getMonth() || (monthIndex === today.getMonth() && arrivalDay < today.getDate())) {
            year += 1;
        }

        // Costruisci la data di arrivo
        const arrivalDate = new Date(year, monthIndex, arrivalDay);
        if (isNaN(arrivalDate.getTime())) {
            alert('Data di arrivo non valida.');
            return;
        }

        // Calcola la data di partenza
        const departureDate = new Date(arrivalDate);
        departureDate.setDate(arrivalDate.getDate() + numberOfDays);

        // Formatta le date in YYYY-MM-DD
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const arrivalFormatted = formatDate(arrivalDate);
        const departureFormatted = formatDate(departureDate);

        // Costruisci l'URL
        const baseUrl = 'https://checkout.lodgify.com/it/casa-upupa/665194/reservation';
        const params = new URLSearchParams({
            currency: 'EUR',
            arrival: arrivalFormatted,
            departure: departureFormatted
        });

        const url = `${baseUrl}?${params.toString()}`;
        console.log(url);

        // Reindirizza l'utente alla nuova URL
        window.open(url, '_blank');
    });
});
