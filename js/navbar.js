/**
 * Zehran Ramen — Navbar Module
 * Handles: scroll background, mobile menu, theme toggle, active link
 */
(function () {
    'use strict';

    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const html = document.documentElement;

    /* ---- Theme Toggle ---- */
    function initTheme() {
        const saved = localStorage.getItem('zehran-theme');
        if (saved === 'light') {
            html.classList.remove('dark');
            updateThemeIcon(false);
        } else {
            html.classList.add('dark');
            updateThemeIcon(true);
        }
    }

    function toggleTheme() {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('zehran-theme', isDark ? 'dark' : 'light');
        updateThemeIcon(isDark);
    }

    function updateThemeIcon(isDark) {
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun text-sm' : 'fas fa-moon text-sm';
        }
        const mobileIcon = themeToggleMobile?.querySelector('i');
        if (mobileIcon) {
            mobileIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        const mobileText = themeToggleMobile?.querySelector('span');
        if (mobileText) {
            mobileText.textContent = isDark ? 'Mode Terang' : 'Mode Gelap';
        }
    }

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    initTheme();

    /* ---- Scroll Background ---- */
    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    /* ---- Mobile Menu ---- */
    function toggleMobile() {
        mobileToggle.classList.toggle('active');
        const isOpen = mobileMenu.style.maxHeight && mobileMenu.style.maxHeight !== '0px';
        mobileMenu.style.maxHeight = isOpen ? '0px' : mobileMenu.scrollHeight + 'px';
    }

    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobile);

    // Close on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            mobileMenu.style.maxHeight = '0px';
        });
    });

    /* ---- Active Link Highlight ---- */
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id], footer[id]');
        let currentSection = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
})();
