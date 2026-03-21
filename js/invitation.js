const BACKEND_URL = 'https://script.google.com/macros/s/AKfycbw2NNlimnPO-FST9RQ0wfC0sjvD-SPOK9uzaE7w8bQYVYqUgNyJeWKYvRrS__YQ__zA/exec';
const BACKEND_PASSWORD = 'weddingInvitation123';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('Failed to load data');
        const data = await response.json();

        populateNav(data.nav);
        populateHero(data.hero);
        populateVerses(data.verses);
        populateCouple(data.couple);
        populateTimeline(data.timeline);
        populateEvents(data.events);
        populateLocation(data.location);
        populateRsvp(data.rsvp);
        populateGift(data.gift, data.couple)
        populateGuestbook(data.guestbook);
        populateClosing(data.closing);
        populateFooter(data.footer);
        populateCredit(data.credit);
        populateFooterVerse(data.footerVerse);
        populateMusic(data.music);

        setBackground('hero-bg', data.hero.background);
        setBackground('verses-section', data.versesBackground);
        setBackground('couple-section', data.coupleBackground);
        setBackground('timeline-section', data.timeline.background);
        setBackground('event-details', data.events.background);
        setBackground('location-section', data.location.background);
        setBackground('rsvp', data.rsvp.background);
        setBackground('guestbook-section', data.guestbook.background);
        setBackground('footer-section', data.footer.background);

        initDarkMode();
        initCountdown();
        initGuestbookForm();
        initRsvpForm();
        initPetals();
        initScrollAnimations();
        initNavbarScroll();
        initMobileMenu();
        addHoverEffects();

        setInterval(() => {
            loadGuestbookMessages();
        }, 15000);

    } catch (error) {
        console.error('Error loading data:', error);
    }
});

function setBackground(elementId, imagePath) {
    const element = document.getElementById(elementId);
    if (element && imagePath) {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
}

function showNotification(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full text-white text-sm z-50 transition-all duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function escapeHtml(str) {
    if (!str) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replaceAll(/[&<>"']/g, m => map[m]);
}

function populateNav(nav) {
    document.getElementById('nav-brand').textContent = nav.brand;
    const linksContainer = document.getElementById('nav-links');
    linksContainer.innerHTML = '';
    nav.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.text;
        a.className = link.isButton
            ? 'bg-primary text-white px-6 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-md btn-hover-effect'
            : 'hover:text-primary transition-colors duration-300';
        linksContainer.appendChild(a);
    });
}

function populateHero(hero) {
    const greetingDiv = document.getElementById('hero-greeting');
    const heroImg = document.getElementById('hero-image');
    heroImg.src = hero.image;
    heroImg.classList.add('hero-zoom');
    document.getElementById('hero-subtitle').textContent = hero.subtitle;
    document.getElementById('hero-groom').textContent = hero.groom;
    document.getElementById('hero-bride').textContent = hero.bride;
    document.getElementById('hero-date').textContent = hero.date;
    document.getElementById('hero-location').textContent = hero.location;
    document.getElementById('hero-button-text').textContent = hero.buttonText;
    if (greetingDiv && hero.greeting) {
        const arabicEl = greetingDiv.querySelector('p[dir="rtl"]');
        const transEl = greetingDiv.querySelector('.italic');
        if (arabicEl) arabicEl.textContent = hero.greeting;
        if (transEl && hero.greetingTranslation) transEl.textContent = hero.greetingTranslation;
    }
}

function initCountdown() {
    const weddingDate = new Date("April 7, 2026 09:00:00").getTime();
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("countdown-days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("countdown-hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("countdown-minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("countdown-seconds").innerHTML = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown-section").innerHTML = `
                <div class="text-center py-16">
                    <div class="font-serif text-3xl md:text-5xl text-primary">Bahagia Selamanya</div>
                </div>
            `;
        }
    }, 1000);
}

