// Global state
let bookingData = {
    experience: '',
        vipTour: {},
        events: {},
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
    },
    // Karaoke specific
    // VIP Room specific
    vip: {
        date: '',
        time: '',
        pax: '',
        name: '',
        email: '',
        phone: '',
        contactHours: '',
        specialRequests: ''
    },
        vip: {
            date: '', time: '', pax: '', name: '', email: '', phone: '',
            contactHours: '', specialRequests: ''
        },
    karaoke: {
        bookingType: '', // 'night', 'session', or 'package'
        // Night booking
        night: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            roomSize: '',
            addons: []
        },
        // Session booking
        session: {
            hours: '',
            pax: '',
            name: '',
            phone: '',
            email: '',
            addons: []
        },
        // Package booking
        package: {
            packageType: '', // 'cocktail', 'signature', 'diamond'
            date: '',
            name: '',
            phone: '',
            email: '',
            pax: '',
            addons: [],
            allNightUpgrade: false
        }
    }
};

// PRICING CONFIGURATION - Easy to update later
const PRICING = {
    rooftop: {
        depositPerPerson: 50,
        addons: {
            cocktailsOnEntry: 15,
            windowSeat: 10 // Free, subject to availability
        }
    },
    // VIP Room specific
    vip: {
        date: '',
        time: '',
        pax: '',
        name: '',
        email: '',
        phone: '',
        contactHours: '',
        specialRequests: ''
    },
        vip: {
            date: '', time: '', pax: '', name: '', email: '', phone: '',
            contactHours: '', specialRequests: ''
        },
    karaoke: {
        night: {
            rooms: {
                small: 400,
                medium: 600,
                large: 800
            },
            addons: {
                premiumSound: 100,
                decorations: 150,
                extraDrinks: 200
            }
        },
        session: {
            pricePerHour: 100,
            addons: {
                premiumSound: 50,
                decorations: 80,
                extraDrinks: 120
            }
        },
        package: {
            cocktail: {
                weekday: 300,
                weekend: 380
            },
            signature: {
                weekday: 498,
                weekend: 580,
                allNightUpgrade: 120
            },
            diamond: {
                weekday: 728,
                weekend: 858
            },
            addons: {
                cocktailsOnEntry: 12,
                decorations: 100,
                extraDrinks: 150
            }
        }
    }
};

let pageHistory = [];
let totalPrice = 0; // Store the calculated total price for slider

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
    
    if (experience === 'karaoke') {
        showPage('page-karaoke-type');
    } else if (experience === 'rooftop') {
        showPage('page-rooftop-details');
        document.getElementById('rooftop-date').min = new Date().toISOString().split('T')[0];
    } else if (experience === 'vip') {
        showPage('page-vip-details');
        document.getElementById('vip-date').min = new Date().toISOString().split('T')[0];
        
    } else if (experience === 'vip-tour') {
        showPage('page-vip-tour');
        document.getElementById('tour-date').min = new Date().toISOString().split('T')[0];
        
    } else if (experience === 'events') {
        showPage('page-events');
        document.getElementById('event-date').min = new Date().toISOString().split('T')[0];
        
    }
}

// ========================================
// KARAOKE BOOKING FLOW
// ========================================

// Select karaoke booking type
function selectKaraokeType(type) {
    console.log('Selected karaoke type:', type);
    bookingData.karaoke.bookingType = type;
    pageHistory.push('page-karaoke-type');
    
    if (type === 'night') {
        showPage('page-karaoke-night-details');
        document.getElementById('kn-date').min = new Date().toISOString().split('T')[0];
    } else if (type === 'session') {
        showPage('page-karaoke-session-details');
    } else if (type === 'package') {
        showPage('page-karaoke-package-select');
    }
}

