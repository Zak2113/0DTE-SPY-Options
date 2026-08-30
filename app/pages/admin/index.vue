<!-- app/pages/admin/index.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' , middleware: ['admin']})

const timeframe = ref('30 Days')

const metrics = [
  {
    label: 'Total Users',
    value: '1,284',
    change: '+8.4%',
    positive: true,
  },
  {
    label: 'Active Subscriptions',
    value: '342',
    change: '+12.1%',
    positive: true,
  },
  {
    label: 'New Users',
    value: '87',
    change: '+15.2%',
    positive: true,
  },
  {
    label: 'MRR',
    value: '$9,918',
    change: '+11.3%',
    positive: true,
  },
  {
    label: 'New Subscriptions',
    value: '42',
    change: '+16.7%',
    positive: true,
  },
  {
    label: 'Backtests',
    value: '18,492',
    change: '+23.4%',
    positive: true,
  },
]

const subscriptionStats = [
  {
    label: 'Active',
    value: 342,
    percentage: 26.6,
  },
  {
    label: 'No Subscription',
    value: 942,
    percentage: 73.4,
  },
]

const activeUsers = [
  {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    backtests: 842,
    plan: 'Pro',
  },
  {
    name: 'Daniel Brooks',
    email: 'daniel@example.com',
    backtests: 721,
    plan: 'Pro',
  },
  {
    name: 'Ryan Anderson',
    email: 'ryan@example.com',
    backtests: 604,
    plan: 'Pro',
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    backtests: 491,
    plan: 'Essential',
  },
  {
    name: 'Michael Chen',
    email: 'michael@example.com',
    backtests: 184,
    plan: 'Essential',
  },
]

const popularSymbols = [
  { symbol: 'SPY', count: '4,821', percentage: 100 },
  { symbol: 'QQQ', count: '3,412', percentage: 70.8 },
  { symbol: 'NVDA', count: '2,981', percentage: 61.8 },
  { symbol: 'TSLA', count: '2,104', percentage: 43.6 },
  { symbol: 'AAPL', count: '1,884', percentage: 39.1 },
  { symbol: 'IWM', count: '1,221', percentage: 25.3 },
]

const systemHealth = [
  {
    name: 'Authentication',
    description: 'User authentication and session management',
    status: 'Operational',
  },
  {
    name: 'Database',
    description: 'Primary application database',
    status: 'Operational',
  },
  {
    name: 'Market Data',
    description: 'Historical options market data',
    status: 'Operational',
  },
  {
    name: 'Payments',
    description: 'Subscription and billing services',
    status: 'Operational',
  },
  {
    name: 'Backtest Engine',
    description: 'Backtest execution service',
    status: 'Operational',
  },
]

const backtestStats = [
  {
    label: 'Today',
    value: '684',
  },
  {
    label: 'This Week',
    value: '4,821',
  },
  {
    label: 'This Month',
    value: '18,492',
  },
  {
    label: 'Failed',
    value: '23',
  },
]

const revenuePoints = [
  { x: 0, y: 116 },
  { x: 30, y: 111 },
  { x: 60, y: 113 },
  { x: 90, y: 102 },
  { x: 120, y: 106 },
  { x: 150, y: 91 },
  { x: 180, y: 95 },
  { x: 210, y: 78 },
  { x: 240, y: 82 },
  { x: 270, y: 67 },
  { x: 300, y: 70 },
  { x: 330, y: 55 },
  { x: 360, y: 59 },
  { x: 390, y: 43 },
  { x: 420, y: 48 },
  { x: 450, y: 34 },
  { x: 480, y: 37 },
  { x: 510, y: 22 },
  { x: 540, y: 27 },
  { x: 570, y: 14 },
]

const revenuePath = computed(() => {
  return revenuePoints
    .map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    })
    .join(' ')
})

const revenueAreaPath = computed(() => {
  return `${revenuePath.value} L 570 140 L 0 140 Z`
})

