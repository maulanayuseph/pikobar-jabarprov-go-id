<template>
  <div>
    <div class="flex flex-row items-stretch mb-4">
      <button
        class="button-selector mr-2"
        :active="stat.isActiveHarian"
        @click="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" /> Angka Harian
      </button>
      <button
        class="button-selector"
        :active="stat.isActiveAkumulatif"
        @click="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" /> Kumulatif
      </button>
    </div>

    <section v-if="stat.isActiveHarian">
      <div
        class="bg-white overflow-hidden rounded-lg shadow-md"
      >
        <div class="md:flex">
          <h4 class="p-5 text-xl md:w-2/3">
            <b>{{ judul }}</b>
          </h4>

          <div v-if="!isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    righttoleft="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div v-if="isMobile" class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          type="ComboChart"
          class="mb-4"
          :data="ChartHarianData"
          :options="ChartHarianOptions"
        />
      </div>
    </section>

    <section v-if="stat.isActiveAkumulatif">
      <div
        class="bg-white overflow-hidden rounded-lg shadow-md"
      >
        <div class="md:flex">
          <h4 class="p-5 text-xl md:w-2/3">
            <b>{{ judul }}</b>
          </h4>
          <div v-if="!isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    righttoleft="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-wrap items-stretch pt-2 pb-2 pr-2 md:w-1/2 mt-2" style="margin: auto; padding-bottom: 300px;">
            <select
              v-model="selectedListWilayah"
              class="select-option-selector"
              style="margin:auto; "
              @change="changeFilterWilayah($event.target.value)"
            >
              <option
                v-for="list in optionListWilayah"
                :key="list"
                :value="list"
              >
                {{ list }}
              </option>
            </select>
            <div class="card-content pt-2 pb-2" style="margin: auto;">
              <div class="daterange-wrapper">
                <client-only>
                  <vue-rangedate-picker
                    compact="true"
                    :captions="rangedate.captions"
                    :preset-ranges="rangedate.presetRanges"
                    @selected="onDateSelected"
                  />
                </client-only>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <GChart
          type="ComboChart"
          class="mb-4"
          :data="ChartKumulatifData"
          :options="ChartKumulatifOptions"
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
  name: 'BarStatAreaSingleV2IstilahBaru',
  components: {
    GChart,
    FontAwesomeIcon
    // DateRangePicker
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataKasusHarianProvinsi: [],
      jsonDataKasusHarianKota: [],
      jsonDataNasionalHarianKumulatif: [],
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3205',
          nama: 'Kab. Garut',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3213',
          nama: 'Kab. Subang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3273',
          nama: 'Kota Bandung',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3279',
          nama: 'Kota Banjar',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3271',
          nama: 'Kota Bogor',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3276',
          nama: 'Kota Depok',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi',
          dataHarian: [],
          dataAkumulatif: []
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya',
          dataHarian: [],
          dataAkumulatif: []
        }
      ],
      ChartHarianData: [
        [
          'Tanggal',
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          { type: 'number', role: 'annotation' },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, 0, '']
      ],
      ChartKumulatifData: [
        [
          'Tanggal',
          'Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Terkonfirmasi',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ],
      ChartHarianOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#5AB55B', '#EC5D5D', '#9C0000'],
        legend: {
          position: 'bottom'
        },
        annotations: {
          alwaysOutside: 'true',
          textStyle: {
            fontSize: 10,
            color: 'black'
          }
        },
        hAxis: {
          slantedText: true,
          slantedTextAngle: -90
        },
        isStacked: true,
        seriesType: 'bars',
        series: { 1: { type: 'line' } },
        chartArea: {
          width: '85%',
          bottom: 100
        },
        tooltip: { isHtml: true }
      },
      ChartKumulatifOptions: {
        height: 500,
        orientation: 'horizontal',
        colors: ['#CEB546', '#03B167', '#9c0000', '#7E7E7E'],
        legend: {
          position: 'bottom'
        },
        // isStacked: true,
        // seriesType: 'bars',
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
          width: '85%',
          bottom: 100
        },
        series: {
          0: { lineWidth: 3 },
          1: { lineWidth: 3 },
          2: { lineWidth: 3 },
          3: { lineWidth: 3 }
        },
        tooltip: { isHtml: true }
      },
      optionListWilayah: [
        'Indonesia',
        'Jawa Barat',
        'Kab. Bandung',
        'Kab. Bandung Barat',
        'Kab. Bekasi',
        'Kab. Bogor',
        'Kab. Ciamis',
        'Kab. Cianjur',
        'Kab. Cirebon',
        'Kab. Garut',
        'Kab. Indramayu',
        'Kab. Karawang',
        'Kab. Kuningan',
        'Kab. Majalengka',
        'Kab. Pangandaran',
        'Kab. Purwakarta',
        'Kab. Subang',
        'Kab. Sukabumi',
        'Kab. Sumedang',
        'Kab. Tasikmalaya',
        'Kota Bandung',
        'Kota Banjar',
        'Kota Bekasi',
        'Kota Bogor',
        'Kota Cimahi',
        'Kota Cirebon',
        'Kota Depok',
        'Kota Sukabumi',
        'Kota Tasikmalaya'
      ],
      optionListWaktu: [
        '1 Minggu Terakhir',
        '1 Bulan Terakhir',
        'Seluruh Waktu'
        // 'Pilih Rentan Waktu'
      ],
      selectedListWilayah: 'Jawa Barat',
      selectedListWaktu: 'Seluruh Waktu',
      judul: 'Chart Harian Terkonfirmasi Jawa Barat',
      selectedDate: {
        start: '',
        end: ''
      },
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
      isMobile: false
    }
  },
  computed: {
    dataKasusHarianProvinsi () {
      return this.$store.getters['data-kasus-harian-v2/itemsMap']
    },
    dataKasusHarianKota () {
      return this.$store.getters['data-kasus-harian-kota-v2/itemsMap']
    },
    dataNasionalHarian () {
      return this.$store.getters['data-nasional-harian/itemsMap']
    }
  },
  watch: {
    dataKasusHarianProvinsi (val) {
      this.jsonDataKasusHarianProvinsi = val
      this.jsonDataKasusHarianProvinsi.forEach((element) => {
        const temp1 = { tanggal: element.tanggal }
        const temp2 = { ...temp1, ...element.harian }
        const temp3 = { ...temp1, ...element.kumulatif }
        this.jsonDataProvinsiHarian.push(temp2)
        this.jsonDataProvinsiKumulatif.push(temp3)
      })
      this.fetchDataProvinsiHarian()
    },
    dataKasusHarianKota (val) {
      this.jsonDataKasusHarianKota = val
      for (let j = 0; j < this.jsonDataKota.length; j++) {
        for (let i = 0; i < this.jsonDataKasusHarianKota.length; i++) {
          if (this.jsonDataKasusHarianKota[i].kode_kab === this.jsonDataKota[j].kode) {
            this.jsonDataKasusHarianKota[i].series.forEach((element) => {
              const temp1 = { tanggal: element.tanggal }
              const temp2 = { ...temp1, ...element.harian }
              const temp3 = { ...temp1, ...element.kumulatif }
              this.jsonDataKota[j].dataHarian.push(temp2)
              this.jsonDataKota[j].dataAkumulatif.push(temp3)
            })
          }
        }
      }
    },
    dataNasionalHarian (val) {
      // this.jsonDataNasionalHarianKumulatif = this.propsDataNasionalHarianKumulatif
      for (let i = 0; i < val.length; i++) {
        const temp1 = val[i]
        let jmlHarian = 0
        let ratarataHarian = 0
        // let jmlKumulatif = 0
        // let ratarataKumulatif = 0
        if (i === 0) {
          jmlHarian = val[i].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 1
          // jmlKumulatif = val[i].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 1
        } else if (i === 1) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 2
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 2
        } else if (i === 2) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari + val[i - 2].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 3
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 3
        } else if (i === 3) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari + val[i - 2].jumlahKasusBaruperHari +
            val[i - 3].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 4
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 4
        } else if (i === 4) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari + val[i - 2].jumlahKasusBaruperHari +
            val[i - 3].jumlahKasusBaruperHari + val[i - 4].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 5
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 5
        } else if (i === 5) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari + val[i - 2].jumlahKasusBaruperHari +
            val[i - 3].jumlahKasusBaruperHari + val[i - 4].jumlahKasusBaruperHari + val[i - 5].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 6
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif + val[i - 5].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 6
        } else if (i >= 6) {
          jmlHarian = val[i].jumlahKasusBaruperHari + val[i - 1].jumlahKasusBaruperHari + val[i - 2].jumlahKasusBaruperHari +
            val[i - 3].jumlahKasusBaruperHari + val[i - 4].jumlahKasusBaruperHari + val[i - 5].jumlahKasusBaruperHari +
            val[i - 6].jumlahKasusBaruperHari
          ratarataHarian = jmlHarian / 7
          // jmlKumulatif = val[i].jumlahKasusKumulatif + val[i - 1].jumlahKasusKumulatif + val[i - 2].jumlahKasusKumulatif +
          //   val[i - 3].jumlahKasusKumulatif + val[i - 4].jumlahKasusKumulatif + val[i - 5].jumlahKasusKumulatif +
          //   val[i - 6].jumlahKasusKumulatif
          // ratarataKumulatif = jmlKumulatif / 7
        } else {
          jmlHarian = 0
          ratarataHarian = 0
          // jmlKumulatif = 0
          // ratarataKumulatif = 0
        }
        const temp2 = { jumlahKasusBaruperHari_ratarata: parseInt(ratarataHarian.toFixed(2)) }
        const temp3 = { ...temp1, ...temp2 }
        this.jsonDataNasionalHarianKumulatif.push(temp3)
      }
    }
  },
  mounted () {
    this.selectedDate.start = new Date('2020-03-01')
    this.selectedDate.end = new Date()
    this.checkIsMobile()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else if (str === '') {
        return 0
      } else {
        return str
      }
    },
    ifNegativeReturnZero (str) {
      if (str <= 0) {
        return 0
      } else {
        return str
      }
    },
    formatThousand (number) {
      return parseInt(number).toLocaleString('id-ID')
    },
    formatDate (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    },
    formatDateNoYear (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short'
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
    compareValues (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
      this.changeData()
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
      this.changeData()
    },
    changeFilterWilayah (stat) {
      this.selectedListWilayah = stat
      this.changeData()
    },
    changeData () {
      this.ChartHarianData = [
        [
          'Tanggal',
          'Harian',
          { type: 'string', role: 'tooltip', p: { html: true } },
          { type: 'number', role: 'annotation' },
          'Rata-rata 7 Hari',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, 0, '']
      ]
      this.ChartKumulatifData = [
        [
          'Tanggal',
          'Aktif',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Sembuh',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Meninggal',
          { type: 'string', role: 'tooltip', p: { html: true } },
          'Total Terkonfirmasi',
          { type: 'string', role: 'tooltip', p: { html: true } }
        ],
        ['0', 0, '', 0, '', 0, '', 0, '']
      ]
      if (this.stat.isActiveHarian === true) {
        this.judul = 'Chart Harian Terkonfirmasi ' + this.selectedListWilayah
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiHarian()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalHarian()
        } else {
          this.fetchDataKabupatenHarian()
        }
      } else if (this.stat.isActiveAkumulatif === true) {
        this.judul = 'Chart Kumulatif Terkonfirmasi ' + this.selectedListWilayah
        if (this.selectedListWilayah === 'Jawa Barat') {
          this.fetchDataProvinsiKumulatif()
        } else if (this.selectedListWilayah === 'Indonesia') {
          this.fetchDataNasionalKumulatif()
        } else {
          this.fetchDataKabupatenKumulatif()
        }
      }
    },
    fetchDataNasionalHarian () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Harian
        let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipHarian += '<tr><td>Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari) + '</b></td></tr>'
        tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari_ratarata) + '</b></td></tr>'
        tooltipHarian += '</table>'
        self.ChartHarianData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari, tooltipHarian,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusBaruperHari_ratarata, tooltipHarian
        ])
      }
      if (self.jsonDataNasionalHarianKumulatif.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataNasionalKumulatif () {
      const self = this
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataNasionalHarianKumulatif.forEach((element, index) => {
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (this.formatDateYMD(element.tanggal) === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = this.jsonDataNasionalHarianKumulatif.length - 1
      }

      // get data
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataNasionalHarianKumulatif[i].tanggal)
        // by Akumulatif
        let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
        tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
        tooltipKumulatif += '<tr><td>Total Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Isolasi/ Dalam Perawatan </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahpasiendalamperawatan) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Selesai Isolasi/ Sembuh </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahPasienSembuh) + '</b></td></tr>'
        tooltipKumulatif += '<tr><td>Meninggal </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataNasionalHarianKumulatif[i].jumlahPasienMeninggal) + '</b></td></tr>'
        tooltipKumulatif += '</table>'
        self.ChartKumulatifData.push([
          self.formatDateNoYear(date),
          self.jsonDataNasionalHarianKumulatif[i].jumlahpasiendalamperawatan, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienSembuh, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahPasienMeninggal, tooltipKumulatif,
          self.jsonDataNasionalHarianKumulatif[i].jumlahKasusKumulatif, tooltipKumulatif
        ])
      }
      if (self.jsonDataNasionalHarianKumulatif.length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataProvinsiHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
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
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">: ' + self.formatThousand(self.jsonDataProvinsiHarian[i].confirmation_total) + '</b></td></tr>'
          tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td style="text-align:right;"><b style="margin-left: 10px;">: ' + self.formatThousand(self.jsonDataProvinsiHarian[i].confirmation_ratarata) + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiHarian[i].confirmation_total, tooltipHarian,
            self.jsonDataProvinsiHarian[i].confirmation_total,
            self.jsonDataProvinsiHarian[i].confirmation_ratarata, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (self.jsonDataProvinsiHarian.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0

      // filter date
      this.jsonDataProvinsiKumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
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
        // const positifAktif = self.jsonDataProvinsiKumulatif[i].positif - self.jsonDataProvinsiKumulatif[i].sembuh - self.jsonDataProvinsiKumulatif[i].meninggal
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Total Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].confirmation_total) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Isolasi/ Dalam Perawatan </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].confirmation_diisolasi) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Selesai Isolasi/ Sembuh </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].confirmation_selesai) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataProvinsiKumulatif[i].confirmation_meninggal) + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartKumulatifData.push([
            self.formatDateNoYear(date),
            self.jsonDataProvinsiKumulatif[i].confirmation_diisolasi, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].confirmation_selesai, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].confirmation_meninggal, tooltipKumulatif,
            self.jsonDataProvinsiKumulatif[i].confirmation_total, tooltipKumulatif
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (self.jsonDataProvinsiKumulatif.length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    fetchDataKabupatenHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      self.jsonDataKota[0].dataHarian.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = self.jsonDataKota[0].dataHarian.length - 1
      }

      // find kota
      this.jsonDataKota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i <= endNum; i++) {
        const date = new Date(self.jsonDataKota[indexKota].dataHarian[i].tanggal)
        if (stop === false) {
          let tooltipHarian = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipHarian += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipHarian += '<tr><td>Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataHarian[i].confirmation_total) + '</b></td></tr>'
          tooltipHarian += '<tr><td>Rata-rata 7 Hari </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataHarian[i].confirmation_ratarata) + '</b></td></tr>'
          tooltipHarian += '</table>'
          self.ChartHarianData.push([
            self.formatDateNoYear(date),
            self.jsonDataKota[indexKota].dataHarian[i].confirmation_total, tooltipHarian,
            self.jsonDataKota[indexKota].dataHarian[i].confirmation_total,
            self.jsonDataKota[indexKota].dataHarian[i].confirmation_ratarata, tooltipHarian
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (self.jsonDataKota[indexKota].dataHarian.length > 0) {
        self.ChartHarianData.splice(1, 1)
      }
    },
    fetchDataKabupatenKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)
      let startNum = 0
      let endNum = 0
      let indexKota = 0

      // filter date
      self.jsonDataKota[0].dataAkumulatif.forEach((element, index) => {
        if (element.tanggal === this.formatDateYMD(this.selectedDate.start)) {
          startNum = index
        }
        if (element.tanggal === this.formatDateYMD(this.selectedDate.end)) {
          endNum = index
        }
      })
      if (endNum === 0) {
        endNum = self.jsonDataKota[0].dataAkumulatif.length - 1
      }

      // find kota
      this.jsonDataKota.forEach((element, index) => {
        if (element.nama === this.selectedListWilayah) {
          indexKota = index
        }
      })
      // get data
      let stop = false
      for (let i = startNum; i < endNum; i++) {
        const date = new Date(self.jsonDataKota[indexKota].dataAkumulatif[i].tanggal)
        // const positifAktif = self.jsonDataKota[indexKota].dataAkumulatif[i].positif - self.jsonDataKota[indexKota].dataAkumulatif[i].sembuh - self.jsonDataKota[indexKota].dataAkumulatif[i].meninggal
        if (stop === false) {
          let tooltipKumulatif = '<table style="white-space: nowrap; margin: 10px;">'
          tooltipKumulatif += '<tr><td style="font-size: larger;">' + self.formatDate(date) + '</td><td></td></tr>'
          tooltipKumulatif += '<tr><td>Total Terkonfirmasi </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_total) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Isolasi/ Dalam Perawatan </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_diisolasi) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Selesai Isolasi/ Sembuh </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_selesai) + '</b></td></tr>'
          tooltipKumulatif += '<tr><td>Meninggal </td><td style="text-align:right;"><b style="margin-left: 10px;">' + self.formatThousand(self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_meninggal) + '</b></td></tr>'
          tooltipKumulatif += '</table>'
          self.ChartKumulatifData.push([
            self.formatDateNoYear(date),
            self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_diisolasi, tooltipKumulatif,
            self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_selesai, tooltipKumulatif,
            self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_meninggal, tooltipKumulatif,
            self.jsonDataKota[indexKota].dataAkumulatif[i].confirmation_total, tooltipKumulatif
          ])
        }
        if (self.formatDate(date) === strToday) {
          stop = true
        }
      }
      if (self.jsonDataKota[indexKota].dataAkumulatif.length > 0) {
        self.ChartKumulatifData.splice(1, 1)
      }
    },
    onDateSelected (daterange) {
      this.selectedDate = daterange
      this.changeData()
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

.select-option-selector {
  display: block;
  border: 1px solid #ccc;
  padding: 6.4px;
  font-size: 14px;
  width: 230px;
  cursor: pointer;
}

.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}

</style>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>
