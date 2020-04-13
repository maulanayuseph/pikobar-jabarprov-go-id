<template>
  <div class="py-4 flex justify-between items-baseline border-b border-solid border-gray-300">
    <p class="flex-1 break-words mr-4">
      <nuxt-link
        :to="route ? route : '#'"
        class="hover:underline"
      >
        {{ title }}
      </nuxt-link>
    </p>
    <p class="flex-none text-sm text-gray-600">
      <button
        class="px-2 py-2 mr-1 rounded-md hover:bg-gray-300"
        @click="beforeDownload"
      >
        <FontAwesomeIcon :icon="icon.faDownload" class="mr-1" />
        <span>
          Unduh
        </span>
      </button>
      <button
        class="px-2 py-2 rounded-md hover:bg-gray-300"
        @click="beforeShare"
      >
        <FontAwesomeIcon :icon="icon.faShare" class="mr-1" />
        <span>
          Bagikan
        </span>
      </button>
    </p>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    route: {
      type: [String, Boolean],
      default: false
    },
    downloadable: {
      type: Boolean,
      default: false
    },
    downloadURL: {
      type: String,
      default: ''
    },
    shareable: {
      type: Boolean,
      default: true
    },
    shareText: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      icon: {
        faDownload,
        faShare
      }
    }
  },

  methods: {
    beforeDownload () {
      if (!this.downloadable || !this.downloadURL) {
        return
      }
      if (!process.client || !process.browser) {
        return
      }
      if (this.downloadURL.includes('firebasestorage.googleapis.com')) {
        onDownload(this.downloadURL, this.title)
      }
    },
    beforeShare () {
      onShare(this.shareText)
    }
  }
}
</script>

<style>

</style>
