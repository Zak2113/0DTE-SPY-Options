<template>
  <div class="site-wrapper">
    <AppNavbar />

    <main class="site-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.site-wrapper {
  width: 100%;
  max-width: 1400px;
  min-height: 100%;

  margin: 0 auto;

  padding: 2rem 4rem;

  background-color: var(--bg-main);
}

.site-content {
  width: 100%;
}

@media (max-width: 1024px) {
  .site-wrapper {
    padding: 2rem;
  }
}

@media (max-width: 700px) {
  .site-wrapper {
    padding: 1.5rem;
  }
}
</style>
