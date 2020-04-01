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
        <MapSebaranCovid v-if="stat.isActiveCovid" />
        <MapFaskes v-if="stat.isActiveRS" />
        <MapSebaranPolygon v-if="stat.isActivePolygon" />
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatArea />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <BarStatTable />
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="chart-container w-full">
        <BarStatJenisKelamin />
        <BarStatUsia />
      </div>
    </section>

    <section class="m-4 md:m-8">
      <BarStatHarianAkumulatif />
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'
import DataSummary from '~/components/_pages/index/DataSummary'
import { faFirstAid, faBug } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'

export default {
  components: {
    DataSummary,
    MapSebaranCovid: () => import('~/components/MapSebaranCovid'),
    MapSebaranPolygon: () => import('~/components/MapSebaranPolygon'),
    MapFaskes: () => import('~/components/MapFaskes'),
    BarStat: () => import('~/components/BarStat'),
    BarStatDetail: () => import('~/components/BarStatDetail'),
    BarStatArea: () => import('~/components/BarStatArea'),
    BarStatJenisKelamin: () => import('~/components/BarStatJenisKelamin'),
    BarStatUsia: () => import('~/components/BarStatUsia'),
    BarStatHarianAkumulatif: () => import('~/components/BarStatHarianAkumulatif'),
    BarStatTable: () => import('~/components/BarStatTable')
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
      fontDiagnoses: faBug
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