// === KARAOKE NIGHT BOOKING ===
document.getElementById('karaoke-night-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.karaoke.night.name = document.getElementById('kn-name').value;
    bookingData.karaoke.night.phone = document.getElementById('kn-phone').value;
    bookingData.karaoke.night.email = document.getElementById('kn-email').value;
    bookingData.karaoke.night.date = document.getElementById('kn-date').value;
    bookingData.karaoke.night.time = document.getElementById('kn-time').value;
    
    const roomSizeRadio = document.querySelector('input[name="kn-room-size"]:checked');
    if (!roomSizeRadio) {
        alert('Please select a room size');
        return;
    }
    bookingData.karaoke.night.roomSize = roomSizeRadio.value;
    
    console.log('Karaoke night details:', bookingData.karaoke.night);
    
    pageHistory.push('page-karaoke-night-details');
    showPage('page-karaoke-night-upgrades');
});

document.getElementById('karaoke-night-upgrades-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.karaoke.night.addons = [];
    if (document.getElementById('kn-addon-1').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Premium Sound System',
            price: PRICING.karaoke.night.addons.premiumSound
        });
    }
    if (document.getElementById('kn-addon-2').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Decorations Package',
            price: PRICING.karaoke.night.addons.decorations
        });
    }
    if (document.getElementById('kn-addon-3').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Extra Drinks Package',
            price: PRICING.karaoke.night.addons.extraDrinks
        });
    }
    
    console.log('Karaoke night addons:', bookingData.karaoke.night.addons);
    
    pageHistory.push('page-karaoke-night-upgrades');
    showPage('page-karaoke-terms');
    updateKaraokeTermsSummary();
});

// === KARAOKE SESSION BOOKING ===
document.getElementById('karaoke-session-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hours = parseInt(document.getElementById('ks-hours').value);
    if (hours < 2) {
        alert('Minimum 2 hours required for session booking');
        return;
    }
    
    bookingData.karaoke.session.hours = hours;
    bookingData.karaoke.session.pax = document.getElementById('ks-pax').value;
    bookingData.karaoke.session.name = document.getElementById('ks-name').value;
    bookingData.karaoke.session.phone = document.getElementById('ks-phone').value;
    bookingData.karaoke.session.email = document.getElementById('ks-email').value;
    
    console.log('Karaoke session details:', bookingData.karaoke.session);
    
    pageHistory.push('page-karaoke-session-details');
    showPage('page-karaoke-session-upgrades');
});

document.getElementById('karaoke-session-upgrades-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.karaoke.session.addons = [];
    if (document.getElementById('ks-addon-1').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Premium Sound System',
            price: PRICING.karaoke.session.addons.premiumSound
        });
    }
    if (document.getElementById('ks-addon-2').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Decorations Package',
            price: PRICING.karaoke.session.addons.decorations
        });
    }
    if (document.getElementById('ks-addon-3').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Extra Drinks Package',
            price: PRICING.karaoke.session.addons.extraDrinks
        });
    }
    
    console.log('Karaoke session addons:', bookingData.karaoke.session.addons);
    
    pageHistory.push('page-karaoke-session-upgrades');
    showPage('page-karaoke-terms');
    updateKaraokeTermsSummary();
});

// === KARAOKE PACKAGE BOOKING ===
function selectPackage(packageType) {
    console.log('Selected package:', packageType);
    bookingData.karaoke.package.packageType = packageType;
    pageHistory.push('page-karaoke-package-select');
    
    showPage('page-karaoke-package-details');
    document.getElementById('kp-date').min = new Date().toISOString().split('T')[0];
    
    // Update title and set min/max pax based on package
    const titles = {
        'cocktail': 'Cocktail Package',
        'signature': 'Signature Package',
        'diamond': 'Diamond Package'
    };
    document.getElementById('kp-package-title').textContent = titles[packageType];
    
    // Set pax limits
    const paxInput = document.getElementById('kp-pax');
    if (packageType === 'cocktail') {
        paxInput.min = '3';
        paxInput.max = '6';
        paxInput.placeholder = '3-6 guests';
    } else if (packageType === 'signature') {
        paxInput.min = '6';
        paxInput.max = '8';
        paxInput.placeholder = '6-8 guests';
    } else if (packageType === 'diamond') {
        paxInput.min = '8';
        paxInput.max = '14';
        paxInput.placeholder = '8-14 guests';
    }
}

