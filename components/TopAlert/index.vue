<template>
  <div
    v-show="isEnabled && !hideAnnouncement"
    class="border border-solid border-green-500 rounded-lg bg-green-100 p-5 md:p-8"
  >
    <div
      v-if="announcement"
      class=""
    >
      <header class="relative">
        <h3 class="font-bold text-xl lg:text-2xl text-gray-900 text-left pr-12 md:pr-0 leading-loose">
          <FontAwesomeIcon
            :icon="icon.faExclamationCircle"
            class="mr-2 text-brand-green"
          />
          <span>
            {{ announcement.title }}
          </span>
        </h3>
        <span
          class="cursor-pointer block absolute top-0 text-xl text-green-600 hover:text-green-800 leading-loose"
          style="right: 0.5rem;"
          @click.capture="hideAnnouncement = true"
        >
          <FontAwesomeIcon
            :icon="icon.faTimesCircle"
          />
        </span>
      </header>
      <br>
      <div
        class="text-base leading-loose"
        v-html="announcement.content"
      >
        {{ announcement.content }}
      </div>
      <br>
      <div v-if="announcement.action_url" class="clearfix">
        <a
          :href="announcement.action_url"
          class="float-left text-brand-green-darkest hover:text-green-900 hover:underline font-bold uppercase tracking-widest"
          @click.prevent="onClick"
        >
          Selengkapnya
          <i class="fas fa-chevron-right" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { faExclamationCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faExclamationCircle,
        faTimesCircle
      },
      hideAnnouncement: false
    }
  },
  computed: {
    announcement () {
      try {
        const remoteConfig = this.$store.state['remote-config']
        return remoteConfig.config.announcement
      } catch (e) {
        return null
      }
    },
    isEnabled () {
      try {
        const remoteConfig = this.$store.state['remote-config']
        return remoteConfig.config.announcement.enabled
      } catch (e) {
        return false
      }
    }
  },
  methods: {
    onClick (e) {
      if (!this.announcement || !this.announcement.action_url) {
        return
      }
      window.open(this.announcement.action_url, '_blank')
    }
  }
}
</script>

<style>

</style>
