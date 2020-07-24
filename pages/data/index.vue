<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Dashboard Statistik Kasus Covid-19 Provinsi Jawa Barat
      </h3>
      <small class="text-xl opacity-75">*Update Terakhir: {{ lastUpdatedAt }}</small>
    </header>
    <section class="m-4 mb-8 md:m-8">
      <DataSummary />
    </section>
    <section class="m-4 mb-8 md:m-8">
      <DataRDT />
    </section>
    <section class="m-4 mb-8 md:m-8">
      <DataPCR />
    </section>
    <section>
      <a
        href="/distribution-case"
      >
        <div class="m-4 mb-8 md:m-8 h-48 bg-orange-600 rounded-lg shadow-md" style="background-color: #FEC52E;">
          <div class="float-left py-6 px-10">
            <div class="text-2xl font-bold">
              Ketahui informasi lebih lengkap mengenai <br>
              Sebaran Kasus COVID-19 di Provinsi Jawa Barat
            </div>

            <button class="bg-white py-2 px-4 rounded font-semibold mt-5 hover:shadow">
              Lihat Selengkapnya <FontAwesomeIcon :icon="faAngleRight" class="ml-2 text-xl align-middle" />
            </button>
          </div>
          <img class="float-right h-full" src="~assets/banner-sebaran-ilustrasi.png">
        </div>
      </a>
      <!-- <div class="div-banner-distribution-case">
        <a
          class="px-4 py-2 font-bold text-lg"
          href="/distribution-case"
        >
          <img class="banner-distribution-case" style="width: 100%;" src="~assets/Banner_sebaran_kasus.png">
          <img class="hidden banner-distribution-case-hover" style="width: 100%;" src="~assets/Banner_sebaran_kasus_hover.png">
        </a>
      </div> -->
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatAreaSingleV2 />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="chart-container w-full">
        <BarStatJenisKelamin />
        <BarStatUsia />
      </div>
    </section>

    <section class="m-4 md:m-8">
      <BarStatHarianAkumulatifV2 />
    </section>

    <section class="m-4 md:m-8 flex">
      <a class="link-hover bg-white rounded-lg overflow-hidden shadow-md w-1/2 mr-2" href="/table-case" target="_blank">
        <div class="flex" style="padding: 40px;">
          <div class="w-5/6 text-xl">
            <b>Akses Data Kasus COVID-19 - <br>di sini</b>
          </div>
          <div class="w-1/6">
            <FontAwesomeIcon :icon="faArrowRight" size="2x" style="margin-top: 10px;" />
          </div>
        </div>
      </a>
      <a class="link-hover bg-white rounded-lg overflow-hidden shadow-md w-1/2 ml-2" href="https://covid19-public.digitalservice.id/api/v1/">
        <div class="flex" style="padding: 40px;">
          <div class="w-5/6 text-xl">
            <b>Dapatkan akses API Publik - <br>Data Pikobar di sini</b>
          </div>
          <div class="w-1/6">
            <FontAwesomeIcon :icon="faArrowRight" size="2x" style="margin-top: 10px;" />
          </div>
        </div>
      </a>
    </section>
  </div>
</template>

<style>
.link-hover:hover {
  box-shadow: 0 0 20px #6DD174;
  color: #6DD174;
}
.link-hover-warning:hover {
  box-shadow: 0 0 10px #FED1B1;
  text-decoration: underline;
  cursor: pointer;
}

.div-banner-distribution-case:hover .banner-distribution-case-hover {
  display: block;
}

.div-banner-distribution-case:hover .banner-distribution-case {
  display: none;
}
</style>
<script>
/* eslint-disable */
import axios from 'axios'
import { mapState } from 'vuex'
import DataSummary from '~/components/_pages/index/DataSummary'
import { faFirstAid, faBug, faMap, faCalendarMinus, faArrowRight, faChevronRight, faInfo, faCircle, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    DataSummary,
    DataRDT: () => import('~/components/DataRDT'),
    DataPCR: () => import('~/components/DataPCR'),
    BarStatAreaSingleV2: () => import('~/components/BarStatAreaSingleV2'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatifV2: () => import('~/components/BarStatHarianAkumulatifV2'),
    MapSebaranHeatmap: () => import('~/components/MapSebaranHeatmap'),
    MapV2SebaranFaskes: () => import('~/components/MapV2SebaranFaskes')
  },
  data () {
    return {
      stat: {
        isActiveHeatmap: true,
        isActiveFaskes: false,
      },
      activeTabId: 'map-kel',
      faFirstAid,
      faBug,
      faMap,
      faCalendarMinus,
      faArrowRight,
      faChevronRight,
      faInfo,
      faCircle,
      faAngleRight,

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
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-nasional-harian/getItems'),
        this.$store.dispatch('data-kasus-harian/getItems'),
        this.$store.dispatch('data-kasus-harian-kota/getItems'),
        this.$store.dispatch('data-sebaran-jabar-faskes/getItems'),
        this.$store.dispatch('statistics/getCases'),
        this.$store.dispatch('data-kasus-total/getItems')
      ]).then(() => {
      })

      if (process.browser) {
        analytics.logEvent('dashboard_view')
      }
    })
  },
  methods: {
    formatDateTimeShort,
    enableHeatmap () {
      this.stat.isActiveHeatmap = true
      this.stat.isActiveFaskes = false
    },
    enableFaskes () {
      this.stat.isActiveHeatmap = false
      this.stat.isActiveFaskes = true
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
.bg-green-100 {
  background-color: #5AAA4E;
}
.text-white {
  color: white;
}
.btn {
  border-radius: 0.25rem;
}

.container-map {
    width:100%;
    height:100%;
    position: relative;
    background-color: #ffffff;
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

.btn-fullscreen {
  position: absolute;
  bottom: 0px;
  left: 10px;
  font-size: 1.3em;
  padding: 2px 6px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  z-index: 401;
}

.btn-fullscreen:hover {
  cursor: pointer;
}

.title-map {
  position: absolute;
  top: 0;
  color: #ffffff;
}

</style>
