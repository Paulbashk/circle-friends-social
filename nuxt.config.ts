export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: [
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-typed-router',
    'vuetify-nuxt-module',
  ],
  css: ['~/assets/scss/main.scss'],

  fonts: {
    families: [{ name: 'montserrat', provider: 'google' }],
  },

  compatibilityDate: '2024-10-20',

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  vuetify: {
    moduleOptions: {
      disableModernSassCompiler: false,
      styles: {
        configFile: './assets/scss/_settings.scss',
      },

      /* module specific options */
    },
    vuetifyOptions: './vuetify.config.ts',
  },

  runtimeConfig: {
    // Will be available in both server and client
    tokenSecret: process.env.NUXT_AUTH_PRIVATE_TOKEN,
    tokenExpiration: process.env.NUXT_AUTH_TOKEN_EXPIRES,
    tokenName: process.env.NUXT_AUTH_TOKEN_NAME,
    refreshTokenName: process.env.NUXT_AUTH_REFRESH_TOKEN_NAME,
    refreshTokenExpiration: process.env.NUXT_AUTH_REFRESH_TOKEN_EXPIRES,
    refreshTokenSecretKey: process.env.NUXT_AUTH_DECRYPT_KEY_REFRESH_TOKEN,
    mapApiUrl: process.env.NUXT_MAP_API_URL,
    tokenMapSecret: process.env.NUXT_MAP_API_KEY,
  },
})
