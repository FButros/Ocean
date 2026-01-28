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
        addons: [],
        smoking: 'non-smoking'
    },
    // Karaoke specific
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
    },
    // VIP Room specific
    vip: {
        bookingType: '', // 'minspend' or 'package'
        // Minimum spend booking
        minSpend: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            room: '',
            pax: '',
            addons: []
        },
        // Package booking
        package: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            pax: '',
            addons: []
        }
    }
};

// PRICING CONFIGURATION - Easy to update later
const PRICING = {
    rooftop: {
        depositPerPerson: 50,
        addons: {
            preorderDining: 25,
            preorderBeverages: 25,
            shareTower: 116,
            dateNightShareTower: 158,
            dessertPlatter: 159,
            champagneOnIce: 230,
            dishBanquet: 228,
            cocktailPackage: 398
        }
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
    },
    vip: {
        // Minimum spend pricing (same for all rooms)
        minSpend: {
            weekday: 2000, // Sun-Thu
            weekend: 3000, // Fri-Sat
            surcharge: 0.10 // 10% surcharge
        },
        rooms: {
            'vip999': { name: 'VIP 999', capacity: 47 },
            'vip888': { name: 'VIP 888', capacity: 29 },
            'vip777': { name: 'VIP 777', capacity: 43 },
            'vip666': { name: 'VIP 666', capacity: 32 }
        },
        package: {
            weekday: 1780,
            weekend: 2228
        },
        addons: {
            preorderDining: 25,
            preorderBeverages: 25,
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
        showPage('page-vip-type');
       
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
    const timeInput = document.getElementById('ks-time');
    const hoursSelect = document.getElementById('ks-hours');
    const pricingNote = document.getElementById('pricing-note');
   
    const pax = parseInt(paxSelect.value);
    const date = dateInput.value;
    const time = timeInput.value;
   
    // Check if pax and date are selected (time is optional for initial load)
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
   
    // Determine closing time based on day of week
    let closingHour;
    if (dayOfWeek === 5 || dayOfWeek === 6) {
        // Friday & Saturday: closes at 4:30am
        closingHour = 4.5;
    } else {
        // Tuesday, Wednesday, Thursday, Sunday: closes at 3:30am
        closingHour = 3.5;
    }
   
    // Calculate maximum available hours based on start time
    let maxHours = 6; // Default maximum
    if (time) {
        // Parse the selected time
        const [hours, minutes] = time.split(':').map(Number);
       
        // Convert to 24-hour format considering times after midnight
        let startHour = hours + (minutes / 60);
       
        // If time is before 8pm, assume it's after midnight (e.g., 1:00 AM)
        if (hours < 8) {
            startHour = hours + 24 + (minutes / 60);
        }
       
        // Calculate closing time (next day early morning)
        const closingTime = 24 + closingHour;
       
        // Calculate available hours until closing
        const availableHours = closingTime - startHour;
       
        // Round down to nearest 0.5 hour and cap at 6
        maxHours = Math.min(6, Math.floor(availableHours * 2) / 2);
       
        // Minimum is 2 hours
        if (maxHours < 2) {
            hoursSelect.disabled = true;
            hoursSelect.innerHTML = '<option value="">Not enough time before closing</option>';
            pricingNote.textContent = `Venue closes at ${closingHour === 4.5 ? '4:30am' : '3:30am'}. Please select an earlier time.`;
            pricingNote.style.color = 'var(--error, #ff6b6b)';
            return;
        }
    }
   
    // Build the hours dropdown with pricing
    hoursSelect.disabled = false;
    hoursSelect.innerHTML = '<option value="">Select duration...</option>';
   
    // Add options for 2 hours up to maxHours
    for (let hours = 2; hours <= Math.min(6, Math.floor(maxHours)); hours++) {
        const price = guestPricing[hours];
        const option = document.createElement('option');
        option.value = hours;
        option.textContent = `${hours} hours - $${price.toFixed(2)}`;
        option.setAttribute('data-price', price);
        hoursSelect.appendChild(option);
    }
   
    // Update pricing note
    const dayType = isWeekend ? 'Weekend' : 'Weekday';
    let noteText = `${dayType} pricing for ${pax} guest${pax > 1 ? 's' : ''}`;
   
    if (time && maxHours < 6) {
        const closingTimeText = closingHour === 4.5 ? '4:30am' : '3:30am';
        noteText += ` (closes at ${closingTimeText})`;
    }
   
    pricingNote.textContent = noteText;
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
        const dateObj = new Date(bookingData.karaoke.package.date);
        const isWeekend = dateObj.getDay() === 5 || dateObj.getDay() === 6;
        if (packageType === 'cocktail') {
            total = isWeekend ? PRICING.karaoke.package.cocktail.weekend : PRICING.karaoke.package.cocktail.weekday;
        } else if (packageType === 'signature') {
            total = isWeekend ? PRICING.karaoke.package.signature.weekend : PRICING.karaoke.package.signature.weekday;
        } else if (packageType === 'diamond') {
            total = isWeekend ? PRICING.karaoke.package.diamond.weekend : PRICING.karaoke.package.diamond.weekday;
        }
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
    bookingData.rooftop.smoking = document.querySelector('input[name="rooftop-smoking"]:checked')?.value || 'non-smoking';
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
    
    // Initialize running total on addons page
    updateRooftopAddonsTotal();
});

// Step 3: Add-ons
document.getElementById('rooftop-addons-form').addEventListener('submit', function(e) {
    e.preventDefault();
   
    // Reset addons array
    bookingData.rooftop.addons = [];
   
    // Check each add-on
    if (document.getElementById('rooftop-addon-1') && document.getElementById('rooftop-addon-1').checked) {
        bookingData.rooftop.addons.push({
            name: 'Preorder Dining',
            price: PRICING.rooftop.addons.preorderDining
        });
    }
   
    if (document.getElementById('rooftop-addon-2') && document.getElementById('rooftop-addon-2').checked) {
        bookingData.rooftop.addons.push({
            name: 'Preorder Beverages',
            price: PRICING.rooftop.addons.preorderBeverages
        });
    }
   
    if (document.getElementById('rooftop-addon-4') && document.getElementById('rooftop-addon-4').checked) {
        bookingData.rooftop.addons.push({
            name: 'Share Tower',
            price: PRICING.rooftop.addons.shareTower
        });
    }
   
    if (document.getElementById('rooftop-addon-5') && document.getElementById('rooftop-addon-5').checked) {
        bookingData.rooftop.addons.push({
            name: 'Date Night Share Tower',
            price: PRICING.rooftop.addons.dateNightShareTower
        });
    }
   
    if (document.getElementById('rooftop-addon-6') && document.getElementById('rooftop-addon-6').checked) {
        bookingData.rooftop.addons.push({
            name: 'Dessert Platter for 3',
            price: PRICING.rooftop.addons.dessertPlatter
        });
    }
   
    if (document.getElementById('rooftop-addon-7') && document.getElementById('rooftop-addon-7').checked) {
        bookingData.rooftop.addons.push({
            name: 'Champagne on Ice',
            price: PRICING.rooftop.addons.champagneOnIce
        });
    }
   
    if (document.getElementById('rooftop-addon-8') && document.getElementById('rooftop-addon-8').checked) {
        bookingData.rooftop.addons.push({
            name: '6 x Dish Banquet',
            price: PRICING.rooftop.addons.dishBanquet
        });
    }
   
    if (document.getElementById('rooftop-addon-9') && document.getElementById('rooftop-addon-9').checked) {
        bookingData.rooftop.addons.push({
            name: '12 x Cocktail Package',
            price: PRICING.rooftop.addons.cocktailPackage
        });
    }
   
    console.log('Rooftop add-ons:', bookingData.rooftop.addons);
   
    pageHistory.push('page-rooftop-addons');
    showPage('page-rooftop-terms');
    updateRooftopTermsSummary();
});

// Update rooftop addons running total
function updateRooftopAddonsTotal() {
    const pax = parseInt(bookingData.rooftop.pax) || 0;
    const minSpendCost = pax * PRICING.rooftop.depositPerPerson;
    
    // Calculate addons
    let addonsCost = 0;
    const addonPrices = {
        'rooftop-addon-1': PRICING.rooftop.addons.preorderDining,
        'rooftop-addon-2': PRICING.rooftop.addons.preorderBeverages,
        'rooftop-addon-4': PRICING.rooftop.addons.shareTower,
        'rooftop-addon-5': PRICING.rooftop.addons.dateNightShareTower,
        'rooftop-addon-6': PRICING.rooftop.addons.dessertPlatter,
        'rooftop-addon-7': PRICING.rooftop.addons.champagneOnIce,
        'rooftop-addon-8': PRICING.rooftop.addons.dishBanquet,
        'rooftop-addon-9': PRICING.rooftop.addons.cocktailPackage
    };
    
    for (let addonId in addonPrices) {
        const checkbox = document.getElementById(addonId);
        if (checkbox && checkbox.checked) {
            addonsCost += addonPrices[addonId];
        }
    }
    
    const total = minSpendCost + addonsCost;
    
    // Update display
    const minSpendEl = document.getElementById('rt-min-spend-cost');
    const addonsEl = document.getElementById('rt-addons-cost');
    const totalEl = document.getElementById('rt-total-cost');
    
    if (minSpendEl) minSpendEl.textContent = `$${minSpendCost}`;
    if (addonsEl) addonsEl.textContent = `$${addonsCost}`;
    if (totalEl) totalEl.textContent = `$${total}`;
}

// Rooftop terms summary (displays date, session, pax, addons)
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
    if (bookingData.rooftop.addons && bookingData.rooftop.addons.length > 0) {
        bookingData.rooftop.addons.forEach(addon => {
            addons.push(`${addon.name} (+$${addon.price})`);
        });
       
        document.getElementById('rooftop-summary-addons-row').style.display = 'flex';
        document.getElementById('rooftop-summary-addons').textContent = addons.join(', ');
    } else {
        document.getElementById('rooftop-summary-addons-row').style.display = 'none';
    }
    
    // Calculate and display total (like karaoke)
    const pax = parseInt(bookingData.rooftop.pax) || 0;
    let total = pax * PRICING.rooftop.depositPerPerson; // Minimum spend per person
    
    if (bookingData.rooftop.addons && bookingData.rooftop.addons.length > 0) {
        bookingData.rooftop.addons.forEach(addon => {
            total += addon.price;
        });
    }
    
    const totalEl = document.getElementById('rooftop-summary-total');
    if (totalEl) {
        totalEl.textContent = `$${total}`;
        document.getElementById('rooftop-summary-total-row').style.display = 'flex';
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

// Global variable for rooftop total price
let rooftopTotalPrice = 0;

function updateRooftopPaymentSummary() {
    const pax = parseInt(bookingData.rooftop.pax) || 0;
    
    // Calculate total (min spend + addons)
    rooftopTotalPrice = pax * PRICING.rooftop.depositPerPerson;
    
    if (bookingData.rooftop.addons && bookingData.rooftop.addons.length > 0) {
        bookingData.rooftop.addons.forEach(addon => {
            rooftopTotalPrice += addon.price;
        });
    }
    
    // Setup payment slider
    const slider = document.getElementById('rooftop-payment-slider');
    const sliderAmount = document.getElementById('rooftop-slider-amount');
    
    // Payment breakdown elements
    const breakdownTotal = document.getElementById('rooftop-breakdown-total');
    const breakdownDeposit = document.getElementById('rooftop-breakdown-deposit');
    const breakdownRemaining = document.getElementById('rooftop-breakdown-remaining');
    
    // Calculate 50% deposit
    const minDeposit = rooftopTotalPrice * 0.2;
    
    // Initialize breakdown card
    if (breakdownTotal) breakdownTotal.textContent = `$${rooftopTotalPrice.toFixed(2)}`;
    if (breakdownDeposit) breakdownDeposit.textContent = `$${minDeposit.toFixed(2)}`;
    if (breakdownRemaining) breakdownRemaining.textContent = `$${(rooftopTotalPrice - minDeposit).toFixed(2)}`;
    
    // Update slider
    slider.value = 20;
    sliderAmount.textContent = minDeposit.toFixed(2);
    
    // Slider event listener
    slider.oninput = function() {
        const percentage = this.value;
        const amount = (rooftopTotalPrice * percentage / 100);
        const remaining = rooftopTotalPrice - amount;
        
        sliderAmount.textContent = amount.toFixed(2);
        
        // Update breakdown card
        if (breakdownDeposit) breakdownDeposit.textContent = `$${amount.toFixed(2)}`;
        if (breakdownRemaining) breakdownRemaining.textContent = `$${remaining.toFixed(2)}`;
    };
}

// Step 5: Payment Processing
function processRooftopPayment(method) {
    const buttons = ['rooftop-apple-pay-btn', 'rooftop-google-pay-btn', 'rooftop-card-pay-btn'];
    buttons.forEach(id => document.getElementById(id).disabled = true);
    
    // Store payment details
    const slider = document.getElementById('rooftop-payment-slider');
    const percentage = slider ? slider.value : 50;
    const depositAmount = (rooftopTotalPrice * percentage / 100);
    const remainingBalance = rooftopTotalPrice - depositAmount;
    
    // Store in booking data
    bookingData.payment = {
        total: rooftopTotalPrice,
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
        updateRooftopConfirmation();
       
        buttons.forEach(id => document.getElementById(id).disabled = false);
    }, 800);
}

function showRooftopInfo(type) {
    let text = '';
    if (type === 'min-spend') {
        text = 'Total Minimum Spend is calculated at <strong>$50 per person</strong>. This is the minimum amount your group is expected to spend on food and beverages during your visit. It helps us reserve the space exclusively for you.';
    } else if (type === 'deposit') {
        text = 'The Required Deposit is <strong>20% of the Total Minimum Spend</strong>. This amount is charged to secure your booking and is non-refundable unless cancelled within the allowed policy window.';
    } else if (type === 'total-deposit') {
        text = 'Total Deposit Required Now = Required Deposit + price of any selected add-ons. This is the full amount charged to your card today to confirm the booking.';
    }
   
    document.getElementById('rooftop-info-text').innerHTML = text;
    document.getElementById('rooftopInfoModal').style.display = 'flex';
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
    const smokingPref = bookingData.rooftop.smoking === 'smoking'
        ? 'Smoking Allowed Area'
        : 'Non-Smoking Area';
    document.getElementById('confirm-rooftop-smoking').textContent = smokingPref;
    document.getElementById('confirm-datetime').textContent = formatted;
    document.getElementById('confirm-details').textContent = `${bookingData.rooftop.pax} Guests`;
    if (bookingData.experience === 'rooftop') {
        document.getElementById('smoking-summary-row').style.display = 'flex';
    } else {
        document.getElementById('smoking-summary-row').style.display = 'none';
    }
    
    // Show payment summary if payment details exist (like karaoke)
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
// VIP ROOM BOOKING FLOW
// ========================================

// Select VIP booking type
function selectVIPType(type) {
    console.log('Selected VIP type:', type);
    bookingData.vip.bookingType = type;
    pageHistory.push('page-vip-type');
    
    if (type === 'minspend') {
        showPage('page-vip-minspend-details');
        document.getElementById('vip-ms-date').min = new Date().toISOString().split('T')[0];
    } else if (type === 'package') {
        showPage('page-vip-package-details');
        document.getElementById('vip-pkg-date').min = new Date().toISOString().split('T')[0];
    }
}

// === VIP MINIMUM SPEND BOOKING ===
document.getElementById('vip-minspend-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.vip.minSpend.name = document.getElementById('vip-ms-name').value;
    bookingData.vip.minSpend.phone = document.getElementById('vip-ms-phone').value;
    bookingData.vip.minSpend.email = document.getElementById('vip-ms-email').value;
    bookingData.vip.minSpend.date = document.getElementById('vip-ms-date').value;
    bookingData.vip.minSpend.time = document.getElementById('vip-ms-time').value;
    bookingData.vip.minSpend.pax = document.getElementById('vip-ms-pax').value;
   
    
   
    
    console.log('VIP minspend details:', bookingData.vip.minSpend);
    
    pageHistory.push('page-vip-minspend-details');
    showPage('page-vip-addons');
    updateVIPAddonsTotal();
});

// === VIP PACKAGE BOOKING ===
document.getElementById('vip-package-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    bookingData.vip.package.name = document.getElementById('vip-pkg-name').value;
    bookingData.vip.package.phone = document.getElementById('vip-pkg-phone').value;
    bookingData.vip.package.email = document.getElementById('vip-pkg-email').value;
    bookingData.vip.package.date = document.getElementById('vip-pkg-date').value;
    bookingData.vip.package.time = document.getElementById('vip-pkg-time').value;
    bookingData.vip.package.pax = document.getElementById('vip-pkg-pax').value;
    
    console.log('VIP package details:', bookingData.vip.package);
    
    pageHistory.push('page-vip-package-details');
    showPage('page-vip-addons');
    updateVIPAddonsTotal();
});

