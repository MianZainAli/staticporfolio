document.addEventListener('DOMContentLoaded', () => {
    // Add nav scroll handling
    const nav = document.querySelector('.nav');
    const scrollThreshold = 50;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    
    const container = document.querySelector('.emoji-background');
    const heroSection = document.querySelector('.hero');
    const emojis = [
        '⚡️', '💻', '🚀', '✨', '💡', '🎯', '🌟', '🔥', '⭐️', '🎨',
        '❤️', '💖', '💝', '💕', '💫', '🌈', '🎮', '🎵', '🎧', '🌸',
        '✅', '💪', '🏆', '🎉', '🎸', '🎹', '🎼', '🎪', '🎭', '🦾',
        '🎯', '🎲', '🎳', '🎨', '🎭', '🎪', '🎢', '🎡', '🎠', '🌈',
        '🌟', '✨', '💫', '⭐️', '🌙', '☀️', '🌍', '🎵', '🎶', '🎺'
    ];
    
    if (!container || !heroSection) {
        console.error('Required elements not found!');
        return;
    }

    function createEmoji() {
        const emoji = document.createElement('span');
        emoji.className = 'floating-emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random position from left
        emoji.style.left = Math.random() * 100 + '%';
        
        // Random size variation
        const size = 35 + Math.random() * 15; // Random size between 35px and 50px
        emoji.style.fontSize = `${size}px`;
        
        // Random rotation
        const rotation = Math.random() * 200;
        emoji.style.setProperty('--rotation', `${rotation}deg`);
        
        container.appendChild(emoji);
        
        // Remove emoji after animation or when scrolled past hero section
        setTimeout(() => {
            emoji.remove();
        }, 16000); // Match this with animation duration
    }

    // Only create emojis when hero section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start emoji creation
                const emojiInterval = setInterval(createEmoji, 2000);
                // Store interval ID on the section element
                heroSection.dataset.emojiInterval = emojiInterval;
            } else {
                // Clear interval when section is not visible
                clearInterval(Number(heroSection.dataset.emojiInterval));
                // Clear existing emojis
                container.innerHTML = '';
            }
        });
    }, { threshold: 0.1 });

    observer.observe(heroSection);

    // Initial emojis
    for(let i = 0; i < 6; i++) {
        setTimeout(createEmoji, Math.random() * 2000);
    }

    // Add smooth scroll handling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just '#'
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.scrollY - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form notification logic
    const contactForm = document.querySelector('.contact-form');
    const notification = document.getElementById('notification');
    if (contactForm && notification) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Show notification
            notification.textContent = 'Sorry, this form is not functional yet.';
            notification.style.display = 'block';
            notification.style.opacity = '1';
            // Hide after 4 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 300);
            }, 4000);
        });
    }
});
