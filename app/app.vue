<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  // The default title if a page doesn't set one at all
  title: '0DTE SPY Hub',

  // A template that automatically formats page-specific titles
  // %s is replaced by the page's specific title
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 0DTE SPY Hub` : '0DTE SPY Hub'
  },
})
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
  min-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--bg-main);
  color: var(--text-main);
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, sans-serif;
  transition: background-color 0.3s, color 0.3s;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

a {
  text-decoration: none;
}
</style>