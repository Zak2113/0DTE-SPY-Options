<!-- app/pages/admin/system.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const maintenanceMode = ref(false)
const allowAdminBypass = ref(true)

const maintenanceMessage = ref(
  'We are performing scheduled maintenance. Please check back shortly.',
)

const announcementText = ref('')
const announcementType = ref('Information')
const announcementAudience = ref('All Users')
const announcementExpiration = ref('Never')

const featureFlags = ref([
  {
    name: 'Historical 0DTE Viewer',
    description: 'Allow users to access the historical charting viewer.',
    enabled: true,
  },
  {
    name: 'Session Replay',
    description: 'Allow users to replay historical trading sessions.',
    enabled: true,
  },
  {
    name: 'Advanced Volume Analysis',
    description: 'Enable advanced volume and flow analysis tools.',
    enabled: false,
  },
  {
    name: 'New Chart Interface',
    description: 'Enable the upcoming charting interface for selected users.',
    enabled: false,
  },
])

const services = [
  {
    name: 'Authentication',
    description: 'User authentication and session management',
    status: 'Operational',
  },
  {
    name: 'Email Delivery',
    description: 'Transactional email delivery',
    status: 'Operational',
  },
  {
    name: 'Market Data',
    description: 'Historical market data provider',
    status: 'Operational',
  },
  {
    name: 'Payments',
    description: 'Subscription and billing services',
    status: 'Operational',
  },
]

const deployment = [
  { label: 'Environment', value: 'PRODUCTION' },
  { label: 'Version', value: 'v1.4.2' },
  { label: 'Commit', value: '8c42a91' },
  { label: 'Last Deployment', value: 'Aug 29, 2026 18:42' },
]

function publishAnnouncement() {
  if (!announcementText.value.trim()) return

  // Connect this to your announcement API when ready.
  console.log('Publishing announcement:', {
    message: announcementText.value,
    type: announcementType.value,
    audience: announcementAudience.value,
    expiration: announcementExpiration.value,
  })

  announcementText.value = ''
}

function toggleMaintenanceMode() {
  // Connect this to your maintenance-mode API when ready.
  maintenanceMode.value = !maintenanceMode.value
}

function toggleFeature(feature: { enabled: boolean }) {
  // Connect this to your feature flag API when ready.
  feature.enabled = !feature.enabled
}

