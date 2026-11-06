// Modern Futuristic Portfolio Core Engine
// Handles: Cyber Cursor, 3D Tilt, Text Scramble, Multi-Typewriter, Scroll Counters, Project Filters, Modals, Theme & Audio

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initAudioToggle();
    initCyberCursor();
    initTypewriter();
    initTextScramble();
    init3DTilt();
    initScrollCounters();
    initProjectFiltersAndModals();
    initContactForm();
    initMobileNav();
    initTelemetryHUD();
});

/* ==========================================================================
   1. THEME ENGINE (Cyberpunk Dark & Sleek Light)
   ========================================================================== */
function initTheme() {
    const root = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        if (themeToggle) {
            themeToggle.innerHTML = theme === 'dark'
                ? '<span class="toggle-icon"><svg viewBox="0 0 24 24"><path d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M6.343 6.343l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"/></svg></span><span class="toggle-label">LIGHT</span>'
                : '<span class="toggle-icon"><svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></span><span class="toggle-label">DARK</span>';
            themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    };

    if (storedTheme) {
        setTheme(storedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'dark'); // Default to Cyberpunk dark
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            if (window.cyberAudio) window.cyberAudio.playClick();
            setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
        });
    }
}

/* ==========================================================================
   2. AUDIO SFX TOGGLE
   ========================================================================== */
