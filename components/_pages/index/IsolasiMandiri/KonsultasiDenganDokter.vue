<template>
  <p class="text-gray-800">
    Jika selama menjalani isolasi mandiri Wargi memerlukan pelayanan kesehatan
    dan membutuhkan pemeriksaan kesehatan lebih lanjut, Pemerintah Daerah Provinsi Jawa Barat
    menawarkan pelayanan dokter telekonsultasi melalui
    <a
      class="text-green-600 underline font-bold"
      :href="whatsappBacklink"
      target="_blank"
      @click.prevent="onClick"
    >
      link ini.
    </a>
  </p>
</template>

<script>
import { konsultasiDokter } from './backlinks'
import { TAP_KONSULTASI_DOKTER } from './events'
import { analytics } from '~/lib/firebase'
export default {
  data () {
    return {
      whatsappBacklink: konsultasiDokter
    }
  },
  methods: {
    onClick () {
      if (analytics) {
        analytics.logEvent(TAP_KONSULTASI_DOKTER)
      }
      window.open(this.whatsappBacklink, '_blank')
      return true
    }
  }
}
</script>
