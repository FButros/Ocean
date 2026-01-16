// Global state
let bookingData = {
    experience: '',
    // Rooftop specific
    rooftop: {
        date: '',
        pax: '',
        session: '',
        name: '',
        phone: '',
        email: '',
        cocktailsOnEntry: false,
        windowSeat: false
    }
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
    
    if (experience === 'rooftop') {
        showPage('page-rooftop-details');
        // Set minimum date to today
        document.getElementById('rooftop-date').min = new Date().toISOString().split('T')[0];
    } else if (experience === 'karaoke') {
        alert('Karaoke booking flow coming next!');
    } else if (experience === 'vip') {
        alert('VIP Room booking flow coming soon!');
    } else if (experience === 'vip-tour') {
        alert('VIP Tour booking flow coming soon!');
    } else if (experience === 'events') {
        alert('Events booking flow coming soon!');
    }
}

// ========================================
// ROOFTOP BAR BOOKING FLOW
// ========================================

// Step 1: Date, Pax, Session
document.getElementById('rooftop-details-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.rooftop.date = document.getElementById('rooftop-date').value;
    bookingData.rooftop.pax = document.getElementById('rooftop-pax').value;
    
    const sessionRadio = document.querySelector('input[name="rooftop-session"]:checked');
    if (!sessionRadio) {
        alert('Please select a session time');
        return;
    }
    bookingData.rooftop.session = sessionRadio.value;
    
    console.log('Rooftop details:', bookingData.rooftop);
    
    pageHistory.push('page-rooftop-details');
    showPage('page-rooftop-contact');
});

// Step 2: Customer Details
document.getElementById('rooftop-contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.rooftop.name = document.getElementById('rooftop-name').value;
    bookingData.rooftop.phone = document.getElementById('rooftop-phone').value;
    bookingData.rooftop.email = document.getElementById('rooftop-email').value;
    
    console.log('Rooftop contact:', bookingData.rooftop);
    
    pageHistory.push('page-rooftop-contact');
    showPage('page-rooftop-addons');
});

// Step 3: Add-ons
document.getElementById('rooftop-addons-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.rooftop.cocktailsOnEntry = document.getElementById('rooftop-cocktails').checked;
    bookingData.rooftop.windowSeat = document.getElementById('rooftop-window').checked;
    
    console.log('Rooftop add-ons:', bookingData.rooftop);
    
    pageHistory.push('page-rooftop-addons');
    showPage('page-rooftop-terms');
    updateRooftopTermsSummary();
});

function updateRooftopTermsSummary() {
    const dateObj = new Date(bookingData.rooftop.date);
    const formatted = dateObj.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('rooftop-summary-date').textContent = formatted;
    document.getElementById('rooftop-summary-session').textContent = bookingData.rooftop.session;
    document.getElementById('rooftop-summary-pax').textContent = `${bookingData.rooftop.pax} Guests`;
    
    // Show add-ons if any selected
    const addons = [];
    if (bookingData.rooftop.cocktailsOnEntry) addons.push('Cocktails on Entry');
    if (bookingData.rooftop.windowSeat) addons.push('Window Seat');
    
    if (addons.length > 0) {
        document.getElementById('rooftop-summary-addons-row').style.display = 'flex';
        document.getElementById('rooftop-summary-addons').textContent = addons.join(', ');
    } else {
        document.getElementById('rooftop-summary-addons-row').style.display = 'none';
    }
}

// Step 4: Terms - Proceed to Payment
function proceedToRooftopPayment() {
    if (!document.getElementById('rooftop-terms-accept').checked) {
        alert('⚠️ Please accept terms and conditions');
        return;
    }
    
    pageHistory.push('page-rooftop-terms');
    showPage('page-rooftop-payment');
    updateRooftopPaymentSummary();
}

function updateRooftopPaymentSummary() {
    const pax = parseInt(bookingData.rooftop.pax);
    const depositPerPerson = 50;
    const totalDeposit = pax * depositPerPerson;
    
    document.getElementById('rooftop-payment-pax').textContent = `${pax} Guests`;
    document.getElementById('rooftop-deposit-amount').textContent = `$${totalDeposit.toFixed(2)}`;
}

// Step 5: Payment Processing
function processRooftopPayment(method) {
    const buttons = ['rooftop-apple-pay-btn', 'rooftop-google-pay-btn', 'rooftop-card-pay-btn'];
    buttons.forEach(id => document.getElementById(id).disabled = true);
    
    setTimeout(() => {
        let methodName = '';
        if (method === 'apple') methodName = 'Apple Pay';
        else if (method === 'google') methodName = 'Google Pay';
        else if (method === 'card') methodName = 'Credit Card (Stripe)';
        
        alert(`✓ Payment via ${methodName}\n\nPrototype mode - In production, this will process real payments`);
        
        pageHistory = [];
        showPage('page-confirmation');
        updateRooftopConfirmation();
        
        buttons.forEach(id => document.getElementById(id).disabled = false);
    }, 800);
}

function updateRooftopConfirmation() {
    document.getElementById('booking-ref').textContent = 'RTB-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    document.getElementById('confirm-experience').textContent = 'Rooftop Bar';
    
    const dateObj = new Date(bookingData.rooftop.date);
    const formatted = dateObj.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + ' • ' + bookingData.rooftop.session;
    
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-guests').textContent = `${bookingData.rooftop.pax} Guests`;
}

// ========================================
// GENERAL FUNCTIONS
// ========================================

function addToCalendar() {
    alert('📅 Calendar feature coming in production!');
}

function resetBooking() {
    bookingData = {
        experience: '',
        rooftop: {
            date: '',
            pax: '',
            session: '',
            name: '',
            phone: '',
            email: '',
            cocktailsOnEntry: false,
            windowSeat: false
        }
    };
    
    // Reset all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    pageHistory = [];
    showPage('page-selection');
}