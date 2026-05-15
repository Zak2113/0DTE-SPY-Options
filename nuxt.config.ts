// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode'],
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    classSuffix: '', // This removes the '-mode' suffix, so the class is just .dark or .light
  },
  runtimeConfig: {
    // Private: Only accessible on the server
    serverDataDir: process.env.SERVER_DATA_DIR || './market_data', 
    public: {
      // Public: Accessible in the browser
      dataBaseUrl: process.env.NUXT_PUBLIC_DATA_BASE_URL || '/api/secure-data', 
    }
  }
})
