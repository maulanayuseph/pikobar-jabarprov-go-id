<template>
  <div class="w-full bg-gray-100">
    <div v-if="alertUpdate" class="bg-brand-yellow-darkest">
      <div class="container mx-auto">
        <div class="flex px-6 py-4">
          <div class="text-sm w-full">
            Ada update versi terbaru.
            <button
              class="ml-2 bg-brand-blue text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click="refreshApp"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    <Appbar />
    <div
      class="w-full"
      style="min-height: 75vh;"
    >
      <nuxt />
    </div>
    <BackToTopButton />
    <AppFooter class="container mx-auto pb-32">
      <SponsorList class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white lg:shadow-md lg:border-none border border-solid border-gray-300" />
    </AppFooter>
    <Navbar class="lg:hidden" />
  </div>
</template>

<script>
import Appbar from '~/components/Appbar'
import AppFooter from '~/components/AppFooter'
import SponsorList from '~/components/SponsorList'
import Navbar from '~/components/Navbar'
import BackToTopButton from '~/components/BackToTopButton'
export default {
  components: {
    Appbar,
    BackToTopButton,
    AppFooter,
    SponsorList,
    Navbar
  },
  data () {
    return {
      layout: null,
      defaultLayout: 'default',
      alertUpdate: false,
      refreshing: false,
      registration: null
    }
  },
  mounted () {
    if ('serviceWorker' in navigator) {
      document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

      // Refresh all open app tabs when a new service worker is installed.
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (this.refreshing) {
          return
        }
        this.refreshing = true
        window.location.reload()
      })
    }
  },
  methods: {
    showRefreshUI (e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail

      this.alertUpdate = true
    },

    refreshApp () {
      this.alertUpdate = false
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return }
      this.registration.waiting.postMessage('skipWaiting')
    }
  }
}
</script>
