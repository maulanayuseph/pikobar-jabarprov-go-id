<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <section class="md:w-2/3 flex-shrink flex-grow-0 mr-6">
        <div class="bg-white rounded-lg mb-8 p-6 shadow-lg">
          <div class="items-stretch flex flex-col xl:flex-row xl:flex-no-wrap mb-2">
            <button
              class="button-selector m-1 w-full xl:w-auto "
              style="display: flex;"
              :active="activeMap === 'polygon'"
              @click="enableMap('polygon')"
            >
              <img v-if="activeMap === 'polygon'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px;">
              <img v-if="activeMap !== 'polygon'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px;">
              Sebaran Polygon
            </button>
            <button
              class="button-selector m-1 w-full xl:w-auto "
              style="display: flex;"
              :active="activeMap === 'titik'"
              @click="enableMap('titik')"
            >
              <img v-if="activeMap === 'titik'" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px;">
              <img v-if="activeMap !== 'titik'" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px;">
              Sebaran Titik
            </button>
            <button
              class="button-selector m-1 w-full xl:w-auto "
              style="display: flex;"
              :active="activeMap === 'timeslider'"
              @click="enableMap('timeslider')"
            >
              <img v-if="activeMap === 'timeslider'" src="/img/icon-data-positif-active.svg" style="margin-top: 2px; margin-right:5px;">
              <img v-if="activeMap !== 'timeslider'" src="/img/icon-data-positif-inactive.svg" style="margin-top: 2px; margin-right:5px;">
              Timeslider - Data Positif
            </button>
          </div>
          <MapV3SebaranPolygon v-if="activeMap === 'polygon'" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import { faChevronUp, faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { analytics } from '~/lib/firebase'

export default {
  components: {
    MapV3SebaranPolygon: () => import('~/components/MapV3SebaranPolygon')
  },
  async fetch () {
    await new Promise((resolve) => {
      this.getItems()
        .then(() => {
          this.performFiltering()
          resolve()
        })
    })
  },
  data () {
    return {
      activeMap: 'polygon'
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
    this.$store.dispatch('data-sebaran-jabar/getItems')
  },
  methods: {
    enableMap (type) {
      this.activeMap = type
    }
  },
  head () {
    const title = 'Sebaran Kasus - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>
<style>
  @import "leaflet-geosearch/assets/css/leaflet.css";

</style>
