<template>
  <div class="">
    <div class="bg-brand-green-dark">
      <div class="container mx-auto p-8 lg:p-16 text-white">
        <h2 class="text-2xl font-bold leading-tight">
          Daftar Agen Oxygen di Jawa Barat
        </h2>
        <p class="mb-6 mt-2 text-base opacity-75 leading-tight">
          Informasi dan kontak agen oksigen (isi ulang dan tabung oksigen) di Jawa Barat
        </p>
      </div>
    </div>
    <br>
    <div class="container mx-auto">
      <div class="m-4 md:m-8 p-5 md:p-8 rounded-lg bg-white shadow-md">
        <h2 class="text-2xl font-bold leading-tight mb-6">
          Konten Edukasi Tentang Penggunaan Oksigen
        </h2>
        <ExpandableContent v-for="(item, i) in infoItems" :key="i" open>
          <template #title>
            {{ item.title }}
          </template>
          <div v-html="item.content" />
        </ExpandableContent>
      </div>
      <OxygenAccordion />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { analytics } from '~/lib/firebase'
import ExpandableContent from '~/components/_pages/index/IsolasiMandiri/ExpandableContent'
export default {
  components: {
    OxygenAccordion: () => import('~/components/OxygenAccordion'),
    ExpandableContent
  },
  computed: {
    ...mapState('oxygen', [
      'infoItems'
    ])
  },
  mounted () {
    this.$store.dispatch('oxygen/getItems')
    this.$store.dispatch('oxygen/getInfoItems')
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('oxygen_view')
      }
    })
  },
  head () {
    const title = 'Agen Oksigen - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>
