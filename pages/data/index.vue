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
      <DataRDT :props-data-rekapitulasi-jabar.sync="jsonDataRekapitulasiJabarProv" />
    </section>
    <section class="m-4 mb-8 md:m-8">
      <div class="flex flex-row items-stretch">
        <button
          class="button-selector mr-2"
          style="display: flex;"
          :active="stat.isActivePolygon"
          @click="enablePolygon"
        >
          <img v-if="stat.isActivePolygon" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px;">
          <img v-if="!stat.isActivePolygon" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px;">
          Sebaran Polygon
        </button>
        <button
          class="button-selector mr-2"
          style="display: flex;"
          :active="stat.isActiveCluster"
          @click="enableCluster"
        >
          <img v-if="stat.isActiveCluster" src="/img/icon-sebaran-active.svg" style="margin-top: 2px; margin-right:5px;">
          <img v-if="!stat.isActiveCluster" src="/img/icon-sebaran-inactive.svg" style="margin-top: 2px; margin-right:5px;">
          Sebaran Titik
        </button>
        <button
          class="button-selector mr-2"
          style="display: flex;"
          :active="stat.isActiveFaskes"
          @click="enableFaskes"
        >
          <img v-if="stat.isActiveFaskes" src="/img/icon-faskes-active.svg" style="margin-top: 2px; margin-right:5px;">
          <img v-if="!stat.isActiveFaskes" src="/img/icon-faskes-inactive.svg" style="margin-top: 2px; margin-right:5px;">
          Fasilitas Kesehatan
        </button>
        <button
          class="button-selector mr-2"
          style="display: flex;"
          :active="stat.isActiveTimeslider"
          @click="enableTimeslider"
        >
          <img v-if="stat.isActiveTimeslider" src="/img/icon-data-positif-active.svg" style="margin-top: 2px; margin-right:5px;">
          <img v-if="!stat.isActiveTimeslider" src="/img/icon-data-positif-inactive.svg" style="margin-top: 2px; margin-right:5px;">
          Timeslider - Data Positif
        </button>
      </div>
      <div class="mt-4">
        <!-- <MapSebaranCovid v-if="stat.isActiveCovid" />
        <MapFaskes v-if="stat.isActiveRS" />
        <MapSebaranPolygon v-if="stat.isActivePolygon" /> -->
        <MapV2SebaranPolygon
          v-if="stat.isActivePolygon"
          :props-data-sebaran-jawa-barat.sync="jsonDataSebaranJawaBarat"
        />
        <MapV2SebaranCluster
          v-if="stat.isActiveCluster"
          :props-data-sebaran-jabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranFaskes
          v-if="stat.isActiveFaskes"
          :props-data-sebaran-jabar-faskes.sync="jsonDataSebaranJabarFaskes"
        />
        <MapV2SebaranTimeslider
          v-if="stat.isActiveTimeslider"
          :props-data-sebaran-jabar.sync="jsonDataSebaranJabar"
        />
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatArea
        :props-data-rekapitulasi-jabar-prov.sync="jsonDataRekapitulasiJabarProv"
        :props-data-rekapitulasi-jabar-kab.sync="jsonDataRekapitulasiJabarKab"
        :props-data-rekapitulasi-jabar-harian-prov.sync="jsonDataRekapitulasiJabarHarianProv"
        :props-data-rekapitulasi-jabar-harian-kab.sync="jsonDataRekapitulasiJabarHarianKab"
        :props-data-rekapitulasi-jabar-kumulatif-prov.sync="jsonDataRekapitulasiJabarKumulatifProv"
        :props-data-rekapitulasi-jabar-kumulatif-kab.sync="jsonDataRekapitulasiJabarKumulatifKab"
        :props-data-nasional-harian-kumulatif.sync="jsonDataNasionalHarianKumulatif"
      />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatTable :props-data-rekapitulasi-jabar-kab.sync="jsonDataRekapitulasiJabarKab" />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="chart-container w-full">
        <BarStatJenisKelamin :props-data-rekapitulasi-jabar.sync="jsonDataRekapitulasiJabarProv" />
        <BarStatUsia :props-data-rekapitulasi-jabar.sync="jsonDataRekapitulasiJabarProv" />
      </div>
    </section>

    <section class="m-4 md:m-8">
      <BarStatHarianAkumulatif
        :props-data-rekapitulasi-jabar-harian-prov.sync="jsonDataRekapitulasiJabarHarianProv"
        :props-data-rekapitulasi-jabar-kumulatif-prov.sync="jsonDataRekapitulasiJabarKumulatifProv"
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
import { analytics } from '~/lib/firebase'

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
      jsonDataSebaranJawaBarat: [],
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
  mounted () {
    this.$store.dispatch('statistics/getCases')
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('dashboard_view')
      }
    })
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
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar')
        .then(function (response) {
          self.jsonDataSebaranJabar = response.data.data.content
          self.jsonDataSebaranJawaBarat = response.data.data.content
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
          self.jsonDataSebaranJabarFaskes = response.data.data
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

<style>
@import "leaflet-geosearch/assets/css/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.btn {
  border-radius: 0.25rem;
}

.container-map {
    width:100%;
    height:100%;
    position: relative;
}

.filter-layer {
    position: absolute;
    top: 0px;
    right: 10px;
    padding-right: 1em;
    padding-top: 1em;
}

.filter-layer .btn {
    font-size: 0.8em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}

.filter-data {
    background: #fff;
    margin-top: 0.5em;
    padding: 0.6em;
    border-radius: 0.6em;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}

.filter-layer li {
    list-style: none;
    opacity: 0.4;
    padding-bottom: 0.2em;
}

.filter-layer li:hover {
    cursor: pointer;
}

.filter-active {
    opacity: 1 !important;
}

.filter-data {
    background: #fff;
    color: black;
    margin-top: 0.5em;
    padding: 0.6em;
    border-radius: 0.6em;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}

.legend-color {
    width: 1em;
    height: 1em;
    float: left;
    border-radius: 10px;
    margin-top: 4px;
}

.cluster {
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 700;
    font-family: monospace;
    height: 10px;
    width: 10px;
}

.cluster-odp-proses {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(45, 156, 219, 0.9);
}

.cluster-odp-selesai {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgba(196, 195, 195, 0.9);
}

.cluster-odp-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
  border: 2px solid rgb(45, 156, 219, 0.9);
  background: rgb(165,18,18, 0.9);
}