// VIP Add-ons form submission
document.getElementById('vip-addons-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookingType = bookingData.vip.bookingType;
    const addonsArray = [];
    const pax = bookingType === 'minspend' 
        ? bookingData.vip.minSpend.pax 
        : parseInt(bookingData.vip.package.pax) || 1;
    
    // Check each add-on
    if (document.getElementById('vip-addon-1')?.checked) {
        addonsArray.push({ name: 'Preorder Dining', price: PRICING.vip.addons.preorderDining });
    }
    if (document.getElementById('vip-addon-2')?.checked) {
        addonsArray.push({ name: 'Preorder Beverages', price: PRICING.vip.addons.preorderBeverages });
    }
    if (document.getElementById('vip-addon-3')?.checked) {
        addonsArray.push({ 
            name: `Cocktail on Arrival (${pax} x $25)`, 
            price: PRICING.vip.addons.cocktailOnArrival * pax 
        });
    }
    if (document.getElementById('vip-addon-4')?.checked) {
        addonsArray.push({ name: 'Bluetooth Music', price: PRICING.vip.addons.bluetoothMusic });
    }
    if (document.getElementById('vip-addon-5')?.checked) {
        addonsArray.push({ name: 'Dessert Platter for 3', price: PRICING.vip.addons.dessertPlatter });
    }
    if (document.getElementById('vip-addon-6')?.checked) {
        addonsArray.push({ name: 'Champagne on Ice', price: PRICING.vip.addons.champagneOnIce });
    }
    if (document.getElementById('vip-addon-7')?.checked) {
        addonsArray.push({ name: '6 x Dish Banquet', price: PRICING.vip.addons.dishBanquet });
    }
    if (document.getElementById('vip-addon-8')?.checked) {
        addonsArray.push({ name: '12 x Cocktail Package', price: PRICING.vip.addons.cocktailPackage });
    }
    if (document.getElementById('vip-addon-9')?.checked) {
        addonsArray.push({ name: 'VSOP Bottle Package', price: PRICING.vip.addons.vsopBottle });
    }
    if (document.getElementById('vip-addon-10')?.checked) {
        addonsArray.push({ name: 'Professional Photo Moment', price: PRICING.vip.addons.professionalPhoto });
    }
    if (document.getElementById('vip-addon-11')?.checked) {
        addonsArray.push({ name: 'Vodka Bottle Package', price: PRICING.vip.addons.vodkaBottle });
    }
    if (document.getElementById('vip-addon-12')?.checked) {
        addonsArray.push({ name: 'Decorations Basic Package', price: PRICING.vip.addons.decorationsBasic });
    }
    if (document.getElementById('vip-addon-13')?.checked) {
        addonsArray.push({ name: 'Decorations Premium Package', price: PRICING.vip.addons.decorationsPremium });
    }
    if (document.getElementById('vip-addon-14')?.checked) {
        addonsArray.push({ name: 'XO Bottle Package', price: PRICING.vip.addons.xoBottle });
    }
    if (document.getElementById('vip-addon-15')?.checked) {
        addonsArray.push({ name: 'Dom Perignon Package', price: PRICING.vip.addons.domPerignonPackage });
    }
    
    if (bookingType === 'minspend') {
        bookingData.vip.minSpend.addons = addonsArray;
    } else {
        bookingData.vip.package.addons = addonsArray;
    }
    
    console.log('VIP addons:', addonsArray);
    
    pageHistory.push('page-vip-addons');
    showPage('page-vip-terms');
    updateVIPTermsSummary();
});

