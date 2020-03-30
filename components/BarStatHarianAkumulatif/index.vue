<template>
  <div>
    <nav class="flex flex-row items-center">
      <button
        class="button-selector mr-2"
        :active="stat.isActiveHarian"
        @click="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" />
        <span>
          Angka Harian
        </span>
      </button>
      <button
        class="button-selector"
        :active="stat.isActiveAkumulatif"
        @click="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" />
        <span>
          Kumulatif
        </span>
      </button>
    </nav>

    <section
      v-if="stat.isActiveHarian"
      class="chart-container w-full mt-4"
    >
      <div
        class="bg-white rounded-lg overflow-hidden shadow-md"
      >
        <h4 class="p-5 text-xl">
          <b>Angka Harian ODP</b><br>
          <small class="opacity-50">(Orang Dalam Pemantauan)</small>
        </h4>
        <hr>
        <GChart
          class="p-5"
          type="BarChart"
          :data="barChartHarianODPData"
          :options="barChartHarianODPOptions"
        />
      </div>
      <div
        class="overflow-hidden bg-white rounded-lg shadow-md"
      >
        <h4 class="p-5 text-xl">
          <b>Angka Harian PDP</b><br>
          <small class="opacity-50">(Pasien Dalam Pengawasan)</small>
        </h4>
        <hr>
        <GChart
          class="p-5"
          type="BarChart"
          :data="barChartHarianPDPData"
          :options="barChartHarianPDPOptions"
        />
      </div>
    </section>

    <section
      v-if="stat.isActiveAkumulatif"
      class="chart-container w-full mt-4"
    >
      <div
        class="overflow-hidden bg-white rounded-lg shadow-md"
      >
        <h4 class="p-5 text-xl">
          <b>Kumulatif ODP</b><br>
          <small class="opacity-50">(Orang Dalam Pemantauan)</small>
        </h4>
        <hr>
        <GChart
          type="LineChart"
          :data="barChartAkumulatifODPData"
          :options="barChartAkumulatifODPOptions"
        />
      </div>
      <div
        class="overflow-hidden bg-white rounded-lg shadow-md"
      >
        <h4 class="p-5 text-xl">
          <b>Kumulatif PDP</b><br>
          <small class="opacity-50">(Pasien Dalam Pengawasan)</small>
        </h4>
        <hr>
        <GChart
          type="LineChart"
          :data="barChartAkumulatifPDPData"
          :options="barChartAkumulatifPDPOptions"
        />
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatHarianAkumulatif',
  components: {
    GChart,
    FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataRekap: [
      ],
      jsonDataSatuan: [
      ],
      jsonDataResult: {
        odp: 0,
        odp_proses: 0,
        odp_proses_persen: 0,
        odp_selesai: 0,
        odp_selesai_persen: 0,
        pdp: 0,
        pdp_proses: 0,
        pdp_proses_persen: 0,
        pdp_selesai: 0,
        pdp_selesai_persen: 0,
        positif: 0,
        perawatan: 0,
        sembuh: 0,
        meninggal: 0,
        total_positif_saat_ini: 0,
        total_sembuh: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      },
      barChartHarianODPData: [
        ['Tanggal', 'Total Pemantauan'],
        ['0', 0]
      ],
      barChartHarianODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartHarianPDPData: [
        ['Tanggal', 'Total Pengawasan'],
        ['0', 0]
      ],
      barChartHarianPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifODPData: [
        ['Tanggal', 'Total ODP'],
        ['0', 0]
      ],
      barChartAkumulatifODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762', '#009F5D'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifPDPData: [
        ['Tanggal', 'Total PDP'],
        ['0', 0]
      ],
      barChartAkumulatifPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931', '#F55A2A'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      }
    }
  },
  created () {
    this.fetchDataProvinsiHarian()
    this.fetchDataProvinsiKumulatif()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiHarian = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiHarian.length; i++) {
            const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
            if (stop === false) {
              self.barChartHarianODPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].odp])
              self.barChartHarianPDPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].pdp])
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.barChartHarianODPData.splice(1, 1)
          self.barChartHarianPDPData.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiKumulatif = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiKumulatif.length; i++) {
            const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
            if (stop === false) {
              self.barChartAkumulatifODPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].odp])
              self.barChartAkumulatifPDPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].pdp])
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.barChartAkumulatifODPData.splice(1, 1)
          self.barChartAkumulatifPDPData.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
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

.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen md {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
