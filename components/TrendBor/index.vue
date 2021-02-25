<template>
  <div>
    <div :class="!isLoading ? '' : 'hidden'">
      <div class="my-3 bg-white rounded-lg shadow-lg">
        <div class="md:flex md:flex-row items-center border-b-2 p-4">
          <h4 class="font-bold text-lg">
            Tren Keterisian Tempat Tidur (BOR)
          </h4>
          <div class="ml-auto flex flex-row">
            <client-only>
              <div class="daterange-wrapper mx-1">
                <vue-rangedate-picker
                  righttoleft="true"
                  :captions="rangedate.captions"
                  :preset-ranges="rangedate.presetRanges"
                  @selected="onDateSelected"
                />
              </div>
              <multiselect
                v-model="selectedZone"
                class="optZone mx-1"
                :options="optionsZone"
                track-by="value"
                label="label"
                select-label=""
                deselect-label=""
                selected-label=""
                @input="setSelectedZone"
              />
              <multiselect
                v-model="selectedCity"
                :disabled="selectedZone.value === 'all'"
                class="optCity mx-1"
                :options="optionsCity"
                track-by="value"
                label="label"
                select-label=""
                deselect-label=""
                selected-label=""
                @input="setSelectedCity"
              />
            </client-only>
          </div>
        </div>
        <div class="p-6">
          <line-chart :chart-data="chartData" :options="chartOptions" :height="140" />
        </div>
      </div>
    </div>
    <div :class="!isLoading ? 'hidden': ''">
      <div class="rounded-lg p-6 shadow-lg bg-white">
        <ContentLoader
          :speed="2"
          height="78"
          primary-color="rgba(214, 210, 210,0.6)"
          secondary-color="rgba(214, 210, 210,1)"
        >
          <rect
            x="0"
            y="0"
            rx="8"
            ry="6"
            width="50%"
            height="8"
          />
          <rect
            x="0"
            y="30"
            rx="8"
            ry="6"
            width="66%"
            height="8"
          />
          <rect
            x="0"
            y="60"
            rx="8"
            ry="6"
            width="20%"
            height="8"
          />
        </ContentLoader>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import _foreach from 'lodash/foreach'
import _find from 'lodash/find'
import moment from 'moment'
import LineChart from './LineChart.js'