// Update VIP addons running total
function updateVIPAddonsTotal() {
    const bookingType = bookingData.vip.bookingType;
    let baseCost = 0;
    let pax = 1;
    
    if (bookingType === 'minspend') {
        const date = bookingData.vip.minSpend.date;
        if (date) {
            const dateObj = new Date(date + 'T00:00:00');
            const dayOfWeek = dateObj.getDay();
            const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
            const basePrice = isWeekend ? PRICING.vip.minSpend.weekend : PRICING.vip.minSpend.weekday;
            baseCost = basePrice * (1 + PRICING.vip.minSpend.surcharge);
        }
        pax = bookingData.vip.minSpend.pax || 1;
    } else {
        const date = bookingData.vip.package.date;
        if (date) {
            const dateObj = new Date(date + 'T00:00:00');
            const dayOfWeek = dateObj.getDay();
            const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
            baseCost = isWeekend ? PRICING.vip.package.weekend : PRICING.vip.package.weekday;
        }
        pax = parseInt(bookingData.vip.package.pax) || 1;
    }
    
    // Calculate addons
    let addonsCost = 0;
    const addonPrices = {
        'vip-addon-1': PRICING.vip.addons.preorderDining,
        'vip-addon-2': PRICING.vip.addons.preorderBeverages,
        'vip-addon-3': PRICING.vip.addons.cocktailOnArrival * pax,
        'vip-addon-4': PRICING.vip.addons.bluetoothMusic,
        'vip-addon-5': PRICING.vip.addons.dessertPlatter,
        'vip-addon-6': PRICING.vip.addons.champagneOnIce,
        'vip-addon-7': PRICING.vip.addons.dishBanquet,
        'vip-addon-8': PRICING.vip.addons.cocktailPackage,
        'vip-addon-9': PRICING.vip.addons.vsopBottle,
        'vip-addon-10': PRICING.vip.addons.professionalPhoto,
        'vip-addon-11': PRICING.vip.addons.vodkaBottle,
        'vip-addon-12': PRICING.vip.addons.decorationsBasic,
        'vip-addon-13': PRICING.vip.addons.decorationsPremium,
        'vip-addon-14': PRICING.vip.addons.xoBottle,
        'vip-addon-15': PRICING.vip.addons.domPerignonPackage
    };
    
    for (let addonId in addonPrices) {
        const checkbox = document.getElementById(addonId);
        if (checkbox && checkbox.checked) {
            addonsCost += addonPrices[addonId];
        }
    }
    
    const total = baseCost + addonsCost;
    
    // Update display
    const baseCostEl = document.getElementById('vip-base-cost');
    const addonsEl = document.getElementById('vip-addons-cost');
    const totalEl = document.getElementById('vip-total-cost');
    
    if (baseCostEl) baseCostEl.textContent = `$${baseCost.toFixed(0)}`;
    if (addonsEl) addonsEl.textContent = `$${addonsCost}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(0)}`;
}

