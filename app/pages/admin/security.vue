<!-- app/pages/admin/security.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'admin' , middleware: ['admin']})

const securityStats = [
  {
    label: 'Failed Logins (24h)',
    value: '18',
    description: 'Attempts across all accounts',
    tone: 'warning',
  },
  {
    label: 'Locked Accounts',
    value: '2',
    description: 'Currently restricted',
    tone: 'danger',
  },
  {
    label: 'Suspended Accounts',
    value: '4',
    description: 'Administrative suspensions',
    tone: 'danger',
  },
  {
    label: 'Security Events (24h)',
    value: '31',
    description: 'Authentication and admin events',
    tone: 'neutral',
  },
]

const securityControls = [
  {
    label: 'Email Verification',
    description: 'Required for all accounts before accessing the application.',
    status: 'Enforced',
    tone: 'success',
  },
  {
    label: 'Password Authentication',
    description: 'Standard password-based authentication is enabled.',
    status: 'Active',
    tone: 'success',
  },
  {
    label: 'Account Lockout',
    description: 'Accounts can be temporarily restricted after repeated failed logins.',
    status: 'Active',
    tone: 'success',
  },
  {
    label: 'Session Invalidation',
    description: 'Invalidate active cookie sessions for a selected account when required.',
    status: 'Available',
    tone: 'neutral',
  },
]

const securityEvents = [
  {
    id: '1',
    type: 'admin',
    event: 'Account suspended',
    actor: 'admin@app.com',
    target: 'spammer@temp.org',
    details: 'Account permanently suspended',
    date: 'Aug 29, 2026 19:15',
  },
  {
    id: '2',
    type: 'auth',
    event: 'Failed login',
    actor: 'Authentication',
    target: 'unknown@domain.com',
    details: 'Invalid password',
    date: 'Aug 29, 2026 20:45',
  },
  {
    id: '3',
    type: 'auth',
    event: 'Password changed',
    actor: 'Authentication',
    target: 'jane@fintech.co',
    details: 'Password successfully updated',
    date: 'Aug 29, 2026 20:12',
  },
  {
    id: '4',
    type: 'admin',
    event: 'Account suspension',
    actor: 'admin@app.com',
    target: 'mark@user.io',
    details: 'Account access restricted',
    date: 'Aug 29, 2026 19:50',
  },
  {
    id: '5',
    type: 'auth',
    event: 'Login successful',
    actor: 'Authentication',
    target: 'dan@growth.io',
    details: 'Successful authentication',
    date: 'Aug 29, 2026 19:42',
  },
]

function toneClass(tone: string) {
  return `status-${tone}`
}

function eventClass(type: string) {
  return type === 'admin' ? 'event-admin' : 'event-auth'
}
</script>