function initAudioToggle() {
    const sfxBtn = document.getElementById('sfx-toggle');
    if (!sfxBtn) return;

    const soundOnSvg = `<svg class="sfx-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>`;
    const soundOffSvg = `<svg class="sfx-svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;

    const updateLabel = () => {
        const isEnabled = window.cyberAudio && window.cyberAudio.enabled;
        sfxBtn.innerHTML = isEnabled
            ? `<span class="toggle-icon">${soundOnSvg}</span><span class="toggle-label">SFX: ON</span>`
            : `<span class="toggle-icon">${soundOffSvg}</span><span class="toggle-label">SFX: OFF</span>`;
        sfxBtn.classList.toggle('active', isEnabled);
        sfxBtn.setAttribute('aria-label', isEnabled ? 'Mute sound effects' : 'Enable sound effects');
    };

    updateLabel();

    sfxBtn.addEventListener('click', () => {
        if (window.cyberAudio) {
            window.cyberAudio.toggle();
            updateLabel();
        }
    });
}

/* ==========================================================================
   3. CUSTOM CYBER CURSOR (Desktop only)
   ========================================================================== */
function initCyberCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cyber-cursor-dot';

    const cursorRing = document.createElement('div');
    cursorRing.className = 'cyber-cursor-ring';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = -100, mouseY = -100;
    let ringX = -100, ringY = -100;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    const updateRing = () => {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        requestAnimationFrame(updateRing);
    };
    updateRing();

    // Hover expansions on interactive elements
    const interactives = 'a, button, input, textarea, .project-card, .skill-category, .pipe-node, .theme-toggle';
    document.addEventListener('mouseover', (e) => {
        const target = e.target.closest(interactives);
        if (target) {
            cursorRing.classList.add('cursor-hover');
            if (window.cyberAudio && Math.random() < 0.25) window.cyberAudio.playHover();
        }
    });

    document.addEventListener('mouseout', (e) => {
        const target = e.target.closest(interactives);
        if (target) {
            cursorRing.classList.remove('cursor-hover');
        }
    });

    document.addEventListener('mousedown', () => cursorRing.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => cursorRing.classList.remove('cursor-click'));
}

/* ==========================================================================
   4. MULTI-PHRASE FUTURISTIC TYPEWRITER
   ========================================================================== */
function initTypewriter() {
    const el = document.getElementById('cyber-typewriter');
    if (!el) return;

    const phrases = [
        "Java Backend Developer",
        "Cloud Architect (AWS & Microservices)",
        "Event-Driven Distributed Systems",
        "High-Throughput API Engineer (1M+ TX/day)",
        "MySQL & Query Optimization Specialist",
        "Production Reliability & Datadog APM"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseEnd = false;

    const type = () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
            el.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            el.textContent = currentPhrase.substring(0, charIndex);
        }

        let speed = isDeleting ? 30 : 65;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2200; // Pause at end of phrase
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500; // Pause before typing new phrase
        }

        setTimeout(type, speed);
    };

    setTimeout(type, 600);
}

/* ==========================================================================
   5. TEXT SCRAMBLE / DECRYPTION EFFECT
   ========================================================================== */
function initTextScramble() {
    const chars = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789';
    const scrambleElements = document.querySelectorAll('.scramble-text, h1, h2:not(.no-scramble)');

    scrambleElements.forEach(el => {
        const originalText = el.getAttribute('data-original') || el.textContent.trim();
        el.setAttribute('data-original', originalText);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !el.dataset.scrambled) {
                    el.dataset.scrambled = "true";
                    runScramble(el, originalText);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(el);

        el.addEventListener('mouseenter', () => {
            runScramble(el, originalText);
        });
    });

    function runScramble(el, originalText) {
        let iteration = 0;
        const maxIterations = originalText.length * 2.5;

        const interval = setInterval(() => {
            el.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration / 2.5) {
                        return originalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iteration++;
            if (iteration >= maxIterations) {
                el.textContent = originalText;
                clearInterval(interval);
            }
        }, 22);
    }
}

/* ==========================================================================
   6. 3D PERSPECTIVE TILT WITH SPECULAR MOUSE SPOTLIGHT
   ========================================================================== */
function init3DTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.project-card, .skill-category, .experience-item, .info-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* ==========================================================================
   7. SCROLL-DRIVEN STATS COUNTERS
   ========================================================================== */
function initScrollCounters() {
    const counterElements = document.querySelectorAll('.counter-val');
    if (!counterElements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = "true";
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => observer.observe(el));

    function animateCounter(el) {
        const target = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1600;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // EaseOutCubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;

            el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
            }
        }

        requestAnimationFrame(update);
    }
}

/* ==========================================================================
   8. PROJECT FILTERS & INTERACTIVE ARCHITECTURE MODAL
   ========================================================================== */
const PROJECT_SPECS = {
    1: {
        title: "Financial Security & AWS-KMS Encryption Platform",
        category: "Security & Financial Systems",
        badge: "Java 21 • AWS KMS • Spring Security • CodeQL",
        metrics: {
            tps: "250M+ Users",
            p99: "Zero-Trust Encrypted",
            uptime: "100% Audit Compliance",
            mttr: "Zero Security Escapes"
        },
        overview: "Enterprise-grade financial API security platform designed for a major credit bureau subscriber ecosystem serving over 250 million users. Leverages Spring Security, OAuth2, and AWS Key Management Service (KMS) for envelope encryption and end-to-end data protection.",
        diagram: `
  [Subscriber REST Clients] ---> [Spring Cloud API Gateway]
                                          |
                                          v
                                [OAuth2 / JWT Validator]
                                          |
                                          v
                              [Spring Boot Microservices]
                                          |
                        +-----------------+-----------------+
                        |                                   |
                        v                                   v
             [AWS-KMS Envelope Encryption]        [Resilience4j Circuit]
             - Customer Master Keys (CMKs)                  |
             - Automated Data Key Rotation                  v
                        |                         [Encrypted MySQL / Aurora]
                        v                                   |
               [Veracode & CodeQL]                [Audit Trail & Datadog]
               Static / Dynamic SAST Scanning     Continuous APM & Compliance
        `,
        highlights: [
            "Enforced AWS-KMS envelope encryption protecting sensitive financial subscriber data across 250M+ users.",
            "Proactively remediated high-severity security vulnerabilities identified by Veracode SAST and GitHub CodeQL.",
            "Maintained 100% regulatory audit compliance and zero production data leak incidents."
        ],
        github: "https://github.com/1chiranjibdash"
    },
    2: {
        title: "Serverless EventBridge & Lambda Notification System",
        category: "Serverless & Cloud Systems",
        badge: "AWS Lambda • EventBridge • Amazon SQS • Java 21",
        metrics: {
            tps: "Millions of Events/Day",
            p99: "+90% Reliability Gain",
            uptime: "99.99% Availability",
            mttr: "Automated DLQ Replay"
        },
        overview: "Next-generation asynchronous notification and billing dispatch platform replacing an outdated legacy batch job. Re-architected with AWS EventBridge event bus, AWS Lambda serverless execution, and Amazon SQS dead-letter queues.",
        diagram: `
  [Subscriber Core Services] ---> [AWS EventBridge Event Bus]
                                            |
                      +---------------------+---------------------+
                      |                                           |
                      v (Rule: Billing Alerts)                    v (Rule: Security Events)
              [Amazon SQS FIFO]                           [Amazon SQS Standard]
                      |                                           |
                      v                                           v
            [AWS Lambda (Java 21)]                     [AWS Lambda (Java 21)]
            - Virtual Threads Concurrency              - Batch Notification Sender
                      |                                           |
                      +---------------------+---------------------+
                                            |
                                            v
                                 [Amazon Aurora Database]
                                 [Dead-Letter Queue (DLQ)]
        `,
        highlights: [
            "Migrated brittle legacy batch processes to event-driven serverless streams, boosting notification delivery reliability by 90%.",
            "Engineered automated SQS dead-letter queues (DLQ) with redrive policies ensuring zero message loss during partner downtime.",
            "Reduced operational cloud overhead and eliminated batch scheduling window bottlenecks entirely."
        ],
        github: "https://github.com/1chiranjibdash"
    },
    3: {
        title: "Java 21 Fleet & High-Concurrency Modernization",
        category: "High-Concurrency & Architecture",
        badge: "Java 21 • Virtual Threads • Resilience4j • Spring 3",
        metrics: {
            tps: "+15% Throughput Boost",
            p99: "-10% API Timeouts",
            uptime: "99.99% High Availability",
            mttr: "Sub-Second Fallbacks"
        },
        overview: "Enterprise-scale fleet modernization transitioning critical subscriber microservices from JDK 17 to Java 21. Implemented virtual threads (Project Loom) for lightweight I/O handling, and Resilience4j circuit breakers to safeguard billing consistency.",
        diagram: `
  [Concurrent Client Inbound] ---> [Tomcat Virtual Thread Executor]
                                                |
                                                v
                                  [Virtual Threads (Project Loom)]
                                                |
                               +----------------+----------------+
                               |                                 |
                               v                                 v
                     [Resilience4j Breaker]            [Consistent Rollback]
                     - Half-Open Thresholds            - Billing Transaction Points
                               |                                 |
                               +----------------+----------------+
                                                |
                                                v
                                   [Downstream Core Microservices]
                                   [Datadog APM Thread Telemetry]
        `,
        highlights: [
            "Upgraded production microservices fleet from JDK 17 to Java 21, unlocking high-density virtual thread concurrency.",
            "Integrated Resilience4j circuit breakers and fallback mechanisms, reducing API timeouts by 10% during peak loads.",
            "Achieved an overall 15% throughput enhancement without increasing cloud infrastructure footprint."
        ],
        github: "https://github.com/1chiranjibdash"
    },
    4: {
        title: "Zero-Downtime Production Migration Engine",
        category: "High-Concurrency & Database",
        badge: "Java Concurrency • Multi-Threading • MySQL • ACID",
        metrics: {
            tps: "100% SLA Maintained",
            p99: "Zero Data Discrepancy",
            uptime: "Zero-Downtime Cutover",
            mttr: "Instant Safe Rollback"
        },
        overview: "A mission-critical standalone multi-threaded Java application engineered to execute complex subscriber data migrations across live production databases under continuous user traffic.",
        diagram: `
  [Live Production Traffic] ---> [Active Source Database]
                                           |
                                [Change Data Capture]
                                           |
                                           v
                       [Migration Engine (Standalone Java App)]
                       - Thread Pool Coordinator (ExecutorService)
                       - Chunked Checkpoint Ingestion
                       - Dual-Write Verification & Hashing
                                           |
                         +-----------------+-----------------+
                         |                                   |
                         v                                   v
             [Target Database Cluster]             [Reconciliation Ledger]
             - Batch Insert / Update               - Automated Rollback Engine
        `,
        highlights: [
            "Engineered multi-threaded worker pools coordinating parallel record migration while maintaining 100% SLA.",
            "Enforced transactional integrity with chunked checkpointing, verification hashing, and dual-write reconciliations.",
            "Guaranteed zero service disruption and zero data discrepancies for financial subscriber accounts."
        ],
        github: "https://github.com/1chiranjibdash"
    },
    5: {
        title: "Automated QA & Load Profiling Harness",
        category: "Observability & QA",
        badge: "JUnit 5 • JMeter • BlueOptima • CI/CD Harness",
        metrics: {
            tps: "2w ➔ 8h Test Cycles",
            p99: "40% ➔ 85% Code Coverage",
            uptime: "Zero Regression Escapes",
            mttr: "Automated Quality Gates"
        },
        overview: "An end-to-end testing and performance profiling architecture designed to eliminate regression bottlenecks and identify code hotspots prior to production deployment.",
        diagram: `
  [Code Commit & PR] ---> [Harness CI/CD Pipeline]
                                  |
            +---------------------+---------------------+
            |                                           |
            v                                           v
    [JUnit 5 Test Suite]                     [BlueOptima & CodeQL]
    - Unit & Integration Coverage             - Static Complexity Profiling
    - Coverage: 40% ➔ 85%                     - Vulnerability Screening
            |                                           |
            +---------------------+---------------------+
                                  |
                                  v
                      [Apache JMeter Load Engine]
                      - High-Volume Stress Benchmarks
                      - HikariCP Connection Saturation
                                  |
                                  v
                      [Quality Gate: Approved Release]
        `,
        highlights: [
            "Slashed regression testing turnaround from 2 weeks to 8 hours by elevating JUnit test coverage from 40% to 85%.",
            "Leveraged BlueOptima and Apache JMeter to profile query performance and eradicate thread contention bottlenecks.",
            "Established automated pipeline quality gates in Harness CI/CD to prevent buggy builds from entering staging."
        ],
        github: "https://github.com/1chiranjibdash"
    },
    6: {
        title: "Observability & Feature Flagging Architecture",
        category: "Observability & Cloud Systems",
        badge: "Datadog APM • Split.io • AWS ECR • JFrog",
        metrics: {
            tps: "-20% to -30% MTTR",
            p99: "Targeted Canaries",
            uptime: "99.99% Availability",
            mttr: "Instant Kill-Switch"
        },
        overview: "Enterprise observability and feature governance framework pairing Datadog APM distributed tracing with Split.io feature flagging and immutable container pipelines.",
        diagram: `
  [Production Traffic] ---> [Split.io Feature Router]
                                    |
                +-------------------+-------------------+
                |                                       |
                v (Canary Cohort)                       v (Baseline Fleet)
        [Feature Variant A]                     [Feature Variant B]
                |                                       |
                +-------------------+-------------------+
                                    |
                                    v
                         [Datadog APM Agent]
                         - Distributed Trace Spans
                         - Real-Time Error Rates & Alerts
                                    |
                                    v
                     [Harness CI/CD & AWS ECR]
                     [JFrog Artifactory Release Pipeline]
        `,
        highlights: [
            "Designed bespoke Datadog APM telemetry dashboards and synthetic monitors, decreasing MTTR by 20%–30%.",
            "Integrated Split.io feature flags to execute canary rollouts and A/B tests safely, driving subscriber retention.",
            "Managed binary governance using JFrog Artifactory and AWS ECR in automated Harness deployment pipelines."
        ],
        github: "https://github.com/1chiranjibdash"
    }
};

function initProjectFiltersAndModals() {
    // 1. Filtering
    const filterBtns = document.querySelectorAll('.filter-pill');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                if (window.cyberAudio) window.cyberAudio.playClick();
                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category') || '';
                    if (filter === 'all' || category.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 2. Architecture Modal
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'cyber-modal-container';
        modal.innerHTML = `
            <div class="cyber-modal-backdrop" id="modal-backdrop"></div>
            <div class="cyber-modal-window">
                <div class="modal-top-bar">
                    <span class="modal-chip" id="modal-category">SYSTEM ARCHITECTURE</span>
                    <button class="modal-close-btn" id="modal-close" aria-label="Close modal">&times;</button>
                </div>
                <div class="modal-content" id="modal-body">
                    <!-- Injected dynamically -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close');

    const closeModal = () => {
        modal.classList.remove('active');
    };

    if (backdrop) backdrop.addEventListener('click', closeModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    const triggerBtns = document.querySelectorAll('.btn-spec-trigger');
    triggerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const data = PROJECT_SPECS[projectId];
            if (!data) return;

            if (window.cyberAudio) window.cyberAudio.playModalOpen();

            const modalBody = document.getElementById('modal-body');
            const modalCategory = document.getElementById('modal-category');

            if (modalCategory) modalCategory.textContent = data.category.toUpperCase();

            modalBody.innerHTML = `
                <h2 class="modal-title">${data.title}</h2>
                <div class="modal-badge-row">
                    <span class="modal-tech-badge">${data.badge}</span>
                </div>

                <div class="modal-metric-grid">
                    <div class="metric-box">
                        <span class="m-val highlight">${data.metrics.tps}</span>
                        <span class="m-lbl">THROUGHPUT</span>
                    </div>
                    <div class="metric-box">
                        <span class="m-val">${data.metrics.p99}</span>
                        <span class="m-lbl">LATENCY</span>
                    </div>
                    <div class="metric-box">
                        <span class="m-val success">${data.metrics.uptime}</span>
                        <span class="m-lbl">UPTIME SLA</span>
                    </div>
                    <div class="metric-box">
                        <span class="m-val">${data.metrics.mttr}</span>
                        <span class="m-lbl">RESILIENCE</span>
                    </div>
                </div>

                <div class="modal-section">
                    <h3>Architecture Blueprint & Dataflow</h3>
                    <pre class="modal-diagram"><code>${data.diagram.trim()}</code></pre>
                </div>

                <div class="modal-section">
                    <h3>Engineering Highlights</h3>
                    <ul class="modal-list">
                        ${data.highlights.map(h => `<li><span class="cyan-bullet">▹</span> ${h}</li>`).join('')}
                    </ul>
                </div>

                <div class="modal-footer-actions">
                    <a href="${data.github}" target="_blank" class="btn btn-primary">
                        <span>View Repository on GitHub</span>
                    </a>
                </div>
            `;

            modal.classList.add('active');
        });
    });
}

/* ==========================================================================
   9. CONTACT FORM INTERACTIVE FEEDBACK
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="cyber-spinner"></span> SENDING MESSAGE...';
        }
        if (window.cyberAudio) window.cyberAudio.playPowerOn();
    });

    // Input cyber focus sounds
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.cyberAudio) window.cyberAudio.playHover();
        });
    });
}

/* ==========================================================================
   10. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
    const hamburger = document.getElementById('mobile-hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('mobile-open');
            if (window.cyberAudio) window.cyberAudio.playClick();
        });

        // Close on navigation link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('mobile-open');
            });
        });
    }
}

/* ==========================================================================
   11. TOP TELEMETRY HUD TICKER
   ========================================================================== */
function initTelemetryHUD() {
    const latSpan = document.getElementById('hud-latency');
    if (!latSpan) return;

    setInterval(() => {
        const lat = (10 + Math.random() * 5).toFixed(1);
        latSpan.textContent = `${lat}ms`;
    }, 3500);
}
