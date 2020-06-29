<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Sebaran Kasus Covid-19 di Jawa Barat
      </h3>
    </header>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:w-3/5 lg:mr-6 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Peta Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="flex flex-col lg:flex-row lg:items-stretch mb-3">
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
            <MapV3SebaranPolygon v-if="activeMap === 'polygon'" :activeRegionId.sync="activeRegionId" :activeRegionCategory.sync="activeRegionCategory"  :activeParentRegionName.sync="activeParentRegionName"/>
            <MapV3SebaranTitik v-if="activeMap === 'titik'" :activeRegionId.sync="activeRegionId" :activeRegionCategory.sync="activeRegionCategory"  :activeParentRegionName.sync="activeParentRegionName"/>
            <MapV3SebaranTimeSlider v-if="activeMap === 'timeslider'" :activeRegionId.sync="activeRegionId" :activeRegionCategory.sync="activeRegionCategory"  :activeParentRegionName.sync="activeParentRegionName"/>
          </div>
        </div>
        <div class="w-full mb-6 lg:w-2/5 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <RasioConfirmedCase :activeRegionId="activeRegionId" :activeRegionCategory="activeRegionCategory"  :activeParentRegionName.sync="activeParentRegionName"/>
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-full mb-6 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <div>
            <h3 class="p-5 text-lg md:text">
              <b>Tabel Kasus Covid-19 di Jawa Barat</b>
            </h3>
            <hr>
          </div>
          <div class="p-6">
            <div class="mb-2">
              Data yang ditampilkan berdasarkan: <b>{{ parentLabel[activeRegionCategory].label }} di {{ activeParentRegionName }}</b> <br>
            </div>
            <div class="flex flex-col lg:flex-row lg:items-stretch">
              <button
                class="button-selector mr-1 mt-1 mb-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'confirmed'"
                @click="enableTable('confirmed')"
              >
                Terkonfirmasi
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'unconfirmed'"
                @click="enableTable('unconfirmed')"
              >
                ODP dan PDP
              </button>
            </div>
          </div>
          <ConfirmedCaseList v-if="activeTable === 'confirmed'" :activeRegionId.sync="activeRegionId" :activeRegionCategory.sync="activeRegionCategory" :activeParentRegionName.sync="activeParentRegionName" />
          <UnconfirmedCaseList v-if="activeTable === 'unconfirmed'" :activeRegionId.sync="activeRegionId" :activeRegionCategory.sync="activeRegionCategory"  :activeParentRegionName.sync="activeParentRegionName"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'
// import { faChevronUp, faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
// import { analytics } from '~/lib/firebase'

export default {
  components: {
    MapV3SebaranPolygon: () => import('~/components/MapV3SebaranPolygon'),
    MapV3SebaranTitik: () => import('~/components/MapV3SebaranTitik'),
    MapV3SebaranTimeSlider: () => import('~/components/MapV3SebaranTimeSlider'),
    RasioConfirmedCase: () => import('~/components/RasioConfirmedCase'),
    ConfirmedCaseList: () => import('~/components/ConfirmedCaseList'),
    UnconfirmedCaseList: () => import('~/components/UnconfirmedCaseList')
  },
  data () {
    return {
      activeRegionId: '32',
      activeRegionCategory: 'kota',
      activeParentRegionName: 'Jawa Barat',
      activeMap: 'polygon',
      activeTable: 'confirmed',
      // data
      parentLabel: {
        kota: {
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          label: 'Kecamatan'
        },
        kelurahan: {
          label: 'Kelurahan/Desa'
        }
      }
    }
  },
  computed: {
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    enableMap (type) {
      this.activeMap = type
    },
    enableTable (type) {
      this.activeTable = type
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
  /* @import "leaflet-geosearch/assets/css/leaflet.css"; */

</style>