function populateVerses(verses) {
    const container = document.getElementById('verses-container');
    container.innerHTML = '';
    verses.forEach((verse, index) => {
        const verseDiv = document.createElement('div');
        verseDiv.className = 'flex flex-col items-center text-center max-w-3xl mx-auto px-4 py-12 relative fade-up';
        if (index === 0) {
            verseDiv.id = 'verses';
        }
        verseDiv.innerHTML = `
            <div class="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-3xl -z-10 transform -rotate-1"></div>
            <span class="material-symbols-outlined text-primary/40 text-4xl mb-6">psychiatry</span>
            <h2 class="text-2xl md:text-3xl font-serif font-medium mb-8 leading-relaxed text-slate-800 dark:text-slate-200" dir="rtl">${verse.arabic}</h2>
            <p class="text-lg md:text-xl font-medium mb-4 text-primary">${verse.surah}</p>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base italic">${verse.translation}</p>
        `;
        container.appendChild(verseDiv);

        if (index < verses.length - 1) {
            const divider = document.querySelector('.divider-template').cloneNode(true);
            divider.classList.remove('hidden', 'divider-template');
            container.appendChild(divider);
        }
    });
}

let coupleData = null;

function populateCouple(couple) {
    coupleData = couple;
    const groom = couple.groom;
    const bride = couple.bride;

    document.getElementById('groom-name').textContent = groom.name;
    document.getElementById('groom-parents').innerHTML = `Putra tercinta dari Bapak <span class="font-semibold text-slate-900 dark:text-slate-100">${groom.father}</span> &amp; Ibu <span class="font-semibold text-slate-900 dark:text-slate-100">${groom.mother}</span>`;
    const groomImg = document.getElementById('groom-image');
    groomImg.style.backgroundImage = `url('${groom.image}')`;
    groomImg.classList.add('couple-image');

    document.getElementById('bride-name').textContent = bride.name;
    document.getElementById('bride-parents').innerHTML = `Putri tercinta dari Bapak <span class="font-semibold text-slate-900 dark:text-slate-100">${bride.father}</span> &amp; Ibu <span class="font-semibold text-slate-900 dark:text-slate-100">${bride.mother}</span>`;
    const brideImg = document.getElementById('bride-image');
    brideImg.style.backgroundImage = `url('${bride.image}')`;
    brideImg.classList.add('couple-image');

    const basmalahDiv = document.getElementById('couple-basmalah');
    if (basmalahDiv && couple.basmalah) {
        const arabicEl = basmalahDiv.querySelector('p[dir="rtl"]');
        const msgEl = basmalahDiv.querySelector('.italic');
        if (arabicEl) {
            arabicEl.textContent = couple.basmalah;
        }
        if (msgEl && couple.basmalahMessage) {
            msgEl.textContent = couple.basmalahMessage;
        }
    }
}