// Toggle VIP cocktail menus
function toggleVIPCocktailMenu() {
    const checkbox = document.getElementById('vip-addon-3');
    const menu = document.getElementById('vip-cocktail-menu');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function toggleVIPCocktailMenu12() {
    const checkbox = document.getElementById('vip-addon-8');
    const menu = document.getElementById('vip-cocktail-menu-12');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// VIP Terms Summary
function updateVIPTermsSummary() {
    const bookingType = bookingData.vip.bookingType;
    
    let experienceText = '';
    let dateText = '';
    let detailsText = '';
    let addons = [];
    let total = 0;
    
    if (bookingType === 'minspend') {
        experienceText = 'VIP Room - Minimum Spend';
        const dateObj = new Date(bookingData.vip.minSpend.date + 'T' + bookingData.vip.minSpend.time);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) +
                  ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        
        const roomInfo = PRICING.vip.rooms[bookingData.vip.minSpend.room];
        detailsText = `${bookingData.vip.minSpend.pax} guests`;
        addons = bookingData.vip.minSpend.addons.map(a => `${a.name} (+$${a.price})`);
        
        // Calculate total
        const dayOfWeek = new Date(bookingData.vip.minSpend.date + 'T00:00:00').getDay();
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        const basePrice = isWeekend ? PRICING.vip.minSpend.weekend : PRICING.vip.minSpend.weekday;
        total = basePrice * (1 + PRICING.vip.minSpend.surcharge);
        bookingData.vip.minSpend.addons.forEach(addon => { total += addon.price; });
        
    } else {
        experienceText = 'VIP Room - Premium Package';
        const dateObj = new Date(bookingData.vip.package.date + 'T' + bookingData.vip.package.time);
        dateText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) +
                  ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        
        detailsText = `${bookingData.vip.package.pax} guests`;
        addons = bookingData.vip.package.addons.map(a => `${a.name} (+$${a.price})`);
        
        // Calculate total
        const dayOfWeek = new Date(bookingData.vip.package.date + 'T00:00:00').getDay();
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        total = isWeekend ? PRICING.vip.package.weekend : PRICING.vip.package.weekday;
        bookingData.vip.package.addons.forEach(addon => { total += addon.price; });
    }
    
    document.getElementById('vip-summary-experience').textContent = experienceText;
    document.getElementById('vip-summary-date').textContent = dateText;
    document.getElementById('vip-summary-details').textContent = detailsText;
    
    if (addons.length > 0) {
        document.getElementById('vip-summary-addons-row').style.display = 'flex';
        document.getElementById('vip-summary-addons').textContent = addons.join(', ');
    } else {
        document.getElementById('vip-summary-addons-row').style.display = 'none';
    }
    
    document.getElementById('vip-summary-total').textContent = `$${total.toFixed(0)}`;
}

