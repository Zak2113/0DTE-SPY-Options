<!-- app/layouts/auth.vue -->

<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="auth-layout">
    <!-- Background -->
    <div class="background-grid"></div>

    <!-- Header -->
    <header class="auth-header">
      <NuxtLink
        to="/"
        class="brand"
      >
        <div class="brand-mark">
          SPY
        </div>

        <div class="brand-text">
          <span class="brand-name">
            SPY_0DTE
          </span>

          <span class="brand-label">
            OPTIONS ANALYTICS
          </span>
        </div>
      </NuxtLink>

      <!--
        Leave the right side completely open.
        This allows the existing light/dark mode
        toggle to remain in its normal position.
      -->
    </header>

    <!-- Main -->
    <main class="auth-main">
      <div class="auth-content">
        <slot />
      </div>
    </main>

    
  </div>
</template>

<style scoped>
/* =========================================================
   LAYOUT
   ========================================================= */

.auth-layout {
  position: relative;

  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  overflow-x: hidden;

  background-color: var(--bg-main);
  color: var(--text-main);
}


/* =========================================================
   BACKGROUND
   ========================================================= */

.background-grid {
  position: fixed;

  inset: 0;

  z-index: 0;

  pointer-events: none;

  opacity: 0.35;

  background-image:
    linear-gradient(
      to right,
      color-mix(
        in srgb,
        var(--border-color) 35%,
        transparent
      ) 1px,
      transparent 1px
    ),
    linear-gradient(
      to bottom,
      color-mix(
        in srgb,
        var(--border-color) 35%,
        transparent
      ) 1px,
      transparent 1px
    );

  background-size: 48px 48px;

  mask-image: linear-gradient(
    to bottom,
    black 0%,
    transparent 75%
  );
}


/* =========================================================
   HEADER
   ========================================================= */

.auth-header {
  position: relative;

  z-index: 10;

  display: flex;
  align-items: center;

  width: 100%;
  height: 76px;
  min-height: 76px;

  padding: 0 2.5rem;

  background-color: color-mix(
    in srgb,
    var(--bg-main) 92%,
    transparent
  );

  border-bottom: 1px solid var(--border-color);

  backdrop-filter: blur(8px);
}


/* =========================================================
   BRAND
   ========================================================= */

.brand {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  color: inherit;

  text-decoration: none;
}

.brand-mark {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  color: var(--bg-main);

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

  font-size: 0.52rem;

  letter-spacing: 1px;
}


/* =========================================================
   MAIN
   ========================================================= */

.auth-main {
  position: relative;

  z-index: 5;

  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 3.5rem 1.5rem;
}

.auth-content {
  width: 100%;
  max-width: 420px;
}


/* =========================================================
   FOOTER
   ========================================================= */

.auth-footer {
  position: relative;

  z-index: 5;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.65rem;

  height: 52px;
  min-height: 52px;

  color: var(--text-muted);

  font-family: monospace;

  font-size: 0.52rem;

  letter-spacing: 0.7px;
}

.footer-divider {
  width: 1px;
  height: 10px;

  background-color: var(--border-color);
}


/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 700px) {
  .auth-header {
    height: 64px;
    min-height: 64px;

    padding: 0 1.25rem;
  }

  .auth-main {
    align-items: flex-start;

    padding-top: 3rem;
    padding-bottom: 3rem;
  }
}

@media (max-width: 500px) {
  .auth-header {
    padding: 0 1rem;
  }

  .auth-main {
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .auth-footer {
    font-size: 0.48rem;
  }
}
</style>