const userGrowthPoints = [
  { x: 0, y: 121 },
  { x: 30, y: 116 },
  { x: 60, y: 118 },
  { x: 90, y: 106 },
  { x: 120, y: 109 },
  { x: 150, y: 99 },
  { x: 180, y: 91 },
  { x: 210, y: 94 },
  { x: 240, y: 82 },
  { x: 270, y: 74 },
  { x: 300, y: 78 },
  { x: 330, y: 61 },
  { x: 360, y: 65 },
  { x: 390, y: 53 },
  { x: 420, y: 48 },
  { x: 450, y: 37 },
  { x: 480, y: 42 },
  { x: 510, y: 29 },
  { x: 540, y: 22 },
  { x: 570, y: 14 },
]

const userGrowthPath = computed(() => {
  return userGrowthPoints
    .map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    })
    .join(' ')
})

const backtestPoints = [
  { x: 0, y: 112 },
  { x: 30, y: 108 },
  { x: 60, y: 115 },
  { x: 90, y: 94 },
  { x: 120, y: 101 },
  { x: 150, y: 87 },
  { x: 180, y: 91 },
  { x: 210, y: 76 },
  { x: 240, y: 82 },
  { x: 270, y: 61 },
  { x: 300, y: 69 },
  { x: 330, y: 52 },
  { x: 360, y: 57 },
  { x: 390, y: 43 },
  { x: 420, y: 49 },
  { x: 450, y: 31 },
  { x: 480, y: 38 },
  { x: 510, y: 25 },
  { x: 540, y: 29 },
  { x: 570, y: 16 },
]

const backtestPath = computed(() => {
  return backtestPoints
    .map((point, index) => {
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    })
    .join(' ')
})

function viewUsers() {
  navigateTo('/admin/users')
}

function viewSystem() {
  navigateTo('/admin/system')
}

function viewUser(user: { email: string }) {
  console.log('View user:', user.email)
}

