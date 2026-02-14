/**
 * Zehran Ramen — Menu Module
 * Handles: category filtering, card rendering, grid layout
 */
(function () {
    'use strict';

    const grid = document.getElementById('menu-grid');
    const tabs = document.querySelectorAll('.menu-tab');

    if (!grid) return;

    /* ---- Menu Data (10 items × 5 categories) ---- */
    const menuData = {
        ramen: [
            { name: 'Tonkotsu Ramen', desc: 'Kuah kaldu babi rich & creamy, chashu premium, telur onsen, dan nori.', price: 'Rp 55.000', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80' },
            { name: 'Shoyu Ramen', desc: 'Kuah kecap Jepang bening, ayam, bamboo shoot, dan daun bawang.', price: 'Rp 48.000', img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=500&q=80' },
            { name: 'Miso Ramen', desc: 'Pasta miso Hokkaido, jagung manis, butter, dan daging cincang.', price: 'Rp 52.000', img: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=500&q=80' },
            { name: 'Spicy Tantan Men', desc: 'Kuah wijen pedas, daging babi giling, bok choy, dan chili oil.', price: 'Rp 58.000', img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&q=80' },
            { name: 'Curry Ramen', desc: 'Kuah kari Jepang kental, katsu ayam, wortel, dan kentang.', price: 'Rp 56.000', img: 'https://images.unsplash.com/photo-1637024696628-02cb19cc1829?w=500&q=80' },
            { name: 'Seafood Ramen', desc: 'Udang, cumi, kerang, dan kaldu seafood segar.', price: 'Rp 65.000', img: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&q=80' },
            { name: 'Black Garlic Ramen', desc: 'Tonkotsu dengan minyak bawang hitam aromatik, telur, dan chashu.', price: 'Rp 60.000', img: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=500&q=80' },
            { name: 'Truffle Ramen', desc: 'Kuah tonkotsu premium dengan truffle oil dan jamur shimeji.', price: 'Rp 78.000', img: 'https://images.unsplash.com/photo-1632709810780-b5a4343cebec?w=500&q=80' },
            { name: 'Veggie Ramen', desc: 'Kuah miso sayuran, tahu, jamur enoki, corn, dan wakame.', price: 'Rp 45.000', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80' },
            { name: 'Kids Ramen', desc: 'Porsi kecil dengan kuah mild, naruto, corn, dan sosis bentuk gurita.', price: 'Rp 35.000', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80' },
        ],
        bento: [
            { name: 'Chicken Katsu Bento', desc: 'Ayam katsu crispy, nasi, salad, dan miso soup.', price: 'Rp 52.000', img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=500&q=80' },
            { name: 'Salmon Teriyaki Bento', desc: 'Salmon panggang saus teriyaki, nasi, dan yasai itame.', price: 'Rp 68.000', img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&q=80' },
            { name: 'Beef Yakiniku Bento', desc: 'Irisan daging sapi yakiniku, nasi, dan edamame.', price: 'Rp 65.000', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80' },
            { name: 'Ebi Fry Bento', desc: 'Udang goreng tepung crispy, nasi, coleslaw, dan tartar sauce.', price: 'Rp 58.000', img: 'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=500&q=80' },
            { name: 'Tori Nanban Bento', desc: 'Ayam nanban dengan saus tartar Jepang, nasi, dan tsukemono.', price: 'Rp 55.000', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80' },
            { name: 'Gyudon Bento', desc: 'Daging sapi tipis rebus manis di atas nasi, telur onsen.', price: 'Rp 58.000', img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80' },
            { name: 'Katsudon Bento', desc: 'Tonkatsu dengan telur dan bawang di atas nasi.', price: 'Rp 55.000', img: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500&q=80' },
            { name: 'Unagi Bento', desc: 'Belut panggang dengan saus kabayaki, nasi, dan sup.', price: 'Rp 85.000', img: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500&q=80' },
            { name: 'Mixed Bento', desc: 'Kombinasi katsu, tempura, sashimi, nasi, dan miso soup.', price: 'Rp 72.000', img: 'https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=500&q=80' },
            { name: 'Kids Bento', desc: 'Porsi kecil chicken katsu, nasi cetakan, dan buah.', price: 'Rp 38.000', img: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=500&q=80' },
        ],
        snack: [
            { name: 'Gyoza (6 pcs)', desc: 'Pangsit goreng isi daging dan sayuran, cocol ponzu.', price: 'Rp 32.000', img: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?w=500&q=80' },
            { name: 'Takoyaki (8 pcs)', desc: 'Bola gurita Osaka dengan katsuobushi dan mayo Jepang.', price: 'Rp 30.000', img: './img/takoyaki.png' },
            { name: 'Chicken Karaage', desc: 'Ayam goreng Jepang crispy, disajikan dengan lemon mayo.', price: 'Rp 35.000', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500&q=80' },
            { name: 'Edamame', desc: 'Kacang kedelai rebus dengan taburan garam laut.', price: 'Rp 22.000', img: 'https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?w=500&q=80' },
            { name: 'Ebi Tempura', desc: 'Udang dan sayuran goreng tepung crispy, cocol tentsuyu.', price: 'Rp 42.000', img: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=500&q=80' },
            { name: 'Harumaki (4 pcs)', desc: 'Spring roll Jepang isi sayuran, disajikan dengan sweet chili.', price: 'Rp 28.000', img: './img/harumanaki.png' },
            { name: 'Ebi Katsu', desc: 'Udang balut tepung panko goreng, tartar sauce.', price: 'Rp 38.000', img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500&q=80' },
            { name: 'Japanese Corn Dog', desc: 'Sosis wrapped mochi, goreng crispy, honey mustard.', price: 'Rp 25.000', img: './img/corndog.png' },
            { name: 'Onion Ring', desc: 'Cincin bawang goreng crispy dengan spicy mayo.', price: 'Rp 25.000', img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80' },
            { name: 'Tofu Agedashi', desc: 'Tahu sutra goreng ringan, kuah dashi, katsuobushi, dan daun bawang.', price: 'Rp 28.000', img: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500&q=80' },
        ],
        minuman: [
            { name: 'Ocha (Hot/Cold)', desc: 'Teh hijau Jepang autentik, segar dan ringan.', price: 'Rp 15.000', img: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=500&q=80' },
            { name: 'Matcha Latte', desc: 'Matcha Uji premium dengan susu fresh, creamy.', price: 'Rp 32.000', img: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=500&q=80' },
            { name: 'Yuzu Soda', desc: 'Soda segar dengan buah yuzu Jepang, menyegarkan.', price: 'Rp 28.000', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80' },
            { name: 'Calpico', desc: 'Minuman yogurt Jepang favorit, manis segar.', price: 'Rp 22.000', img: 'https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=500&q=80' },
            { name: 'Ramune', desc: 'Soda marble Jepang klasik, rasa original.', price: 'Rp 25.000', img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=500&q=80' },
            { name: 'Lemon Tea', desc: 'Teh lemon segar ala Jepang, manis pas.', price: 'Rp 20.000', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80' },
            { name: 'Mango Smoothie', desc: 'Smoothie mangga segar blend dengan yogurt.', price: 'Rp 30.000', img: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=500&q=80' },
            { name: 'Milk Tea', desc: 'Teh susu brown sugar dengan boba kenyal.', price: 'Rp 28.000', img: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=500&q=80' },
            { name: 'Americano', desc: 'Kopi hitam strong dari biji arabica pilihan.', price: 'Rp 25.000', img: 'https://images.unsplash.com/photo-1521302080334-4bebac2763a6?w=500&q=80' },
            { name: 'Lychee Soda', desc: 'Soda leci segar dengan potongan nata de coco.', price: 'Rp 25.000', img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=500&q=80' },
        ],
        grill: [
            { name: 'Beef Yakiniku', desc: 'Irisan daging sapi US Choice, marinade yakiniku sauce.', price: 'Rp 75.000', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500&q=80' },
            { name: 'Chicken Yakitori (5 pcs)', desc: 'Sate ayam Jepang dengan saus tare manis gurih.', price: 'Rp 38.000', img: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500&q=80' },
            { name: 'Salmon Teppanyaki', desc: 'Salmon fillet panggang teppan dengan butter lemon sauce.', price: 'Rp 82.000', img: 'https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=500&q=80' },
            { name: 'Wagyu Slice', desc: 'Daging wagyu A5 tipis, panggang dengan garam dan wasabi.', price: 'Rp 135.000', img: 'https://images.unsplash.com/photo-1558030006-450675393462?w=500&q=80' },
            { name: 'Lamb Chop', desc: 'Lamb chop panggang rosemary, mint sauce, dan sayuran.', price: 'Rp 95.000', img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=500&q=80' },
            { name: 'Pork Belly Grill', desc: 'Samgyeopsal tebal, panggang dengan ssamjang dan kimchi.', price: 'Rp 65.000', img: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80' },
            { name: 'Ebi Grill', desc: 'Udang tiger panggang mentai mayo, tabur aonori.', price: 'Rp 55.000', img: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=500&q=80' },
            { name: 'Squid Grill', desc: 'Cumi bakar utuh dengan saus mentai dan lemon.', price: 'Rp 48.000', img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500&q=80' },
            { name: 'Saba Shioyaki', desc: 'Ikan saba panggang garam, disajikan dengan daikon oroshi.', price: 'Rp 52.000', img: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=500&q=80' },
            { name: 'Mixed Grill Platter', desc: 'Kombinasi beef, chicken, seafood panggang untuk 2-3 orang.', price: 'Rp 158.000', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&q=80' },
        ],
    };

    let activeCategory = 'ramen';

    /* ---- Render Menu Cards ---- */
    function renderMenu(category) {
        const items = menuData[category];
        if (!items) return;

        grid.innerHTML = '';

        items.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'menu-card';
            card.innerHTML = `
                <div class="card-image">
                    <img src="${item.img}" alt="${item.name} - Menu Zehran Ramen" loading="lazy">
                </div>
                <div class="card-body">
                    <h3>${item.name}</h3>
                    <p>${item.desc}</p>
                    <span class="card-price">
                        <i class="fas fa-tag text-xs"></i>
                        ${item.price}
                    </span>
                </div>
            `;

            grid.appendChild(card);

            // Staggered animation
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 80);
        });
    }

    /* ---- Tab Click ---- */
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            if (category === activeCategory) return;

            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            activeCategory = category;
            renderMenu(category);
        });
    });

    /* ---- Scroll Reveal ---- */
    const menuRevealElements = document.querySelectorAll('.menu-reveal');
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

    menuRevealElements.forEach(el => observer.observe(el));

    /* ---- Initial Render ---- */
    renderMenu('ramen');
})();
