# 🛍️ NEO•CHURN // E-Commerce Customer Churn Real-Time Intelligence

A real-time, interactive **E-Commerce Customer Churn Problem Analysis Dashboard** built using **pure JavaScript, HTML5 Canvas, and modern CSS3** with a **Cyberpunk Neon aesthetic** and dark e-commerce theme.

---

## ⚡ Key Highlights & Features

1. **Pure JavaScript Analytics Engine (`churnEngine.js`)**:
   - Multi-factor probabilistic logistic regression churn scoring model:
     $$P(\text{churn}) = \frac{1}{1 + e^{-z}}$$
   - Evaluates **Recency, Frequency, Monetary value (RFM)**, delivery friction, unresolved support tickets, return rates, cart abandonment ratios, and discount sensitivity.
   - Dynamic **Root Cause Attribution** that diagnoses exactly why each customer is at risk.

2. **Real-Time Problem Analysis & Insights**:
   - **Executive Neon KPI Deck**: Real-time Churn Rate, Revenue at Risk ($), Retention Index (%), and Monitored Cohort size.
   - **Live Problem Root Causes**: Dynamic ranking of churn drivers (Logistics delays, Support bottlenecks, Cart abandonment, Dormancy cliff).
   - **Strategic AI Insights Deck**: Generates actionable diagnoses with 1-click mitigation deployment buttons (`AUTO-DEPLOY`).
   - **Interactive "What-If" Scenario Simulator**: Real-time sliders for Shipping Latency, Support Efficiency, and Retention Discounts to project revenue savings in real-time.

3. **High-Velocity Live Event Stream (`simulation.js`)**:
   - Simulates streaming e-commerce events (abandoned checkouts, delayed deliveries, support escalations, confirmed purchases, VIP win-backs).
   - Live radar beacon and real-time event ticker with delta risk shifts (`+16% Risk`, `-18% Risk`).

4. **Neon Cyberpunk E-Commerce Visuals (`style.css` & `app.js`)**:
   - Deep obsidian background with an animated **dynamic particle & digital hex grid canvas**.
   - Radiant neon glowing color palette: **Neon Cyan (`#00f3ff`)**, **Neon Magenta (`#ff007f`)**, **Neon Amber (`#ffaa00`)**, **Neon Lime (`#00ff88`)**, and **Neon Purple (`#9d00ff`)**.
   - Custom **Neon Trend Chart** drawn on HTML5 Canvas with glowing gradients, quadratic curve smoothing, and critical risk threshold markers.
   - Built-in **Cyber Audio Synthesizer** (Web Audio API) for auditory feedback on risk shifts and actions.

5. **Customer Risk Matrix & Action Ledger**:
   - Searchable, filterable ledger across risk tiers (Critical, High, Moderate, Safe, VIP).
   - Instant dispatch buttons: `Concierge`, `Express Voucher`, and `Win-Back 15%`.
   - **Export Intelligence**: Export real-time cohort diagnostic data to JSON with a single click.

---

## 🚀 How to Run

### Method 1: Instant Browser Launch
Double-click [`index.html`](index.html) or run in PowerShell:
```powershell
Start-Process "index.html"
```

### Method 2: Local HTTP Server (Python)
Double-click [`run_dashboard.bat`](run_dashboard.bat) or run:
```powershell
python server.py
```
Then visit **http://localhost:8080/index.html** in your browser.
