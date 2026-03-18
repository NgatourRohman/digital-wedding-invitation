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
});