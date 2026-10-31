/**
 * app.js - Main Controller for NEO•CHURN Real-Time Problem Analysis Dashboard
 * Pure JavaScript, Canvas Neon Rendering, Web Audio API Soundscapes, Reactive UI
 */

(function () {
  'use strict';

  // --- Web Audio Cyber FX Engine ---
  class CyberAudio {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    init() {
      if (!this.ctx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playTone(freq, type = 'sine', duration = 0.08, gainVal = 0.05) {
      if (this.muted) return;
      try {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio might be blocked until user interaction
      }
    }

    blipHigh() { this.playTone(880, 'sine', 0.07, 0.04); }
    blipLow() { this.playTone(330, 'triangle', 0.12, 0.06); }
    alertWarning() {
      this.playTone(440, 'sawtooth', 0.15, 0.04);
      setTimeout(() => this.playTone(660, 'sine', 0.12, 0.04), 80);
    }
    actionSuccess() {
      this.playTone(523.25, 'sine', 0.08, 0.04);
      setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.04), 60);
      setTimeout(() => this.playTone(783.99, 'sine', 0.15, 0.05), 120);
    }
  }

  const audio = new CyberAudio();

  // --- Dynamic Particle & Hex Grid Canvas Background ---
  function initCyberBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 55;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(0, 243, 255, ' : 'rgba(255, 0, 127, '
      });
    }

    function renderBg() {
      ctx.clearRect(0, 0, width, height);

      // Subtle Digital Hex Grid lines
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Floating E-Commerce Data Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = p.color + '0.7)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + '0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.15 * (1 - dist / 110)})`;
            ctx.shadowBlur = 0;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderBg);
    }

    renderBg();
  }

  // --- Real-Time Neon Line & Area Canvas Chart ---
  class NeonTrendChart {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.dataPoints = [15.2, 14.8, 15.5, 16.1, 15.8, 14.9, 15.2, 14.6, 15.1, 14.9];
      this.maxPoints = 25;
      this.threshold = 18.0; // Critical danger line
      this.initResize();
    }

    initResize() {
      const resize = () => {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width * window.devicePixelRatio;
        this.canvas.height = rect.height * window.devicePixelRatio;
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.render();
      };
      window.addEventListener('resize', resize);
      setTimeout(resize, 50);
    }

    addDataPoint(val) {
      this.dataPoints.push(val);
      if (this.dataPoints.length > this.maxPoints) {
        this.dataPoints.shift();
      }
      this.render();
    }

    render() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const ctx = this.ctx;

      ctx.clearRect(0, 0, w, h);

      if (this.dataPoints.length < 2) return;

      const paddingLeft = 40;
      const paddingRight = 20;
      const paddingTop = 20;
      const paddingBottom = 30;

      const plotW = w - paddingLeft - paddingRight;
      const plotH = h - paddingTop - paddingBottom;

      const minVal = 5;
      const maxVal = 30;

      const getY = (val) => paddingTop + plotH - ((val - minVal) / (maxVal - minVal)) * plotH;
      const getX = (idx) => paddingLeft + (idx / (this.dataPoints.length - 1)) * plotW;

      // Draw Grid Lines & Labels
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.fillStyle = '#64748b';
      ctx.font = '10px JetBrains Mono, monospace';
      ctx.textAlign = 'right';

      [10, 15, 20, 25].forEach(level => {
        const y = getY(level);
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(w - paddingRight, y);
        ctx.stroke();
        ctx.fillText(`${level}%`, paddingLeft - 8, y + 3);
      });

      // Danger Threshold Line (18%)
      const threshY = getY(this.threshold);
      ctx.strokeStyle = 'rgba(255, 0, 85, 0.45)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, threshY);
      ctx.lineTo(w - paddingRight, threshY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#ff0055';
      ctx.fillText('CRITICAL THRESHOLD', w - paddingRight, threshY - 6);

      // Area Fill under Neon Trend Line
      const gradient = ctx.createLinearGradient(0, paddingTop, 0, h - paddingBottom);
      gradient.addColorStop(0, 'rgba(0, 243, 255, 0.35)');
      gradient.addColorStop(0.6, 'rgba(0, 243, 255, 0.08)');
      gradient.addColorStop(1, 'rgba(0, 243, 255, 0.0)');

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(this.dataPoints[0]));
      for (let i = 1; i < this.dataPoints.length; i++) {
        const xc = (getX(i) + getX(i - 1)) / 2;
        const yc = (getY(this.dataPoints[i]) + getY(this.dataPoints[i - 1])) / 2;
        ctx.quadraticCurveTo(getX(i - 1), getY(this.dataPoints[i - 1]), xc, yc);
      }
      const lastIdx = this.dataPoints.length - 1;
      ctx.lineTo(getX(lastIdx), getY(this.dataPoints[lastIdx]));
      ctx.lineTo(getX(lastIdx), h - paddingBottom);
      ctx.lineTo(getX(0), h - paddingBottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Glowing Trend Stroke
      ctx.save();
      ctx.strokeStyle = '#00f3ff';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(this.dataPoints[0]));
      for (let i = 1; i < this.dataPoints.length; i++) {
        const xc = (getX(i) + getX(i - 1)) / 2;
        const yc = (getY(this.dataPoints[i]) + getY(this.dataPoints[i - 1])) / 2;
        ctx.quadraticCurveTo(getX(i - 1), getY(this.dataPoints[i - 1]), xc, yc);
      }
      ctx.lineTo(getX(lastIdx), getY(this.dataPoints[lastIdx]));
      ctx.stroke();
      ctx.restore();

      // Highlight Last Point with Radar Dot
      const lastX = getX(lastIdx);
      const lastY = getY(this.dataPoints[lastIdx]);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // --- Main Application State & Controller ---
  class NeoChurnApp {
    constructor() {
      this.churnEngine = new ChurnEngine();
      this.trendChart = new NeonTrendChart('trendChart');
      this.currentFilter = 'ALL';
      this.searchQuery = '';
      this.latestCohortData = null;

      // Initialize Simulator
      this.simulator = new ECommerceSimulator(
        this.churnEngine,
        (event) => this.handleIncomingEvent(event),
        (batchResults) => this.renderDashboard(batchResults)
      );

      this.bindDOM();
      initCyberBackground();

      // Initial cohort scoring & simulation kick-off
      this.simulator.evaluateAndPublishBatch();
      this.simulator.start();
    }

    bindDOM() {
      // Audio toggle
      const audioBtn = document.getElementById('audioToggleBtn');
      if (audioBtn) {
        audioBtn.addEventListener('click', () => {
          audio.muted = !audio.muted;
          audioBtn.classList.toggle('active', !audio.muted);
          audioBtn.innerHTML = audio.muted ? '🔇 SOUND OFF' : '🔊 SOUND ON';
          if (!audio.muted) audio.blipHigh();
        });
      }

      // Stream pause/resume toggle
      const streamBtn = document.getElementById('streamToggleBtn');
      if (streamBtn) {
        streamBtn.addEventListener('click', () => {
          if (this.simulator.isRunning) {
            this.simulator.stop();
            streamBtn.innerHTML = '▶ RESUME RADAR';
            streamBtn.classList.remove('active');
            document.getElementById('radarStatusText').textContent = 'RADAR PAUSED';
            document.getElementById('radarBeaconDot').style.background = '#888';
          } else {
            this.simulator.start();
            streamBtn.innerHTML = '⏸ PAUSE RADAR';
            streamBtn.classList.add('active');
            document.getElementById('radarStatusText').textContent = 'LIVE RADAR ACTIVE';
            document.getElementById('radarBeaconDot').style.background = 'var(--neon-lime)';
          }
          audio.blipHigh();
        });
      }

      // Scenario Sliders
      const deliverySlider = document.getElementById('simDeliveryDelay');
      const supportSlider = document.getElementById('simSupportEfficiency');
      const discountSlider = document.getElementById('simRetentionDiscount');

      const handleSliderChange = () => {
        const deliveryVal = parseFloat(deliverySlider.value);
        const supportVal = parseFloat(supportSlider.value);
        const discountVal = parseFloat(discountSlider.value) / 100;

        document.getElementById('valDeliveryDelay').textContent = `${deliveryVal > 0 ? '+' : ''}${deliveryVal.toFixed(1)} Days`;
        document.getElementById('valSupportEfficiency').textContent = `${supportVal.toFixed(1)}x`;
        document.getElementById('valRetentionDiscount').textContent = `${Math.round(discountVal * 100)}%`;

        this.simulator.updateModifiers({
          deliveryDelayDelta: deliveryVal,
          supportEfficiency: supportVal,
          retentionDiscount: discountVal
        });

        audio.blipLow();
      };

      if (deliverySlider) deliverySlider.addEventListener('input', handleSliderChange);
      if (supportSlider) supportSlider.addEventListener('input', handleSliderChange);
      if (discountSlider) discountSlider.addEventListener('input', handleSliderChange);

      // Filter Tabs
      const tabs = document.querySelectorAll('.filter-tab');
      tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentFilter = tab.getAttribute('data-filter');
          this.renderCustomerTable();
          audio.blipHigh();
        });
      });

      // Search input
      const searchInput = document.getElementById('custSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          this.renderCustomerTable();
        });
      }

      // Modal close handlers
      const modal = document.getElementById('customerDetailModal');
      const closeBtn = document.getElementById('modalCloseBtn');
      if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('open'));
        modal.addEventListener('click', (e) => {
          if (e.target === modal) modal.classList.remove('open');
        });
      }

      // Export report button
      const exportBtn = document.getElementById('exportReportBtn');
      if (exportBtn) {
        exportBtn.addEventListener('click', () => this.exportExecutiveReport());
      }
    }

    handleIncomingEvent(event) {
      // Audio notification
      if (event.riskShiftDirection === 'up') {
        audio.alertWarning();
      } else {
        audio.blipHigh();
      }

      // Append to live ticker
      const tickerContainer = document.getElementById('liveStreamTicker');
      if (!tickerContainer) return;

      const eventEl = document.createElement('div');
      eventEl.className = 'stream-event-item';
      eventEl.innerHTML = `
        <div class="event-icon-box" style="border: 1px solid ${event.color}; color: ${event.color}">
          ${event.icon}
        </div>
        <div class="event-content">
          <div class="event-header-row">
            <span class="event-badge" style="color: ${event.color}">${event.badge}</span>
            <span class="event-time">${event.timestamp}</span>
          </div>
          <div class="event-desc">${event.message}</div>
        </div>
        <div class="event-risk-pill ${event.riskShiftDirection}">
          ${event.riskShift}
        </div>
      `;

      tickerContainer.insertBefore(eventEl, tickerContainer.firstChild);

      // Keep max 25 items in ticker
      while (tickerContainer.children.length > 25) {
        tickerContainer.removeChild(tickerContainer.lastChild);
      }
    }

    renderDashboard(cohortData) {
      this.latestCohortData = cohortData;

      // Update KPI Cards
      const churnValEl = document.getElementById('kpiChurnRate');
      const revValEl = document.getElementById('kpiRevenueAtRisk');
      const retValEl = document.getElementById('kpiRetentionRate');
      const custCountEl = document.getElementById('kpiMonitoredCohort');

      if (churnValEl) churnValEl.textContent = `${cohortData.avgChurnRate}%`;
      if (revValEl) revValEl.textContent = `$${cohortData.totalRevenueAtRisk.toLocaleString()}`;
      if (retValEl) retValEl.textContent = `${cohortData.retentionRate}%`;
      if (custCountEl) custCountEl.textContent = `${cohortData.customers.length} Accts`;

      // Update Trend Chart
      this.trendChart.addDataPoint(cohortData.avgChurnRate);

      // Render Problem Breakdown / Root Causes
      this.renderProblemBreakdown(cohortData.driverInsights);

      // Render Dynamic Strategic AI Insights
      this.renderAIInsights(cohortData);

      // Render Customer Roster Table
      this.renderCustomerTable();

      // Update Scenario impact banner
      const projectedSavings = Math.round(cohortData.totalRevenueAtRisk * (cohortData.retentionRate / 100) * 0.28);
      const impactEl = document.getElementById('simProjectedSavings');
      if (impactEl) impactEl.textContent = `+$${projectedSavings.toLocaleString()}`;
    }

    renderProblemBreakdown(drivers) {
      const container = document.getElementById('problemBreakdownList');
      if (!container) return;

      const colors = ['fill-magenta', 'fill-amber', 'fill-cyan', 'fill-purple'];

      container.innerHTML = drivers.slice(0, 4).map((d, idx) => {
        const colorClass = colors[idx % colors.length];
        return `
          <div class="problem-item">
            <div class="problem-header">
              <span class="problem-name">
                <span style="color: var(--neon-cyan)">#0${idx + 1}</span> ${d.name}
              </span>
              <span class="problem-stat">${d.percentage}% of At-Risk Users</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill ${colorClass}" style="width: ${Math.min(100, d.percentage * 2)}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    renderAIInsights(cohortData) {
      const deck = document.getElementById('insightsDeck');
      if (!deck) return;

      const insights = this.churnEngine.generateInsights(cohortData);

      deck.innerHTML = insights.map((ins, idx) => `
        <div class="insight-card" style="border-left-color: ${ins.color}; border-color: ${ins.color}44">
          <div class="insight-top">
            <span class="insight-badge" style="background: ${ins.color}22; color: ${ins.color}; border: 1px solid ${ins.color}">
              ${ins.badge}
            </span>
            <span style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono)">LIVE INFERENCE</span>
          </div>
          <div class="insight-title">${ins.title}</div>
          <div class="insight-desc">${ins.description}</div>
          <div class="insight-action-box">
            <span class="action-text">⚡ <strong>Prescribed Action:</strong> ${ins.action}</span>
            <button class="action-trigger-btn" onclick="window.NeoApp.executeCohortMitigation('${ins.type}')">
              AUTO-DEPLOY
            </button>
          </div>
        </div>
      `).join('');
    }

    renderCustomerTable() {
      const tbody = document.getElementById('customerTableBody');
      if (!tbody || !this.latestCohortData) return;

      let list = this.latestCohortData.customers;

      // Apply Filter
      if (this.currentFilter !== 'ALL') {
        if (this.currentFilter === 'VIP') {
          list = list.filter(c => c.segment === 'VIP Tier');
        } else {
          list = list.filter(c => c.risk.riskTier === this.currentFilter);
        }
      }

      // Apply Search
      if (this.searchQuery) {
        list = list.filter(c => 
          c.name.toLowerCase().includes(this.searchQuery) ||
          c.id.toLowerCase().includes(this.searchQuery) ||
          c.email.toLowerCase().includes(this.searchQuery)
        );
      }

      tbody.innerHTML = list.slice(0, 15).map(c => {
        const topDriver = c.risk.primaryDrivers[0]?.name || 'Routine Recency';
        return `
          <tr>
            <td>
              <div class="cust-name-cell">${c.name}</div>
              <div class="cust-sub">${c.id} • ${c.city}</div>
            </td>
            <td>
              <span class="risk-tier-pill" style="background: rgba(0, 243, 255, 0.12); color: #00f3ff; border: 1px solid rgba(0,243,255,0.3)">
                ${c.segment}
              </span>
            </td>
            <td>
              <div class="risk-bar-container">
                <span class="risk-num" style="color: ${c.risk.tierColor}">${c.risk.churnScore}%</span>
                <div class="progress-track" style="flex-grow: 1; height: 6px;">
                  <div class="progress-fill" style="width: ${c.risk.churnScore}%; background: ${c.risk.tierColor}; box-shadow: 0 0 8px ${c.risk.tierColor}"></div>
                </div>
              </div>
            </td>
            <td>
              <span class="risk-tier-pill" style="background: ${c.risk.tierColor}20; color: ${c.risk.tierColor}; border: 1px solid ${c.risk.tierColor}">
                ${c.risk.riskTier}
              </span>
            </td>
            <td>
              <span style="font-size: 12px; color: var(--text-secondary)">${topDriver}</span>
            </td>
            <td>
              <div style="font-family: var(--font-mono); font-weight: 700;">$${c.clv.toLocaleString()}</div>
              <div style="font-size: 11px; color: var(--neon-magenta);">$${c.risk.revenueAtRisk.toLocaleString()} at risk</div>
            </td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="quick-action-btn" onclick="window.NeoApp.triggerAction('${c.id}', 'VIP_CONCIERGE')">Concierge</button>
                <button class="quick-action-btn" onclick="window.NeoApp.triggerAction('${c.id}', 'EXPRESS_VOUCHER')">Voucher</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    triggerAction(customerId, actionType) {
      const res = this.simulator.applyActionToCustomer(customerId, actionType);
      if (res && res.success) {
        audio.actionSuccess();
        this.showToast(`🚀 ${res.message} Churn risk reduced to ${res.newRisk.churnScore}%!`);
      }
    }

    executeCohortMitigation(type) {
      // Apply systemic intervention across high risk customers
      let count = 0;
      this.simulator.customers.forEach(c => {
        if (c.deliveryDelayDays > 2) {
          c.deliveryDelayDays = 0;
          count++;
        }
        if (c.supportTickets > 0) {
          c.supportTickets = 0;
          count++;
        }
      });

      this.simulator.evaluateAndPublishBatch();
      audio.actionSuccess();
      this.showToast(`🛡️ Automated AI Retention Protocol deployed across ${count} affected customer touchpoints!`);
    }

    showToast(message) {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = `<span>⚡</span><div>${message}</div>`;
      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(40px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4200);
    }

    exportExecutiveReport() {
      if (!this.latestCohortData) return;
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.latestCohortData, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `neo_churn_problem_analysis_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      audio.blipHigh();
      this.showToast('📊 Executive Churn Intelligence Report exported successfully.');
    }
  }

  // Launch on DOM ready
  window.addEventListener('DOMContentLoaded', () => {
    window.NeoApp = new NeoChurnApp();
  });
})();
