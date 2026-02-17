const buses = [
    { id: 1, name: "Sanam Travels", price: 2500, img: "box1.jpg" },
    { id: 2, name: "Vihu Travels", price: 2000, img: "box2.jpg" },
    { id: 3, name: "Sanam Travels", price: 3500, img: "box3.jpg"},
    { id: 4, name: "Humsafer Travels", price: 4000, img: "box4.jpg" },
    { id: 5, name: "Sai Travels", price: 2500, img: "box5.jpg" },
    { id: 6, name: "Sonu Travels", price: 2800, img: "box6.jpg" },
    { id: 7, name: "Humsafer Travels", price: 3800, img: "box7.jpg" },
    { id: 8, name: "Humsafer Travels", price: 3500, img: "box8.jpg" },
    
];

const busContainer = document.getElementById('bus-container');
const seatModal = document.getElementById('seat-modal');
const seatMap = document.getElementById('seat-map');
let selectedSeats = 0;
let currentPrice = 0;

// Initialize Buses
buses.forEach(bus => {
    busContainer.innerHTML += `
        <div class="bus-card">
            <img src="${bus.img}" alt="Bus">
            <div class="bus-info">
                <h3>${bus.name}</h3>
                <p>Price: ₹${bus.price} per seat</p>
                <button class="btn-select" onclick="openSeats(${bus.price})">Select Seats</button>
            </div>
        </div>
    `;
});

function openSeats(price) {
    currentPrice = price;
    seatMap.innerHTML = '';
    selectedSeats = 0;
    updateDisplay();
    
    // Generate 20 seats
    for (let i = 1; i <= 20; i++) {
        let seat = document.createElement('div');
        seat.classList.add('seat');
        if (i % 5 === 3) seat.style.visibility = 'hidden'; // Aisle
        seat.onclick = () => {
            seat.classList.toggle('selected');
            seat.classList.contains('selected') ? selectedSeats++ : selectedSeats--;
            updateDisplay();
        };
        seatMap.appendChild(seat);
    }
    seatModal.style.display = "block";
}

function updateDisplay() {
    document.getElementById('seat-count').innerText = selectedSeats;
    document.getElementById('total-price').innerText = selectedSeats * currentPrice;
}

// Payment Logic
function showPayment() {
    if(selectedSeats === 0) return alert("Select at least one seat!");
    document.getElementById('payment-modal').style.display = "block";
}

function togglePay(method) {
    document.getElementById('card-form').style.display = method === 'card' ? 'flex' : 'none';
    document.getElementById('upi-qr').style.display = method === 'upi' ? 'block' : 'none';
}

// Close Modals
window.onclick = (event) => {
    if (event.target.className === 'modal') {
        event.target.style.display = "none";
    }
}

let timeLeft = 300; // 5 minutes in seconds
let timerInterval;

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 300; 
    timerInterval = setInterval(() => {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        
        // Formatting seconds to always show two digits
        seconds = seconds < 10 ? '0' + seconds : seconds;
        document.getElementById('timer').innerText = `${minutes}:${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Session Expired! Please start your booking again.");
            location.reload(); // Refresh to clear selection
        }
        timeLeft--;
    }, 1000);
}

function showPayment() {
    if(selectedSeats === 0) return alert("Please select at least one seat!");

    // Calculate Totals
    const baseFare = selectedSeats * currentPrice;
    const tax = Math.round(baseFare * 0.05); // 5% GST
    const finalTotal = baseFare + tax;

    // Update Summary UI
    document.getElementById('sum-seats').innerText = selectedSeats;
    document.getElementById('sum-base').innerText = baseFare;
    document.getElementById('sum-tax').innerText = tax;
    document.getElementById('sum-total').innerText = finalTotal;

    // Show Modal and Start Clock
    document.getElementById('payment-modal').style.display = "block";
    startTimer();
}