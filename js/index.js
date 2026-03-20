document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('openInvitation');

    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        const guestEl = document.createElement('p');
        guestEl.className = 'text-inv-accent mt-4 text-sm';
        guestEl.textContent = `Kepada Yth. ${decodeURIComponent(guestName)}`;
        document.querySelector('section').appendChild(guestEl);
    }

    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            const main = document.querySelector('main');
            main.style.transform = `translate(${x * 10 - 5}px, ${y * 10 - 5}px)`;
        });
    }

    btn.addEventListener('click', () => {
        btn.classList.add('scale-150', 'opacity-0');
        document.querySelector('main').classList.add('scale-110', 'opacity-0');
        setTimeout(() => {
            window.location.href = 'invitation.html' + (guestName ? `?to=${guestName}` : '');
        }, 800);
    });

    initCountdown();
});

function initCountdown() {
    const weddingDay = new Date("April 7, 2026 09:00:00").getTime();
    const countdownInterval2 = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDay - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("cd-hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("cd-minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("cd-seconds").innerHTML = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(countdownInterval2);
            const card = document.querySelector('#cd-days').closest('.glass-card');
            if (card) {
                card.innerHTML =
                    '<div class="font-serif text-2xl md:text-3xl text-wedding-text">Hidup Bahagia Selamanya</div>';
            }
        }
    }, 1000);
}