// Proceed to VIP Payment
function proceedToVIPPayment() {
    if (!document.getElementById('vip-terms-accept').checked) {
        alert('⚠️ Please accept terms and conditions');
        return;
    }
    
    pageHistory.push('page-vip-terms');
    showPage('page-vip-payment');
    updateVIPPaymentSummary();
}

// Global variable for VIP total price
let vipTotalPrice = 0;

function updateVIPPaymentSummary() {
    const bookingType = bookingData.vip.bookingType;
    
    if (bookingType === 'minspend') {
        const dayOfWeek = new Date(bookingData.vip.minSpend.date + 'T00:00:00').getDay();
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        const basePrice = isWeekend ? PRICING.vip.minSpend.weekend : PRICING.vip.minSpend.weekday;
        vipTotalPrice = basePrice * (1 + PRICING.vip.minSpend.surcharge);
        bookingData.vip.minSpend.addons.forEach(addon => { vipTotalPrice += addon.price; });
    } else {
        const dayOfWeek = new Date(bookingData.vip.package.date + 'T00:00:00').getDay();
        const isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        vipTotalPrice = isWeekend ? PRICING.vip.package.weekend : PRICING.vip.package.weekday;
        bookingData.vip.package.addons.forEach(addon => { vipTotalPrice += addon.price; });
    }
    
    // Setup payment slider
    const slider = document.getElementById('vip-payment-slider');
    const sliderAmount = document.getElementById('vip-slider-amount');
    
    const breakdownTotal = document.getElementById('vip-breakdown-total');
    const breakdownDeposit = document.getElementById('vip-breakdown-deposit');
    const breakdownRemaining = document.getElementById('vip-breakdown-remaining');
    
    const minDeposit = vipTotalPrice * 0.5;
    
    if (breakdownTotal) breakdownTotal.textContent = `$${vipTotalPrice.toFixed(2)}`;
    if (breakdownDeposit) breakdownDeposit.textContent = `$${minDeposit.toFixed(2)}`;
    if (breakdownRemaining) breakdownRemaining.textContent = `$${(vipTotalPrice - minDeposit).toFixed(2)}`;
    
    slider.value = 50;
    sliderAmount.textContent = minDeposit.toFixed(2);
    
    slider.oninput = function() {
        const percentage = this.value;
        const amount = (vipTotalPrice * percentage / 100);
        const remaining = vipTotalPrice - amount;
        
        sliderAmount.textContent = amount.toFixed(2);
        
        if (breakdownDeposit) breakdownDeposit.textContent = `$${amount.toFixed(2)}`;
        if (breakdownRemaining) breakdownRemaining.textContent = `$${remaining.toFixed(2)}`;
    };
}

