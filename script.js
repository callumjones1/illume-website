// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const overlay = document.getElementById('navOverlay');
        overlay.classList.remove('open');
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navOverlay = document.getElementById('navOverlay');
const navClose = document.getElementById('navClose');

hamburger.addEventListener('click', () => navOverlay.classList.add('open'));
navClose.addEventListener('click', () => navOverlay.classList.remove('open'));

navOverlay.addEventListener('click', (e) => {
    if (e.target === navOverlay) navOverlay.classList.remove('open');
});

// Seamless video loop crossfade
const v1 = document.getElementById('heroV1');
const v2 = document.getElementById('heroV2');
const FADE_BEFORE_END = 1.4;
const FADE_MS = 900;

let active = v1, standby = v2, fading = false;

function crossfade() {
    if (fading) return;
    fading = true;
    standby.currentTime = 0;
    standby.play();

    const startTime = performance.now();
    function step(now) {
        const t = Math.min((now - startTime) / FADE_MS, 1);
        active.style.opacity = 1 - t;
        standby.style.opacity = t;
        if (t < 1) {
            requestAnimationFrame(step);
        } else {
            active.pause();
            active.style.opacity = 0;
            [active, standby] = [standby, active];
            fading = false;
        }
    }
    requestAnimationFrame(step);
}

function checkLoop() {
    if (!fading && this === active && this.duration &&
        this.currentTime >= this.duration - FADE_BEFORE_END) {
        crossfade();
    }
}

v1.addEventListener('timeupdate', checkLoop);
v2.addEventListener('timeupdate', checkLoop);


// Console message for developers
console.log('%c illume', 'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #6B6BFF 0%, #5555FF 50%, #4040DD 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cAI-Powered LinkedIn Automation for Academic Journals', 'font-size: 14px; color: #b0b0b0;');
