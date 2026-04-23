document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                navLinks.classList.remove('mobile-active');
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Counter Animation
    const counters = document.querySelectorAll('.stat');
    let animated = false;

    const startCounters = () => {
        if (animated) return;
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const increment = target / 50;
            
            const updateCount = () => {
                const count = parseInt(counter.innerText) || 0;
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 40);
                } else {
                    counter.innerText = target + '+';
                }
            };
            updateCount();
        });
        animated = true;
    };

    // Trigger counters when achievement section is visible
    const achievementsSection = document.querySelector('#achievements');
    if (achievementsSection) {
        window.addEventListener('scroll', () => {
            const rect = achievementsSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                startCounters();
            }
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.style.background = '#fff';
                lightboxImg.style.width = '80%';
                lightboxImg.style.height = '60%';
                lightboxImg.style.borderRadius = '12px';
                lightboxImg.style.display = 'flex';
                lightboxImg.style.alignItems = 'center';
                lightboxImg.style.justifyContent = 'center';
                lightboxImg.innerHTML = '<p style="color:#333; font-weight:bold">Expanded Image View</p>';
            });
        });

        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Lead Capture Form & WhatsApp Redirect
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;

            if (!name || !phone) {
                alert('Please fill in your name and phone number.');
                return;
            }

            const whatsappMsg = encodeURIComponent(
                `Hi M.V. Singh, I am interested in joining your team.\n\nName: ${name}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${message}`
            );
            
            window.open(`https://wa.me/917905621084?text=${whatsappMsg}`, '_blank');
        });
    }

    // Send email via default mail client with prefilled content
    const emailBtn = document.getElementById('emailBtn');
    if (emailBtn) {
        emailBtn.addEventListener('click', () => {
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;

            if (!name || !phone) {
                alert('Please fill in your name and phone number before sending email.');
                return;
            }

            const subject = encodeURIComponent(`Interest from ${name} - ${interest}`);
            const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nInterest: ${interest}\nMessage: ${message}`);
            const mailto = `mailto:pratibhaacademy1991@gmail.com?subject=${subject}&body=${body}`;

            window.location.href = mailto;
        });
    }

    // Booking Redirect
    const bookBtn = document.getElementById('bookBtn');
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            const date = document.getElementById('bookDate').value;
            const time = document.getElementById('bookTime').value;

            if (!date || !time) {
                alert('Please select date and time.');
                return;
            }

            const bookingMsg = encodeURIComponent(
                `Hi, I want to book a call on ${date} at ${time}`
            );
            
            window.open(`https://wa.me/917905621084?text=${bookingMsg}`, '_blank');
        });
    }
});
