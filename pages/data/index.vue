<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Kasus COVID-19 Provinsi Jawa Barat
      </h3>
      <small class="text-xl opacity-75">*Update Terakhir: {{ lastUpdatedAt }}</small>
    </header>
    <section class="m-4 mb-8 md:m-8">
      <DataSummary />
    </section>
    <section class="m-4 mb-8 md:m-8">
      <DataRDT :propsDataRekapitulasiJabar.sync="jsonDataRekapitulasiJabarProv" />
    </section>
    <section class="m-4 mb-8 md:m-8">
      <div class="flex flex-row items-stretch">
        <button
          class="button-selector mr-2"
          :active="stat.isActivePolygon"
          @click="enablePolygon"
        >
          <font-awesome-icon :icon="faMap" /> Sebaran Polygon
        </button>
        <button
          class="button-selector mr-2"
          :active="stat.isActiveCluster"
          @click="enableCluster"
        >
          <font-awesome-icon :icon="faBug" /> Sebaran Titik
        </button>
        <button
          class="button-selector mr-2"
          :active="stat.isActiveFaskes"
          @click="enableFaskes"
        >
          <font-awesome-icon :icon="faFirstAid" /> Fasilitas Kesehatan
        </button>
        <button
          class="button-selector mr-2"
          :active="stat.isActiveTimeslider"
          @click="enableTimeslider"
        >
          <font-awesome-icon :icon="faCalendarMinus" /> Timeslider - Data Positif
        </button>
      </div>
      <div class="mt-4">
        <!-- <MapSebaranCovid v-if="stat.isActiveCovid" />
        <MapFaskes v-if="stat.isActiveRS" />
        <MapSebaranPolygon v-if="stat.isActivePolygon" /> -->
        <MapV2SebaranPolygon
          v-show="stat.isActivePolygon"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranCluster
          v-show="stat.isActiveCluster"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranFaskes
          v-show="stat.isActiveFaskes"
          :propsDataSebaranJabarFaskes.sync="jsonDataSebaranJabarFaskes"
        />
        <MapV2SebaranTimeslider
          v-show="stat.isActiveTimeslider"
          :propsDataSebaranJabarFaskes.sync="jsonDataSebaranJabarFaskes"
        />
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatArea
        :propsDataRekapitulasiJabarProv.sync="jsonDataRekapitulasiJabarProv"
        :propsDataRekapitulasiJabarKab.sync="jsonDataRekapitulasiJabarKab"
        :propsDataRekapitulasiJabarHarianProv.sync="jsonDataRekapitulasiJabarHarianProv"
        :propsDataRekapitulasiJabarHarianKab.sync="jsonDataRekapitulasiJabarHarianKab"
        :propsDataRekapitulasiJabarKumulatifProv.sync="jsonDataRekapitulasiJabarKumulatifProv"
        :propsDataRekapitulasiJabarKumulatifKab.sync="jsonDataRekapitulasiJabarKumulatifKab"
        :propsDataNasionalHarianKumulatif.sync="jsonDataNasionalHarianKumulatif"
      />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatTable :propsDataRekapitulasiJabarKab.sync="jsonDataRekapitulasiJabarKab" />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="chart-container w-full">
        <BarStatJenisKelamin :propsDataRekapitulasiJabar.sync="jsonDataRekapitulasiJabarProv" />
        <BarStatUsia :propsDataRekapitulasiJabar.sync="jsonDataRekapitulasiJabarProv" />
      </div>
    </section>

    <section class="m-4 md:m-8">
      <BarStatHarianAkumulatif
        :propsDataRekapitulasiJabarHarianProv.sync="jsonDataRekapitulasiJabarHarianProv"
        :propsDataRekapitulasiJabarKumulatifProv.sync="jsonDataRekapitulasiJabarKumulatifProv"
      />
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { mapState } from 'vuex'
import DataSummary from '~/components/_pages/index/DataSummary'
import { faFirstAid, faBug, faMap, faCalendarMinus } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'

