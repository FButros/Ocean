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
            date: '',
            time: '',
            hours: '',
            pax: '',
            price: 0,
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
                decorationsBasic: 599,
                decorationsPremium: 999,
                cocktailOnArrival: 25,
                champagneOnIce: 230,
                preorderDining: 25,
                preorderBeverages: 25,
                professionalPhoto: 400,
                bluetoothMusic: 89
            }
        },
        session: {
            // Weekday pricing (Tuesday, Wednesday, Thursday, Sunday)
            weekday: {
                1: { 2: 40, 3: 60, 4: 80, 5: 100, 6: 120 },
                2: { 2: 80, 3: 120, 4: 160, 5: 200, 6: 240 },
                3: { 2: 120, 3: 180, 4: 240, 5: 300, 6: 360 },
                4: { 2: 160, 3: 240, 4: 320, 5: 400, 6: 480 },
                5: { 2: 200, 3: 300, 4: 400, 5: 500, 6: 600 },
                6: { 2: 240, 3: 360, 4: 480, 5: 600, 6: 720 },
                7: { 2: 240, 3: 360, 4: 480, 5: 600, 6: 720 },
                8: { 2: 240, 3: 360, 4: 480, 5: 600, 6: 720 },
                9: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                10: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                11: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                12: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 }
            },
            // Weekend pricing (Friday and Saturday)
            weekend: {
                1: { 2: 50, 3: 75, 4: 100, 5: 125, 6: 150 },
                2: { 2: 100, 3: 150, 4: 200, 5: 250, 6: 300 },
                3: { 2: 150, 3: 225, 4: 300, 5: 375, 6: 450 },
                4: { 2: 200, 3: 300, 4: 400, 5: 500, 6: 600 },
                5: { 2: 250, 3: 375, 4: 500, 5: 625, 6: 750 },
                6: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                7: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                8: { 2: 320, 3: 480, 4: 640, 5: 800, 6: 960 },
                9: { 2: 400, 3: 600, 4: 800, 5: 1000, 6: 1200 },
                10: { 2: 400, 3: 600, 4: 800, 5: 1000, 6: 1200 },
                11: { 2: 400, 3: 600, 4: 800, 5: 1000, 6: 1200 },
                12: { 2: 400, 3: 600, 4: 800, 5: 1000, 6: 1200 }
            },
            addons: {
                decorationsBasic: 599,
                decorationsPremium: 999,
                cocktailPackage: 398,
                champagneOnIce: 230,
                vsopBottle: 398,
                vodkaBottle: 424,
                xoBottle: 1016,
                domPerignonPackage: 1862,
                dishBanquet: 234,
                preorderDining: 25,
                preorderBeverages: 25,
                professionalPhoto: 400,
                bluetoothMusic: 89
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
                allNightUpgrade: 120,
                preorderDining: 25,
                cocktailOnArrival: 25, // per person
                bluetoothMusic: 89,
                dessertPlatter: 159,
                champagneOnIce: 230,
                dishBanquet: 234,
                cocktailPackage: 398,
                vsopBottle: 398,
                professionalPhoto: 400,
                vodkaBottle: 424,
                decorationsBasic: 599,
                decorationsPremium: 999,
                xoBottle: 1016,
                domPerignonPackage: 1862
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
        document.getElementById('ks-date').min = new Date().toISOString().split('T')[0];
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
    
    const roomSizeRadio = document.querySelector('input[name="kn-room-size"]:checked');
    const pax = roomSizeRadio.value === 'small' ? 6 : (roomSizeRadio.value === 'medium' ? 8 : 12);
    
    bookingData.karaoke.night.addons = [];
    
    if (document.getElementById('kn-addon-1').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Decorations Basic Package',
            price: PRICING.karaoke.night.addons.decorationsBasic
        });
    }
    if (document.getElementById('kn-addon-2').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Decorations Premium Package',
            price: PRICING.karaoke.night.addons.decorationsPremium
        });
    }
    if (document.getElementById('kn-addon-3').checked) {
        const cocktail = document.getElementById('kn-cocktail-selection').value;
        bookingData.karaoke.night.addons.push({
            name: `Cocktail on Arrival (${pax} x $${PRICING.karaoke.night.addons.cocktailOnArrival})`,
            price: PRICING.karaoke.night.addons.cocktailOnArrival * pax,
            cocktail: cocktail
        });
    }
    if (document.getElementById('kn-addon-4').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Champagne on ice awaiting in room',
            price: PRICING.karaoke.night.addons.champagneOnIce
        });
    }
    if (document.getElementById('kn-addon-5').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Preorder your Dining',
            price: PRICING.karaoke.night.addons.preorderDining
        });
    }
    if (document.getElementById('kn-addon-6').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Preorder Beverages',
            price: PRICING.karaoke.night.addons.preorderBeverages
        });
    }
    if (document.getElementById('kn-addon-7').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Professional Photo Moment',
            price: PRICING.karaoke.night.addons.professionalPhoto
        });
    }
    if (document.getElementById('kn-addon-8').checked) {
        bookingData.karaoke.night.addons.push({
            name: 'Bluetooth Music',
            price: PRICING.karaoke.night.addons.bluetoothMusic
        });
    }
    
    console.log('Karaoke night addons:', bookingData.karaoke.night.addons);
    
    pageHistory.push('page-karaoke-night-upgrades');
    showPage('page-karaoke-terms');
    updateKaraokeTermsSummary();
});