document.getElementById('karaoke-package-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pax = parseInt(document.getElementById('kp-pax').value);
    const packageType = bookingData.karaoke.package.packageType;
    
    // Validate pax count
    if (packageType === 'cocktail' && (pax < 3 || pax > 6)) {
        alert('Cocktail Package is for 3-6 guests');
        return;
    } else if (packageType === 'signature' && (pax < 6 || pax > 8)) {
        alert('Signature Package is for 6-8 guests');
        return;
    } else if (packageType === 'diamond' && (pax < 8 || pax > 14)) {
        alert('Diamond Package is for 8-14 guests');
        return;
    }
    
    bookingData.karaoke.package.date = document.getElementById('kp-date').value;
    bookingData.karaoke.package.name = document.getElementById('kp-name').value;
    bookingData.karaoke.package.phone = document.getElementById('kp-phone').value;
    bookingData.karaoke.package.email = document.getElementById('kp-email').value;
    bookingData.karaoke.package.pax = pax;
    
    console.log('Karaoke package details:', bookingData.karaoke.package);
    
    pageHistory.push('page-karaoke-package-details');
    showPage('page-karaoke-package-addons');
    
    // Show/hide all night upgrade option for Signature package
    if (packageType === 'signature') {
        document.getElementById('kp-allnight-option').style.display = 'block';
    } else {
        document.getElementById('kp-allnight-option').style.display = 'none';
    }
});

document.getElementById('karaoke-package-addons-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.karaoke.package.addons = [];
    
    if (document.getElementById('kp-addon-cocktails').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Cocktails on Entry',
            price: PRICING.karaoke.package.addons.cocktailsOnEntry
        });
    }
    if (document.getElementById('kp-addon-decorations').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Decorations',
            price: PRICING.karaoke.package.addons.decorations
        });
    }
    if (document.getElementById('kp-addon-drinks').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Extra Drinks Package',
            price: PRICING.karaoke.package.addons.extraDrinks
        });
    }
    
    bookingData.karaoke.package.allNightUpgrade = document.getElementById('kp-addon-allnight') ? 
        document.getElementById('kp-addon-allnight').checked : false;
    
    if (bookingData.karaoke.package.allNightUpgrade) {
        bookingData.karaoke.package.addons.push({
            name: 'All Night Karaoke',
            price: PRICING.karaoke.package.signature.allNightUpgrade
        });
    }
    
    console.log('Karaoke package addons:', bookingData.karaoke.package.addons);
    
    pageHistory.push('page-karaoke-package-addons');
    showPage('page-karaoke-terms');
    updateKaraokeTermsSummary();
});

// Update karaoke terms summary
function updateKaraokeTermsSummary() {
    const bookingType = bookingData.karaoke.bookingType;
    
    let experienceText = 'Karaoke Room';
    let dateText = '';
    let detailsText = '';
    let addons = [];
    
    if (bookingType === 'night') {
        experienceText = 'Karaoke - Book the Night';
        const dateObj = new Date(bookingData.karaoke.night.date + 'T' + bookingData.karaoke.night.time);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                  ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        
        const roomSizes = {small: 'Small (6 pax)', medium: 'Medium (8 pax)', large: 'Large (12 pax)'};
        detailsText = roomSizes[bookingData.karaoke.night.roomSize];
        addons = bookingData.karaoke.night.addons.map(a => `${a.name} (+$${a.price})`);
        
    } else if (bookingType === 'session') {
        experienceText = 'Karaoke - Session Booking';
        dateText = 'Session details to be confirmed';
        detailsText = `${bookingData.karaoke.session.hours} hours • ${bookingData.karaoke.session.pax} guests`;
        addons = bookingData.karaoke.session.addons.map(a => `${a.name} (+$${a.price})`);
        
    } else if (bookingType === 'package') {
        const packageNames = {cocktail: 'Cocktail Package', signature: 'Signature Package', diamond: 'Diamond Package'};
        experienceText = 'Karaoke - ' + packageNames[bookingData.karaoke.package.packageType];
        
        const dateObj = new Date(bookingData.karaoke.package.date);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        detailsText = `${bookingData.karaoke.package.pax} guests`;
        addons = bookingData.karaoke.package.addons.map(a => `${a.name} (+$${a.price})`);
    }
    
    document.getElementById('karaoke-summary-experience').textContent = experienceText;
    document.getElementById('karaoke-summary-date').textContent = dateText;
    document.getElementById('karaoke-summary-details').textContent = detailsText;
    
    if (addons.length > 0) {
        document.getElementById('karaoke-summary-addons-row').style.display = 'flex';
        document.getElementById('karaoke-summary-addons').textContent = addons.join(', ');
    } else {
        document.getElementById('karaoke-summary-addons-row').style.display = 'none';
    }
}

