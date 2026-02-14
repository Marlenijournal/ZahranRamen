/**
 * Zehran Ramen — Footer Module
 * Handles: Back to top button visibility
 */
(function () {
    'use strict';

    const backToTop = document.getElementById('back-to-top');

    if (!backToTop) return;

    /* ---- Back to Top visibility ---- */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }, { passive: true });

    /* ---- Scroll to top ---- */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---- Footer links year ---- */
    const yearEl = document.querySelector('footer p');
    if (yearEl && yearEl.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        yearEl.textContent = yearEl.textContent.replace('2026', currentYear);
    }
})();