// === KARAOKE SESSION BOOKING ===

// Function to update session pricing based on date and guests
function updateSessionPricing() {
    const paxSelect = document.getElementById('ks-pax');
    const dateInput = document.getElementById('ks-date');
    const hoursSelect = document.getElementById('ks-hours');
    const pricingNote = document.getElementById('pricing-note');
    
    const pax = parseInt(paxSelect.value);
    const date = dateInput.value;
    
    // Check if both pax and date are selected
    if (!pax || !date) {
        hoursSelect.disabled = true;
        hoursSelect.innerHTML = '<option value="">Select guests and date first...</option>';
        pricingNote.textContent = '';
        return;
    }
    
    // Determine if it's a weekend (Friday=5, Saturday=6) or weekday
    const selectedDate = new Date(date + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
    
    // Check if Monday (closed)
    if (dayOfWeek === 1) {
        hoursSelect.disabled = true;
        hoursSelect.innerHTML = '<option value="">We are closed on Mondays</option>';
        pricingNote.textContent = 'Please select a different date.';
        pricingNote.style.color = 'var(--error, #ff6b6b)';
        return;
    }
    
    const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6); // Friday or Saturday
    const priceTable = isWeekend ? PRICING.karaoke.session.weekend : PRICING.karaoke.session.weekday;
    
    // Get pricing for this number of guests
    const guestPricing = priceTable[pax];
    
    // Build the hours dropdown with pricing
    hoursSelect.disabled = false;
    hoursSelect.innerHTML = '<option value="">Select duration...</option>';
    
    // Add options for 2-6 hours
    for (let hours = 2; hours <= 6; hours++) {
        const price = guestPricing[hours];
        const option = document.createElement('option');
        option.value = hours;
        option.textContent = `${hours} hours - $${price.toFixed(2)}`;
        option.setAttribute('data-price', price);
        hoursSelect.appendChild(option);
    }
    
    // Update pricing note
    const dayType = isWeekend ? 'Weekend' : 'Weekday';
    pricingNote.textContent = `${dayType} pricing for ${pax} guest${pax > 1 ? 's' : ''}`;
    pricingNote.style.color = 'var(--text-secondary)';
}

