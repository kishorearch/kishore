/**
 * Simulation.js - Real-Time E-Commerce Customer Event Stream Generator
 * Simulates high-velocity e-commerce user activity, streaming events, and dynamic state transitions.
 */

class ECommerceSimulator {
  constructor(churnEngine, onEventCallback, onBatchUpdateCallback) {
    this.churnEngine = churnEngine;
    this.onEventCallback = onEventCallback;
    this.onBatchUpdateCallback = onBatchUpdateCallback;
    this.isRunning = false;
    this.timerId = null;
    this.tickRateMs = 2400; // Simulated event interval
    this.eventCounter = 0;

    // Operational Scenario Modifiers (Controllable via UI)
    this.scenarioModifiers = {
      deliveryDelayDelta: 0, // In days (-3 to +5)
      supportEfficiency: 1.0, // Multiplier (0.5x to 3.0x)
      retentionDiscount: 0.05 // Fraction (0 to 0.30)
    };

    // Pre-populate customer cohort
    this.customers = this.generateInitialCohort(120);
  }

  generateInitialCohort(size = 120) {
    const firstNames = ['Aria', 'Leo', 'Zara', 'Marcus', 'Elena', 'Kaelen', 'Nova', 'Liam', 'Maya', 'Julian', 'Sofia', 'Dante', 'Chloe', 'Axel', 'Amara', 'Ezra', 'Mira', 'Vance', 'Sora', 'Talia'];
    const lastNames = ['Vance', 'Mercer', 'Sterling', 'Chen', 'Sinclair', 'Cross', 'Novak', 'Reyes', 'Takahashi', 'Frost', 'Kovacs', 'Drake', 'Moreau', 'Hawthorne', 'Holt', 'Vargas'];
    const segments = ['VIP Tier', 'Loyal Regular', 'Occasional', 'At-Risk Bargain'];
    const cities = ['Neo Tokyo', 'New York', 'London', 'Berlin', 'Singapore', 'Seoul', 'San Francisco', 'Toronto'];

    const cohort = [];
    for (let i = 1; i <= size; i++) {
      const fName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const segment = segments[Math.floor(Math.random() * segments.length)];
      const orders = segment === 'VIP Tier' ? Math.floor(Math.random() * 25) + 12 :
                     segment === 'Loyal Regular' ? Math.floor(Math.random() * 12) + 4 :
                     Math.floor(Math.random() * 4) + 1;

      const avgOrder = segment === 'VIP Tier' ? Math.floor(Math.random() * 280) + 160 :
                       segment === 'Loyal Regular' ? Math.floor(Math.random() * 140) + 70 :
                       Math.floor(Math.random() * 60) + 30;

      const clv = orders * avgOrder;
      const daysSinceLastOrder = segment === 'At-Risk Bargain' ? Math.floor(Math.random() * 80) + 35 :
                                 segment === 'VIP Tier' ? Math.floor(Math.random() * 28) + 3 :
                                 Math.floor(Math.random() * 60) + 5;

      const customer = {
        id: `CUST-${1000 + i}`,
        name: `${fName} ${lName}`,
        email: `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@nexusmarket.io`,
        city: cities[Math.floor(Math.random() * cities.length)],
        segment,
        ordersCount: orders,
        avgOrderValue: avgOrder,
        clv,
        daysSinceLastOrder,
        deliveryDelayDays: +(Math.random() * 3.5).toFixed(1),
        supportTickets: Math.floor(Math.random() * 3),
        returnRate: +(Math.random() * 0.28).toFixed(2),
        cartAbandonmentRate: +(Math.random() * 0.65).toFixed(2),
        discountSensitivity: +(Math.random() * 0.8 + 0.2).toFixed(2),
        sessionDropRatio: +(Math.random() * 0.7).toFixed(2),
        lastActivity: 'Active in session'
      };

      cohort.push(customer);
    }
    return cohort;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.scheduleNextTick();
  }

  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  setTickRate(ms) {
    this.tickRateMs = Math.max(800, ms);
  }

  updateModifiers(newMods) {
    this.scenarioModifiers = { ...this.scenarioModifiers, ...newMods };
    this.evaluateAndPublishBatch();
  }

  scheduleNextTick() {
    if (!this.isRunning) return;
    this.timerId = setTimeout(() => {
      this.simulateNextEvent();
      this.scheduleNextTick();
    }, this.tickRateMs + (Math.random() * 400 - 200));
  }

