<template>
  <p class="text-gray-800">
    Bagi Wargi Jabar yang kesulitan mendapatkan akses obat dan multivitamin selama
    melakukan isolasi mandiri di rumah, melalui rekomendasi dokter telekonsultasi kami,
    Wargi bisa mengajukan permohonan kebutuhan obat-obatan
    <a
      class="text-green-600 underline font-bold"
      :href="formLink"
      target="_blank"
      @click.prevent="onClick"
    >
      link ini.
    </a>
  </p>
</template>

<script>
import { permohonanKebutuhan } from './backlinks'
import { TAP_PERMOHONAN_ISOMAN } from './events'
import { analytics } from '~/lib/firebase'
export default {
  data () {
    return {
      formLink: permohonanKebutuhan
    }
  },
  methods: {
    onClick () {
      if (analytics) {
        analytics.logEvent(TAP_PERMOHONAN_ISOMAN)
      }
      window.open(this.formLink, '_blank')
      return true
    }
  }
}
</script>
