// Global state
let bookingData = {
    experience: '',
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '',
    roomSize: '',
    package: 'none',
    seating: 'non-smoking',
    eventType: '',
    specialRequests: ''
};

let pageHistory = [];

// Page navigation
function showPage(pageId) {
    console.log('Showing page:', pageId);
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

function goBack() {
    if (pageHistory.length > 0) {
        const previousPage = pageHistory.pop();
        showPage(previousPage);
    }
}

// Experience selection
function selectExperience(experience) {
    console.log('Selected experience:', experience);
    bookingData.experience = experience;
    pageHistory.push('page-selection');
    showPage('page-contact');
}

// Contact form
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.name = document.getElementById('name').value;
    bookingData.phone = document.getElementById('phone').value;
    bookingData.email = document.getElementById('email').value;
    
    console.log('Contact form submitted', bookingData);
    
    if (!bookingData.name || !bookingData.phone || !bookingData.email) {
        alert('Please fill all required fields');
        return;
    }
    
    pageHistory.push('page-contact');
    showPage('page-booking');
    setupBookingPage();
});

function setupBookingPage() {
    document.getElementById('karaoke-options').style.display = 'none';
    document.getElementById('rooftop-options').style.display = 'none';
    document.getElementById('vip-options').style.display = 'none';
    document.getElementById('events-options').style.display = 'none';
    
    const titles = {
        'karaoke': 'Karaoke Details',
        'rooftop': 'Rooftop Details',
        'vip': 'VIP Details',
        'events': 'Event Details'
    };
    document.getElementById('booking-title').textContent = titles[bookingData.experience];
    
    if (bookingData.experience === 'karaoke') {
        document.getElementById('karaoke-options').style.display = 'block';
    } else if (bookingData.experience === 'rooftop') {
        document.getElementById('rooftop-options').style.display = 'block';
    } else if (bookingData.experience === 'vip') {
        document.getElementById('vip-options').style.display = 'block';
        document.getElementById('guests').min = '15';
        document.getElementById('guests').value = '15';
    } else if (bookingData.experience === 'events') {
        document.getElementById('events-options').style.display = 'block';
    }
    
    document.getElementById('date').min = new Date().toISOString().split('T')[0];
}

// Booking form
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.date = document.getElementById('date').value;
    bookingData.time = document.getElementById('time').value;
    bookingData.guests = document.getElementById('guests').value;
    
    console.log('Booking form submitted', bookingData);
    
    if (!bookingData.date || !bookingData.time || !bookingData.guests) {
        alert('Please fill all required fields');
        return;
    }
    
    if (bookingData.experience === 'vip' && parseInt(bookingData.guests) < 15) {
        alert('VIP rooms require minimum 15 guests');
        return;
    }
    
    if (bookingData.experience === 'karaoke') {
        const roomSize = document.querySelector('input[name="room-size"]:checked');
        if (!roomSize) {
            alert('Please select a room size');
            return;
        }
        bookingData.roomSize = roomSize.value;
        const packageEl = document.querySelector('input[name="package"]:checked');
        bookingData.package = packageEl ? packageEl.value : 'none';
        
        const maxGuests = {'small': 6, 'medium': 8, 'large': 12};
        if (parseInt(bookingData.guests) > maxGuests[bookingData.roomSize]) {
            alert(`Room fits max ${maxGuests[bookingData.roomSize]} guests`);
            return;
        }
    } else if (bookingData.experience === 'rooftop') {
        const seating = document.querySelector('input[name="seating"]:checked');
        bookingData.seating = seating ? seating.value : 'non-smoking';
    } else if (bookingData.experience === 'events') {
        bookingData.eventType = document.getElementById('event-type').value;
        bookingData.specialRequests = document.getElementById('special-requests').value;
    }
    
    console.log('Moving to terms page', bookingData);
    pageHistory.push('page-booking');
    showPage('page-terms');
    updateTermsSummary();
});

