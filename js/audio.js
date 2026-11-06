// Web Audio API Synthesizer for futuristic sci-fi sound effects
// Lightweight, zero external files, fully accessible and muted by default.

class CyberAudio {
    constructor() {
        this.ctx = null;
        this.enabled = localStorage.getItem('cyber-sfx') === 'true';
    }

    init() {
        if (!this.ctx && typeof AudioContext !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('cyber-sfx', this.enabled ? 'true' : 'false');
        if (this.enabled) {
            this.init();
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
            this.playPowerOn();
        }
        return this.enabled;
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05, rampTo = null) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }

        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = type;
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            if (rampTo !== null) {
                osc.frequency.exponentialRampToValueAtTime(Math.max(10, rampTo), this.ctx.currentTime + duration);
            }

            gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            // Audio policy or silent failure
        }
    }

    playHover() {
        this.playTone(880, 'sine', 0.04, 0.015, 1200);
    }

    playClick() {
        this.playTone(1400, 'triangle', 0.06, 0.04, 600);
    }

    playSuccess() {
        if (!this.enabled) return;
        this.playTone(523.25, 'sine', 0.08, 0.03);
        setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.03), 70);
        setTimeout(() => this.playTone(783.99, 'sine', 0.12, 0.04), 140);
        setTimeout(() => this.playTone(1046.50, 'sine', 0.2, 0.05), 210);
    }

    playPacket() {
        this.playTone(1200 + Math.random() * 400, 'sine', 0.05, 0.02, 400);
    }

    playTerminalKey() {
        this.playTone(600 + Math.random() * 200, 'square', 0.02, 0.01, 300);
    }

    playPowerOn() {
        if (!this.enabled) return;
        this.playTone(220, 'sawtooth', 0.15, 0.04, 880);
    }

    playModalOpen() {
        if (!this.enabled) return;
        this.playTone(300, 'sine', 0.18, 0.03, 1100);
    }
}

window.cyberAudio = new CyberAudio();

