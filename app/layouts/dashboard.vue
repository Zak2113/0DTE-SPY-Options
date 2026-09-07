<!-- app/layouts/dashboard.vue -->

<script setup lang="ts">
// Add new items here as the app grows — each just needs a label + route.
// Optional `badge` can be used later for things like "New" or a count.
const navItems = [
  { label: 'Overview', to: '/dashboard' },
  { label: 'Backtests', to: '/dashboard/backtests' },
  { label: 'Strategies', to: '/dashboard/strategies' },
  { label: 'Watchlist', to: '/dashboard/watchlist' },
  { label: 'Billing', to: '/dashboard/billing' },
  { label: 'Settings', to: '/dashboard/settings' },
]

const { user, clear } = useUserSession()

async function handleLogout() {
  await clear()
  await navigateTo('/login')
}

const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <div class="admin-layout">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="sidebar-brand">
          <div class="brand-mark">
            SPY
          </div>

          <div class="brand-text">
            <span class="brand-name">
              SPY_0DTE
            </span>

            <span class="brand-label">
              DASHBOARD
            </span>
          </div>
        </div>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section-label">
          MENU
        </div>

        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          active-class="active-link"
          exact-active-class="active-link"
        >
          <span class="nav-indicator"></span>
          <span>{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="sidebar-footer">
        <div class="user-label">
          SIGNED IN AS
        </div>

        <div class="user-name">
          {{ user?.name || 'User' }}
        </div>

        <div class="user-email">
          {{ user?.email || 'No email available' }}
        </div>

        <button
          type="button"
          class="logout-button"
          @click="handleLogout"
        >
          LOG OUT
        </button>
      </div>
    </aside>

    <!-- Right Side -->
    <div class="admin-main">
      <!-- Top Bar -->
      <header class="admin-header">
        <div class="header-left">
          <span class="header-section">
            DASHBOARD
          </span>

          <span class="header-divider"></span>

          <span class="header-page">
            SPY_0DTE
          </span>
        </div>

        <div class="header-right">
          <button
            type="button"
            class="theme-toggle"
            aria-label="Toggle dark mode"
            @click="toggleTheme"
          >
            <svg
              v-if="colorMode.value !== 'dark'"
              viewBox="0 0 24 24" width="16" height="16" stroke="currentColor"
              stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
            >
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24" width="16" height="16" stroke="currentColor"
              stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <NuxtLink
            to="/"
            class="exit-link"
          >
            BACK TO SITE
            <span>→</span>
          </NuxtLink>

          
        </div>
      </header>

      <!-- Page Content -->
      <main class="admin-content">
        <div class="admin-content-inner">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* =========================================================
   ADMIN LAYOUT (shared styling — dashboard uses the same visual system)
   ========================================================= */

.admin-layout {
  width: 100%;
  height: 100vh;

  display: flex;

  overflow: hidden;

  background-color: var(--bg-main);
  color: var(--text-main);
}


/* =========================================================
   SIDEBAR
   ========================================================= */

.admin-sidebar {
  position: fixed;

  top: 0;
  left: 0;
  bottom: 0;

  z-index: 100;

  display: flex;
  flex-direction: column;

  width: 250px;
  height: 100vh;

  background-color: var(--bg-card);

  border-right: 1px solid var(--border-color);

  overflow: hidden;
}


/* =========================================================
   SIDEBAR HEADER
   ========================================================= */

.sidebar-header {
  height: 76px;
  min-height: 76px;

  display: flex;
  align-items: center;

  padding: 0 1.5rem;

  border-bottom: 1px solid var(--border-color);
}

.sidebar-brand {
  display: flex;
  align-items: center;

  gap: 0.75rem;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  color: var(--bg-card);

  background-color: var(--text-main);

  font-family: monospace;
  font-size: 0.65rem;
  font-weight: 700;

  letter-spacing: 0.5px;
}

.brand-text {
  display: flex;
  flex-direction: column;

  gap: 0.15rem;
}

.brand-name {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.75rem;
  font-weight: 700;

  letter-spacing: 0.8px;
}

.brand-label {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.55rem;

  letter-spacing: 1px;
}


/* =========================================================
   NAVIGATION
   ========================================================= */

.sidebar-nav {
  flex: 1;

  padding: 1.5rem 0.75rem;

  overflow-y: auto;
}

.nav-section-label {
  padding: 0 0.75rem;

  margin-bottom: 0.65rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.55rem;

  letter-spacing: 1px;
}

.nav-link {
  position: relative;

  display: flex;
  align-items: center;

  gap: 0.75rem;

  min-height: 42px;

  padding: 0 0.75rem;

  margin-bottom: 0.2rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.67rem;

  letter-spacing: 0.2px;

  text-decoration: none;

  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-main);

  background-color: var(--bg-main);
}

.nav-indicator {
  width: 3px;
  height: 3px;

  flex-shrink: 0;

  background-color: var(--border-color);

  transition:
    width 0.2s ease,
    height 0.2s ease,
    background-color 0.2s ease;
}

