<template>
  <div class="app-root">
    <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle dark mode">
      <svg v-if="$colorMode.value !== 'dark'" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor"
        stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

      <svg v-else viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </button>

    <NuxtPage />
  </div>
</template>

<script setup>
const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
};
</script>

<style>
/* --- BASE & LIGHT THEME VARIABLES --- */
:root {
  --bg-main: #f8f9fa;
  --bg-sidebar: #ffffff;
  --bg-card: #ffffff;
  --text-main: #111827;
  --text-muted: #6b7280;
  --border-color: #d1d5db;
  --accent-color: #2563eb;
  /* Traditional solid blue */
  --accent-hover: #1d4ed8;
}

/* --- DARK THEME VARIABLES --- */
.dark {
  --bg-main: #0a0a0a;
  /* Deep, neutral black */
  --bg-sidebar: #121212;
  --bg-card: #171717;
  --text-main: #f3f4f6;
  --text-muted: #8b929e;
  --border-color: #2d2f36;
}

/* --- GLOBAL STYLES --- */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background-color 0.3s, color 0.3s;
}

a {
  text-decoration: none;
}

.app-root {
  min-height: 100vh;
  position: relative;
}

.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 2rem;
  z-index: 1000;
  background: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  border-color: var(--accent-color);
}
</style>