function processVIPPayment(method) {
    const buttons = ['vip-apple-pay-btn', 'vip-google-pay-btn', 'vip-card-pay-btn'];
    buttons.forEach(id => document.getElementById(id).disabled = true);
    
    const slider = document.getElementById('vip-payment-slider');
    const percentage = slider ? slider.value : 50;
    const depositAmount = (vipTotalPrice * percentage / 100);
    const remainingBalance = vipTotalPrice - depositAmount;
    
    bookingData.payment = {
        total: vipTotalPrice,
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
        updateVIPConfirmation();
        
        buttons.forEach(id => document.getElementById(id).disabled = false);
    }, 800);
}

function updateVIPConfirmation() {
    const bookingType = bookingData.vip.bookingType;
    
    document.getElementById('booking-ref').textContent = 'VIP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    let experienceText = '';
    let datetimeText = '';
    let detailsText = '';
    
    if (bookingType === 'minspend') {
        experienceText = 'VIP Room - Minimum Spend';
        const dateObj = new Date(bookingData.vip.minSpend.date + 'T' + bookingData.vip.minSpend.time);
        datetimeText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) +
                      ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        const roomInfo = PRICING.vip.rooms[bookingData.vip.minSpend.room];
        detailsText = `${bookingData.vip.minSpend.pax} guests`;
    } else {
        experienceText = 'VIP Room - Premium Package';
        const dateObj = new Date(bookingData.vip.package.date + 'T' + bookingData.vip.package.time);
        datetimeText = dateObj.toLocaleDateString('en-AU', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) +
                      ' at ' + dateObj.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'});
        detailsText = `${bookingData.vip.package.pax} guests`;
    }
    
    document.getElementById('confirm-experience').textContent = experienceText;
    document.getElementById('confirm-datetime').textContent = datetimeText;
    document.getElementById('confirm-details').textContent = detailsText;
    
    // Hide smoking row for VIP
    document.getElementById('smoking-summary-row').style.display = 'none';
    
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
   
    document.getElementById('confirm-experience').textContent = 'Venue Tour';
   
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

