// Futuristic Cyber Terminal & Command Palette (Cmd+K / Ctrl+K)
// Allows recruiters and developers to interact directly via CLI

class CyberTerminal {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.historyIndex = -1;
        this.init();
    }

    init() {
        this.createDOM();
        this.bindEvents();
    }

    createDOM() {
        const modal = document.createElement('div');
        modal.id = 'cyber-terminal-modal';
        modal.className = 'cyber-terminal-modal';
        modal.innerHTML = `
            <div class="terminal-backdrop" id="terminal-backdrop"></div>
            <div class="terminal-window">
                <div class="terminal-bar">
                    <div class="terminal-buttons">
                        <span class="btn-term close" id="term-close-btn" title="Close"></span>
                        <span class="btn-term minimize"></span>
                        <span class="btn-term zoom"></span>
                    </div>
                    <div class="terminal-title">chiranjib@cloud-mesh:~$ /bin/cli (v4.2.0-secure)</div>
                    <div class="terminal-kbd-hint">ESC to close</div>
                </div>
                <div class="terminal-body" id="terminal-output">
                    <div class="term-line banner">
   ____ _     _                  _ _     ____            _     
  / ___| |__ (_)_ __ __ _ _ __  (_) |__ |  _ \\  __ _ ___| |__  
 | |   | '_ \\| | '__/ _\` | '_ \\ | | '_ \\| | | |/ _\` / __| '_ \\ 
 | |___| | | | | | | (_| | | | || | |_) | |_| | (_| \\__ \\ | | |
  \\____|_| |_|_|_|  \\__,_|_| |_|/ |_.__/|____/ \\__,_|___/_| |_|
                              |__/                             
                    </div>
                    <div class="term-line dim">Welcome to Chiranjib Dash's Cloud Terminal. Type <span class="term-hl">'help'</span> for available commands.</div>
                    <div class="term-line dim">Quick shortcuts: Type <span class="term-hl">'projects'</span>, <span class="term-hl">'skills'</span>, <span class="term-hl">'contact'</span>, <span class="term-hl">'theme'</span>.</div>
                </div>
                <div class="terminal-input-row">
                    <span class="terminal-prompt">cdash@aws-cluster:~$</span>
                    <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" placeholder="Type a command...">
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    bindEvents() {
        const modal = document.getElementById('cyber-terminal-modal');
        const input = document.getElementById('terminal-input');
        const backdrop = document.getElementById('terminal-backdrop');
        const closeBtn = document.getElementById('term-close-btn');

        // Shortcut Cmd+K or Ctrl+K or `~`
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                this.toggle();
            } else if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        if (backdrop) backdrop.addEventListener('click', () => this.close());
        if (closeBtn) closeBtn.addEventListener('click', () => this.close());

        if (input) {
            input.addEventListener('keydown', (e) => {
                if (window.cyberAudio) window.cyberAudio.playTerminalKey();

                if (e.key === 'Enter') {
                    const cmd = input.value.trim();
                    if (cmd) {
                        this.history.push(cmd);
                        this.historyIndex = this.history.length;
                        this.execute(cmd);
                        input.value = '';
                    }
                } else if (e.key === 'ArrowUp') {
                    if (this.history.length > 0 && this.historyIndex > 0) {
                        this.historyIndex--;
                        input.value = this.history[this.historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                        input.value = this.history[this.historyIndex];
                    } else {
                        this.historyIndex = this.history.length;
                        input.value = '';
                    }
                }
            });
        }
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.isOpen = true;
        const modal = document.getElementById('cyber-terminal-modal');
        const input = document.getElementById('terminal-input');
        if (modal) modal.classList.add('active');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
        if (window.cyberAudio) window.cyberAudio.playModalOpen();
    }

    close() {
        this.isOpen = false;
        const modal = document.getElementById('cyber-terminal-modal');
        if (modal) modal.classList.remove('active');
    }

    print(text, type = '') {
        const output = document.getElementById('terminal-output');
        if (!output) return;

        const line = document.createElement('div');
        line.className = `term-line ${type}`;
        line.innerHTML = text;
        output.appendChild(line);
        output.scrollTop = output.scrollHeight;
    }

    execute(rawCmd) {
        this.print(`<span class="terminal-prompt">cdash@aws-cluster:~$</span> ${this.escapeHtml(rawCmd)}`, 'cmd');
        const cmd = rawCmd.toLowerCase().trim();

        switch (cmd) {
            case 'help':
                this.print(`
Available commands:
  <span class="term-hl">resume</span>       - View & Print ATS-Optimized Resume / CV
  <span class="term-hl">about</span>        - Professional background & experience
  <span class="term-hl">skills</span>       - Core tech stack (Java, AWS, Microservices, DB)
  <span class="term-hl">projects</span>     - Explore 6 featured portfolio projects
  <span class="term-hl">experience</span>   - Career timeline and highlights
  <span class="term-hl">contact</span>      - Email, LinkedIn, GitHub details
  <span class="term-hl">stats</span>        - Career metrics & system telemetry
  <span class="term-hl">theme</span>        - Toggle Dark / Light mode
  <span class="term-hl">sfx</span>          - Toggle sci-fi sound effects
  <span class="term-hl">clear</span>        - Clear terminal screen
  <span class="term-hl">exit</span>         - Close terminal session
                `);
                break;

            case 'resume':
            case 'cv':
                this.print(`
<strong>CHIRANJIB DASH - EXECUTIVE RESUME:</strong>
Role: Java Backend Developer & Cloud Architect (4+ Years Exp)
ATS Resume Page: <a href="resume.html" class="term-link">Open & Print PDF Resume (resume.html)</a>
Redirecting to resume in 1 second...
                `);
                setTimeout(() => {
                    window.location.href = 'resume.html';
                }, 1000);
                break;

            case 'about':
                this.print(`
<strong>Chiranjib Dash</strong> - Software Engineer | Java Backend &amp; Cloud-Native Architect
Experience: 4+ Years designing and modernizing distributed systems.
Current Role: Software Engineer @ NetWeb Software (Client: Major Credit Bureau).
Domain: Credit bureau subscriber management, AWS-KMS encryption, 250M+ users.
Availability: Open to Full-Time Senior Backend Roles (Remote / Relocation).
                `);
                break;

            case 'skills':
                this.print(`
<strong>TECHNICAL EXPERTISE:</strong>
• <strong>Languages:</strong> Java (8, 17, 21), SQL, TypeScript, Bash
• <strong>Frameworks:</strong> Spring Boot, Spring Security, Spring Cloud, Spring AI, Hibernate/JPA
• <strong>Cloud &amp; Serverless:</strong> AWS (Lambda, EventBridge, SQS, SNS, KMS, ECS, Aurora), Docker
• <strong>Databases &amp; Caches:</strong> MySQL, Amazon Aurora, HikariCP, Redis, Query Optimization
• <strong>Testing &amp; QA:</strong> JUnit 5, Mockito, Apache JMeter, BlueOptima, Automated Regression
• <strong>Observability &amp; CI/CD:</strong> Datadog APM, Split.io, Harness CI/CD, JFrog, AWS ECR, CodeQL, Veracode
                `);
                break;

            case 'projects':
                this.print(`
<strong>PRODUCTION ARCHITECTURES:</strong>
1. <strong>Financial Security &amp; AWS-KMS Encryption Platform</strong> [250M+ Users, Spring Security, AWS-KMS]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
2. <strong>Serverless EventBridge &amp; Lambda Notification System</strong> [AWS Lambda, EventBridge, +90% Reliability]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
3. <strong>Java 21 Fleet &amp; High-Concurrency Modernization</strong> [Virtual Threads, Resilience4j, +15% Throughput]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
4. <strong>Zero-Downtime Production Migration Engine</strong> [Multi-threaded Java, 100% SLA Maintained]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
5. <strong>Automated QA &amp; Load Profiling Harness</strong> [Regression 2w ➔ 8h, JUnit 40% ➔ 85%, JMeter]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
6. <strong>Observability &amp; Feature Flagging Architecture</strong> [Datadog APM -30% MTTR, Split.io Canaries]
   » <a href="projects.html" class="term-link">View Architecture Spec</a>
                `);
                break;

            case 'experience':
                this.print(`
<strong>CAREER TIMELINE &amp; HIGHLIGHTS:</strong>
• <strong>NetWeb Software (April 2022 – Present):</strong> Software Engineer
  - Secured REST APIs handling 250M+ users with Spring Security &amp; AWS-KMS encryption.
  - Migrated legacy batch notification pipeline to AWS Lambda &amp; EventBridge (+90% reliability).
  - Modernized microservices fleet from JDK 17 to Java 21 with virtual threads &amp; Resilience4j.
  - Engineered standalone multi-threaded database migration tool maintaining 100% SLA.
  - Slashed regression cycle from 2 weeks to 8 hours (JUnit coverage 40% to 85%).
  - Accelerated development cycles by 40% integrating Spring AI and GenAI workflows.
                `);
                break;

            case 'contact':
                this.print(`
<strong>CONNECT WITH CHIRANJIB:</strong>
• Email: <a href="mailto:contact@chiranjibdash.com" class="term-link">contact@chiranjibdash.com</a>
• LinkedIn: <a href="https://linkedin.com/in/1chiranjibdash" target="_blank" class="term-link">linkedin.com/in/1chiranjibdash</a>
• GitHub: <a href="https://github.com/1chiranjibdash" target="_blank" class="term-link">github.com/1chiranjibdash</a>
• Contact Page: <a href="contact.html" class="term-link">Navigate to Contact Form</a>
                `);
                break;

            case 'stats':
                this.print(`
<strong>ENGINEERING METRICS &amp; IMPACT:</strong>
• Production Users Protected: <strong>250,000,000+</strong>
• Notification Delivery Reliability Gain: <strong>+90%</strong>
• Regression Cycle Reduction: <strong>2 Weeks ➔ 8 Hours</strong>
• Automated Code Coverage: <strong>40% ➔ 85%</strong>
• Microservice Throughput Gain: <strong>+15%</strong>
• Incident MTTR Reduction: <strong>20% – 30%</strong>
• Production Availability Target: <strong>99.99%</strong>
                `);
                break;

            case 'theme':
                const themeBtn = document.getElementById('theme-toggle');
                if (themeBtn) themeBtn.click();
                this.print(`Theme toggled to: <span class="term-hl">${document.documentElement.dataset.theme}</span>`);
                break;

            case 'sfx':
                if (window.cyberAudio) {
                    const status = window.cyberAudio.toggle();
                    this.print(`Sound Effects: <span class="term-hl">${status ? 'ENABLED' : 'DISABLED'}</span>`);
                }
                break;

            case 'clear':
                const output = document.getElementById('terminal-output');
                if (output) output.innerHTML = '';
                break;

            case 'exit':
                this.close();
                break;

            default:
                this.print(`Command not recognized: '<span class="term-err">${this.escapeHtml(cmd)}</span>'. Type <span class="term-hl">'help'</span> for list of commands.`, 'error');
                break;
        }
    }

    escapeHtml(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cyberTerminal = new CyberTerminal();
});