function changeTimeframe() {
  // Connect this to your analytics API when ready.
  console.log('Timeframe changed:', timeframe.value)
}
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">OVERVIEW</div>

        <h1>Dashboard</h1>

        <p>
          Monitor platform performance, subscriptions, and product usage.
        </p>
      </div>

      <div class="header-controls">
        <select
          v-model="timeframe"
          aria-label="Dashboard timeframe"
          @change="changeTimeframe"
        >
          <option>7 Days</option>
          <option>30 Days</option>
          <option>90 Days</option>
          <option>1 Year</option>
        </select>
      </div>
    </header>

    <!-- Key Metrics -->
    <section class="section">
      <div class="metric-grid">
        <article
          v-for="metric in metrics"
          :key="metric.label"
          class="metric-card"
        >
          <div class="metric-label">
            {{ metric.label }}
          </div>

          <div class="metric-value">
            {{ metric.value }}
          </div>

          <div
            class="metric-change"
            :class="{ positive: metric.positive }"
          >
            <span class="change-arrow">
              {{ metric.positive ? '↑' : '↓' }}
            </span>

            {{ metric.change }}

            <span class="change-period">
              vs previous period
            </span>
          </div>
        </article>
      </div>
    </section>

    <!-- Revenue + User Growth -->
    <section class="section">
      <div class="two-column">
        <!-- Revenue -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                REVENUE
              </div>

              <h2>Monthly Recurring Revenue</h2>

              <p>
                Recurring subscription revenue over the selected period.
              </p>
            </div>

            <div class="chart-value">
              $9,918
            </div>
          </div>

          <div class="chart-container">
            <svg
              class="line-chart"
              viewBox="0 0 570 160"
              preserveAspectRatio="none"
              aria-label="Monthly recurring revenue chart"
            >
              <defs>
                <linearGradient
                  id="revenue-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="var(--accent-color)"
                    stop-opacity="0.12"
                  />

                  <stop
                    offset="100%"
                    stop-color="var(--accent-color)"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>

              <line
                x1="0"
                y1="20"
                x2="570"
                y2="20"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="60"
                x2="570"
                y2="60"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="100"
                x2="570"
                y2="100"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="140"
                x2="570"
                y2="140"
                class="chart-grid-line"
              />

              <path
                :d="revenueAreaPath"
                fill="url(#revenue-gradient)"
              />

              <path
                :d="revenuePath"
                class="chart-line"
              />
            </svg>

            <div class="chart-labels">
              <span>Aug 1</span>
              <span>Aug 8</span>
              <span>Aug 15</span>
              <span>Aug 22</span>
              <span>Aug 30</span>
            </div>
          </div>
        </article>

        <!-- User Growth -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                USER GROWTH
              </div>

              <h2>New Users</h2>

              <p>
                New user registrations over the selected period.
              </p>
            </div>

            <div class="chart-value">
              87
            </div>
          </div>

          <div class="chart-container">
            <svg
              class="line-chart"
              viewBox="0 0 570 160"
              preserveAspectRatio="none"
              aria-label="User growth chart"
            >
              <defs>
                <linearGradient
                  id="users-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stop-color="var(--accent-color)"
                    stop-opacity="0.12"
                  />

                  <stop
                    offset="100%"
                    stop-color="var(--accent-color)"
                    stop-opacity="0"
                  />
                </linearGradient>
              </defs>

              <line
                x1="0"
                y1="20"
                x2="570"
                y2="20"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="60"
                x2="570"
                y2="60"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="100"
                x2="570"
                y2="100"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="140"
                x2="570"
                y2="140"
                class="chart-grid-line"
              />

              <path
                :d="`${userGrowthPath} L 570 140 L 0 140 Z`"
                fill="url(#users-gradient)"
              />

              <path
                :d="userGrowthPath"
                class="chart-line"
              />
            </svg>

            <div class="chart-labels">
              <span>Aug 1</span>
              <span>Aug 8</span>
              <span>Aug 15</span>
              <span>Aug 22</span>
              <span>Aug 30</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Product Usage -->
    <section class="section">
      <div class="two-column">
        <!-- Backtest Activity -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                PRODUCT USAGE
              </div>

              <h2>Backtest Activity</h2>

              <p>
                Backtest execution across the platform.
              </p>
            </div>

            <div class="chart-value">
              18,492
            </div>
          </div>

          <div class="usage-chart">
            <svg
              class="line-chart"
              viewBox="0 0 570 160"
              preserveAspectRatio="none"
              aria-label="Backtest activity chart"
            >
              <line
                x1="0"
                y1="20"
                x2="570"
                y2="20"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="60"
                x2="570"
                y2="60"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="100"
                x2="570"
                y2="100"
                class="chart-grid-line"
              />

              <line
                x1="0"
                y1="140"
                x2="570"
                y2="140"
                class="chart-grid-line"
              />

              <path
                :d="backtestPath"
                class="chart-line"
              />
            </svg>

            <div class="chart-labels">
              <span>Aug 1</span>
              <span>Aug 8</span>
              <span>Aug 15</span>
              <span>Aug 22</span>
              <span>Aug 30</span>
            </div>
          </div>

          <div class="backtest-stats">
            <div
              v-for="stat in backtestStats"
              :key="stat.label"
              class="backtest-stat"
            >
              <span>{{ stat.label }}</span>

              <strong>{{ stat.value }}</strong>
            </div>
          </div>
        </article>

        <!-- Subscriptions -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                SUBSCRIPTIONS
              </div>

              <h2>Subscription Overview</h2>

              <p>
                Current subscription status across all users.
              </p>
            </div>
          </div>

          <div class="subscription-content">
            <div class="subscription-total">
              <div class="subscription-number">
                342
              </div>

              <div class="subscription-label">
                Active subscriptions
              </div>
            </div>

            <div class="subscription-bar">
              <div
                class="subscription-active"
                :style="{
                  width: `${subscriptionStats[0]?.percentage}%`,
                }"
              ></div>
            </div>

            <div class="subscription-legend">
              <div
                v-for="stat in subscriptionStats"
                :key="stat.label"
                class="subscription-item"
              >
                <div class="subscription-item-left">
                  <span
                    class="legend-dot"
                    :class="{
                      active: stat.label === 'Active',
                    }"
                  ></span>

                  <span>{{ stat.label }}</span>
                </div>

                <div class="subscription-item-right">
                  <strong>{{ stat.value }}</strong>

                  <span>{{ stat.percentage }}%</span>
                </div>
              </div>
            </div>

            <div class="conversion-box">
              <div>
                <span class="conversion-label">
                  Paid Conversion
                </span>

                <span class="conversion-description">
                  Percentage of users with an active subscription.
                </span>
              </div>

              <strong>26.6%</strong>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Users + Popular Symbols -->
    <section class="section">
      <div class="two-column">
        <!-- Most Active Users -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                USER ENGAGEMENT
              </div>

              <h2>Most Active Users</h2>

              <p>
                Users with the highest backtest activity.
              </p>
            </div>

            <button
              class="text-button"
              type="button"
              @click="viewUsers"
            >
              View All
            </button>
          </div>

          <div class="user-list">
            <button
              v-for="user in activeUsers"
              :key="user.email"
              class="user-row"
              type="button"
              @click="viewUser(user)"
            >
              <div class="user-avatar">
                {{ user.name.charAt(0) }}
              </div>

              <div class="user-info">
                <div class="user-name">
                  {{ user.name }}
                </div>

                <div class="user-email">
                  {{ user.email }}
                </div>
              </div>

              <div class="user-stats">
                <strong>{{ user.backtests }}</strong>

                <span>backtests</span>
              </div>

              <span class="plan-badge">
                {{ user.plan }}
              </span>
            </button>
          </div>
        </article>

        <!-- Popular Symbols -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                MARKET DATA
              </div>

              <h2>Most Backtested</h2>

              <p>
                Most frequently backtested underlying symbols.
              </p>
            </div>
          </div>

          <div class="symbol-list">
            <div
              v-for="symbol in popularSymbols"
              :key="symbol.symbol"
              class="symbol-row"
            >
              <div class="symbol-name">
                {{ symbol.symbol }}
              </div>

              <div class="symbol-bar-container">
                <div
                  class="symbol-bar"
                  :style="{
                    width: `${symbol.percentage}%`,
                  }"
                ></div>
              </div>

              <div class="symbol-count">
                {{ symbol.count }}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- System Health -->
    <section class="section">
      <article class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-label">
              SYSTEM HEALTH
            </div>

            <h2>Platform Status</h2>

            <p>
              Current availability of the services powering the application.
            </p>
          </div>

          <button
            class="text-button"
            type="button"
            @click="viewSystem"
          >
            System Operations
          </button>
        </div>

        <div class="health-grid">
          <div
            v-for="service in systemHealth"
            :key="service.name"
            class="health-item"
          >
            <div class="health-status">
              <span class="health-dot"></span>

              <span>Operational</span>
            </div>

            <div class="health-name">
              {{ service.name }}
            </div>

            <div class="health-description">
              {{ service.description }}
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<style scoped>
/* =========================================================
   PAGE
   ========================================================= */

