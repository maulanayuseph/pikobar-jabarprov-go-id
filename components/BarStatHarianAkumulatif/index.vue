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
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatHarianAkumulatif',
  components: {
    GChart,
    FontAwesomeIcon
  },
  props: {
    propsDataRekapitulasiJabarHarianProv: {
      type: Array,
      default: () => ([])
    },
    propsDataRekapitulasiJabarKumulatifProv: {
      type: Array,
      default: () => ([])
    }
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
        [
          'Tanggal',
          'Proses Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '']
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
        },
        tooltip: { isHtml: true }
      },
      barChartHarianPDPData: [
        [
          'Tanggal',
          'Proses Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '']
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
        },
        tooltip: { isHtml: true }
      },
      barChartAkumulatifODPData: [
        [
          'Tanggal',
          'Proses Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total ODP',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartAkumulatifODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#89D06E', '#5AB55B', '#009D57'],
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
        },
        tooltip: { isHtml: true }
      },
      barChartAkumulatifPDPData: [
        [
          'Tanggal',
          'Proses Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total PDP',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartAkumulatifPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#EED138', '#E08D3B', '#E0633B'],
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
        },
        tooltip: { isHtml: true }
      }
    }
  },
  watch: {
    propsDataRekapitulasiJabarHarianProv () {
      this.jsonDataProvinsiHarian = this.propsDataRekapitulasiJabarHarianProv
      this.fetchDataProvinsiHarian()
    },
    propsDataRekapitulasiJabarKumulatifProv () {
      this.jsonDataProvinsiKumulatif = this.propsDataRekapitulasiJabarKumulatifProv
      this.fetchDataProvinsiKumulatif()
    }
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

      let stop = false
      for (let i = 0; i < self.jsonDataProvinsiHarian.length; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipODP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipODP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipODP += '<tr><td>Proses Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp_proses + '</b></td></tr>'
          tooltipODP += '<tr><td>Selesai Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp_selesai + '</b></td></tr>'
          tooltipODP += '<tr><td style="font-size: larger;">Total ODP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp + '</b></td></tr>'
          tooltipODP += '</table>'
          let tooltipPDP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipPDP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipPDP += '<tr><td>Proses Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp_proses + '</b></td></tr>'
          tooltipPDP += '<tr><td>Selesai Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp_selesai + '</b></td></tr>'
          tooltipPDP += '<tr><td style="font-size: larger;">Total PDP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp + '</b></td></tr>'
          tooltipPDP += '</table>'
          self.barChartHarianODPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].odp_proses, tooltipODP, self.jsonDataProvinsiHarian[i].odp_selesai, tooltipODP])
          self.barChartHarianPDPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].pdp_proses, tooltipPDP, self.jsonDataProvinsiHarian[i].pdp_selesai, tooltipPDP])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianODPData.splice(1, 1)
      self.barChartHarianPDPData.splice(1, 1)
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      let stop = false
      for (let i = 0; i < self.jsonDataProvinsiKumulatif.length; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipODP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipODP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipODP += '<tr><td>Proses Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp_proses + '</b></td></tr>'
          tooltipODP += '<tr><td>Selesai Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp_selesai + '</b></td></tr>'
          tooltipODP += '<tr><td style="font-size: larger;">Total ODP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp + '</b></td></tr>'
          tooltipODP += '</table>'
          let tooltipPDP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipPDP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipPDP += '<tr><td>Proses Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp_proses + '</b></td></tr>'
          tooltipPDP += '<tr><td>Selesai Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp_selesai + '</b></td></tr>'
          tooltipPDP += '<tr><td style="font-size: larger;">Total PDP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp + '</b></td></tr>'
          tooltipPDP += '</table>'
          self.barChartAkumulatifODPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].odp_proses, tooltipODP, self.jsonDataProvinsiKumulatif[i].odp_selesai, tooltipODP, self.jsonDataProvinsiKumulatif[i].odp, tooltipODP])
          self.barChartAkumulatifPDPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].pdp_proses, tooltipPDP, self.jsonDataProvinsiKumulatif[i].pdp_selesai, tooltipPDP, self.jsonDataProvinsiKumulatif[i].pdp, tooltipPDP])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifODPData.splice(1, 1)
      self.barChartAkumulatifPDPData.splice(1, 1)
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

.google-visualization-tooltip-item {
  white-space: nowrap;
  width: 300px !important;
}
</style>
