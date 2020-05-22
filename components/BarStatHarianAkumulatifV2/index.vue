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
      <div class="bg-white rounded-lg overflow-hidden shadow-md">
        <div class="flex flex-wrap">
          <h4 class="p-5 text-xl">
            <b>Angka Harian ODP</b><br>
            <small class="opacity-50">(Orang Dalam Pemantauan)</small>
          </h4>
          <div class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateODP.captions"
                  :preset-ranges="rangedateODP.presetRanges"
                  @selected="onDateSelectedODP"
                />
              </client-only>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          class="p-5"
          type="ComboChart"
          :data="barChartHarianODPData"
          :options="barChartHarianODPOptions"
        />
      </div>
      <div class="overflow-hidden bg-white rounded-lg shadow-md">
        <div class="flex flex-wrap">
          <h4 class="p-5 text-xl">
            <b>Angka Harian PDP</b><br>
            <small class="opacity-50">(Pasien Dalam Pengawasan)</small>
          </h4>
          <div class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedatePDP.captions"
                  :preset-ranges="rangedatePDP.presetRanges"
                  @selected="onDateSelectedPDP"
                />
              </client-only>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          class="p-5"
          type="ComboChart"
          :data="barChartHarianPDPData"
          :options="barChartHarianPDPOptions"
        />
      </div>
    </section>

    <section
      v-if="stat.isActiveAkumulatif"
      class="chart-container w-full mt-4"
    >
      <div class="overflow-hidden bg-white rounded-lg shadow-md">
        <div class="flex flex-wrap">
          <h4 class="p-5 text-xl">
            <b>Kumulatif ODP</b><br>
            <small class="opacity-50">(Orang Dalam Pemantauan)</small>
          </h4>
          <div class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedateODP.captions"
                  :preset-ranges="rangedateODP.presetRanges"
                  @selected="onDateSelectedODP"
                />
              </client-only>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          type="LineChart"
          :data="barChartAkumulatifODPData"
          :options="barChartAkumulatifODPOptions"
        />
      </div>
      <div class="overflow-hidden bg-white rounded-lg shadow-md">
        <div class="flex flex-wrap">
          <h4 class="p-5 text-xl">
            <b>Kumulatif PDP</b><br>
            <small class="opacity-50">(Pasien Dalam Pengawasan)</small>
          </h4>
          <div class="card-content pt-2 pb-2" style="margin: auto; margin-right: 0px; padding-right: 20px;">
            <div class="daterange-wrapper">
              <client-only>
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedatePDP.captions"
                  :preset-ranges="rangedatePDP.presetRanges"
                  @selected="onDateSelectedPDP"
                />
              </client-only>
            </div>
          </div>
        </div>
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
  name: 'BarStatHarianAkumulatifV2',
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
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartHarianODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#2964BC', '#023857', '#EB5757'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 2: { type: 'line' } },
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
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
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ],
      barChartHarianPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#FFD648', '#C99307', '#EB5757'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 2: { type: 'line' } },
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
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
        colors: ['#73A5EF', '#0667AC', '#06285A'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
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
        colors: ['#FFD648', '#C99307', '#725201'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
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
      selectedDateODP: {
        start: '',
        end: ''
      },
      selectedDatePDP: {
        start: '',
        end: ''
      },
      rangedateODP: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: true,
              dateRange: {
                start: new Date('2020-03-01'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      },
      rangedatePDP: {
        captions: {
          title: 'Pilih Tanggal',
          ok_button: 'Terapkan'
        },
        presetRanges: {
          all () {
            return {
              label: 'Semua Waktu',
              active: true,
              dateRange: {
                start: new Date('2020-03-01'),
                end: new Date()
              }
            }
          },
          seminggu () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 8, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Minggu Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          },
          sebulan () {
            const n = new Date()
            const tanggalmulai = new Date(n.getFullYear(), n.getMonth(), n.getDate() - 31, 0, 0)
            const tanggalselesai = new Date(n.getFullYear(), n.getMonth(), n.getDate(), 23, 59)
            return {
              label: '1 Bulan Terakhir',
              active: false,
              dateRange: {
                start: tanggalmulai,
                end: tanggalselesai
              }
            }
          }
        }
      }
    }
  },
  watch: {
    propsDataRekapitulasiJabarHarianProv () {
      // this.jsonDataProvinsiHarian = this.propsDataRekapitulasiJabarHarianProv
      for (let i = 0; i < this.propsDataRekapitulasiJabarHarianProv.length; i++) {
        const temp1 = this.propsDataRekapitulasiJabarHarianProv[i]
        let odpJml = 0
        let pdpJml = 0
        let odpRatarata = 0
        let pdpRatarata = 0
        if (i === 0) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp
          odpRatarata = odpJml / 1
          pdpRatarata = pdpJml / 1
        } else if (i === 1) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp
          odpRatarata = odpJml / 2
          pdpRatarata = pdpJml / 2
        } else if (i === 2) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp + this.propsDataRekapitulasiJabarHarianProv[i - 2].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 2].pdp
          odpRatarata = odpJml / 3
          pdpRatarata = pdpJml / 3
        } else if (i === 3) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp + this.propsDataRekapitulasiJabarHarianProv[i - 2].odp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 2].pdp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].pdp
          odpRatarata = odpJml / 4
          pdpRatarata = pdpJml / 4
        } else if (i === 4) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp + this.propsDataRekapitulasiJabarHarianProv[i - 2].odp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].odp + this.propsDataRekapitulasiJabarHarianProv[i - 4].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 2].pdp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 4].pdp
          odpRatarata = odpJml / 5
          pdpRatarata = pdpJml / 5
        } else if (i === 5) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp + this.propsDataRekapitulasiJabarHarianProv[i - 2].odp +
          this.propsDataRekapitulasiJabarHarianProv[i - 3].odp + this.propsDataRekapitulasiJabarHarianProv[i - 4].odp + this.propsDataRekapitulasiJabarHarianProv[i - 5].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 2].pdp +
          this.propsDataRekapitulasiJabarHarianProv[i - 3].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 4].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 5].pdp
          odpRatarata = odpJml / 6
          pdpRatarata = pdpJml / 6
        } else if (i > 6) {
          odpJml = this.propsDataRekapitulasiJabarHarianProv[i].odp + this.propsDataRekapitulasiJabarHarianProv[i - 1].odp + this.propsDataRekapitulasiJabarHarianProv[i - 2].odp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].odp + this.propsDataRekapitulasiJabarHarianProv[i - 4].odp + this.propsDataRekapitulasiJabarHarianProv[i - 5].odp +
            this.propsDataRekapitulasiJabarHarianProv[i - 6].odp
          pdpJml = this.propsDataRekapitulasiJabarHarianProv[i].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 1].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 2].pdp +
            this.propsDataRekapitulasiJabarHarianProv[i - 3].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 4].pdp + this.propsDataRekapitulasiJabarHarianProv[i - 5].pdp +
            this.propsDataRekapitulasiJabarHarianProv[i - 6].pdp
          odpRatarata = odpJml / 7
          pdpRatarata = pdpJml / 7
        } else {
          odpJml = 0
          pdpJml = 0
          odpRatarata = 0
          pdpRatarata = 0
        }
        const temp2 = { odp_ratarata: parseInt(odpRatarata.toFixed(2)), pdp_ratarata: parseInt(pdpRatarata.toFixed(2)) }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataProvinsiHarian.push(temp3)
      }
      this.fetchDataODPProvinsiHarian()
      this.fetchDataPDPProvinsiHarian()
    },
    propsDataRekapitulasiJabarKumulatifProv () {
      this.jsonDataProvinsiKumulatif = this.propsDataRekapitulasiJabarKumulatifProv
    }
  },
  mounted () {
    this.selectedDateODP.start = new Date('2020-03-01')
    this.selectedDateODP.end = new Date()
    this.selectedDatePDP.start = new Date('2020-03-01')
    this.selectedDatePDP.end = new Date()
    this.checkIsMobile()
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
      // const year = d.getFullYear()
      // let month = '' + (d.getMonth() + 1)
      // let day = '' + d.getDate()
      // if (month.length < 2) {
      //   month = '0' + month
      // }
      // if (day.length < 2) {
      //   day = '0' + day
      // }
      // return [day, month, year].join('-')
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    },
    formatDateYMD (date) {
      const d = new Date(date)
      let currDate = d.getDate()
      let currMonth = d.getMonth() + 1
      const currYear = d.getFullYear()
      if (currMonth < 10) {
        currMonth = '0' + currMonth
      }
      if (currDate < 10) {
        currDate = '0' + currDate
      }
      return currYear + '-' + currMonth + '-' + currDate
    },
    formatDateNoYear (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short'
      }
      return d.toLocaleString('id-ID', options)
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      this.fetchDataODPProvinsiHarian()
      this.fetchDataPDPProvinsiHarian()
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      this.fetchDataODPProvinsiKumulatif()
      this.fetchDataPDPProvinsiKumulatif()
    },
    fetchDataODPProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartHarianODPData = [
        [
          'Tanggal',
          'Proses Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pemantauan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateODP.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateODP.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipODP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipODP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipODP += '<tr><td>Proses Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp_proses + '</b></td></tr>'
          tooltipODP += '<tr><td>Selesai Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp_selesai + '</b></td></tr>'
          tooltipODP += '<tr><td>Total ODP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp + '</b></td></tr>'
          tooltipODP += '<tr><td>Rata-rata 7 Hari</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].odp_ratarata + '</b></td></tr>'
          tooltipODP += '</table>'
          self.barChartHarianODPData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiHarian[i].odp_proses, tooltipODP,
            self.jsonDataProvinsiHarian[i].odp_selesai, tooltipODP,
            self.jsonDataProvinsiHarian[i].odp_ratarata, tooltipODP
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianODPData.splice(1, 1)
    },
    fetchDataPDPProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartHarianPDPData = [
        [
          'Tanggal',
          'Proses Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Selesai Pengawasan',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '']
      ]

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDatePDP.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDatePDP.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiHarian.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
        if (stop === false) {
          let tooltipPDP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipPDP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipPDP += '<tr><td>Proses Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp_proses + '</b></td></tr>'
          tooltipPDP += '<tr><td>Selesai Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp_selesai + '</b></td></tr>'
          tooltipPDP += '<tr><td>Total PDP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp + '</b></td></tr>'
          tooltipPDP += '<tr><td>Rata-rata 7 Hari</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiHarian[i].pdp_ratarata + '</b></td></tr>'
          tooltipPDP += '</table>'
          self.barChartHarianPDPData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiHarian[i].pdp_proses, tooltipPDP,
            self.jsonDataProvinsiHarian[i].pdp_selesai, tooltipPDP,
            self.jsonDataProvinsiHarian[i].pdp_ratarata, tooltipPDP
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartHarianPDPData.splice(1, 1)
    },
    fetchDataODPProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartAkumulatifODPData = [
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
      ]

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDateODP.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDateODP.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipODP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipODP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipODP += '<tr><td>Proses Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp_proses + '</b></td></tr>'
          tooltipODP += '<tr><td>Selesai Pemantauan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp_selesai + '</b></td></tr>'
          tooltipODP += '<tr><td style="font-size: larger;">Total ODP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].odp + '</b></td></tr>'
          tooltipODP += '</table>'
          self.barChartAkumulatifODPData.push([self.formatDateNoYear(date), self.jsonDataProvinsiKumulatif[i].odp_proses, tooltipODP, self.jsonDataProvinsiKumulatif[i].odp_selesai, tooltipODP, self.jsonDataProvinsiKumulatif[i].odp, tooltipODP])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifODPData.splice(1, 1)
    },
    fetchDataPDPProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // clear
      this.barChartAkumulatifPDPData = [
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
      ]

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDatePDP.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDatePDP.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataProvinsiKumulatif.length - 1
      }

      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
        if (stop === false) {
          let tooltipPDP = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipPDP += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipPDP += '<tr><td>Proses Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp_proses + '</b></td></tr>'
          tooltipPDP += '<tr><td>Selesai Pengawasan </td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp_selesai + '</b></td></tr>'
          tooltipPDP += '<tr><td style="font-size: larger;">Total PDP</td><td><b style="margin-left: 10px;">' + self.jsonDataProvinsiKumulatif[i].pdp + '</b></td></tr>'
          tooltipPDP += '</table>'
          self.barChartAkumulatifPDPData.push([self.formatDateNoYear(date), self.jsonDataProvinsiKumulatif[i].pdp_proses, tooltipPDP, self.jsonDataProvinsiKumulatif[i].pdp_selesai, tooltipPDP, self.jsonDataProvinsiKumulatif[i].pdp, tooltipPDP])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      self.barChartAkumulatifPDPData.splice(1, 1)
    },
    onDateSelectedODP (daterange) {
      this.selectedDateODP = daterange
      if (this.stat.isActiveHarian === true) {
        this.fetchDataODPProvinsiHarian()
      } else if (this.stat.isActiveAkumulatif === true) {
        this.fetchDataODPProvinsiKumulatif()
      }
    },
    onDateSelectedPDP (daterange) {
      this.selectedDatePDP = daterange
      if (this.stat.isActiveHarian === true) {
        this.fetchDataPDPProvinsiHarian()
      } else if (this.stat.isActiveAkumulatif === true) {
        this.fetchDataPDPProvinsiKumulatif()
      }
    },
    checkIsMobile () {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        this.isMobile = true
      } else {
        this.isMobile = false
      }
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