// Proceed to payment
function proceedToKaraokePayment() {
    if (!document.getElementById('karaoke-terms-accept').checked) {
        alert('⚠️ Please accept terms and conditions');
        return;
    }
    
    pageHistory.push('page-karaoke-terms');
    showPage('page-karaoke-payment');
    updateKaraokePaymentSummary();
}

function updateKaraokePaymentSummary() {
    const bookingType = bookingData.karaoke.bookingType;
    let typeText = '';
    let detailsText = '';
    totalPrice = 0;
    
    if (bookingType === 'night') {
        typeText = 'Book the Night';
        totalPrice = PRICING.karaoke.night.rooms[bookingData.karaoke.night.roomSize] || 500;
        
        // Add addon prices
        bookingData.karaoke.night.addons.forEach(addon => {
            totalPrice += addon.price;
        });
        
        const roomSizes = {small: 'Small (6 pax)', medium: 'Medium (8 pax)', large: 'Large (12 pax)'};
        detailsText = roomSizes[bookingData.karaoke.night.roomSize];
        
    } else if (bookingType === 'session') {
        typeText = 'Session Booking';
        totalPrice = parseInt(bookingData.karaoke.session.hours) * PRICING.karaoke.session.pricePerHour;
        
        // Add addon prices
        bookingData.karaoke.session.addons.forEach(addon => {
            totalPrice += addon.price;
        });
        
        detailsText = `${bookingData.karaoke.session.hours} hours • ${bookingData.karaoke.session.pax} guests`;
        
    } else if (bookingType === 'package') {
        const packageNames = {cocktail: 'Cocktail Package', signature: 'Signature Package', diamond: 'Diamond Package'};
        typeText = packageNames[bookingData.karaoke.package.packageType];
        
        // Calculate package price
        const packageType = bookingData.karaoke.package.packageType;
        const dateObj = new Date(bookingData.karaoke.package.date);
        const isWeekend = dateObj.getDay() === 5 || dateObj.getDay() === 6; // Friday or Saturday
        
        if (packageType === 'cocktail') {
            totalPrice = isWeekend ? PRICING.karaoke.package.cocktail.weekend : PRICING.karaoke.package.cocktail.weekday;
        } else if (packageType === 'signature') {
            totalPrice = isWeekend ? PRICING.karaoke.package.signature.weekend : PRICING.karaoke.package.signature.weekday;
        } else if (packageType === 'diamond') {
            totalPrice = isWeekend ? PRICING.karaoke.package.diamond.weekend : PRICING.karaoke.package.diamond.weekday;
        }
        
        // Add addon prices
        bookingData.karaoke.package.addons.forEach(addon => {
            totalPrice += addon.price;
        });
        
        detailsText = `${bookingData.karaoke.package.pax} guests`;
    }
    
    document.getElementById('karaoke-payment-type').textContent = typeText;
    document.getElementById('karaoke-payment-details').textContent = detailsText;
    
    // Setup payment slider
    const slider = document.getElementById('payment-slider');
    const sliderAmount = document.getElementById('slider-amount');
    const depositDisplay = document.getElementById('karaoke-deposit-amount');
    
    // Calculate 50% deposit
    const minDeposit = totalPrice * 0.5;
    
    // Update slider
    slider.value = 50;
    sliderAmount.textContent = minDeposit.toFixed(2);
    depositDisplay.textContent = `$${minDeposit.toFixed(2)}`;
    
    // Slider event listener
    slider.oninput = function() {
        const percentage = this.value;
        const amount = (totalPrice * percentage / 100);
        sliderAmount.textContent = amount.toFixed(2);
        depositDisplay.textContent = `$${amount.toFixed(2)}`;
    };
}

