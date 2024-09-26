export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    'nuxt-icon'
  ],

  supabase: {
    redirect: false
  },

  compatibilityDate: '2024-09-26'
})