.active-link {
  color: var(--text-main);

  background-color: var(--bg-main);

  font-weight: 600;
}

.active-link .nav-indicator {
  width: 3px;
  height: 18px;

  background-color: var(--accent-color);
}


/* =========================================================
   SIDEBAR FOOTER
   ========================================================= */

.sidebar-footer {
  flex-shrink: 0;

  padding: 1.25rem 1.5rem;

  border-top: 1px solid var(--border-color);
}

.user-label {
  margin-bottom: 0.4rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.52rem;

  letter-spacing: 1px;
}

.user-name {
  overflow: hidden;

  margin-bottom: 0.2rem;

  color: var(--text-main);

  font-size: 0.75rem;

  font-weight: 600;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.user-email {
  overflow: hidden;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.58rem;

  text-overflow: ellipsis;

  white-space: nowrap;
}

.logout-button {
  width: 100%;

  margin-top: 0.85rem;

  padding: 0.5rem 0.6rem;

  color: var(--text-muted);

  background-color: transparent;

  border: 1px solid var(--border-color);

  cursor: pointer;

  font-family: monospace;

  font-size: 0.58rem;
  font-weight: 600;

  letter-spacing: 0.8px;

  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.logout-button:hover {
  color: var(--text-main);

  background-color: var(--bg-main);

  border-color: var(--accent-color);
}


/* =========================================================
   MAIN AREA
   ========================================================= */

.admin-main {
  display: flex;
  flex-direction: column;

  width: calc(100% - 250px);
  height: 100vh;

  margin-left: 250px;

  overflow-y: auto;
  overflow-x: hidden;
}


/* =========================================================
   TOP HEADER
   ========================================================= */

.admin-header {
  position: sticky;

  top: 0;

  z-index: 50;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 76px;
  min-height: 76px;

  padding: 0 2.5rem;

  background-color: var(--bg-main);

  border-bottom: 1px solid var(--border-color);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.header-left {
  gap: 0.75rem;
}

.header-right {
  gap: 1.5rem;
}

.header-section,
.header-page {
  font-family: monospace;

  font-size: 0.6rem;

  letter-spacing: 0.8px;
}

.header-section {
  color: var(--text-main);

  font-weight: 600;
}

.header-page {
  color: var(--text-muted);
}

.header-divider {
  width: 1px;
  height: 14px;

  background-color: var(--border-color);
}


/* =========================================================
   EXIT LINK
   ========================================================= */

.exit-link {
  display: flex;
  align-items: center;

  gap: 0.35rem;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.58rem;

  letter-spacing: 0.6px;

  text-decoration: none;

  transition: color 0.2s ease;
}

.exit-link:hover {
  color: var(--accent-color);
}

.header-logout {
  color: var(--text-muted);

  background-color: transparent;

  border: none;

  cursor: pointer;

  font-family: monospace;

  font-size: 0.58rem;
  font-weight: 600;

  letter-spacing: 0.6px;

  transition: color 0.2s ease;
}

.header-logout:hover {
  color: var(--accent-color);
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;

  padding: 0;

  color: var(--text-muted);

  background-color: transparent;

  border: 1px solid var(--border-color);

  cursor: pointer;

  transition:
    color 0.2s ease,
    border-color 0.2s ease;
}

.theme-toggle:hover {
  color: var(--text-main);

  border-color: var(--accent-color);
}


/* =========================================================
   CONTENT
   ========================================================= */

.admin-content {
  flex: 1;

  width: 100%;
}

.admin-content-inner {
  width: 100%;

  max-width: none;

  margin: 0;

  padding: 2.5rem 3rem 5rem;
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 900px) {
  .admin-sidebar {
    width: 220px;
  }

  .admin-main {
    width: calc(100% - 220px);

    margin-left: 220px;
  }

  .admin-header {
    padding: 0 1.5rem;
  }

  .admin-content-inner {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
}


@media (max-width: 700px) {
  .admin-layout {
    display: block;

    height: auto;

    min-height: 100vh;

    overflow: visible;
  }

  .admin-sidebar {
    position: relative;

    width: 100%;
    height: auto;

    min-height: auto;
  }

  .admin-main {
    width: 100%;
    height: auto;

    margin-left: 0;

    overflow: visible;
  }

  .sidebar-nav {
    padding-bottom: 0.75rem;
  }

  .sidebar-footer {
    display: none;
  }

  .admin-header {
    position: relative;

    height: 64px;
    min-height: 64px;

    padding: 0 1rem;
  }

  .admin-content-inner {
    padding: 2rem 1rem 4rem;
  }
}


@media (max-width: 500px) {
  .header-page,
  .header-divider {
    display: none;
  }

  .header-right {
    gap: 0;
  }

  .admin-header {
    height: 58px;
    min-height: 58px;
  }
}
</style>