function processKaraokePayment(method) {
    const buttons = ['karaoke-apple-pay-btn', 'karaoke-google-pay-btn', 'karaoke-card-pay-btn'];
    buttons.forEach(id => document.getElementById(id).disabled = true);
    
    setTimeout(() => {
        let methodName = '';
        if (method === 'apple') methodName = 'Apple Pay';
        else if (method === 'google') methodName = 'Google Pay';
        else if (method === 'card') methodName = 'Credit Card (Stripe)';
        
        alert(`✓ Payment via ${methodName}\n\nPrototype mode - In production, this will process real payments`);
        
        pageHistory = [];
        showPage('page-confirmation');
        updateKaraokeConfirmation();
        
        buttons.forEach(id => document.getElementById(id).disabled = false);
    }, 800);
}

function updateKaraokeConfirmation() {
    const bookingType = bookingData.karaoke.bookingType;
    
    document.getElementById('booking-ref').textContent = 'KAR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    let experienceText = 'Karaoke Room';
    let datetimeText = '';
    let detailsText = '';
    
    if (bookingType === 'night') {
        experienceText = 'Karaoke - Book the Night';
        const dateObj = new Date(bookingData.karaoke.night.date + 'T' + bookingData.karaoke.night.time);
        datetimeText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                      ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        
        const roomSizes = {small: 'Small Room (6 pax)', medium: 'Medium Room (8 pax)', large: 'Large Room (12 pax)'};
        detailsText = roomSizes[bookingData.karaoke.night.roomSize];
        
    } else if (bookingType === 'session') {
        experienceText = 'Karaoke - Session Booking';
        datetimeText = 'Session details confirmed via email';
        detailsText = `${bookingData.karaoke.session.hours} hours • ${bookingData.karaoke.session.pax} guests`;
        
    } else if (bookingType === 'package') {
        const packageNames = {cocktail: 'Cocktail Package', signature: 'Signature Package', diamond: 'Diamond Package'};
        experienceText = packageNames[bookingData.karaoke.package.packageType];
        
        const dateObj = new Date(bookingData.karaoke.package.date);
        datetimeText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        detailsText = `${bookingData.karaoke.package.pax} guests`;
    }
    
    document.getElementById('confirm-experience').textContent = experienceText;
    document.getElementById('confirm-datetime').textContent = datetimeText;
    document.getElementById('confirm-details').textContent = detailsText;
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
    if (bookingData.rooftop.cocktailsOnEntry) {
        addons.push(`Cocktails on Entry (+$${PRICING.rooftop.addons.cocktailsOnEntry})`);
    }
    if (bookingData.rooftop.windowSeat) {
        const windowPrice = PRICING.rooftop.addons.windowSeat;
        addons.push(windowPrice > 0 ? `Window Seat (+$${windowPrice})` : 'Window Seat (Free)');
    }
    
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
    let totalDeposit = pax * PRICING.rooftop.depositPerPerson;
    
    // Add addon costs
    if (bookingData.rooftop.cocktailsOnEntry) {
        totalDeposit += pax * PRICING.rooftop.addons.cocktailsOnEntry;
    }
    if (bookingData.rooftop.windowSeat) {
        totalDeposit += PRICING.rooftop.addons.windowSeat;
    }
    
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
    document.getElementById('confirm-details').textContent = `${bookingData.rooftop.pax} Guests`;
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
        vipTour: {},
        events: {},
        rooftop: {
            date: '', pax: '', session: '', name: '', phone: '', email: '',
            cocktailsOnEntry: false, windowSeat: false
        },
    // VIP Room specific
    vip: {
        date: '',
        time: '',
        pax: '',
        name: '',
        email: '',
        phone: '',
        contactHours: '',
        specialRequests: ''
    },
        vip: {
            date: '', time: '', pax: '', name: '', email: '', phone: '',
            contactHours: '', specialRequests: ''
        },
        karaoke: {
            bookingType: '',
            night: { name: '', phone: '', email: '', date: '', time: '', roomSize: '', addons: [] },
            session: { hours: '', pax: '', name: '', phone: '', email: '', addons: [] },
            package: { packageType: '', date: '', name: '', phone: '', email: '', pax: '', addons: [], allNightUpgrade: false }
        }
    };
    
    // Reset all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    pageHistory = [];
    showPage('page-selection');
}

