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
          v-if="stat.isActivePolygon"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranCluster
          v-if="stat.isActiveCluster"
          :propsDataSebaranJabar.sync="jsonDataSebaranJabar"
        />
        <MapV2SebaranFaskes
          v-if="stat.isActiveFaskes"
          :propsDataSebaranJabarFaskes.sync="jsonDataSebaranJabarFaskes"
        />
        <MapV2SebaranTimeslider
          v-if="stat.isActiveTimeslider"
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
        isActivePolygon: false,
        isActiveCluster: false,
        isActiveFaskes: true,
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
  position: absolute;
  bottom: 10px;
  left: 30px;
  padding-right: 1em;
  padding-top: 1em;
}


.legend-data {
  background: rgb(0, 0, 0);
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  line-height: 18px;
  color: #a9a9a9;
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

</style>