function populateTimeline(timeline) {
    document.getElementById('timeline-title').textContent = timeline.title;
    document.getElementById('timeline-subtitle').textContent = timeline.subtitle;

    const container = document.getElementById('timeline-events');
    container.innerHTML = '<div class="absolute left-8 sm:left-1/2 top-0 bottom-0 w-[2px] bg-[#E8DCCB] dark:bg-primary/30 -translate-x-1/2 timeline-line"></div>';

    timeline.events.forEach((event, index) => {
        const isLeft = index % 2 === 0;
        const eventDiv = document.createElement('div');
        eventDiv.className = `relative flex flex-col sm:flex-row items-center sm:justify-between w-full mb-12 sm:mb-20 fade-up`;

        if (isLeft) {
            eventDiv.innerHTML = `
                <div class="hidden sm:block w-5/12"></div>
                <div class="absolute left-8 sm:left-1/2 w-10 h-10 bg-[#F8F5F0] dark:bg-background-dark rounded-full border-4 border-[#E8DCCB] dark:border-primary flex items-center justify-center -translate-x-1/2 z-10 timeline-dot">
                    <span class="material-symbols-outlined text-[#8E7C6D] dark:text-primary text-xl">${event.icon}</span>
                </div>
                <div class="w-full sm:w-5/12 pl-20 sm:pl-0 sm:pr-12 text-left sm:text-right mt-4 sm:mt-0">
                    <div class="bg-white/60 dark:bg-background-dark/60 backdrop-blur-md border border-white/40 dark:border-primary/20 p-6 rounded-xl shadow-[0_4px_30px_rgba(142,124,109,0.1)] dark:shadow-[0_4px_30px_rgba(236,91,19,0.1)] ${event.highlight ? 'border-2 border-primary/30' : ''} event-card">
                        <h3 class="text-[#8E7C6D] dark:text-slate-100 text-xl font-bold mb-1">${event.title}</h3>
                        <p class="text-primary text-sm font-medium mb-3">${event.date}</p>
                        <p class="text-[#8E7C6D]/80 dark:text-slate-300 text-sm leading-relaxed">${event.description}</p>
                    </div>
                </div>
            `;
        } else {
            eventDiv.innerHTML = `
                <div class="w-full sm:w-5/12 pl-20 sm:pl-12 text-left mt-4 sm:mt-0 order-2 sm:order-1">
                    <div class="bg-white/60 dark:bg-background-dark/60 backdrop-blur-md border border-white/40 dark:border-primary/20 p-6 rounded-xl shadow-[0_4px_30px_rgba(142,124,109,0.1)] dark:shadow-[0_4px_30px_rgba(236,91,19,0.1)] ${event.highlight ? 'border-2 border-primary/30' : ''} event-card">
                        <h3 class="text-[#8E7C6D] dark:text-slate-100 text-xl font-bold mb-1">${event.title}</h3>
                        <p class="text-primary text-sm font-medium mb-3">${event.date}</p>
                        <p class="text-[#8E7C6D]/80 dark:text-slate-300 text-sm leading-relaxed">${event.description}</p>
                    </div>
                </div>
                <div class="absolute left-8 sm:left-1/2 w-10 h-10 bg-[#F8F5F0] dark:bg-background-dark rounded-full border-4 border-[#E8DCCB] dark:border-primary flex items-center justify-center -translate-x-1/2 z-10 order-1 sm:order-2 timeline-dot">
                    <span class="material-symbols-outlined text-[#8E7C6D] dark:text-primary text-xl">${event.icon}</span>
                </div>
                <div class="hidden sm:block w-5/12 order-3"></div>
            `;
        }

        container.appendChild(eventDiv);
    });
}