// ========================================
// VIP ROOM BOOKING FLOW
// ========================================

document.getElementById('vip-details-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.vip.date = document.getElementById('vip-date').value;
    bookingData.vip.time = document.getElementById('vip-time').value;
    bookingData.vip.pax = document.getElementById('vip-pax').value;
    bookingData.vip.name = document.getElementById('vip-name').value;
    bookingData.vip.email = document.getElementById('vip-email').value;
    bookingData.vip.phone = document.getElementById('vip-phone').value;
    bookingData.vip.contactHours = document.getElementById('vip-contact-hours').value;
    bookingData.vip.specialRequests = document.getElementById('vip-requests').value;
    
    console.log('VIP room details:', bookingData.vip);
    
    pageHistory.push('page-vip-details');
    showPage('page-vip-rooms');
});

function submitVIPRequest() {
    pageHistory = [];
    showPage('page-confirmation');
    updateVIPConfirmation();
}

function updateVIPConfirmation() {
    document.getElementById('booking-ref').textContent = 'VIP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    document.getElementById('confirm-experience').textContent = 'VIP Room Request';
    
    const dateObj = new Date(bookingData.vip.date + 'T' + bookingData.vip.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-details').textContent = `${bookingData.vip.pax} Guests • Awaiting Staff Confirmation`;
}

// ========================================
// VIP TOUR BOOKING FLOW
// ========================================

document.getElementById('vip-tour-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.vipTour = {
        date: document.getElementById('tour-date').value,
        time: document.getElementById('tour-time').value,
        name: document.getElementById('tour-name').value,
        phone: document.getElementById('tour-phone').value,
        email: document.getElementById('tour-email').value
    };
    
    console.log('VIP Tour details:', bookingData.vipTour);
    
    pageHistory = [];
    showPage('page-confirmation');
    updateVIPTourConfirmation();
});

function updateVIPTourConfirmation() {
    document.getElementById('booking-ref').textContent = 'TOUR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    document.getElementById('confirm-experience').textContent = 'VIP Room Tour';
    
    const dateObj = new Date(bookingData.vipTour.date + 'T' + bookingData.vipTour.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-details').textContent = '15-minute tour • Free';
}

// ========================================
// EVENTS BOOKING FLOW
// ========================================

document.getElementById('events-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.events = {
        date: document.getElementById('event-date').value,
        time: document.getElementById('event-time').value,
        guests: document.getElementById('event-guests').value,
        eventType: document.getElementById('event-type').value,
        description: document.getElementById('event-description').value,
        name: document.getElementById('event-name').value,
        phone: document.getElementById('event-phone').value,
        email: document.getElementById('event-email').value
    };
    
    console.log('Event details:', bookingData.events);
    
    pageHistory = [];
    showPage('page-confirmation');
    updateEventsConfirmation();
});

function updateEventsConfirmation() {
    document.getElementById('booking-ref').textContent = 'EVT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Get event type display name
    const eventTypeMap = {
        'corporate': 'Corporate Function',
        'birthday': 'Birthday Celebration',
        'wedding': 'Wedding Reception',
        'engagement': 'Engagement Party',
        'anniversary': 'Anniversary',
        'holiday': 'Holiday Party',
        'networking': 'Networking Event',
        'product-launch': 'Product Launch',
        'team-building': 'Team Building',
        'other': 'Other Celebration'
    };
    
    const eventTypeName = eventTypeMap[bookingData.events.eventType] || bookingData.events.eventType;
    document.getElementById('confirm-experience').textContent = 'Event: ' + eventTypeName;
    
    const dateObj = new Date(bookingData.events.date + 'T' + bookingData.events.time);
    const formatted = dateObj.toLocaleDateString('en-AU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) + ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
    
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-details').textContent = `${bookingData.events.guests} Guests • Events team will contact you`;
}