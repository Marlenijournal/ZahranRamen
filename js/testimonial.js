/**
 * Zehran Ramen — Testimonial Module
 * Handles: carousel slider, auto-play, dots, navigation arrows
 */
(function () {
    'use strict';

    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testi-dots');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');

    if (!track) return;

    /* ---- Testimonial Data ---- */
    const testimonials = [
        {
            name: 'Rina Wijaya',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            rating: 5,
            text: 'Ramen tonkotsu-nya luar biasa! Kuahnya rich banget dan chashu-nya lembut meleleh di mulut. Suasana restorannya juga cozy dan Instagrammable. Wajib coba!',
            date: '2 minggu lalu',
            via: 'Google'
        },
        {
            name: 'Budi Santoso',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
            rating: 5,
            text: 'Sudah langganan sejak awal buka. Menu grill-nya juara, terutama wagyu slice-nya yang meleleh. Pelayanan ramah dan cepat. Highly recommended!',
            date: '1 bulan lalu',
            via: 'Google'
        },
        {
            name: 'Siti Nurhaliza',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
            rating: 5,
            text: 'Tempat favorit keluarga tiap weekend. Anak-anak suka kids ramen & kids bento-nya. Porsinya pas, harganya worth it. Tempatnya bersih dan nyaman.',
            date: '3 minggu lalu',
            via: 'Google'
        },
        {
            name: 'Ahmad Rizky',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
            rating: 4,
            text: 'Spicy Tantan Men-nya nagih banget! Pedesnya mantap dengan kuah wijen yang creamy. Snack gyoza-nya juga enak dan crispy. Akan balik lagi!',
            date: '1 minggu lalu',
            via: 'Google'
        },
        {
            name: 'Dewi Lestari',
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
            rating: 5,
            text: 'Best ramen place in town! Matcha latte-nya juga enak banget. Interior-nya aesthetic, perfect for dinner date. Service-nya top notch.',
            date: '2 bulan lalu',
            via: 'Google'
        },
        {
            name: 'Faisal Rahman',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
            rating: 5,
            text: 'Salmon teppanyaki-nya fresh banget! Miso ramen juga enak, kuahnya gurih pas. Tempatnya strategis dan parkir luas. Recommended banget!',
            date: '6 hari lalu',
            via: 'Google'
        },
        {
            name: 'Maya Putri',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80',
            rating: 5,
            text: 'Truffle ramen-nya premium banget! Aromanya harum dan rasanya mewah. Harga sebanding dengan kualitas. Pasti balik lagi minggu depan!',
            date: '4 hari lalu',
            via: 'Google'
        },
        {
            name: 'Hendro Wicaksono',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
            rating: 4,
            text: 'Mixed grill platter-nya juara buat makan rame-rame. Dagingnya tender dan well-seasoned. Suasananya enak buat kumpul teman.',
            date: '3 hari lalu',
            via: 'Google'
        },
        {
            name: 'Anisa Rahmawati',
            avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
            rating: 5,
            text: 'Veggie ramen-nya enak banget, cocok buat yang lagi diet. Tofu agedashi juga recommended. Tempatnya bersih dan pelayanan cepat.',
            date: '5 hari lalu',
            via: 'Google'
        },
    ];

    /* ---- Determine cards per view ---- */
    function getCardsPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    let cardsPerView = getCardsPerView();
    let currentIndex = 0;
    let autoPlayInterval;

    /* ---- Render Cards ---- */
    function renderCards() {
        track.innerHTML = '';
        testimonials.forEach(testi => {
            const stars = Array.from({ length: 5 }, (_, i) =>
                i < testi.rating
                    ? '<i class="fas fa-star"></i>'
                    : '<i class="far fa-star"></i>'
            ).join('');

            const card = document.createElement('div');
            card.className = 'testi-card';
            card.innerHTML = `
                <div class="stars">${stars}</div>
                <p class="review-text">"${testi.text}"</p>
                <div class="reviewer">
                    <img src="${testi.avatar}" alt="${testi.name}" loading="lazy">
                    <div>
                        <p class="reviewer-name">${testi.name}</p>
                        <div class="reviewer-meta">
                            <span>${testi.date}</span>
                            <span>•</span>
                            <span><i class="fab fa-google text-xs"></i> ${testi.via}</span>
                        </div>
                    </div>
                </div>
            `;
            track.appendChild(card);
        });
    }

    /* ---- Update slider position ---- */
    function updateSlider() {
        const totalSlides = Math.ceil(testimonials.length / cardsPerView);
        if (currentIndex >= totalSlides) currentIndex = 0;
        if (currentIndex < 0) currentIndex = totalSlides - 1;

        const percentage = -(currentIndex * 100);
        track.style.transform = `translateX(${percentage / (testimonials.length / cardsPerView)}%)`;

        // Update dots
        const dots = dotsContainer.querySelectorAll('.testi-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    /* ---- Render Dots ---- */
    function renderDots() {
        dotsContainer.innerHTML = '';
        const totalSlides = Math.ceil(testimonials.length / cardsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = `testi-dot ${i === 0 ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    /* ---- Auto Play ---- */
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentIndex++;
            updateSlider();
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    /* ---- Navigation ---- */
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex--;
            updateSlider();
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex++;
            updateSlider();
            resetAutoPlay();
        });
    }

    /* ---- Responsive ---- */
    window.addEventListener('resize', () => {
        const newPerView = getCardsPerView();
        if (newPerView !== cardsPerView) {
            cardsPerView = newPerView;
            currentIndex = 0;
            renderDots();
            updateSlider();
        }
    });

    /* ---- Scroll Reveal ---- */
    const testiRevealElements = document.querySelectorAll('.testi-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    testiRevealElements.forEach(el => observer.observe(el));

    /* ---- Init ---- */
    renderCards();
    renderDots();
    updateSlider();
    startAutoPlay();
})();
