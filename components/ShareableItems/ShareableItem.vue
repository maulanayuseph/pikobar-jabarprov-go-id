<template>
  <div>
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
          @click="onDownload"
        >
          <FontAwesomeIcon :icon="icon.faDownload" class="mr-1" />
          <span>
            Unduh
          </span>
        </button>
        <button
          class="px-2 py-2 rounded-md hover:bg-gray-300"
          @click="onShare"
        >
          <FontAwesomeIcon :icon="icon.faShare" class="mr-1" />
          <span>
            Bagikan
          </span>
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'

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

  computed: {
    fileExtension () {
      if (typeof this.downloadURL === 'string' && this.downloadURL.length) {
        const ext = /(jpe?g|png|bmp|gif|docx?|pdf|xls?|pptx?)/
        const matched = ext.exec(this.downloadURL)
        return matched ? matched[1] : null
      }
      return null
    },
    filename () {
      if (!this.title || !this.fileExtension) {
        return null
      }
      return `${this.title}.${this.fileExtension}`
    }
  },

  methods: {
    onDownload () {
      if (!this.downloadable || !this.downloadURL) {
        return
      }
      if (!process.client || !process.browser) {
        return
      }
      if (this.downloadURL.includes('firebasestorage.googleapis.com')) {
        this.downloadFromFirebaseStorage(this.downloadURL)
      }
    },
    saveBlob (blob, filename) {
      if (!blob || !filename) {
        return
      }
      const url = window.URL.createObjectURL(new Blob([blob]))
      const anchor = document.getElementById('downloadable_anchor')
      document.body.appendChild(anchor)
      anchor.style = 'display: none'
      anchor.href = url
      anchor.download = filename
      anchor.click()
      window.URL.revokeObjectURL(url)
    },
    downloadFromFirebaseStorage (publicURL) {
      fetch(publicURL)
        .then((response) => {
          return response.blob()
        }).then((blob) => {
          this.saveBlob(blob, this.filename)
        })
    },
    onShare () {
      const url = `whatsapp://send?text=${this.shareText}`
      window.open(url, '_blank')
    }
  }
}
</script>

<style>

</style>