document.getElementById('karaoke-session-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const hoursSelect = document.getElementById('ks-hours');
    const hours = parseInt(hoursSelect.value);
    if (hours < 2) {
        alert('Minimum 2 hours required for session booking');
        return;
    }
    
    // Get the price from the selected option's data attribute
    const selectedOption = hoursSelect.options[hoursSelect.selectedIndex];
    const price = parseFloat(selectedOption.getAttribute('data-price'));
    
    bookingData.karaoke.session.date = document.getElementById('ks-date').value;
    bookingData.karaoke.session.time = document.getElementById('ks-time').value;
    bookingData.karaoke.session.hours = hours;
    bookingData.karaoke.session.pax = document.getElementById('ks-pax').value;
    bookingData.karaoke.session.price = price; // Store the actual price
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
            name: 'Decorations Basic Package',
            price: PRICING.karaoke.session.addons.decorationsBasic
        });
    }
    if (document.getElementById('ks-addon-2').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Decorations Premium Package',
            price: PRICING.karaoke.session.addons.decorationsPremium
        });
    }
    if (document.getElementById('ks-addon-3').checked) {
        // Get selected cocktails
        const selectedCocktails = Array.from(document.querySelectorAll('input[name="ks-cocktail-choice"]:checked'))
            .map(cb => cb.value);
        bookingData.karaoke.session.addons.push({
            name: '12x Cocktail Package',
            price: PRICING.karaoke.session.addons.cocktailPackage,
            cocktails: selectedCocktails
        });
    }
    if (document.getElementById('ks-addon-4').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Champagne on Ice',
            price: PRICING.karaoke.session.addons.champagneOnIce
        });
    }
    if (document.getElementById('ks-addon-5').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'VSOP Bottle Package',
            price: PRICING.karaoke.session.addons.vsopBottle
        });
    }
    if (document.getElementById('ks-addon-6').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Vodka Bottle Package',
            price: PRICING.karaoke.session.addons.vodkaBottle
        });
    }
    if (document.getElementById('ks-addon-7').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'XO Bottle Package',
            price: PRICING.karaoke.session.addons.xoBottle
        });
    }
    if (document.getElementById('ks-addon-8').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Dom Perignon Package',
            price: PRICING.karaoke.session.addons.domPerignonPackage
        });
    }
    if (document.getElementById('ks-addon-9').checked) {
        bookingData.karaoke.session.addons.push({
            name: '6x Dish Banquet',
            price: PRICING.karaoke.session.addons.dishBanquet
        });
    }
    if (document.getElementById('ks-addon-10').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Preorder Dining',
            price: PRICING.karaoke.session.addons.preorderDining
        });
    }
    if (document.getElementById('ks-addon-11').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Preorder Beverages',
            price: PRICING.karaoke.session.addons.preorderBeverages
        });
    }
    if (document.getElementById('ks-addon-12').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Professional Photo Moment',
            price: PRICING.karaoke.session.addons.professionalPhoto
        });
    }
    if (document.getElementById('ks-addon-13').checked) {
        bookingData.karaoke.session.addons.push({
            name: 'Bluetooth Music',
            price: PRICING.karaoke.session.addons.bluetoothMusic
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
    
    // Initialize total display
    updatePackageTotal();
});

document.getElementById('karaoke-package-addons-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.karaoke.package.addons = [];
    const pax = bookingData.karaoke.package.pax;
    
    // All night upgrade
    if (document.getElementById('kp-addon-allnight') && document.getElementById('kp-addon-allnight').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'All Night Karaoke Upgrade',
            price: PRICING.karaoke.package.addons.allNightUpgrade
        });
        bookingData.karaoke.package.allNightUpgrade = true;
    }
    
    // Preorder Dining
    if (document.getElementById('kp-addon-dining').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Preorder Dining',
            price: PRICING.karaoke.package.addons.preorderDining
        });
    }
    
    // Cocktail on Arrival
    if (document.getElementById('kp-addon-cocktail').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Cocktail on Arrival',
            price: PRICING.karaoke.package.addons.cocktailOnArrival * pax
        });
    }
    
    // Bluetooth Music
    if (document.getElementById('kp-addon-bluetooth').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Bluetooth Music',
            price: PRICING.karaoke.package.addons.bluetoothMusic
        });
    }
    
    // Dessert Platter
    if (document.getElementById('kp-addon-dessert').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Dessert Platter for 3',
            price: PRICING.karaoke.package.addons.dessertPlatter
        });
    }
    
    // Champagne on Ice
    if (document.getElementById('kp-addon-champagne').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Champagne on Ice',
            price: PRICING.karaoke.package.addons.champagneOnIce
        });
    }
    
    // 6 Dish Banquet
    if (document.getElementById('kp-addon-banquet').checked) {
        bookingData.karaoke.package.addons.push({
            name: '6 x Dish Banquet',
            price: PRICING.karaoke.package.addons.dishBanquet
        });
    }
    
    // 12 Cocktail Package
    if (document.getElementById('kp-addon-cocktails12').checked) {
        bookingData.karaoke.package.addons.push({
            name: '12 x Cocktail Package',
            price: PRICING.karaoke.package.addons.cocktailPackage
        });
    }
    
    // VSOP Bottle Package
    if (document.getElementById('kp-addon-vsop').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'VSOP Bottle Package',
            price: PRICING.karaoke.package.addons.vsopBottle
        });
    }
    
    // Professional Photo
    if (document.getElementById('kp-addon-photo').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Professional Photo Moment',
            price: PRICING.karaoke.package.addons.professionalPhoto
        });
    }
    
    // Vodka Bottle Package
    if (document.getElementById('kp-addon-vodka').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Vodka Bottle Package',
            price: PRICING.karaoke.package.addons.vodkaBottle
        });
    }
    
    // Decorations Basic
    if (document.getElementById('kp-addon-deco-basic').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Decorations Basic Package',
            price: PRICING.karaoke.package.addons.decorationsBasic
        });
    }
    
    // Decorations Premium
    if (document.getElementById('kp-addon-deco-premium').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Decorations Premium Package',
            price: PRICING.karaoke.package.addons.decorationsPremium
        });
    }
    
    // XO Bottle Package
    if (document.getElementById('kp-addon-xo').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'XO Bottle Package',
            price: PRICING.karaoke.package.addons.xoBottle
        });
    }
    
    // Dom Perignon Package
    if (document.getElementById('kp-addon-dom').checked) {
        bookingData.karaoke.package.addons.push({
            name: 'Dom Perignon Package',
            price: PRICING.karaoke.package.addons.domPerignonPackage
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
        experienceText = 'Minimum Spend';
        const dateObj = new Date(bookingData.karaoke.night.date + 'T' + bookingData.karaoke.night.time);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                  ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        
        const roomSizes = {small: 'Small (6 pax)', medium: 'Medium (8 pax)', large: 'Large (12 pax)'};
        detailsText = roomSizes[bookingData.karaoke.night.roomSize];
        addons = bookingData.karaoke.night.addons.map(a => `${a.name} (+$${a.price})`);
        
    } else if (bookingType === 'session') {
        experienceText = 'Karaoke - Session Booking';
        const dateObj = new Date(bookingData.karaoke.session.date + 'T' + bookingData.karaoke.session.time);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                  ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
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
    
    // Calculate and display total
    let total = 0;
    if (bookingType === 'night') {
        total = PRICING.karaoke.night.rooms[bookingData.karaoke.night.roomSize] || 0;
        bookingData.karaoke.night.addons.forEach(addon => {
            total += addon.price;
        });
    } else if (bookingType === 'session') {
        // Use the stored price from the booking
        total = bookingData.karaoke.session.price || 0;
        bookingData.karaoke.session.addons.forEach(addon => {
            total += addon.price;
        });
    } else if (bookingType === 'package') {
        // Get package price based on weekday/weekend and type
        const packageType = bookingData.karaoke.package.packageType;
        const isWeekend = true; // You can add logic to determine this from the date
        total = isWeekend ? PRICING.karaoke.package[packageType].weekend : PRICING.karaoke.package[packageType].weekday;
        if (bookingData.karaoke.package.allNightUpgrade && packageType === 'signature') {
            total += PRICING.karaoke.package.signature.allNightUpgrade;
        }
        bookingData.karaoke.package.addons.forEach(addon => {
            total += addon.price;
        });
    }
    
    const totalEl = document.getElementById('karaoke-summary-total');
    if (totalEl) {
        totalEl.textContent = `$${total}`;
        document.getElementById('karaoke-summary-total-row').style.display = 'flex';
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
        totalPrice = bookingData.karaoke.session.price || 0;
        
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
    
    // Setup payment slider
    const slider = document.getElementById('payment-slider');
    const sliderAmount = document.getElementById('slider-amount');
    
    // Payment breakdown elements
    const breakdownTotal = document.getElementById('breakdown-total');
    const breakdownDeposit = document.getElementById('breakdown-deposit');
    const breakdownRemaining = document.getElementById('breakdown-remaining');
    
    // Calculate 50% deposit
    const minDeposit = totalPrice * 0.5;
    
    // Initialize breakdown card
    if (breakdownTotal) breakdownTotal.textContent = `$${totalPrice.toFixed(2)}`;
    if (breakdownDeposit) breakdownDeposit.textContent = `$${minDeposit.toFixed(2)}`;
    if (breakdownRemaining) breakdownRemaining.textContent = `$${(totalPrice - minDeposit).toFixed(2)}`;
    
    // Update slider
    slider.value = 50;
    sliderAmount.textContent = minDeposit.toFixed(2);
    
    // Slider event listener
    slider.oninput = function() {
        const percentage = this.value;
        const amount = (totalPrice * percentage / 100);
        const remaining = totalPrice - amount;
        
        sliderAmount.textContent = amount.toFixed(2);
        
        // Update breakdown card
        if (breakdownDeposit) breakdownDeposit.textContent = `$${amount.toFixed(2)}`;
        if (breakdownRemaining) breakdownRemaining.textContent = `$${remaining.toFixed(2)}`;
    };
}

function processKaraokePayment(method) {
    const buttons = ['karaoke-apple-pay-btn', 'karaoke-google-pay-btn', 'karaoke-card-pay-btn'];
    buttons.forEach(id => document.getElementById(id).disabled = true);
    
    // Store payment details
    const slider = document.getElementById('payment-slider');
    const percentage = slider ? slider.value : 50;
    const depositAmount = (totalPrice * percentage / 100);
    const remainingBalance = totalPrice - depositAmount;
    
    // Store in booking data
    bookingData.payment = {
        total: totalPrice,
        depositPaid: depositAmount,
        remainingBalance: remainingBalance,
        method: method
    };
    
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
        const dateObj = new Date(bookingData.karaoke.session.date + 'T' + bookingData.karaoke.session.time);
        datetimeText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + 
                      ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
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
    
    // Show payment summary if payment details exist
    if (bookingData.payment) {
        const paymentSummary = document.getElementById('payment-summary');
        if (paymentSummary) {
            paymentSummary.style.display = 'block';
            document.getElementById('confirm-total').textContent = `$${bookingData.payment.total.toFixed(2)}`;
            document.getElementById('confirm-deposit').textContent = `$${bookingData.payment.depositPaid.toFixed(2)}`;
            document.getElementById('confirm-remaining').textContent = `$${bookingData.payment.remainingBalance.toFixed(2)}`;
        }
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
        payment: null,
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
            session: { date: '', time: '', hours: '', pax: '', name: '', phone: '', email: '', addons: [] },
            package: { packageType: '', date: '', name: '', phone: '', email: '', pax: '', addons: [], allNightUpgrade: false }
        }
    };
    
    // Reset all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Hide payment summary
    const paymentSummary = document.getElementById('payment-summary');
    if (paymentSummary) paymentSummary.style.display = 'none';
    
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
// Toggle addon card selection
function toggleAddonCard(card, checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    
    // Toggle checkbox state
    checkbox.checked = !checkbox.checked;
    
    // Toggle card visual state
    card.classList.toggle('selected');
    
    // Trigger change event to update totals
    checkbox.dispatchEvent(new Event('change'));
}

// Toggle cocktail menu visibility
function toggleCocktailMenu() {
    const checkbox = document.getElementById('kn-addon-3');
    const menu = document.getElementById('cocktail-menu');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Toggle more add-ons section
function toggleMoreAddons() {
    const moreAddons = document.getElementById('more-addons');
    const btnText = document.getElementById('view-more-text');
    if (moreAddons.style.display === 'none' || moreAddons.style.display === '') {
        moreAddons.style.display = 'block';
        btnText.textContent = 'View Less Add-ons ▲';
    } else {
        moreAddons.style.display = 'none';
        btnText.textContent = 'View More Add-ons ▼';
    }
}

// Toggle for session more add-ons
function toggleSessionMoreAddons() {
    const moreAddons = document.getElementById('session-more-addons');
    const btnText = document.getElementById('view-session-more-text');
    if (moreAddons.style.display === 'none' || moreAddons.style.display === '') {
        moreAddons.style.display = 'block';
        btnText.textContent = 'View Less Add-ons ▲';
    } else {
        moreAddons.style.display = 'none';
        btnText.textContent = 'View More Add-ons ▼';
    }
}

// Toggle cocktail menu for session
function toggleSessionCocktailMenu() {
    const checkbox = document.getElementById('ks-addon-3');
    const cocktailMenu = document.getElementById('session-cocktail-menu');
    if (checkbox.checked) {
        cocktailMenu.style.display = 'block';
    } else {
        cocktailMenu.style.display = 'none';
    }
}

// Update karaoke night running total
function updateKaraokeNightTotal() {
    // Get room cost
    const roomSizeRadio = document.querySelector('input[name="kn-room-size"]:checked');
    let roomCost = 0;
    if (roomSizeRadio) {
        const roomSize = roomSizeRadio.value;
        roomCost = PRICING.karaoke.night.rooms[roomSize] || 0;
    }
    
    // Calculate addons
    let addonsCost = 0;
    const addonPrices = {
        'kn-addon-1': PRICING.karaoke.night.addons.decorationsBasic,
        'kn-addon-2': PRICING.karaoke.night.addons.decorationsPremium,
        'kn-addon-3': PRICING.karaoke.night.addons.cocktailOnArrival, // per person, will need pax
        'kn-addon-4': PRICING.karaoke.night.addons.champagneOnIce,
        'kn-addon-5': PRICING.karaoke.night.addons.preorderDining,
        'kn-addon-6': PRICING.karaoke.night.addons.preorderBeverages,
        'kn-addon-7': PRICING.karaoke.night.addons.professionalPhoto,
        'kn-addon-8': PRICING.karaoke.night.addons.bluetoothMusic
    };
    
    for (let addonId in addonPrices) {
        const checkbox = document.getElementById(addonId);
        if (checkbox && checkbox.checked) {
            // For cocktail on arrival, multiply by pax from room capacity
            if (addonId === 'kn-addon-3' && roomSizeRadio) {
                const pax = roomSizeRadio.value === 'small' ? 6 : (roomSizeRadio.value === 'medium' ? 8 : 12);
                addonsCost += addonPrices[addonId] * pax;
            } else {
                addonsCost += addonPrices[addonId];
            }
        }
    }
    
    const total = roomCost + addonsCost;
    
    // Update display
    const roomCostEl = document.getElementById('kn-room-cost');
    const addonsCostEl = document.getElementById('kn-addons-cost');
    const totalCostEl = document.getElementById('kn-total-cost');
    
    if (roomCostEl) roomCostEl.textContent = `$${roomCost}`;
    if (addonsCostEl) addonsCostEl.textContent = `$${addonsCost}`;
    if (totalCostEl) totalCostEl.textContent = `$${total}`;
}

// Update total when room size changes
document.addEventListener('DOMContentLoaded', function() {
    const roomRadios = document.querySelectorAll('input[name="kn-room-size"]');
    roomRadios.forEach(radio => {
        radio.addEventListener('change', updateKaraokeNightTotal);
    });
});

// Disable Mondays on date inputs
function disableMondays(dateInput) {
    if (!dateInput) return;
    
    // Clear the value if Monday is selected (without showing alert)
    dateInput.addEventListener('input', function() {
        const selectedDate = new Date(this.value + 'T00:00:00');
        const dayOfWeek = selectedDate.getDay();
        
        // If Monday (0 = Sunday, 1 = Monday, etc.)
        if (dayOfWeek === 1) {
            this.value = '';
        }
    });
    
    // Also handle the change event for browsers that use change instead of input
    dateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value + 'T00:00:00');
        const dayOfWeek = selectedDate.getDay();
        
        if (dayOfWeek === 1) {
            this.value = '';
        }
    });
}

// Initialize all date inputs on page load
document.addEventListener('DOMContentLoaded', function() {
    // Get all date inputs
    const dateInputs = [
        document.getElementById('kn-date'),
        document.getElementById('ks-date'),
        document.getElementById('kp-date'),
        document.getElementById('rooftop-date'),
        document.getElementById('vip-date'),
        document.getElementById('tour-date'),
        document.getElementById('event-date')
    ];
    
    // Apply Monday restriction to all date inputs
    dateInputs.forEach(input => {
        if (input) {
            disableMondays(input);
        }
    });
    
    // Set minimum date to today for all inputs
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        if (input) {
            input.min = today;
        }
    });
});
// Toggle more add-ons for package
function togglePackageMoreAddons() {
    const moreAddons = document.getElementById('package-more-addons');
    const btnText = document.getElementById('view-package-more-text');
    if (moreAddons.style.display === 'none' || moreAddons.style.display === '') {
        moreAddons.style.display = 'block';
        btnText.textContent = 'View Less Add-ons ▲';
    } else {
        moreAddons.style.display = 'none';
        btnText.textContent = 'View More Add-ons ▼';
    }
}

