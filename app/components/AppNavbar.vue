<template>
  <nav class="top-nav">
    <NuxtLink
      to="/"
      class="logo"
    >
      SPY_0DTE // ARCHIVE
    </NuxtLink>

    <div class="nav-right">
      <div class="nav-links">
        <div class="info-menu">
          <button
            type="button"
            class="nav-link info-trigger"
            :class="{ active: infoOpen }"
            :aria-expanded="infoOpen"
            aria-haspopup="true"
            @click="infoOpen = !infoOpen"
          >
            INFO

            <span
              class="chevron"
              :class="{ open: infoOpen }"
            >
              ▾
            </span>
          </button>

          <Transition name="dropdown">
            <div
              v-if="infoOpen"
              class="info-dropdown"
            >
              <NuxtLink
                to="/about"
                class="dropdown-item"
                @click="infoOpen = false"
              >
                <span class="dropdown-title">
                  ABOUT
                </span>

                <span class="dropdown-description">
                  Learn about the archive
                </span>
              </NuxtLink>

              <NuxtLink
                to="/pricing"
                class="dropdown-item"
                @click="infoOpen = false"
              >
                <span class="dropdown-title">
                  PRICING
                </span>

                <span class="dropdown-description">
                  Compare access levels
                </span>
              </NuxtLink>
            </div>
          </Transition>
        </div>

        <NuxtLink
          to="/pricing"
          class="nav-link"
          active-class="active"
        >
          PRICING
        </NuxtLink>
      </div>

      <div class="nav-divider"></div>

      <div class="auth-links">
        <NuxtLink
          to="/login"
          class="login-link"
        >
          LOG IN
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="signup-button"
        >
          SIGN UP
        </NuxtLink>
      </div>

      
    </div>
  </nav>
</template>

<script setup lang="ts">
const infoOpen = ref(false)
</script>

<style scoped>
.top-nav {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-bottom: 2rem;

  border-bottom: 1px solid var(--border-color);

  font-family: monospace;

  font-size: 0.9rem;

  letter-spacing: 1px;
}

.logo {
  flex-shrink: 0;

  color: var(--text-main);

  font-weight: bold;

  text-decoration: none;
}

.nav-right {
  display: flex;
  align-items: center;

  gap: 1.25rem;
}

.nav-links,
.auth-links {
  display: flex;
  align-items: center;

  gap: 1.25rem;
}

.nav-link,
.login-link {
  color: var(--text-muted);

  text-decoration: none;

  white-space: nowrap;

  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.active,
.login-link:hover {
  color: var(--text-main);
}

.info-menu {
  position: relative;
}

.info-trigger {
  display: flex;
  align-items: center;

  gap: 0.35rem;

  padding: 0;

  border: 0;

  background: transparent;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.9rem;

  letter-spacing: 1px;

  cursor: pointer;

  transition: color 0.2s ease;
}

.info-trigger:hover,
.info-trigger.active {
  color: var(--text-main);
}

.chevron {
  display: inline-block;

  font-size: 0.7rem;

  line-height: 1;

  transition: transform 0.2s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.info-dropdown {
  position: absolute;

  top: calc(100% + 1.25rem);

  right: -0.75rem;

  width: 230px;

  padding: 0.35rem;

  background-color: var(--bg-main);

  border: 1px solid var(--border-color);

  border-radius: 3px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);

  z-index: 100;
}

.info-dropdown::before {
  content: "";

  position: absolute;

  top: -5px;

  right: 20px;

  width: 8px;

  height: 8px;

  background-color: var(--bg-main);

  border-top: 1px solid var(--border-color);

  border-left: 1px solid var(--border-color);

  transform: rotate(45deg);
}

.dropdown-item {
  display: flex;
  flex-direction: column;

  gap: 0.2rem;

  padding: 0.7rem 0.75rem;

  border-radius: 2px;

  color: var(--text-main);

  text-decoration: none;

  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: rgba(128, 128, 128, 0.08);
}

.dropdown-title {
  color: var(--text-main);

  font-family: monospace;

  font-size: 0.78rem;

  font-weight: 600;

  letter-spacing: 0.8px;
}

.dropdown-description {
  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.68rem;

  line-height: 1.4;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;

  transform: translateY(-5px);
}

.nav-divider {
  width: 1px;

  height: 18px;

  flex-shrink: 0;

  background-color: var(--border-color);
}

.signup-button {
  display: inline-flex;

  align-items: center;
  justify-content: center;

  padding: 0.6rem 0.9rem;

  background-color: var(--text-main);

  color: var(--bg-main);

  border: 1px solid var(--text-main);

  border-radius: 2px;

  font-family: monospace;

  font-size: 0.9rem;

  font-weight: 600;

  text-decoration: none;

  letter-spacing: 1px;

  white-space: nowrap;

  transition: all 0.2s ease;
}

.signup-button:hover {
  background-color: var(--accent-color);

  border-color: var(--accent-color);

  color: white;
}

.sys-status {
  display: flex;

  align-items: center;

  gap: 0.5rem;

  color: #10B981;

  white-space: nowrap;
}

.status-dot {
  width: 8px;

  height: 8px;

  flex-shrink: 0;

  background-color: #10B981;

  border-radius: 50%;

  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

@media (max-width: 1150px) {
  .sys-status,
  .nav-divider:last-of-type {
    display: none;
  }
}

@media (max-width: 800px) {
  .nav-right {
    gap: 1rem;
  }

  .nav-links,
  .auth-links {
    gap: 0.9rem;
  }
}

@media (max-width: 650px) {
  .nav-links {
    display: none;
  }

  .nav-divider {
    display: none;
  }

  .nav-right {
    gap: 0.75rem;
  }

  .login-link,
  .signup-button {
    font-size: 0.75rem;
  }
}
</style>