// ========================================
// GENERAL UTILITY FUNCTIONS
// ========================================

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
    const roomSizeRadio = document.querySelector('input[name="kn-room-size"]');
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

function toggleCreditInfo(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('creditInfoModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}
function toggleRooftopInfo(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('rooftopInfoModal');
  modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Toggle cocktail menu for rooftop "12 x Cocktail Package"
function toggleRooftopCocktailPackageMenu() {
    const checkbox = document.getElementById('rooftop-addon-9');
    const menu = document.getElementById('rooftop-cocktail-package-menu');
    if (checkbox && menu) {
        menu.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function resetBooking(){
    
    bookingData = {
        experience: '',
        vipTour: {},
        events: {},
        payment: null,
        rooftop: {
            date: '', pax: '', session: '', name: '', phone: '', email: '', smoking:"",
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
        specialRequests: '',
        addons:[]
    },
        vip: {
            bookingType: '', // 'minspend' or 'package'
        // Minimum spend booking
        minSpend: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            room: '',
            pax: '',
            addons: []
        },
        // Package booking
        package: {
            name: '',
            phone: '',
            email: '',
            date: '',
            time: '',
            pax: '',
            addons: []
        }
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

// Toggle for rooftop more add-ons
function toggleRooftopMoreAddons() {
    const moreAddons = document.getElementById('rooftop-more-addons');
    const btnText = document.getElementById('rooftop-more-addons-text');
    if (moreAddons.style.display === 'none' || moreAddons.style.display === '') {
        moreAddons.style.display = 'block';
        btnText.textContent = 'View Less Add-ons ▲';
    } else {
        moreAddons.style.display = 'none';
        btnText.textContent = 'View More Add-ons ▼';
    }
}

// Toggle for VIP more add-ons
function toggleVIPMoreAddons() {
    const moreAddons = document.getElementById('vip-more-addons');
    const btnText = document.getElementById('vip-more-addons-text');
    if (moreAddons.style.display === 'none' || moreAddons.style.display === '') {
        moreAddons.style.display = 'block';
        btnText.textContent = 'View Less Add-ons ▲';
    } else {
        moreAddons.style.display = 'none';
        btnText.textContent = 'View More Add-ons ▼';
    }
}