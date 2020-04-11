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
          :active="stat.isActiveCovid"
          @click="enableCovid"
        >
          <font-awesome-icon :icon="fontDiagnoses" /> Sebaran Titik
        </button>
        <button
          class="button-selector mr-2"
          :active="stat.isActivePolygon"
          @click="enablePolygon"
        >
          <font-awesome-icon :icon="fontDiagnoses" /> Sebaran Polygon
        </button>
        <button
          class="button-selector"
          :active="stat.isActiveRS"
          @click="enableRS"
        >
          <font-awesome-icon :icon="fontHospital" /> Fasilitas Kesehatan
        </button>
      </div>
      <div class="mt-4">
        <!-- <MapSebaranCovid v-if="stat.isActiveCovid" />
        <MapFaskes v-if="stat.isActiveRS" />
        <MapSebaranPolygon v-if="stat.isActivePolygon" /> -->
        <MapV2SebaranCluster
          v-if="stat.isActiveCovid"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranPolygon
          v-if="stat.isActivePolygon"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranFaskes
          v-if="stat.isActiveRS"
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
import { faFirstAid, faBug } from '@fortawesome/free-solid-svg-icons'
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
    MapV2SebaranFaskes: () => import('~/components/MapV2SebaranFaskes')
    // FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveCovid: true,
        isActivePolygon: false,
        isActiveRS: false
      },
      fontHospital: faFirstAid,
      fontDiagnoses: faBug,
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
    enableCovid () {
      this.stat.isActiveCovid = true
      this.stat.isActiveRS = false
      this.stat.isActivePolygon = false
    },
    enableRS () {
      this.stat.isActiveCovid = false
      this.stat.isActiveRS = true
      this.stat.isActivePolygon = false
    },
    enablePolygon () {
      this.stat.isActiveCovid = false
      this.stat.isActiveRS = false
      this.stat.isActivePolygon = true
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
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar')
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