export default {
  name: 'TrendBor',
  components: {
    LineChart,
    ContentLoader
  },
  data () {
    return {
      activeDate: {
        start: new Date('02-20-2020'),
        end: new Date()
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        legend: {
          position: 'bottom'
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }]
        }
      },
      dataZone: [],
      rangedate: {
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
      optionsZone: [
        { value: 'all', label: 'JAWA BARAT' },
        { value: 'Bodebek', label: 'BODEBEK' },
        { value: 'Bandung Raya', label: 'BANDUNG RAYA' },
        { value: 'Purwasuka', label: 'PURWASUKA' },
        { value: 'Ciayumajakuning', label: 'CIAYUMAJAKUNING' },
        { value: 'Priangan Barat', label: 'PRIANGAN BARAT' },
        { value: 'Priangan Timur', label: 'PRIANGAN TIMUR' }
      ],
      selectedZone: { value: 'all', label: 'JAWA BARAT' },
      listCity: [
        { value: 'all', label: 'ZONA JAWA BARAT' },
        { value: 'bodebek', label: 'ZONA BODEBEK' },
        { value: 'bandungraya', label: 'ZONA BANDUNG RAYA' },
        { value: 'purwasuka', label: 'ZONA PURWASUKA' },
        { value: 'ciayumajakuning', label: 'ZONA CIAYUMAJAKUNING' },
        { value: 'prianganbarat', label: 'ZONA PRIANGAN BARAT' },
        { value: 'Priangan Timur', label: 'ZONA PRIANGAN TIMUR' },
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
      optionsCity: [
        { value: 'all', label: 'ZONA JAWA BARAT' }
      ],
      selectedCity: { value: 'all', label: 'ZONA JAWA BARAT' },
      groupZone: [
        {
          id: 'Bodebek',
          data: ['bodebek', '3275', '3276', '3216', '3201', '3271']
        },
        {
          id: 'Bandung Raya',
          data: ['bandungraya', '3273', '3277', '3204', '3217', '3211']
        },
        {
          id: 'Purwasuka',
          data: ['purwasuka', '3214', '3213', '3215']
        },
        {
          id: 'Ciayumajakuning',
          data: ['ciayumajakuning', '3209', '3274', '3210', '3212', '3208']
        },
        {
          id: 'Priangan Barat',
          data: ['prianganbarat', '3203', '3272', '3202']
        },
        {
          id: 'Priangan Timur',
          data: ['priangantimur', '3205', '3278', '3206', '3207', '3218', '3279']
        }
      ],
      icons: {
      },
      activeCategory: {
        bor: 'total_persentase',
        available: 'total_tersedia',
        filled: 'total_terisi',
        color: '#f19b78',
        colorCenter: '#a36d56'
      }
    }
  },
  computed: {
    isolateDailyData () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/isLoading']
    }
  },
  watch: {
    isolateDailyData (val) {
      this.renderChart()
    }
  },
  mounted () {
  },
  methods: {
    setSelectedZone () {
      const optionsCity = []
      const activeZone = this.selectedZone.value
      const zone = _find(this.groupZone, (o) => { return o.id === activeZone })

      if (activeZone !== 'all') {
        _foreach(this.listCity, (element) => {
          if (zone.data.includes(element.value)) {
            optionsCity.push(element)
          }
        })
        this.optionsCity = optionsCity
        this.selectedCity = optionsCity[0]
        this.getIsolateDaily({
          wilayah: 'zona',
          kode_zona: activeZone
        })
      } else {
        this.optionsCity = [
          { value: 'all', label: 'ZONA JAWA BARAT' }
        ]
        this.selectedCity = { value: 'all', label: 'ZONA JAWA BARAT' }
        this.getIsolateDaily()
      }
    },
    setSelectedCity () {
      const activeCity = this.selectedCity.value
      this.getIsolateDaily({
        wilayah: 'kota',
        kode_kab: activeCity
      })
    },
    onDateSelected (daterange) {
      this.activeDate.start = daterange.start
      this.activeDate.end = daterange.end
      this.renderChart()
    },
    renderChart () {
      const data = this.isolateDailyData
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Hijau',
            fill: false,
            data: [],
            borderColor: '#87b07d'
          },
          {
            label: 'Kuning',
            fill: false,
            data: [],
            borderColor: '#e1d278'
          },
          {
            label: 'Merah',
            fill: false,
            data: [],
            borderColor: '#d96574'
          },
          {
            label: 'ICU',
            fill: false,
            data: [],
            borderColor: '#978bd1'
          },
          {
            label: 'IGD',
            fill: false,
            data: [],
            borderColor: '#75c9fd'
          },
          {
            label: 'R.Bersalin',
            fill: false,
            data: [],
            borderColor: '#bf54bb'
          },
          {
            label: 'Bor Total',
            fill: false,
            data: [],
            borderColor: '#f8b092'
          }
        ]
      }

      _foreach(data, (elem) => {
        const dateTime = new Date(elem.tanggal).getTime()
        const startTime = this.activeDate.start.getTime()
        const endTime = this.activeDate.end.getTime()
        if (dateTime >= startTime && dateTime <= endTime) {
          const label = moment(elem.tanggal).format('DD/MM')
          chartData.labels.push(label)
          chartData.datasets[0].data.push(elem.hijau_persentase)
          chartData.datasets[1].data.push(elem.kuning_persentase)
          chartData.datasets[2].data.push(elem.merah_persentase)
          chartData.datasets[3].data.push(elem.icu_persentase)
          chartData.datasets[4].data.push(elem.igd_persentase)
          chartData.datasets[5].data.push(elem.ruang_bersalin_persentase)
          chartData.datasets[6].data.push(elem.total_persentase)
        }
      })
      this.chartData = chartData
    },
    setBackgroundMonth (labels) {
      const length = labels.length
      const listMonth = []
      let activeMonth = '00'
      const stops = []
      let i = -1
      let total = 0

      if (length > 0) {
        _foreach(labels, (element) => {
          const date = element.split('/')
          if (activeMonth === date[1]) {
            listMonth[i].total++
          } else {
            activeMonth = date[1]
            listMonth.push({
              total: 1
            })
            i++
          }
        })

        i = 0
        _foreach(listMonth, (element, index) => {
          let color = '#2D2D2D'
          if (index % 2 === 0) {
            color = '#3C3B3B'
          }
          if (index > 0) {
            stops.push([stops[i - 1][0], color])
            i++
          }

          total += element.total
          stops.push([total / length, color])
          i++
        })

        return stops
      }
    },
    getIsolateDaily (params = {}) {
      this.$store.dispatch('data-isolasi-harian-kemenkes-v2/getItems', params)
    }
  }
}
</script>
<style scoped>
  * >>> .input-date {
    padding: 8px !important
  }
  .optZone {
    width: 180px;
  }
  .optCity {
    width: 230px;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