function clearApplicationCache() {
  // Connect this to your cache-clearing API when ready.
  console.log('Clearing application cache')
}
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">SYSTEM</div>

        <h1>System Operations</h1>

        <p>
          Manage application availability, global settings, and platform-wide behavior.
        </p>
      </div>
    </header>

    <!-- Application Status -->
    <section class="section">
      <div class="section-header">
        <div>
          <div class="section-label">APPLICATION HEALTH</div>

          <h2>Service Status</h2>

          <p>
            Current status of the services powering the application.
          </p>
        </div>
      </div>

      <div class="status-grid">
        <article class="status-card">
          <div class="status-card-header">
            <span>Application</span>

            <span class="status operational">
              Operational
            </span>
          </div>

          <div class="status-value">
            v1.4.2
          </div>

          <div class="status-detail">
            Production environment
          </div>
        </article>

        <article class="status-card">
          <div class="status-card-header">
            <span>Database</span>

            <span class="status operational">
              Connected
            </span>
          </div>

          <div class="status-value">
            Healthy
          </div>

          <div class="status-detail">
            PostgreSQL connection responding normally
          </div>
        </article>

        <article class="status-card">
          <div class="status-card-header">
            <span>Authentication</span>

            <span class="status operational">
              Operational
            </span>
          </div>

          <div class="status-value">
            Active
          </div>

          <div class="status-detail">
            Authentication service responding normally
          </div>
        </article>

        <article class="status-card">
          <div class="status-card-header">
            <span>Market Data</span>

            <span class="status operational">
              Operational
            </span>
          </div>

          <div class="status-value">
            Active
          </div>

          <div class="status-detail">
            Historical data service responding normally
          </div>
        </article>
      </div>
    </section>

    <!-- Availability + Announcement -->
    <section class="section">
      <div class="two-column">
        <!-- Maintenance -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                APPLICATION AVAILABILITY
              </div>

              <h2>Maintenance Mode</h2>

              <p>
                Temporarily restrict normal user access during maintenance.
              </p>
            </div>

            <span
              class="state-badge"
              :class="{ active: maintenanceMode }"
            >
              {{ maintenanceMode ? 'ACTIVE' : 'OFF' }}
            </span>
          </div>

          <div class="setting-list">
            <div class="setting-row">
              <div>
                <div class="setting-title">
                  Application Access
                </div>

                <div class="setting-description">
                  {{
                    maintenanceMode
                      ? 'Users are currently being shown the maintenance page.'
                      : 'Users can access the application normally.'
                  }}
                </div>
              </div>

              <button
                class="switch"
                :class="{ enabled: maintenanceMode }"
                type="button"
                :aria-pressed="maintenanceMode"
                @click="toggleMaintenanceMode"
              >
                <span></span>
              </button>
            </div>

            <div class="setting-row">
              <div>
                <div class="setting-title">
                  Administrator Bypass
                </div>

                <div class="setting-description">
                  Allow administrators to access the application during maintenance.
                </div>
              </div>

              <button
                class="switch"
                :class="{ enabled: allowAdminBypass }"
                type="button"
                :aria-pressed="allowAdminBypass"
                @click="allowAdminBypass = !allowAdminBypass"
              >
                <span></span>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label for="maintenance-message">
              Maintenance Message
            </label>

            <textarea
              id="maintenance-message"
              v-model="maintenanceMessage"
              rows="3"
              placeholder="Enter the message users should see during maintenance."
            ></textarea>
          </div>
        </article>

        <!-- Announcement -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                USER COMMUNICATION
              </div>

              <h2>Global Announcement</h2>

              <p>
                Publish a message across the application for selected users.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="announcement">
              Announcement
            </label>

            <textarea
              id="announcement"
              v-model="announcementText"
              rows="4"
              placeholder="Enter the message you want users to see..."
            ></textarea>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="announcement-type">
                Type
              </label>

              <select
                id="announcement-type"
                v-model="announcementType"
              >
                <option>Information</option>
                <option>Warning</option>
                <option>Critical</option>
              </select>
            </div>

            <div class="form-group">
              <label for="announcement-audience">
                Audience
              </label>

              <select
                id="announcement-audience"
                v-model="announcementAudience"
              >
                <option>All Users</option>
                <option>Basic</option>
                <option>Essential</option>
                <option>Pro</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="announcement-expiration">
              Expiration
            </label>

            <select
              id="announcement-expiration"
              v-model="announcementExpiration"
            >
              <option>Never</option>
              <option>1 Hour</option>
              <option>6 Hours</option>
              <option>24 Hours</option>
              <option>7 Days</option>
            </select>
          </div>

          <div class="panel-actions">
            <button
              class="primary-button"
              type="button"
              :disabled="!announcementText.trim()"
              @click="publishAnnouncement"
            >
              Publish Announcement
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- Feature Flags -->
    <section class="section">
      <div class="section-header">
        <div>
          <div class="section-label">APPLICATION CONTROL</div>

          <h2>Feature Flags</h2>

          <p>
            Enable or disable application features without changing the deployment.
          </p>
        </div>
      </div>

      <article class="panel">
        <div class="feature-list">
          <div
            v-for="feature in featureFlags"
            :key="feature.name"
            class="feature-row"
          >
            <div>
              <div class="feature-name">
                {{ feature.name }}
              </div>

              <div class="feature-description">
                {{ feature.description }}
              </div>
            </div>

            <button
              class="switch"
              :class="{ enabled: feature.enabled }"
              type="button"
              :aria-pressed="feature.enabled"
              @click="toggleFeature(feature)"
            >
              <span></span>
            </button>
          </div>
        </div>
      </article>
    </section>

    <!-- Cache + Services -->
    <section class="section">
      <div class="two-column">
        <!-- Cache -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                APPLICATION DATA
              </div>

              <h2>Application Cache</h2>

              <p>
                Review and clear cached application data.
              </p>
            </div>
          </div>

          <div class="cache-list">
            <div class="cache-row">
              <span>Session Cache</span>
              <strong>1,284 entries</strong>
            </div>

            <div class="cache-row">
              <span>API Response Cache</span>
              <strong>8,204 entries</strong>
            </div>

            <div class="cache-row">
              <span>Market Data Cache</span>
              <strong>42,891 entries</strong>
            </div>
          </div>

          <div class="panel-actions">
            <button
              class="secondary-button"
              type="button"
              @click="clearApplicationCache"
            >
              Clear Application Cache
            </button>
          </div>
        </article>

        <!-- Services -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">
                DEPENDENCIES
              </div>

              <h2>External Services</h2>

              <p>
                Current availability of application dependencies.
              </p>
            </div>
          </div>

          <div class="service-list">
            <div
              v-for="service in services"
              :key="service.name"
              class="service-row"
            >
              <div>
                <div class="service-name">
                  {{ service.name }}
                </div>

                <div class="service-description">
                  {{ service.description }}
                </div>
              </div>

              <span class="service-status">
                {{ service.status }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Deployment -->
    <section class="section">
      <article class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-label">
              DEPLOYMENT
            </div>

            <h2>Current Deployment</h2>

            <p>
              Read-only information about the currently deployed application.
            </p>
          </div>
        </div>

        <div class="deployment-grid">
          <div
            v-for="item in deployment"
            :key="item.label"
            class="deployment-item"
          >
            <span>{{ item.label }}</span>

            <strong>{{ item.value }}</strong>
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


/* =========================================================
   SECTIONS
   ========================================================= */

.section {
  margin-bottom: 1.5rem;
}

.section-header {
  margin-bottom: 0.9rem;
}

.section-header h2 {
  margin: 0.3rem 0 0;
  color: var(--text-main);
  font-size: 0.95rem;
  font-weight: 600;
}

.section-header p {
  margin: 0.3rem 0 0;
  color: var(--text-muted);
  font-size: 0.76rem;
}


/* =========================================================
   STATUS CARDS
   ========================================================= */

.status-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.status-card {
  padding: 1.15rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.status-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.75rem;
}

.status {
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.status.operational {
  color: #16a34a;
}

.status-value {
  margin-top: 0.55rem;
  color: var(--text-main);
  font-size: 1.45rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.status-detail {
  margin-top: 0.4rem;
  color: var(--text-muted);
  font-size: 0.72rem;
  line-height: 1.4;
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


/* =========================================================
   MAINTENANCE / SETTINGS
   ========================================================= */

.setting-list {
  display: flex;
  flex-direction: column;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.setting-row:last-child {
  border-bottom: none;
}

.setting-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.setting-description {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}

.state-badge {
  flex-shrink: 0;
  padding: 0.28rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.state-badge.active {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}


/* =========================================================
   TOGGLE
   ========================================================= */

.switch {
  position: relative;
  width: 38px;
  height: 21px;
  flex-shrink: 0;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  background: var(--bg-main);
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.switch span {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: var(--text-muted);
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;
}

.switch.enabled {
  border-color: var(--accent-color);
  background: var(--accent-color);
}

.switch.enabled span {
  background: #fff;
  transform: translateX(17px);
}


/* =========================================================
   FORMS
   ========================================================= */

.form-group {
  margin: 1rem 1.25rem 0;
}

.panel > .form-group:first-of-type {
  margin-top: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.4rem;
  color: var(--text-main);
  font-size: 0.73rem;
  font-weight: 600;
}

textarea,
select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.8rem;
  outline: none;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

textarea {
  min-height: 80px;
  padding: 0.7rem;
  resize: vertical;
}

select {
  height: 36px;
  padding: 0 0.65rem;
}

textarea::placeholder {
  color: var(--text-muted);
  opacity: 0.75;
}

textarea:focus,
select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px color-mix(
    in srgb,
    var(--accent-color) 10%,
    transparent
  );
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}


/* =========================================================
   BUTTONS
   ========================================================= */

.panel-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin: 1rem 1.25rem 1.25rem;
}

.primary-button,
.secondary-button {
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease;
}

.primary-button {
  border: 1px solid var(--accent-color);
  background: var(--accent-color);
  color: #fff;
}

.primary-button:hover:not(:disabled) {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.primary-button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.secondary-button {
  border: 1px solid var(--border-color);
  background: var(--bg-main);
  color: var(--text-main);
}

.secondary-button:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}


/* =========================================================
   FEATURE FLAGS
   ========================================================= */

.feature-list {
  display: flex;
  flex-direction: column;
}

.feature-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-name {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.feature-description {
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}


/* =========================================================
   CACHE
   ========================================================= */

.cache-list {
  padding: 0 1.25rem;
}

.cache-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--border-color);
  color: var(--text-muted);
  font-size: 0.75rem;
}

.cache-row:last-child {
  border-bottom: none;
}

.cache-row strong {
  color: var(--text-main);
  font-size: 0.74rem;
}


/* =========================================================
   SERVICES
   ========================================================= */

.service-list {
  display: flex;
  flex-direction: column;
  padding: 0 1.25rem;
}

.service-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--border-color);
}

.service-row:last-child {
  border-bottom: none;
}

.service-name {
  color: var(--text-main);
  font-size: 0.8rem;
  font-weight: 600;
}

.service-description {
  margin-top: 0.2rem;
  color: var(--text-muted);
  font-size: 0.71rem;
}

.service-status {
  flex-shrink: 0;
  color: #16a34a;
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}


/* =========================================================
   DEPLOYMENT
   ========================================================= */

.deployment-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.deployment-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 1rem 1.25rem;
  border-right: 1px solid var(--border-color);
}

.deployment-item:last-child {
  border-right: none;
}

.deployment-item span {
  color: var(--text-muted);
  font-size: 0.7rem;
}

.deployment-item strong {
  color: var(--text-main);
  font-family: monospace;
  font-size: 0.74rem;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1100px) {
  .status-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .deployment-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .deployment-item:nth-child(2) {
    border-right: none;
  }

  .deployment-item:nth-child(n + 3) {
    border-top: 1px solid var(--border-color);
  }
}

@media (max-width: 800px) {
  .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .status-grid {
    grid-template-columns: 1fr;
  }

  .deployment-grid {
    grid-template-columns: 1fr;
  }

  .deployment-item,
  .deployment-item:nth-child(n + 3) {
    border-right: none;
    border-top: none;
    border-bottom: 1px solid var(--border-color);
  }

  .deployment-item:last-child {
    border-bottom: none;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .setting-row,
  .feature-row,
  .service-row {
    align-items: flex-start;
  }

  .panel-header {
    flex-direction: column;
  }
}
</style>