export default {
  components: {
    DataSummary,
    DataRDT: () => import('~/components/DataRDT'),
    // MapSebaranCovid: () => import('~/components/MapSebaranCovid'),
    // MapSebaranPolygon: () => import('~/components/MapSebaranPolygon'),
    // MapFaskes: () => import('~/components/MapFaskes'),
    BarStat: () => import('~/components/BarStat'),
    BarStatDetail: () => import('~/components/BarStatDetail'),
    BarStatArea: () => import('~/components/BarStatArea'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatif: () => import('~/components/BarStatHarianAkumulatif'),
    BarStatTable: () => import('~/components/BarStatTable'),
    MapV2SebaranCluster: () => import('~/components/MapV2SebaranCluster'),
    MapV2SebaranPolygon: () => import('~/components/MapV2SebaranPolygon'),
    MapV2SebaranFaskes: () => import('~/components/MapV2SebaranFaskes'),
    MapV2SebaranTimeslider: () => import('~/components/MapV2SebaranTimeslider')
    // FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActivePolygon: true,
        isActiveCluster: false,
        isActiveFaskes: false,
        isActiveTimeslider: false
      },
      faFirstAid,
      faBug,
      faMap,
      faCalendarMinus,
      jsonDataRekapitulasiJabarProv: {},
      jsonDataRekapitulasiJabarKab: [],
      jsonDataRekapitulasiJabarHarianProv: [],
      jsonDataRekapitulasiJabarHarianKab: [],
      jsonDataRekapitulasiJabarKumulatifProv: [],
      jsonDataRekapitulasiJabarKumulatifKab: [],
      jsonDataNasionalHarianKumulatif: [],
      jsonDataSebaranJabar: [],
      jsonDataSebaranJabarFaskes: []
    }
  },
  computed: {
    ...mapState({
      cases: state => state.statistics.cases
    }),
    lastUpdatedAt () {
      if (!this.cases) {
        return ''
      }
      return this.formatDateTimeShort(this.cases.updated_at)
    }
  },
  created () {
    this.fetchDataNasionalHarian()
    this.fetchDataRekapitulasiJabarProv()
    this.fetchDataRekapitulasiJabarHarianProv()
    this.fetchDataRekapitulasiJabarKumulatifProv()
    this.fetchDataRekapitulasiJabarKab()
    this.fetchDataRekapitulasiJabarHarianKab()
    this.fetchDataRekapitulasiJabarKumulatifKab()
    this.fetchDataSebaranJabar()
    this.fetchDataSebaranJabarFaskes()
  },
  methods: {
    formatDateTimeShort,
    enablePolygon () {
      this.stat.isActivePolygon = true
      this.stat.isActiveCluster = false
      this.stat.isActiveFaskes = false
      this.stat.isActiveTimeslider = false
    },
    enableCluster () {
      this.stat.isActivePolygon = false
      this.stat.isActiveCluster = true
      this.stat.isActiveFaskes = false
      this.stat.isActiveTimeslider = false
    },
    enableFaskes () {
      this.stat.isActivePolygon = false
      this.stat.isActiveCluster = false
      this.stat.isActiveFaskes = true
      this.stat.isActiveTimeslider = false
    },
    enableTimeslider () {
      this.stat.isActivePolygon = false
      this.stat.isActiveCluster = false
      this.stat.isActiveFaskes = false
      this.stat.isActiveTimeslider = true
    },
    fetchDataRekapitulasiJabarProv () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=prov')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarProv = response.data.data.content
          self.jsonDataRekapitulasiJabarProv.positif_per_gender['laki_laki'] = self.jsonDataRekapitulasiJabarProv.positif_per_gender['laki-laki']
          try {
            if (typeof self.jsonDataRekapitulasiJabarProv.sembuh_per_gender['laki-laki'] !== "undefined") {
              self.jsonDataRekapitulasiJabarProv.sembuh_per_gender['laki_laki'] = self.jsonDataRekapitulasiJabarProv.sembuh_per_gender['laki-laki']
            }
          } catch (error) {
            Object.assign(self.jsonDataRekapitulasiJabarProv, {sembuh_per_gender: {laki_laki: 0, perempuan: 0}});
            Object.assign(self.jsonDataRekapitulasiJabarProv, {sembuh_per_usia: {
              bawah_5: 0, '6_19': 0, '20_29': 0, '30_39': 0, '40_49': 0, '50_59': 0, '60_69': 0, '70_79': 0, atas_80: 0
            }})
          }

          try {
            if (typeof self.jsonDataRekapitulasiJabarProv.meninggal_per_gender['laki-laki'] !== "undefined") {
              self.jsonDataRekapitulasiJabarProv.meninggal_per_gender['laki_laki'] = self.jsonDataRekapitulasiJabarProv.meninggal_per_gender['laki-laki']
            }
          } catch (error) {
            Object.assign(self.jsonDataRekapitulasiJabarProv, {meninggal_per_gender: {laki_laki: 0, perempuan: 0}});
            Object.assign(self.jsonDataRekapitulasiJabarProv, {meninggal_per_usia: {
              bawah_5: 0, '6_19': 0, '20_29': 0, '30_39': 0, '40_49': 0, '50_59': 0, '60_69': 0, '70_79': 0, atas_80: 0
            }})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataRekapitulasiJabarKab () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=kab')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarKab = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataRekapitulasiJabarHarianProv () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=prov')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarHarianProv = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataRekapitulasiJabarHarianKab () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=kab')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarHarianKab = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataRekapitulasiJabarKumulatifProv () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarKumulatifProv = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataRekapitulasiJabarKumulatifKab () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=kab')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarKumulatifKab = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataNasionalHarian () {
      const self = this
      axios
        .get('https://indonesia-covid-19.mathdro.id/api/harian')
        .then(function (response) {
          self.jsonDataNasionalHarianKumulatif = response.data.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataSebaranJabar () {
      const self = this
      axios
        .get('http://localhost/pikobar/sebaran_jabar.json')
        .then(function (response) {
          self.jsonDataSebaranJabar = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataSebaranJabarFaskes () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar/faskes')
        .then(function (response) {
          self.jsonDataSebaranJabarFaskes = response.data.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen md {
    grid-template-columns: 2fr 4fr;
  }
}

.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>