function updateTermsSummary() {
    const names = {
        'karaoke': 'Luxury Karaoke',
        'rooftop': 'Rooftop Terrace',
        'vip': 'VIP Room',
        'events': 'Private Event'
    };
    
    document.getElementById('terms-experience').textContent = names[bookingData.experience];
    
    const dateObj = new Date(bookingData.date + 'T' + bookingData.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                    ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    document.getElementById('terms-datetime').textContent = formatted;
    document.getElementById('terms-guests').textContent = `${bookingData.guests} Guests`;
}

function proceedToPayment() {
    if (!document.getElementById('terms-accept').checked) {
        alert('⚠️ Please accept terms and conditions');
        return;
    }
    
    pageHistory.push('page-terms');
    showPage('page-payment');
    updatePaymentSummary();
}

function updatePaymentSummary() {
    const names = {
        'karaoke': 'Luxury Karaoke',
        'rooftop': 'Rooftop Terrace',
        'vip': 'VIP Room',
        'events': 'Private Event'
    };
    
    document.getElementById('payment-experience').textContent = names[bookingData.experience];
    
    const dateObj = new Date(bookingData.date + 'T' + bookingData.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                    ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    document.getElementById('payment-datetime').textContent = formatted;
    document.getElementById('payment-guests').textContent = `${bookingData.guests} Guests`;
    
    if (bookingData.experience === 'karaoke') {
        document.getElementById('payment-room-row').style.display = 'flex';
        const roomNames = {'small': 'Small (6)', 'medium': 'Medium (8)', 'large': 'Large (12)'};
        document.getElementById('payment-room').textContent = roomNames[bookingData.roomSize];
        
        if (bookingData.package && bookingData.package !== 'none') {
            document.getElementById('payment-package-row').style.display = 'flex';
            const packageNames = {
                'cocktail': 'Cocktail Package',
                'signature': 'Signature Package',
                'diamond': 'Diamond Package'
            };
            document.getElementById('payment-package').textContent = packageNames[bookingData.package];
        }
    }
    
    let total = 500;
    if (bookingData.experience === 'karaoke') {
        total = {'small': 400, 'medium': 600, 'large': 800}[bookingData.roomSize] || 500;
        if (bookingData.package === 'cocktail') total += 50 * parseInt(bookingData.guests);
        if (bookingData.package === 'signature') total += 75 * parseInt(bookingData.guests);
        if (bookingData.package === 'diamond') total += 100 * parseInt(bookingData.guests);
    } else if (bookingData.experience === 'vip') {
        total = 1500;
    } else if (bookingData.experience === 'events') {
        total = 44 * parseInt(bookingData.guests);
    }
    
    document.getElementById('deposit-amount').textContent = `$${(total * 0.15).toFixed(2)}`;
}

function processPayment(method) {
    document.getElementById('apple-pay-btn').disabled = true;
    document.getElementById('google-pay-btn').disabled = true;
    
    setTimeout(() => {
        alert(`✓ Payment via ${method === 'apple' ? 'Apple Pay' : 'Google Pay'}\n\nPrototype mode`);
        pageHistory = [];
        showPage('page-confirmation');
        updateConfirmation();
        document.getElementById('apple-pay-btn').disabled = false;
        document.getElementById('google-pay-btn').disabled = false;
    }, 800);
}

function updateConfirmation() {
    document.getElementById('booking-ref').textContent = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const names = {
        'karaoke': 'Luxury Karaoke',
        'rooftop': 'Rooftop Terrace',
        'vip': 'VIP Room',
        'events': 'Private Event'
    };
    document.getElementById('confirm-experience').textContent = names[bookingData.experience];
    
    const dateObj = new Date(bookingData.date + 'T' + bookingData.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                    ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-guests').textContent = `${bookingData.guests} Guests`;
}

function addToCalendar() {
    alert('📅 Calendar feature coming in production!');
}

function resetBooking() {
    bookingData = {
        experience: '', name: '', phone: '', email: '',
        date: '', time: '', guests: '', roomSize: '',
        package: 'none', seating: 'non-smoking', eventType: '', specialRequests: ''
    };
    document.getElementById('contact-form').reset();
    document.getElementById('booking-form').reset();
    document.getElementById('terms-accept').checked = false;
    document.getElementById('guests').min = '1';
    pageHistory = [];
    showPage('page-selection');
}
