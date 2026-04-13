// This file contains JavaScript code for interactive elements on the website, such as form validation and smooth scrolling.

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const smoothScroll = (target) => {
        document.querySelector(target).scrollIntoView({
            behavior: 'smooth'
        });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark'
                ? '<span class="toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 3.25v1.5M12 19.25v1.5M4.75 12H3.25M20.75 12h-1.5M6.72 6.72l-1.06-1.06M18.34 18.34l-1.06-1.06M6.72 17.28l-1.06 1.06M18.34 5.66l-1.06 1.06M12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Z"/></svg></span><span class="toggle-label">Light</span>'
                : '<span class="toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79a8.19 8.19 0 0 1-8.9 8.9 8.25 8.25 0 0 1 0-16.54 8.19 8.19 0 0 1 8.9 8.9Z"/></svg></span><span class="toggle-label">Dark</span>';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
        });
    }

    // Form validation for contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
            } else {
                alert('Thank you for your message!');
            }
        });
    }
});