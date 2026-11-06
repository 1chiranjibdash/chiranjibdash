// Interactive Event-Driven Architecture Simulator
// Showcases real-time Java 21 + AWS EventBridge + AWS-KMS + Datadog APM pipeline

class EventPipelineSimulator {
    constructor(containerId = 'event-simulator') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.isRunning = false;
        this.streamInterval = null;
        this.txCount = 1420890;
        this.latencies = [8, 11, 14, 9, 12, 10, 13];
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="cyber-simulator-card">
                <div class="sim-header">
                    <div class="sim-title">
                        <span class="sim-pulse"></span>
                        <span class="sim-label">LIVE FINANCIAL EVENT PIPELINE SIMULATOR</span>
                        <span class="sim-spec">Java 21 • AWS EventBridge • AWS-KMS • Datadog APM</span>
                    </div>
                    <div class="sim-controls">
                        <button id="sim-dispatch-btn" class="btn-cyber-sm">
                            <span class="btn-icon">⚡</span> Dispatch Event
                        </button>
                        <button id="sim-stream-btn" class="btn-cyber-sm outline">
                            <span class="btn-icon">▶</span> Auto Stream: <span id="sim-stream-status">OFF</span>
                        </button>
                    </div>
                </div>

                <div class="pipeline-track">
                    <div class="pipe-node" data-step="1" id="pnode-1">
                        <div class="node-icon">🌐</div>
                        <div class="node-title">REST Client</div>
                        <div class="node-sub">POST /subscribers</div>
                    </div>
                    <div class="pipe-connector"><div class="connector-line"></div></div>

                    <div class="pipe-node" data-step="2" id="pnode-2">
                        <div class="node-icon">🛡️</div>
                        <div class="node-title">AWS KMS &amp; GW</div>
                        <div class="node-sub">Envelope Encrypt</div>
                    </div>
                    <div class="pipe-connector"><div class="connector-line"></div></div>

                    <div class="pipe-node" data-step="3" id="pnode-3">
                        <div class="node-icon">☕</div>
                        <div class="node-title">Java 21 Fleet</div>
                        <div class="node-sub">Virtual Threads</div>
                    </div>
                    <div class="pipe-connector"><div class="connector-line"></div></div>

                    <div class="pipe-node" data-step="4" id="pnode-4">
                        <div class="node-icon">📨</div>
                        <div class="node-title">EventBridge</div>
                        <div class="node-sub">Serverless Bus</div>
                    </div>
                    <div class="pipe-connector"><div class="connector-line"></div></div>

                    <div class="pipe-node" data-step="5" id="pnode-5">
                        <div class="node-icon">⚙️</div>
                        <div class="node-title">AWS Lambda</div>
                        <div class="node-sub">Async Worker</div>
                    </div>
                    <div class="pipe-connector"><div class="connector-line"></div></div>

                    <div class="pipe-node" data-step="6" id="pnode-6">
                        <div class="node-icon">📊</div>
                        <div class="node-title">Aurora &amp; APM</div>
                        <div class="node-sub">Datadog Tracing</div>
                    </div>
                </div>

                <div class="sim-dashboard">
                    <div class="sim-metrics">
                        <div class="metric-cell">
                            <span class="m-val" id="sim-metric-tx">1,420,890</span>
                            <span class="m-lbl">EVENTS PROCESSED</span>
                        </div>
                        <div class="metric-cell">
                            <span class="m-val" id="sim-metric-lat">11.4ms</span>
                            <span class="m-lbl">P99 LATENCY</span>
                        </div>
                        <div class="metric-cell">
                            <span class="m-val success">0.00%</span>
                            <span class="m-lbl">ERROR RATE</span>
                        </div>
                        <div class="metric-cell">
                            <span class="m-val highlight">99.99%</span>
                            <span class="m-lbl">AVAILABILITY SLA</span>
                        </div>
                    </div>