  simulateNextEvent() {
    this.eventCounter++;
    const randomCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
    const eventTypes = [
      'CART_ABANDONED',
      'DELIVERY_DELAYED',
      'SUPPORT_ESCALATED',
      'ORDER_PURCHASED',
      'PROMO_OPENED',
      'RETURN_REQUESTED'
    ];

    // Weight distribution towards problem detection
    const roll = Math.random();
    let type = 'ORDER_PURCHASED';
    if (roll < 0.28) type = 'CART_ABANDONED';
    else if (roll < 0.50) type = 'DELIVERY_DELAYED';
    else if (roll < 0.68) type = 'SUPPORT_ESCALATED';
    else if (roll < 0.80) type = 'RETURN_REQUESTED';
    else if (roll < 0.92) type = 'ORDER_PURCHASED';
    else type = 'PROMO_OPENED';

    let eventDetail = {};
    const prevRisk = this.churnEngine.calculateCustomerRisk(randomCustomer, this.scenarioModifiers);

    switch (type) {
      case 'CART_ABANDONED': {
        const cartValue = Math.floor(Math.random() * 220) + 45;
        randomCustomer.cartAbandonmentRate = Math.min(0.95, randomCustomer.cartAbandonmentRate + 0.12);
        eventDetail = {
          icon: '🛒',
          badge: 'ABANDONMENT',
          color: '#ffaa00',
          customer: randomCustomer,
          message: `${randomCustomer.name} dropped cart ($${cartValue}) at payment gateway`,
          riskShift: '+8% Risk',
          riskShiftDirection: 'up'
        };
        break;
      }
      case 'DELIVERY_DELAYED': {
        const delayDays = Math.floor(Math.random() * 4) + 2;
        randomCustomer.deliveryDelayDays += delayDays;
        eventDetail = {
          icon: '📦',
          badge: 'LOGISTICS DELAY',
          color: '#ff0055',
          customer: randomCustomer,
          message: `Package shipment delayed by ${delayDays} days for ${randomCustomer.name}`,
          riskShift: '+16% Risk',
          riskShiftDirection: 'up'
        };
        break;
      }
      case 'SUPPORT_ESCALATED': {
        randomCustomer.supportTickets += 1;
        eventDetail = {
          icon: '⚠️',
          badge: 'SUPPORT TICKET',
          color: '#ff007f',
          customer: randomCustomer,
          message: `Urgent dispute ticket #${Math.floor(Math.random() * 8000 + 1000)} opened by ${randomCustomer.name}`,
          riskShift: '+14% Risk',
          riskShiftDirection: 'up'
        };
        break;
      }
      case 'RETURN_REQUESTED': {
        randomCustomer.returnRate = Math.min(0.85, randomCustomer.returnRate + 0.15);
        eventDetail = {
          icon: '🔄',
          badge: 'PRODUCT RETURN',
          color: '#9d00ff',
          customer: randomCustomer,
          message: `${randomCustomer.name} initiated return on recent apparel order`,
          riskShift: '+9% Risk',
          riskShiftDirection: 'up'
        };
        break;
      }
      case 'ORDER_PURCHASED': {
        const orderVal = Math.floor(Math.random() * 190) + 50;
        randomCustomer.ordersCount += 1;
        randomCustomer.clv += orderVal;
        randomCustomer.daysSinceLastOrder = 0;
        randomCustomer.deliveryDelayDays = Math.max(0, randomCustomer.deliveryDelayDays - 0.5);
        eventDetail = {
          icon: '⚡',
          badge: 'NEW ORDER',
          color: '#00ff88',
          customer: randomCustomer,
          message: `${randomCustomer.name} placed confirmed order of $${orderVal}`,
          riskShift: '-18% Risk',
          riskShiftDirection: 'down'
        };
        break;
      }
      case 'PROMO_OPENED': {
        randomCustomer.daysSinceLastOrder = Math.max(1, randomCustomer.daysSinceLastOrder - 4);
        eventDetail = {
          icon: '🏷️',
          badge: 'RETENTION ENGAGED',
          color: '#00f3ff',
          customer: randomCustomer,
          message: `${randomCustomer.name} clicked neon personalized VIP deal`,
          riskShift: '-7% Risk',
          riskShiftDirection: 'down'
        };
        break;
      }
    }

    const newRisk = this.churnEngine.calculateCustomerRisk(randomCustomer, this.scenarioModifiers);
    eventDetail.oldScore = prevRisk.churnScore;
    eventDetail.newScore = newRisk.churnScore;
    eventDetail.timestamp = new Date().toLocaleTimeString();

    if (this.onEventCallback) {
      this.onEventCallback(eventDetail);
    }

    this.evaluateAndPublishBatch();
  }

  evaluateAndPublishBatch() {
    const cohortResults = this.churnEngine.evaluateCohort(this.customers, this.scenarioModifiers);
    if (this.onBatchUpdateCallback) {
      this.onBatchUpdateCallback(cohortResults);
    }
  }

  applyActionToCustomer(customerId, actionType) {
    const cust = this.customers.find(c => c.id === customerId);
    if (!cust) return null;

    let message = '';
    let discountGranted = 0;

    switch (actionType) {
      case 'VIP_CONCIERGE':
        cust.supportTickets = 0;
        cust.daysSinceLastOrder = Math.max(2, cust.daysSinceLastOrder - 10);
        message = `Personal VIP Concierge dispatched to ${cust.name}. Tickets cleared.`;
        break;
      case 'EXPRESS_VOUCHER':
        cust.deliveryDelayDays = 0;
        cust.discountSensitivity = Math.max(0.1, cust.discountSensitivity - 0.2);
        discountGranted = 20;
        message = `Priority Express Shipping + $20 voucher dispatched to ${cust.name}.`;
        break;
      case 'WINBACK_OFFER':
        cust.cartAbandonmentRate = Math.max(0.05, cust.cartAbandonmentRate - 0.4);
        cust.daysSinceLastOrder = Math.max(1, Math.floor(cust.daysSinceLastOrder * 0.5));
        discountGranted = 15;
        message = `Automated 15% Win-back coupon activated on ${cust.name}'s account.`;
        break;
    }

    this.evaluateAndPublishBatch();

    return {
      success: true,
      message,
      customerId,
      customerName: cust.name,
      newRisk: this.churnEngine.calculateCustomerRisk(cust, this.scenarioModifiers)
    };
  }
}

window.ECommerceSimulator = ECommerceSimulator;
