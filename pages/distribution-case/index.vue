<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="w-2/3">
          <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
            Sebaran Kasus Covid-19 di Jawa Barat
          </h3>
        </div>
        <div class="w-1/3">
          <div class="flex flex-col lg:flex-row">
            <div class="w-1/2 mr-2">
              <v-select
                v-model="selectedKota"
                :clearable="false"
                :options="optionsKota"
                :reduce="kota => kota.value"
                label="label"
                @input="setSelectedKota"
              />
            </div>
            <div class="w-1/2">
              <v-select
                v-model="selectedKecamatan"
                :clearable="false"
                :options="optionsKecamatan"
                :reduce="kecamatan => kecamatan.value"
                label="label"
                :disabled="selectedKota === '32' ? true : false"
                @input="setSelectedKecamatan"
              />
            </div>
          </div>
        </div>
      </div>
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
            <MapV3SebaranPolygon v-if="activeMap === 'polygon'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTitik v-if="activeMap === 'titik'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
            <MapV3SebaranTimeSlider v-if="activeMap === 'timeslider'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
          </div>
        </div>
        <div class="w-full mb-6 lg:w-2/5 lg:mb-0 bg-white rounded-lg mb-8 shadow-lg">
          <RasioConfirmedCase :active-region-id="activeRegionId" :active-region-category="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" :active-case-category.sync="activeCaseCategory" />
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
                :active="activeTable === 'undermonitoring'"
                @click="enableTable('undermonitoring')"
              >
                ODP
              </button>
              <button
                class="button-selector m-1 w-full xl:w-auto "
                style="display: flex;"
                :active="activeTable === 'underinvestigation'"
                @click="enableTable('underinvestigation')"
              >
                PDP
              </button>
            </div>
          </div>
          <ConfirmedCaseList v-if="activeTable === 'confirmed'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <UnconfirmedCaseList v-if="activeTable === 'unconfirmed'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <UnderMonitoringCaseList v-if="activeTable === 'undermonitoring'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
          <UnderInvestigationCaseList v-if="activeTable === 'underinvestigation'" :active-region-id.sync="activeRegionId" :active-region-category.sync="activeRegionCategory" :active-parent-region-name.sync="activeParentRegionName" />
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
    UnconfirmedCaseList: () => import('~/components/UnconfirmedCaseList'),
    UnderMonitoringCaseList: () => import('~/components/UnderMonitoringCaseList'),
    UnderInvestigationCaseList: () => import('~/components/UnderInvestigationCaseList')
  },
  data () {
    return {
      options: [{ code: 'CA', country: 'Canada' }],
      activeRegionId: '32',
      activeRegionCategory: 'kota',
      activeParentRegionName: 'Jawa Barat',
      activeMap: 'polygon',
      activeTable: 'confirmed',
      activeCaseCategory: 'positif_aktif',

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
      },

      optionsKota: [
        { value: '32', label: 'JAWA BARAT' },
        { value: '3201', label: 'KAB. BOGOR' },
        { value: '3202', label: 'KAB. SUKABUMI' },
        { value: '3203', label: 'KAB. CIANJUR' },
        { value: '3204', label: 'KAB. BANDUNG' },
        { value: '3205', label: 'KAB. GARUT' },
        { value: '3206', label: 'KAB. TASIKMALAYA' },
        { value: '3207', label: 'KAB. CIAMIS' },
        { value: '3208', label: 'KAB. KUNINGAN' },
        { value: '3209', label: 'KAB. CIREBON' },
        { value: '3210', label: 'KAB. MAJALENGKA' },
        { value: '3211', label: 'KAB. SUMEDANG' },
        { value: '3212', label: 'KAB. INDRAMAYU' },
        { value: '3213', label: 'KAB. SUBANG' },
        { value: '3214', label: 'KAB. PURWAKARTA' },
        { value: '3215', label: 'KAB. KARAWANG' },
        { value: '3216', label: 'KAB. BEKASI' },
        { value: '3217', label: 'KAB. BANDUNG BARAT' },
        { value: '3218', label: 'KAB. PANGANDARAN' },
        { value: '3271', label: 'KOTA BOGOR' },
        { value: '3272', label: 'KOTA SUKABUMI' },
        { value: '3273', label: 'KOTA BANDUNG' },
        { value: '3274', label: 'KOTA CIREBON' },
        { value: '3275', label: 'KOTA BEKASI' },
        { value: '3276', label: 'KOTA DEPOK' },
        { value: '3277', label: 'KOTA CIMAHI' },
        { value: '3278', label: 'KOTA TASIKMALAYA' },
        { value: '3279', label: 'KOTA BANJAR' }
      ],
      selectedKota: '32',

      optionsKecamatan: [{
        label: 'Pilih Kecamatan',
        value: ''
      }],
      selectedKecamatan: ''
    }
  },
  computed: {
    dataKecamatan () {
      return this.$store.getters['data-kecamatan/itemsMap']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) {
      if (this.activeRegionCategory === 'kelurahan') {
        this.selectedKecamatan = parseInt(newVal)
      } else if (this.activeRegionCategory === 'kecamatan') {
        this.selectedKota = newVal
        this.selectedKecamatan = ''
        this.getDataKecamatan(newVal)
      } else {
        this.selectedKota = '32'
        this.selectedKecamatan = ''
      }
    },
    dataKecamatan (val) {
      const optionsKecamatan = [{
        label: 'Pilih Kecamatan',
        value: ''
      }]
      val.forEach((element) => {
        optionsKecamatan.push({
          label: element.bps_kecamatan_nama,
          value: element.bps_kecamatan_kode
        })
      })

      this.optionsKecamatan = optionsKecamatan
    }
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-kasus-total/getItems')
      ]).then(() => {
      })
    })

    this.getDataKecamatan()
  },
  methods: {
    enableMap (type) {
      this.activeMap = type
      this.activeCaseCategory = 'positif_aktif'
    },
    enableTable (type) {
      this.activeTable = type
    },
    setSelectedKota (val) {
      if (val === '32') {
        this.getDataSebaranPolygon('kota', this.activeCaseCategory)
        this.activeRegionId = val
        this.activeRegionCategory = 'kota'
      } else {
        this.selectedKecamatan = ''
        this.getDataKecamatan(val)

        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, val)

        this.activeRegionId = val
        this.activeRegionCategory = 'kecamatan'
      }
    },
    setSelectedKecamatan (val) {
      const kodeKec = val.toString()
      if (val === '') {
        this.getDataKecamatan(this.selectedKota)
        this.getDataSebaranPolygon('kecamatan', this.activeCaseCategory, this.selectedKota)
        this.activeRegionId = this.selectedKota
        this.activeRegionCategory = 'kecamatan'
      } else {
        this.getDataSebaranPolygon('kelurahan', this.activeCaseCategory, kodeKec)

        this.activeRegionId = kodeKec
        this.activeRegionCategory = 'kelurahan'
      }
    },

    // GET
    getDataKecamatan (kodeKab = '') {
      let where = {
        bps_provinsi_kode: '32'
      }

      if (kodeKab) {
        where = {
          bps_kabupaten_kode: kodeKab
        }
      }

      const params = {
        where,
        exclude: 'polygon_json'
      }
      this.$store.dispatch('data-kecamatan/getItems', params)
    },
    getDataSebaranPolygon (region, category, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      if (category) {
        query += '&category=' + category
      }

      switch (region) {
        case 'kecamatan' : {
          parentKeyCode = 'kode_kab'
          break
        }
        case 'kelurahan' : {
          parentKeyCode = 'kode_kec'
          break
        }
        default : parentKeyCode = ''
      }

      query += `&${parentKeyCode}=${regionCode}`

      this.$store.dispatch('data-sebaran-polygon/getItem', query)
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
  @import "vue-select/dist/vue-select.css";

  /* @import "leaflet-geosearch/assets/css/leaflet.css"; */

</style>
