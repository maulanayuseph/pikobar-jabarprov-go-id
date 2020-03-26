require('dotenv').config()
const APP_TITLE = 'Pikobar - Pusat Informasi dan Koordinasi COVID-19 Jawa Barat'
export default {
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DB_URL: process.env.FIREBASE_DB_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    FIREBASE_PUBLIC_VAPID_KEY: process.env.FIREBASE_PUBLIC_VAPID_KEY,
    APP_TITLE,
    URL: process.env.URL
  },
  router: {
    prefetchLinks: false
  },
  generate: {
    fallback: true
  },
  server: {
    host: process.env.HOST,
    port: process.env.PORT
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: APP_TITLE,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'url', name: 'url', content: process.env.URL },
      { hid: 'og:title', property: 'og:title', content: APP_TITLE },
      { hid: 'og:description', property: 'og:description', content: process.env.npm_package_description },
      { hid: 'og:url', property: 'og:url', content: process.env.URL },
      { hid: 'og:image', property: 'og:image', content: `${process.env.URL}/logo.jpg` },
      { hid: 'og:site_name', property: 'og:site_name', content: APP_TITLE },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@jabardigital' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/stylesheet/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/initial-data.js', mode: 'client' },
    { src: '~/plugins/service-worker.js', mode: 'client' },
    '~/plugins/vuex-router-sync.js',
    { src: '~/plugins/vue-leaflet.js', ssr: false },
    { src: '~/plugins/vue-lazyload.js', mode: 'client' },
    { src: '~/plugins/vue-carousel.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/fontawesome', {
      component: 'FontAwesomeIcon'
    }]
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-leaflet'
  ],
  pwa: {
    workbox: {
      dev: true,
      autoRegister: false,
      swURL: 'service-worker.js'
    },
    themeColor: '#399F4F',
    manifest: {
      name: 'Jabar COVID-19',
      background_color: '#399F4F',
      display: 'standalone',
      orientation: 'portrait'
    }
  },
  purgeCSS: {
    whitelistPatterns: [
      /(^|\.)fa-/, /-fa($|\.)/,
      /(^|\.)leaflet-/
    ]
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