function populateEvents(events) {
    document.getElementById('events-title').textContent = events.title;
    document.getElementById('events-subtitle').textContent = events.subtitle;

    const container = document.getElementById('events-cards');
    container.innerHTML = '';
    events.items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'glass-card rounded-2xl p-8 md:p-10 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in event-card fade-up';
        card.innerHTML = `
            <div>
                <div class="mb-6 flex justify-center">
                    <svg class="h-12 w-12 text-gold-soft" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" />
                    </svg>
                </div>
                <h3 class="font-serif text-3xl text-dark-floral mb-4">${item.type}</h3>
                <p class="text-lg font-semibold mb-1">${item.time}</p>
                <p class="text-gray-600 mb-6">${item.date}</p>
            </div>
            <div class="border-t border-gold-soft/20 pt-6">
                <p class="text-sm italic text-gray-500">${item.location}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function populateLocation(location) {
    document.getElementById('location-title').textContent = location.title;
    document.getElementById('location-venue').textContent = location.venue;
    document.getElementById('location-address').innerHTML = location.address.replace(/\n/g, '<br>');
    document.getElementById('location-map').src = location.embedUrl;
    document.getElementById('location-map-link').href = location.mapUrl;
}

function populateRsvp(rsvp) {
    document.getElementById('rsvp-title').textContent = rsvp.title;
    document.getElementById('rsvp-description').textContent = rsvp.description;
}

async function initRsvpForm() {
    const rsvpForm = document.getElementById('rsvp-form');
    if (!rsvpForm) return;

    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = rsvpForm.querySelector('input[placeholder="Nama Lengkap"]').value.trim();
        const guestsSelect = rsvpForm.querySelector('select');
        const guests = guestsSelect.options[guestsSelect.selectedIndex].text;
        const status = 'Pending';

        if (!name) {
            showNotification('Silakan masukkan nama Anda.', 'error');
            return;
        }

        const submitBtn = rsvpForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sedang mengirim...';
        submitBtn.disabled = true;

        try {
            await fetch(BACKEND_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'rsvp',
                    password: BACKEND_PASSWORD,
                    data: { name, guests, status }
                })
            });
            showNotification('Terima kasih atas konfirmasi kehadiran Anda!', 'success');
            rsvpForm.reset();
        } catch (error) {
            console.error('Terjadi kesalahan saat mengirim RSVP:', error);
            showNotification('Gagal mengirim RSVP. Silakan coba lagi.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function populateGift(gift, couple) {
    if (!gift) return;

    document.getElementById('gift-subtitle').textContent = gift.subtitle || '';
    document.getElementById('gift-title').textContent = gift.title || '';
    document.getElementById('gift-description').textContent = gift.description || '';

    const ewallet = gift.ewallet;
    if (ewallet) {
        document.getElementById('gift-ewallet-icon').textContent = ewallet.icon || 'qr_code_2';
        document.getElementById('gift-ewallet-title').textContent = ewallet.name || '';
        const qrImg = document.getElementById('gift-ewallet-qr');
        if (ewallet.qrCode) {
            qrImg.src = ewallet.qrCode;
            qrImg.style.display = 'block';
        } else {
            qrImg.style.display = 'none';
        }
        document.getElementById('gift-ewallet-provider').textContent = ewallet.provider || '';
        document.getElementById('gift-ewallet-number').textContent = ewallet.accountNumber || '';
        document.getElementById('gift-ewallet-account-name').textContent = ewallet.accountName || '';
    }

    const sendGift = gift.sendGift;
    if (sendGift) {
        document.getElementById('gift-send-icon').textContent = sendGift.icon || 'featured_seasonal_and_gifts';
        document.getElementById('gift-send-title').textContent = sendGift.name || '';
        const address = sendGift.address;
        if (address) {
            document.getElementById('gift-address-name').textContent = address.name || '';
            document.getElementById('gift-address-street').textContent = address.street || '';
            document.getElementById('gift-address-city').textContent = address.city ? (address.city + (address.country ? ', ' + address.country : '')) : '';
        }
        const mapLink = document.getElementById('gift-map-link');
        if (sendGift.mapUrl) {
            mapLink.href = sendGift.mapUrl;
        }
    }

    const groomName = couple?.groom?.name?.split(' ')[0] || 'Hari';
    const brideName = couple?.bride?.name?.split(' ')[0] || 'Diah';
    document.getElementById('gift-couple-names').innerHTML = `${groomName} &amp; ${brideName}`;
}

function copyGiftNumber(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'Telah disalin!';
        btn.classList.add('bg-primary', 'text-white');
        setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('bg-primary', 'text-white');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

async function fetchGuestbookMessages() {
    try {
        const url = `${BACKEND_URL}?action=getGuestbook&password=${encodeURIComponent(BACKEND_PASSWORD)}`;
        const response = await fetch(url);
        const result = await response.json();
        if (result.success) {
            return result.messages;
        } else {
            console.error('Gagal mengambil buku tamu:', result.error);
            return [];
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat memuat buku tamu:', error);
        return [];
    }
}

function formatTime(timestamp) {
    if (!timestamp) return 'Baru saja';
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);
    if (diff < 60) return 'Baru saja';
    if (diff < 3600) return `${Math.floor(diff / 60)} menit yang lalu`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam yang lalu`;
    return date.toLocaleDateString();
}

