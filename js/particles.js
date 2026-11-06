// High-Performance Interactive Distributed Mesh Canvas
// Represents distributed microservice nodes and real-time streaming event packets

class CyberMeshCanvas {
    constructor(canvasId = 'cyber-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasId;
            document.body.prepend(this.canvas);
        }
        this.ctx = this.canvas.getContext('2d');
        this.nodes = [];
        this.packets = [];
        this.mouse = { x: -1000, y: -1000, radius: 160 };
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.animId = null;
        this.running = true;
        this.maxDistance = 140;
        this.packetSpawnRate = 0.04;

        this.init();
    }

    init() {
        this.resize();
        this.buildNodes();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.maxDistance = Math.min(150, Math.max(100, this.width / 10));
    }

    buildNodes() {
        const count = Math.min(65, Math.max(25, Math.floor((this.width * this.height) / 22000)));
        this.nodes = [];

        const tags = [
            'Java 21', 'Spring', 'AWS SQS', 'AWS ECS', 'MySQL', 
            'Datadog', 'Kafka', 'Redis', 'gRPC', 'Lambda', 
            'Docker', 'HikariCP', 'REST', 'EventBus'
        ];

        for (let i = 0; i < count; i++) {
            const hasTag = Math.random() < 0.25;
            this.nodes.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.6,
                vy: (Math.random() - 0.5) * 0.6,
                radius: Math.random() * 2.2 + 1.2,
                baseRadius: Math.random() * 2.2 + 1.2,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02,
                tag: hasTag ? tags[Math.floor(Math.random() * tags.length)] : null,
                isHub: Math.random() < 0.15
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.buildNodes();
        });

        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.running = false;
            } else {
                this.running = true;
                this.animate();
            }
        });
    }

    getThemeColors() {
        const isLight = document.documentElement.dataset.theme === 'light';
        return {
            isLight,
            nodeColor: isLight ? 'rgba(37, 99, 235, 0.7)' : 'rgba(0, 240, 255, 0.85)',
            hubColor: isLight ? 'rgba(124, 58, 237, 0.9)' : 'rgba(168, 85, 247, 0.95)',
            lineColor: isLight ? '37, 99, 235' : '0, 240, 255',
            packetColor: isLight ? '#7c3aed' : '#64f0ff',
            tagBg: isLight ? 'rgba(255, 255, 255, 0.85)' : 'rgba(10, 14, 39, 0.75)',
            tagText: isLight ? '#0f172a' : '#64f0ff'
        };
    }

    spawnPacket(source, target) {
        if (this.packets.length > 20) return;
        this.packets.push({
            sx: source.x,
            sy: source.y,
            tx: target.x,
            ty: target.y,
            progress: 0,
            speed: 0.015 + Math.random() * 0.02,
            size: Math.random() * 2 + 2
        });
    }

    animate() {
        if (!this.running) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            this.ctx.clearRect(0, 0, this.width, this.height);
            return;
        }

        this.ctx.clearRect(0, 0, this.width, this.height);
        const colors = this.getThemeColors();

        // Update and draw nodes
        for (let i = 0; i < this.nodes.length; i++) {
            const n = this.nodes[i];
            n.x += n.vx;
            n.y += n.vy;

            // Bounce off edges smoothly
            if (n.x < 0) { n.x = 0; n.vx *= -1; }
            if (n.x > this.width) { n.x = this.width; n.vx *= -1; }
            if (n.y < 0) { n.y = 0; n.vy *= -1; }
            if (n.y > this.height) { n.y = this.height; n.vy *= -1; }

            // Mouse gravitational interaction
            const dx = n.x - this.mouse.x;
            const dy = n.y - this.mouse.y;
            const distMouse = Math.sqrt(dx * dx + dy * dy);
            if (distMouse < this.mouse.radius) {
                const force = (this.mouse.radius - distMouse) / this.mouse.radius;
                n.x += (dx / distMouse) * force * 1.8;
                n.y += (dy / distMouse) * force * 1.8;
            }

            // Pulse
            n.pulse += n.pulseSpeed;
            const currentRadius = n.baseRadius + Math.sin(n.pulse) * 0.8;

            // Connect lines between nearby nodes
            for (let j = i + 1; j < this.nodes.length; j++) {
                const n2 = this.nodes[j];
                const dxx = n.x - n2.x;
                const dyy = n.y - n2.y;
                const dist = Math.sqrt(dxx * dxx + dyy * dyy);

                if (dist < this.maxDistance) {
                    const alpha = (1 - dist / this.maxDistance) * (colors.isLight ? 0.22 : 0.35);
                    this.ctx.beginPath();
                    this.ctx.moveTo(n.x, n.y);
                    this.ctx.lineTo(n2.x, n2.y);
                    this.ctx.strokeStyle = `rgba(${colors.lineColor}, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();

                    // Chance to trigger packet transfer along this route
                    if (Math.random() < this.packetSpawnRate * 0.05) {
                        this.spawnPacket(n, n2);
                    }
                }
            }

            // Draw Node
            this.ctx.beginPath();
            this.ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = n.isHub ? colors.hubColor : colors.nodeColor;
            this.ctx.shadowColor = n.isHub ? colors.hubColor : colors.nodeColor;
            this.ctx.shadowBlur = n.isHub ? 12 : 6;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Draw microservice tech tag if present
            if (n.tag && (distMouse < 220 || n.isHub)) {
                this.ctx.font = '9px "Ubuntu Sans Mono", monospace';
                this.ctx.fillStyle = colors.tagText;
                this.ctx.fillText(n.tag, n.x + 8, n.y - 6);
            }
        }

        // Connect to mouse pointer
        if (this.mouse.x > 0 && this.mouse.y > 0) {
            for (let i = 0; i < this.nodes.length; i++) {
                const n = this.nodes[i];
                const dx = n.x - this.mouse.x;
                const dy = n.y - this.mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < this.mouse.radius) {
                    const alpha = (1 - dist / this.mouse.radius) * 0.45;
                    this.ctx.beginPath();
                    this.ctx.moveTo(n.x, n.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.strokeStyle = `rgba(${colors.lineColor}, ${alpha})`;
                    this.ctx.lineWidth = 1.2;
                    this.ctx.stroke();
                }
            }
        }

        // Update and draw packets
        for (let p = this.packets.length - 1; p >= 0; p--) {
            const pkt = this.packets[p];
            pkt.progress += pkt.speed;

            if (pkt.progress >= 1) {
                this.packets.splice(p, 1);
                continue;
            }

            const curX = pkt.sx + (pkt.tx - pkt.sx) * pkt.progress;
            const curY = pkt.sy + (pkt.ty - pkt.sy) * pkt.progress;

            this.ctx.beginPath();
            this.ctx.arc(curX, curY, pkt.size, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.packetColor;
            this.ctx.shadowColor = colors.packetColor;
            this.ctx.shadowBlur = 10;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        }

        this.animId = requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cyberMesh = new CyberMeshCanvas();
});

