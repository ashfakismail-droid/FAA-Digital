/* =====================================================
   NovaAI Dashboard Script
   Chart.js initialization, LocalStorage hooks, and interactions
===================================================== */

// LocalStorage configuration & helpers
const STORAGE_KEY = 'novaAI_dashboard_state';

const getStoredState = () => {
  try {
    const state = localStorage.getItem(STORAGE_KEY);
    return state ? JSON.parse(state) : {
      theme: 'dark',
      refreshInterval: 30,
      lastVisited: null
    };
  } catch (e) {
    return { theme: 'dark', refreshInterval: 30, lastVisited: null };
  }
};

const saveStoredState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...getStoredState(),
      ...state,
      lastVisited: new Date().toISOString()
    }));
  } catch (e) {
    console.warn('Failed to save dashboard state');
  }
};

// Initialize state on load
document.addEventListener('DOMContentLoaded', () => {
  const state = getStoredState();
  saveStoredState({});
});

// Credit Usage Chart - Chart.js
const creditCtx = document.getElementById('creditChart');
if (creditCtx) {
  const creditChart = new Chart(creditCtx, {
    type: 'line',
    data: {
      labels: ['Jul 1', 'Jul 4', 'Jul 7', 'Jul 10', 'Jul 13', 'Jul 16', 'Jul 19', 'Jul 22', 'Jul 25', 'Jul 28', 'Jul 31'],
      datasets: [{
        label: 'Credits Used',
        data: [2100, 3200, 2800, 4500, 3900, 5200, 4800, 6100, 5700, 7200, 8452],
        borderColor: '#00f0ff',
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: '#00f0ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(18, 18, 40, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#b8c1d1',
          borderColor: 'rgba(0, 240, 255, 0.3)',
          borderWidth: 1
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: '#8a94a6', font: { size: 11 } }
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0, 240, 255, 0.05)' },
          ticks: { 
            color: '#8a94a6', 
            font: { size: 11 },
            callback: (value) => value / 1000 + 'k'
          }
        }
      }
    }
  });
}

// Simulate real-time updates
setInterval(() => {
  const cards = document.querySelectorAll('.analytics-value');
  cards.forEach(card => {
    const currentValue = parseInt(card.textContent.replace(/,/g, ''));
    if (!isNaN(currentValue) && card.textContent.includes('/')) return;
    const change = Math.floor(Math.random() * 100) - 50;
    const newValue = Math.max(0, currentValue + change);
    if (!isNaN(newValue) && Math.random() > 0.7) {
      card.textContent = newValue.toLocaleString();
    }
  });
}, 5000);