                    <div class="sim-terminal">
                        <div class="sim-term-header">
                            <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
                            <span class="term-title">distributed-trace-log.stdout</span>
                        </div>
                        <div class="sim-log-feed" id="sim-log-feed">
                            <div class="log-line info">[SYSTEM] Credit Bureau subscriber microservices active on AWS. EventBridge ready.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    bindEvents() {
        const dispatchBtn = document.getElementById('sim-dispatch-btn');
        const streamBtn = document.getElementById('sim-stream-btn');
        const streamStatus = document.getElementById('sim-stream-status');

        if (dispatchBtn) {
            dispatchBtn.addEventListener('click', () => {
                if (window.cyberAudio) window.cyberAudio.playClick();
                this.dispatchTransaction();
            });
        }

        if (streamBtn) {
            streamBtn.addEventListener('click', () => {
                this.isRunning = !this.isRunning;
                if (streamStatus) streamStatus.textContent = this.isRunning ? 'ON' : 'OFF';
                streamBtn.classList.toggle('active', this.isRunning);

                if (window.cyberAudio) window.cyberAudio.playClick();

                if (this.isRunning) {
                    this.dispatchTransaction();
                    this.streamInterval = setInterval(() => this.dispatchTransaction(), 2200);
                } else {
                    clearInterval(this.streamInterval);
                }
            });
        }
    }

    dispatchTransaction() {
        this.txCount++;
        const txMetric = document.getElementById('sim-metric-tx');
        if (txMetric) txMetric.textContent = this.txCount.toLocaleString();

        const latency = (8 + Math.random() * 5).toFixed(1);
        const latMetric = document.getElementById('sim-metric-lat');
        if (latMetric) latMetric.textContent = `${latency}ms`;

        const traceId = 'tr_' + Math.random().toString(36).substring(2, 10);
        const subId = 'SUB-' + Math.floor(100000 + Math.random() * 900000);

        this.addLog(`[${this.getTimestamp()}] [INFO] Received POST /subscribers/notify (trace_id=${traceId}, sub_id=${subId})`, 'info');

        const nodes = [1, 2, 3, 4, 5, 6].map(i => document.getElementById(`pnode-${i}`));

        // Sequence pipeline lights
        nodes.forEach((node, idx) => {
            if (!node) return;
            setTimeout(() => {
                node.classList.add('active');
                if (window.cyberAudio) window.cyberAudio.playPacket();

                if (idx === 1) {
                    this.addLog(`[${this.getTimestamp()}] [AWS-KMS] Envelope encryption active. Key CMK verified. OAuth2 token authorized.`, 'detail');
                } else if (idx === 2) {
                    this.addLog(`[${this.getTimestamp()}] [JAVA 21] Virtual thread dispatched payload. Resilience4j breaker state: CLOSED.`, 'detail');
                } else if (idx === 3) {
                    this.addLog(`[${this.getTimestamp()}] [EVENTBRIDGE] Event routed to subscriber rule bus. Persisted to SQS DLQ failover.`, 'detail');
                } else if (idx === 4) {
                    this.addLog(`[${this.getTimestamp()}] [LAMBDA] Serverless worker invoked in 3.8ms. Notification payload processed.`, 'detail');
                } else if (idx === 5) {
                    this.addLog(`[${this.getTimestamp()}] [DATADOG APM] Aurora commit verified. Trace span flushed to Datadog. P99=${latency}ms.`, 'success');
                    if (window.cyberAudio) window.cyberAudio.playSuccess();
                }

                setTimeout(() => {
                    node.classList.remove('active');
                }, 400);
            }, idx * 260);
        });
    }

    addLog(msg, type = 'info') {
        const feed = document.getElementById('sim-log-feed');
        if (!feed) return;

        const line = document.createElement('div');
        line.className = `log-line ${type}`;
        line.textContent = msg;
        feed.appendChild(line);

        // Keep last 15 logs
        while (feed.children.length > 15) {
            feed.removeChild(feed.firstChild);
        }

        feed.scrollTop = feed.scrollHeight;
    }

    getTimestamp() {
        const now = new Date();
        return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('event-simulator')) {
        window.eventPipeline = new EventPipelineSimulator('event-simulator');
    }
});