function renderGuestbookMessages(messages) {
    const container = document.getElementById('guestbook-messages');
    if (!container) return;
    container.innerHTML = '';
    if (!messages.length) {
        container.innerHTML = '<div class="text-center text-gray-400 py-8">Belum ada pesan. Jadilah yang pertama untuk mengirimkan ucapan!</div>';
        return;
    }
    messages.forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'guestbook-message fade-up';
        msgDiv.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h4 class="font-serif font-bold text-[#8D7B68]">${escapeHtml(msg.name)}</h4>
        <span class="text-[10px] text-gray-400 uppercase tracking-tighter">${formatTime(msg.timestamp)}</span>
      </div>
      <p class="text-sm leading-relaxed text-[#5A5A5A]">${escapeHtml(msg.message)}</p>
    `;
        container.appendChild(msgDiv);
    });
    document.querySelectorAll('#guestbook-messages .fade-up').forEach(el => el.classList.add('is-visible'));
}

async function loadGuestbookMessages() {
    const messages = await fetchGuestbookMessages();
    renderGuestbookMessages(messages);
}

function populateGuestbook(guestbook) {
    document.getElementById('guestbook-title').textContent = guestbook.title;
    document.getElementById('guestbook-subtitle').textContent = guestbook.subtitle;
    loadGuestbookMessages();
}

async function initGuestbookForm() {
    const wishForm = document.getElementById('wish-form');
    const messagesList = document.getElementById('guestbook-messages');
    if (wishForm) {
        wishForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const message = document.getElementById('message').value.trim();
            if (name && message) {
                const submitBtn = wishForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span class="loading-spinner"></span> Sedang mengirim...';
                submitBtn.disabled = true;

                const newMessageDiv = document.createElement('div');
                newMessageDiv.className = 'guestbook-message animate-pulse fade-up';
                newMessageDiv.innerHTML = `
          <div class="flex justify-between items-center mb-2">
            <h4 class="font-serif font-bold text-[#8D7B68]">${escapeHtml(name)}</h4>
            <span class="text-[10px] text-gray-400 uppercase tracking-tighter">Baru saja</span>
          </div>
          <p class="text-sm leading-relaxed text-[#5A5A5A]">${escapeHtml(message)}</p>
        `;
                messagesList.prepend(newMessageDiv);
                wishForm.reset();

                try {
                    await fetch(BACKEND_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'guestbook',
                            password: BACKEND_PASSWORD,
                            data: { name, message }
                        })
                    });
                    showNotification('Pesan Anda telah terkirim!', 'success');
                    setTimeout(() => loadGuestbookMessages(), 2000);
                } catch (error) {
                    console.error('Terjadi kesalahan saat mengirim buku tamu:', error);
                    showNotification('Pesan tidak berhasil terkirim. Silakan coba lagi.', 'error');
                    newMessageDiv.remove();
                } finally {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    setTimeout(() => newMessageDiv?.classList.remove('animate-pulse'), 2000);
                }
            }
        });
    }
}

function populateClosing(closing) {
    document.getElementById('closing-quote').textContent = closing.quote;
    document.getElementById('closing-family').textContent = closing.family;
}

function populateFooter(footer) {
    document.getElementById('footer-brand').textContent = footer.brand;
    document.getElementById('footer-text').textContent = footer.text;
    document.getElementById('footer-copyright').textContent = footer.copyright;
}

function populateFooterVerse(verse) {
    const container = document.getElementById('footer-verse');
    if (!container || !verse) return;
    container.innerHTML = `
        <div class="text-center fade-up">
            <h2 class="text-xl md:text-2xl font-serif font-medium mb-4 leading-relaxed text-slate-800 dark:text-slate-200" dir="rtl">${verse.arabic}</h2>
            <p class="text-base md:text-lg font-medium mb-2 text-primary">${verse.surah}</p>
            <p class="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base italic max-w-xl mx-auto">${verse.translation}</p>
        </div>
    `;
}

function populateCredit(credit) {
    if (!credit) return;

    const msgEl = document.getElementById('credit-message');
    if (msgEl && credit.message && credit.coupleCredit) {
        msgEl.innerHTML = `${credit.message} <span class="font-semibold italic">${credit.coupleCredit}</span>`;
    }

    const designerEl = document.getElementById('credit-designer');
    if (designerEl) {
        if (credit.designer && credit.designerUrl) {
            designerEl.innerHTML = `Designed & Developed by <a href="${credit.designerUrl}" target="_blank" rel="noopener noreferrer" class="font-medium hover:text-primary transition-colors">${credit.designer}</a>`;
        } else if (credit.designer) {
            designerEl.innerHTML = `Designed & Developed by ${credit.designer}`;
        }
    }

    const imgContainer = document.getElementById('credit-image-container');
    if (imgContainer && credit.showImage && credit.imageUrl) {
        const imgDiv = imgContainer.querySelector('.bg-cover');
        if (imgDiv) {
            imgDiv.style.backgroundImage = `url('${credit.imageUrl}')`;
            imgContainer.classList.remove('hidden');
        }
    }
}

function populateMusic(music) {
    const player = document.getElementById('music-player');
    const audio = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');

    if (!music || !music.enabled) {
        if (player) player.style.display = 'none';
        return;
    }

    player.style.display = 'flex';

    if (music.url) {
        audio.src = music.url;
    }

    if (music.title) document.getElementById('music-title').innerText = music.title;
    if (music.artist) document.getElementById('music-artist').innerText = music.artist;

    audio.loop = music.loop || true;

    let autoplayAttempted = false;
    function attemptAutoplay() {
        if (!music.autoplay || autoplayAttempted) return;
        autoplayAttempted = true;
        audio.play().then(() => {
            playIcon.classList.add('hidden');
            pauseIcon.classList.remove('hidden');
        }).catch(error => {
            console.log('Autoplay blocked. User interaction required.');
            playBtn.classList.add('animate-pulse');
            setTimeout(() => playBtn.classList.remove('animate-pulse'), 3000);
        });
    }

    if (audio.readyState >= 2) {
        attemptAutoplay();
    } else {
        audio.addEventListener('canplaythrough', attemptAutoplay, { once: true });
    }

    let isPlaying = false;
    playBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
        } else {
            audio.play().then(() => {
                isPlaying = true;
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            }).catch(e => console.log('Playback failed:', e));
        }
    });

    audio.addEventListener('play', () => {
        isPlaying = true;
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    });
    audio.addEventListener('pause', () => {
        isPlaying = false;
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    });

    if (music.autoplay) {
        document.body.addEventListener('click', () => {
            if (audio.paused && !isPlaying) {
                audio.play().catch(() => { });
            }
        }, { once: true });
    }
}

function initDarkMode() {
    const toggleBtn = document.getElementById('darkmode-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            toggleBtn.classList.add('scale-90');
            setTimeout(() => toggleBtn.classList.remove('scale-90'), 200);
        });
    }
}

function initPetals() {
    const container = document.getElementById('flower-container');
    if (!container) return;
    const petalColors = ['#FADADD', '#FFF5F5', '#E5E0D8'];

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'flower-particle';
        const size = Math.random() * 10 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.backgroundColor = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.borderRadius = '50% 0 50% 50%';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = '110vh';
        const duration = Math.random() * 10 + 10 + 's';
        petal.style.animationDuration = duration;
        petal.style.opacity = '0';
        container.appendChild(petal);
        setTimeout(() => petal.remove(), parseFloat(duration) * 1000);
    }
    setInterval(createPetal, 1500);
    for (let i = 0; i < 10; i++) setTimeout(createPetal, i * 300);
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
}

function initNavbarScroll() {
    const navbar = document.querySelector('nav');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled', 'shadow-lg');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-lg');
        }
    });
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.getElementById('mobile-nav-links');

    if (!menuToggle || !menuClose || !mobileMenu || !mobileNavLinks) return;

    const desktopLinks = document.querySelectorAll('#nav-links a');
    mobileNavLinks.innerHTML = '';
    desktopLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = link.className;
        a.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
        mobileNavLinks.appendChild(a);
    });

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    menuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('open');
        }
    });
}

function addHoverEffects() {
    document.querySelectorAll('#nav-links a:not(.bg-primary)').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}