.admin-page {
  width: 100%;
  color: var(--text-main);
}


/* =========================================================
   HEADER
   ========================================================= */

.page-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.eyebrow,
.section-label,
.panel-label {
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 1.1px;
  text-transform: uppercase;
}

.page-header h1 {
  margin: 0.35rem 0 0;
  color: var(--text-main);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.page-header p {
  margin: 0.35rem 0 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.header-controls select {
  width: 120px;
  height: 36px;
  padding: 0 0.65rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-card);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.72rem;
  outline: none;
  cursor: pointer;
}

.header-controls select:focus {
  border-color: var(--accent-color);
}


/* =========================================================
   SECTIONS
   ========================================================= */

.section {
  margin-bottom: 1.5rem;
}


/* =========================================================
   METRICS
   ========================================================= */

.metric-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.85rem;
}

.metric-card {
  min-width: 0;
  padding: 1.05rem 1.1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.metric-label {
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 500;
}

.metric-value {
  margin-top: 0.45rem;
  color: var(--text-main);
  font-size: 1.35rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.metric-change {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.55rem;
  color: #dc2626;
  font-family: monospace;
  font-size: 0.61rem;
  font-weight: 600;
}

.metric-change.positive {
  color: #16a34a;
}

.change-arrow {
  font-size: 0.7rem;
}

.change-period {
  width: 100%;
  color: var(--text-muted);
  font-family: inherit;
  font-size: 0.61rem;
  font-weight: 400;
}


/* =========================================================
   GRID
   ========================================================= */

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}


/* =========================================================
   PANELS
   ========================================================= */

.panel {
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.15rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.panel-header h2 {
  margin: 0.3rem 0 0;
  color: var(--text-main);
  font-size: 0.95rem;
  font-weight: 600;
}

.panel-header p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.76rem;
  line-height: 1.4;
}

.chart-value {
  flex-shrink: 0;
  color: var(--text-main);
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}


/* =========================================================
   CHARTS
   ========================================================= */

.chart-container,
.usage-chart {
  padding: 1rem 1.25rem 0.7rem;
}

.line-chart {
  display: block;
  width: 100%;
  height: 170px;
  overflow: visible;
}

.chart-grid-line {
  stroke: var(--border-color);
  stroke-width: 1;
  stroke-dasharray: 3 4;
}

.chart-line {
  fill: none;
  stroke: var(--accent-color);
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.35rem;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.58rem;
}


/* =========================================================
   BACKTEST STATS
   ========================================================= */

.backtest-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.backtest-stat {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.8rem 1rem;
  border-right: 1px solid var(--border-color);
}

.backtest-stat:last-child {
  border-right: none;
}

.backtest-stat span {
  color: var(--text-muted);
  font-size: 0.64rem;
}

.backtest-stat strong {
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 600;
}


/* =========================================================
   SUBSCRIPTIONS
   ========================================================= */

.subscription-content {
  padding: 1.25rem;
}

.subscription-total {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.subscription-number {
  color: var(--text-main);
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.subscription-label {
  color: var(--text-muted);
  font-size: 0.73rem;
}

.subscription-bar {
  display: flex;
  height: 8px;
  margin-top: 1.25rem;
  overflow: hidden;
  border-radius: 999px;
  background: var(--bg-main);
}

.subscription-active {
  height: 100%;
  background: var(--accent-color);
}

.subscription-legend {
  margin-top: 1rem;
}

.subscription-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid var(--border-color);
}

.subscription-item:last-child {
  border-bottom: none;
}

.subscription-item-left,
.subscription-item-right {
  display: flex;
  align-items: center;
}

.subscription-item-left {
  gap: 0.5rem;
  color: var(--text-muted);
  font-size: 0.73rem;
}

.subscription-item-right {
  gap: 0.6rem;
}

.subscription-item-right strong {
  color: var(--text-main);
  font-size: 0.76rem;
}

.subscription-item-right span {
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.63rem;
}

.legend-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--border-color);
}

