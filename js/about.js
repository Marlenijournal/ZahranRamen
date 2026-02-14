/**
 * Zehran Ramen — About Module
 * Handles: Intersection Observer scroll reveal animations
 */
(function () {
    'use strict';

    const aboutElements = document.querySelectorAll('.about-reveal');

    if (!aboutElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    aboutElements.forEach(el => observer.observe(el));
})();