// Toggle cocktail menu for package
function togglePackageCocktailMenu() {
    const checkbox = document.getElementById('kp-addon-cocktail');
    const menu = document.getElementById('package-cocktail-menu');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Toggle cocktail menu for 12-pack
function togglePackageCocktailMenu12() {
    const checkbox = document.getElementById('kp-addon-cocktails12');
    const menu = document.getElementById('package-cocktail-menu-12');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Update package total
function updatePackageTotal() {
    // Get package cost based on type and day
    const packageType = bookingData.karaoke.package.packageType;
    const date = bookingData.karaoke.package.date;
    const pax = parseInt(bookingData.karaoke.package.pax) || 0;
    
    let packageCost = 0;
    if (packageType && date) {
        const dateObj = new Date(date);
        const dayOfWeek = dateObj.getDay();
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6); // Friday or Saturday
        
        if (packageType === 'cocktail') {
            packageCost = isWeekend ? PRICING.karaoke.package.cocktail.weekend : PRICING.karaoke.package.cocktail.weekday;
        } else if (packageType === 'signature') {
            packageCost = isWeekend ? PRICING.karaoke.package.signature.weekend : PRICING.karaoke.package.signature.weekday;
        } else if (packageType === 'diamond') {
            packageCost = isWeekend ? PRICING.karaoke.package.diamond.weekend : PRICING.karaoke.package.diamond.weekday;
        }
    }
    
    // Calculate addons
    let addonsCost = 0;
    const addonPrices = {
        'kp-addon-allnight': PRICING.karaoke.package.addons.allNightUpgrade,
        'kp-addon-dining': PRICING.karaoke.package.addons.preorderDining,
        'kp-addon-cocktail': PRICING.karaoke.package.addons.cocktailOnArrival * pax,
        'kp-addon-bluetooth': PRICING.karaoke.package.addons.bluetoothMusic,
        'kp-addon-dessert': PRICING.karaoke.package.addons.dessertPlatter,
        'kp-addon-champagne': PRICING.karaoke.package.addons.champagneOnIce,
        'kp-addon-banquet': PRICING.karaoke.package.addons.dishBanquet,
        'kp-addon-cocktails12': PRICING.karaoke.package.addons.cocktailPackage,
        'kp-addon-vsop': PRICING.karaoke.package.addons.vsopBottle,
        'kp-addon-photo': PRICING.karaoke.package.addons.professionalPhoto,
        'kp-addon-vodka': PRICING.karaoke.package.addons.vodkaBottle,
        'kp-addon-deco-basic': PRICING.karaoke.package.addons.decorationsBasic,
        'kp-addon-deco-premium': PRICING.karaoke.package.addons.decorationsPremium,
        'kp-addon-xo': PRICING.karaoke.package.addons.xoBottle,
        'kp-addon-dom': PRICING.karaoke.package.addons.domPerignonPackage
    };
    
    for (let addonId in addonPrices) {
        const checkbox = document.getElementById(addonId);
        if (checkbox && checkbox.checked) {
            addonsCost += addonPrices[addonId];
        }
    }
    
    const total = packageCost + addonsCost;
    
    // Update display
    const packageCostEl = document.getElementById('kp-package-cost');
    const addonsCostEl = document.getElementById('kp-addons-cost');
    const totalCostEl = document.getElementById('kp-total-cost');
    
    if (packageCostEl) packageCostEl.textContent = `$${packageCost}`;
    if (addonsCostEl) addonsCostEl.textContent = `$${addonsCost}`;
    if (totalCostEl) totalCostEl.textContent = `$${total}`;
}