.legend-dot.active {
  background: var(--accent-color);
}

.conversion-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
}

.conversion-box > div {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.conversion-label {
  color: var(--text-main);
  font-size: 0.73rem;
  font-weight: 600;
}

.conversion-description {
  color: var(--text-muted);
  font-size: 0.65rem;
}

.conversion-box strong {
  color: var(--text-main);
  font-size: 1rem;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.text-button {
  flex-shrink: 0;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--accent-color);
  font-family: inherit;
  font-size: 0.68rem;
  font-weight: 600;
  cursor: pointer;
}

.text-button:hover {
  color: var(--accent-hover);
}


/* =========================================================
   USERS
   ========================================================= */

.user-list {
  display: flex;
  flex-direction: column;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.8rem 1.25rem;
  border: none;
  border-bottom: 1px solid var(--border-color);
  background: transparent;
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.user-row:last-child {
  border-bottom: none;
}

.user-row:hover {
  background: var(--bg-main);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  background: var(--bg-main);
  color: var(--text-muted);
  font-size: 0.68rem;
  font-weight: 600;
}

.user-info {
  min-width: 0;
  flex: 1;
}

.user-name {
  overflow: hidden;
  color: var(--text-main);
  font-size: 0.76rem;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  overflow: hidden;
  margin-top: 0.15rem;
  color: var(--text-muted);
  font-size: 0.64rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.user-stats strong {
  color: var(--text-main);
  font-size: 0.74rem;
}

.user-stats span {
  margin-top: 0.1rem;
  color: var(--text-muted);
  font-size: 0.6rem;
}

.plan-badge {
  flex-shrink: 0;
  padding: 0.25rem 0.4rem;
  border: 1px solid var(--border-color);
  border-radius: 3px;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.57rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}


/* =========================================================
   SYMBOLS
   ========================================================= */

.symbol-list {
  padding: 0.65rem 1.25rem;
}

.symbol-row {
  display: grid;
  grid-template-columns: 42px 1fr 50px;
  align-items: center;
  gap: 0.75rem;
  padding: 0.72rem 0;
}

.symbol-name {
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
}

.symbol-bar-container {
  height: 5px;
  overflow: hidden;
  border-radius: 999px;
  background: var(--bg-main);
}

.symbol-bar {
  height: 100%;
  border-radius: 999px;
  background: var(--accent-color);
  opacity: 0.75;
}

.symbol-count {
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.63rem;
  text-align: right;
}


/* =========================================================
   SYSTEM HEALTH
   ========================================================= */

.health-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.health-item {
  min-width: 0;
  padding: 1rem 1.15rem;
  border-right: 1px solid var(--border-color);
}

.health-item:last-child {
  border-right: none;
}

.health-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #16a34a;
  font-family: monospace;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.health-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #16a34a;
}

.health-name {
  margin-top: 0.55rem;
  color: var(--text-main);
  font-size: 0.77rem;
  font-weight: 600;
}

.health-description {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.64rem;
  line-height: 1.4;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1200px) {
  .metric-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .health-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .health-item:nth-child(3) {
    border-right: none;
  }

  .health-item:nth-child(n + 4) {
    border-top: 1px solid var(--border-color);
  }
}

@media (max-width: 900px) {
  .two-column {
    grid-template-columns: 1fr;
  }

  .health-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .health-item:nth-child(2n) {
    border-right: none;
  }

  .health-item:nth-child(n + 3) {
    border-top: 1px solid var(--border-color);
  }
}

@media (max-width: 700px) {
  .page-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .metric-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .health-grid {
    grid-template-columns: 1fr;
  }

  .health-item,
  .health-item:nth-child(n + 3) {
    border-right: none;
    border-top: none;
    border-bottom: 1px solid var(--border-color);
  }

  .health-item:last-child {
    border-bottom: none;
  }
}

@media (max-width: 500px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .backtest-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .backtest-stat:nth-child(2) {
    border-right: none;
  }

  .backtest-stat:nth-child(n + 3) {
    border-top: 1px solid var(--border-color);
  }

  .user-row {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .user-email {
    max-width: 130px;
  }

  .plan-badge {
    display: none;
  }
}
</style>