.cluster-pdp-proses {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(242, 201, 76, 0.9);
}

.cluster-pdp-selesai {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgba(196, 195, 195, 0.9);
}

.cluster-pdp-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
  border: 2px solid rgb(242, 201, 76, 0.9);
  background: rgb(165,18,18, 0.9);
}

.cluster-positif-proses {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(235, 87, 87, 0.9);
}

.cluster-positif-sembuh {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(39, 174, 96, 0.9);
}

.cluster-positif-meninggal {
  /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
  border: 2px solid rgb(235, 87, 87, 0.9);
  background: rgb(165,18,18, 0.9);
}

.digits-0 {
  height: 17px;
  width: 17px;
  margin-top: -14px;
  margin-left: -14px;
}

.digits-1 {
  font-size: 14px;
  height: 28px;
  width: 28px;
  line-height: 28px;
  margin-top: -14px;
  margin-left: -14px;
}

.digits-2 {
  font-size: 16px;
  height: 34px;
  width: 34px;
  line-height: 35px;
  margin-top: -17px;
  margin-left: -17px;
}

.digits-3 {
  font-size: 18px;
  height: 48px;
  width: 47px;
  line-height: 47px;
  /* border-width: 3px; */
  margin-top: -24px;
  margin-left: -24px;
}

.digits-4 {
  font-size: 18px;
  height: 58px;
  width: 58px;
  line-height: 57px;
  /* border-width: 4px; */
  margin-top: -29px;
  margin-left: -29px;
}

.legend-layer {
  /* position: absolute; */
  /* bottom: 10px; */
  /* left: 30px; */
  /* padding-right: 1em; */
  /* padding-top: 1em; */
}


.legend-data {
  background: rgb(255,255,2555);
  margin-top: 0.5em;
  padding: 0.6em;
  /* border-radius: 0.6em; */
  /* box-shadow: 0 1px 5px rgba(0,0,0,0.65); */
  line-height: 18px;
  color: #252525;
}

.legend-data ul {
  list-style: none;
  margin-bottom: 0px;
}

.legend-data li {
  padding: 3px;
}

.legend-data i {
  width: 13px;
  height: 13px;
  float: left;
  margin-right: 8px;
  border: white 1px solid;
}

.leaflet-div-icon {
  border: none!important;
  border-radius: 20px;
}

.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
  border-radius: 1em;
}

.text-disclaimer {
  top:15%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
}

.leaflet-top .leaflet-control-geosearch.bar,
.leaflet-bottom .leaflet-control-geosearch.bar {
  display: none;
}

.leaflet-control-geosearch.bar {
  position: relative;
  display: block;
  height: auto;
  width: 400px;
  margin: 10px auto 0;
  cursor: auto;
  z-index: 1000;
}

.leaflet-control-geosearch.bar form {
  position: relative;
  top: 0;
  left: 0;
  display: block;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.leaflet-control-geosearch.bar form input {
  min-width: 100%;
  width: 100%;
}

.leaflet-control-geosearch.bar .results.active:after {
  opacity: .2;
}

.leaflet-right .leaflet-control-geosearch form {
  right: 28px;
  left: initial;
  border-radius: 4px 0 0 4px;
  border-left: inherit;
  border-right: none;
}

.leaflet-control-geosearch a.reset {
  color: black;
  position: absolute;
  line-height: 30px;
  padding: 0 8px;
  right: 0;
  top: 0;
  cursor: pointer;
  border: none;
}

.leaflet-control-geosearch a.reset:hover {
  background: #f5f5f5;
}

</style>