<template>
  <div class="admin-page">
    <!-- Page Header -->
    <header class="page-header">
      <div>
        <div class="eyebrow">SECURITY</div>

        <h1>Security & Audit</h1>

        <p>
          Monitor authentication activity, account protection, and administrative security events.
        </p>
      </div>
    </header>

    <!-- Security Overview -->
    <section class="section">
      <div class="stats-grid">
        <article
          v-for="stat in securityStats"
          :key="stat.label"
          class="stat-card"
        >
          <div class="stat-label">
            {{ stat.label }}
          </div>

          <div
            class="stat-value"
            :class="toneClass(stat.tone)"
          >
            {{ stat.value }}
          </div>

          <div class="stat-description">
            {{ stat.description }}
          </div>
        </article>
      </div>
    </section>

    <!-- Security Controls -->
    <section class="section">
      <div class="two-column">
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">AUTHENTICATION</div>

              <h2>Security Controls</h2>

              <p>
                Protections currently enforced across the application.
              </p>
            </div>
          </div>

          <div class="control-list">
            <div
              v-for="control in securityControls"
              :key="control.label"
              class="control-row"
            >
              <div class="control-content">
                <div class="control-title">
                  {{ control.label }}
                </div>

                <div class="control-description">
                  {{ control.description }}
                </div>
              </div>

              <span
                class="status-badge"
                :class="toneClass(control.tone)"
              >
                {{ control.status }}
              </span>
            </div>
          </div>
        </article>

        <!-- Administrative Actions -->
        <article class="panel">
          <div class="panel-header">
            <div>
              <div class="panel-label">ADMINISTRATION</div>

              <h2>Administrative Controls</h2>

              <p>
                Actions available to administrators.
              </p>
            </div>
          </div>

          <div class="action-list">
            <div class="action-row">
              <div>
                <div class="action-title">
                  Force Account Logout
                </div>

                <div class="action-description">
                  Invalidate active sessions for a selected account.
                </div>
              </div>

              <NuxtLink
                to="/admin/users"
                class="action-button"
              >
                Manage Users
              </NuxtLink>
            </div>

            <div class="action-row">
              <div>
                <div class="action-title">
                  Review Suspended Accounts
                </div>

                <div class="action-description">
                  Review accounts currently restricted by administrators.
                </div>
              </div>

              <NuxtLink
                to="/admin/users"
                class="action-button"
              >
                View Accounts
              </NuxtLink>
            </div>

            <div class="action-row">
              <div>
                <div class="action-title">
                  Authentication Activity
                </div>

                <div class="action-description">
                  Review recent successful and failed authentication events.
                </div>
              </div>

              <button
                class="action-button"
                type="button"
              >
                View Activity
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Security Events -->
    <section class="section">
      <article class="panel">
        <div class="panel-header">
          <div>
            <div class="panel-label">AUDIT TRAIL</div>

            <h2>Security Event Log</h2>

            <p>
              Recent authentication and administrative security activity.
            </p>
          </div>

          <button
            class="secondary-button"
            type="button"
          >
            View All
          </button>
        </div>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event</th>
                <th>Actor</th>
                <th>Target</th>
                <th>Details</th>
                <th>Timestamp</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="event in securityEvents"
                :key="event.id"
              >
                <td>
                  <div class="event-cell">
                    <span
                      class="event-marker"
                      :class="eventClass(event.type)"
                    ></span>

                    <span class="event-name">
                      {{ event.event }}
                    </span>
                  </div>
                </td>

                <td>
                  <span class="table-primary">
                    {{ event.actor }}
                  </span>
                </td>

                <td>
                  <span class="table-primary">
                    {{ event.target }}
                  </span>
                </td>

                <td>
                  <span class="table-muted">
                    {{ event.details }}
                  </span>
                </td>

                <td>
                  <span class="table-muted timestamp">
                    {{ event.date }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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


/* =========================================================
   STATS
   ========================================================= */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.stat-card {
  position: relative;
  padding: 1.15rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-value {
  margin-top: 0.4rem;
  color: var(--text-main);
  font-size: 1.65rem;
  line-height: 1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-value.status-warning {
  color: #d97706;
}

.stat-value.status-danger {
  color: #dc2626;
}

.stat-value.status-neutral {
  color: var(--text-main);
}

.stat-description {
  margin-top: 0.45rem;
  color: var(--text-muted);
  font-size: 0.72rem;
}


/* =========================================================
   GRID
   ========================================================= */

.two-column {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
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
   SECURITY CONTROLS
   ========================================================= */

.control-list,
.action-list {
  display: flex;
  flex-direction: column;
}

.control-row,
.action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
}

.control-row:last-child,
.action-row:last-child {
  border-bottom: none;
}

.control-content {
  min-width: 0;
}

.control-title,
.action-title {
  color: var(--text-main);
  font-size: 0.82rem;
  font-weight: 600;
}

.control-description,
.action-description {
  max-width: 500px;
  margin-top: 0.25rem;
  color: var(--text-muted);
  font-size: 0.73rem;
  line-height: 1.45;
}


/* =========================================================
   STATUS
   ========================================================= */

.status-badge {
  flex-shrink: 0;
  padding: 0.28rem 0.5rem;
  border: 1px solid currentColor;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}

.status-success {
  color: #16a34a;
}

.status-warning {
  color: #d97706;
}

.status-danger {
  color: #dc2626;
}

.status-neutral {
  color: var(--text-muted);
}


/* =========================================================
   ACTIONS
   ========================================================= */

.action-row > div:first-child {
  min-width: 0;
}

.action-button,
.secondary-button {
  flex-shrink: 0;
  padding: 0.5rem 0.7rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-main);
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    color 0.15s ease,
    background-color 0.15s ease;
}

.action-button:hover,
.secondary-button:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}


/* =========================================================
   TABLE
   ========================================================= */

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.78rem;
}

thead {
  background: var(--bg-main);
  border-bottom: 1px solid var(--border-color);
}

th {
  padding: 0.7rem 1.25rem;
  color: var(--text-muted);
  font-family: monospace;
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

td {
  padding: 0.85rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  vertical-align: middle;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr {
  transition: background-color 0.15s ease;
}

tbody tr:hover {
  background: color-mix(in srgb, var(--bg-main) 65%, transparent);
}

.event-cell {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  white-space: nowrap;
}

.event-marker {
  width: 5px;
  height: 16px;
  flex-shrink: 0;
}

.event-admin {
  background: var(--accent-color);
}

.event-auth {
  background: var(--border-color);
}

.event-name {
  color: var(--text-main);
  font-weight: 600;
}

.table-primary {
  color: var(--text-main);
  white-space: nowrap;
}

.table-muted {
  color: var(--text-muted);
  white-space: nowrap;
}

.timestamp {
  font-variant-numeric: tabular-nums;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1100px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .panel-header {
    flex-direction: column;
  }

  .control-row,
  .action-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .action-button {
    width: 100%;
    text-align: center;
  }
}
</style>