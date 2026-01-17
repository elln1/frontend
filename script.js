document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if(menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    const eventsGrid = document.querySelector('.events-grid');

    async function fetchEvents() {
        if(!eventsGrid) return;

        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            eventsGrid.innerHTML = '';

            data.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <div class="card-image-container">
                        <img src="${event.image}" alt="${event.title}">
                        <div class="price-badge">From $${event.price}</div>
                    </div>
                    <div class="card-content">
                        <h3>${event.title}</h3>
                        <div class="card-meta">
                            <div class="meta-row">
                                <i class="fa-regular fa-calendar"></i>
                                <span>${event.date}</span>
                            </div>
                            <div class="meta-row">
                                <i class="fa-solid fa-location-dot"></i>
                                <span>${event.location}</span>
                            </div>
                        </div>
                        <a href="#" class="btn-card">
                            View Details <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                `;
                eventsGrid.appendChild(card);
            });

        } catch (error) {
            console.error("Error fetching events:", error);
            eventsGrid.innerHTML = '<p style="color:white; text-align:center; width:100%;">Failed to load events. Please try again later.</p>';
        }
    }

    fetchEvents();

    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });

    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if(prevBtn && nextBtn && eventsGrid) {
        nextBtn.addEventListener('click', () => {
            eventsGrid.scrollBy({ left: 340, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            eventsGrid.scrollBy({ left: -340, behavior: 'smooth' });
        });
    }
});
