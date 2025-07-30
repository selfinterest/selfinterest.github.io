class TerminalEffect {
    constructor() {
        this.elements = document.querySelectorAll('[data-terminal]');
        this.init();
    }
    init() {
        this.addSmoothScrolling();
        this.addTerminalAnimations();
        this.addInteractiveElements();
    }
    addSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }
    addTerminalAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }
    addInteractiveElements() {
        // Add cursor blink to status
        this.createCursorBlink();
        // Add hover effects to project cards
        document.querySelectorAll('.card-crt').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addGlowEffect(card);
            });
            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });
        });
        // Make buttons more interactive
        document.querySelectorAll('.btn-crt').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.playTerminalSound();
            });
        });
        // Add hamburger menu functionality
        this.initHamburgerMenu();
    }
    createCursorBlink() {
        const cursor = document.querySelector('.animate-cursor-blink');
        if (cursor) {
            cursor.textContent = 'online_';
        }
    }
    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.4)';
        element.style.transform = 'translateY(-2px)';
    }
    removeGlowEffect(element) {
        element.style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.2)';
        element.style.transform = 'translateY(0)';
    }
    playTerminalSound() {
        // Create a subtle audio feedback (optional)
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    initHamburgerMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileNav = document.getElementById('mobile-nav');
        if (hamburgerBtn && mobileNav) {
            hamburgerBtn.addEventListener('click', () => {
                hamburgerBtn.classList.toggle('active');
                mobileNav.classList.toggle('active');
            });
            // Close menu when clicking on nav links
            const navLinks = mobileNav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    hamburgerBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                });
            });
            // Close menu when clicking outside
            document.addEventListener('click', (event) => {
                const target = event.target;
                if (!hamburgerBtn.contains(target) && !mobileNav.contains(target)) {
                    hamburgerBtn.classList.remove('active');
                    mobileNav.classList.remove('active');
                }
            });
        }
    }
}
// Terminal typing effect for headers
class TerminalTyper {
    constructor(element, speed = 100) {
        this.index = 0;
        this.speed = 100;
        this.element = element;
        this.text = element.textContent || '';
        this.speed = speed;
        this.element.textContent = '';
        this.type();
    }
    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
        else {
            this.element.classList.add('glow');
        }
    }
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalEffect();
    // Add typing effect to main heading
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        setTimeout(() => {
            new TerminalTyper(mainHeading, 80);
        }, 500);
    }
    // Add subtle CRT flicker effect
    setInterval(() => {
        document.body.style.opacity = Math.random() > 0.99 ? '0.98' : '1';
    }, 100);
});
export {};
