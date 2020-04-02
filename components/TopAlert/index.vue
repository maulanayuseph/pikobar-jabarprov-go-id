<template>
  <div
    v-if="!hideAlert && announcement"
    class="border border-solid border-green-500 rounded-lg bg-green-100 px-4 py-8 md:px-8"
  >
    <div
      class="max-w-3xl"
    >
      <h3 class="relative font-bold text-2xl lg:text-3xl text-gray-900 text-left pr-12 md:pr-0">
        <FontAwesomeIcon
          :icon="icon.faExclamationCircle"
          class="mr-2 text-brand-green"
        />
        <span>
          {{ announcement.title }}
        </span>
      </h3>
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
import { mapState } from 'vuex'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faExclamationCircle
      }
    }
  },
  computed: {
    ...mapState('remote-config', {
      announcement: state => state.config.announcement || {}
    }),
    hideAlert () {
      const config = this.$store.state['remote-config']
      return config && config.enabled
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
