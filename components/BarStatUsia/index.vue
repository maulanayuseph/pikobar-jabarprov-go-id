<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="flex">
      <h4 class="p-5 text-xl w-1/2">
        <b>Umur dan Jenis Kelamin</b>
      </h4>
      <select
        v-model="optionSelected"
        class="select-option-selector w-1/2"
        @change="changeGroupUsia($event.target.value)"
      >
        <option
          v-for="list in optionList"
          :key="list"
          :value="list"
        >
          {{ list }}
        </option>
      </select>
    </div>
    <hr>
    <GChart
      class="p-5"
      type="BarChart"
      :data="barChartUmurJenisKelaminData"
      :options="barChartUmurJenisKelaminOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStatUsia',
  components: {
    GChart
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        kode_prov: '',
        nama_prov: '',
        odp_total: 0,
        odp_total_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        pdp_total: 0,
        pdp_total_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        positif: 0,
        positif_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        sembuh: 0,
        sembuh_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        meninggal: 0,
        meninggal_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        }
      })
    }
  },
  data () {
    return {
      optionList: [
        'ODP',
        'PDP',
        'Positif Aktif',
        'Positif - Sembuh',
        'Positif - Meninggal'
      ],
      optionSelected: 'Positif Aktif',
      jsonDataRekapitulasiJabar: {
        kode_prov: '',
        nama_prov: '',
        odp_total: 0,
        odp_total_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        pdp_total: 0,
        pdp_total_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        positif: 0,
        positif_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        sembuh: 0,
        sembuh_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        },
        meninggal: 0,
        meninggal_per_usia: {
          bawah_5: 0,
          '6_19': 0,
          '20_29': 0,
          '30_39': 0,
          '40_49': 0,
          '50_59': 0,
          '60_69': 0,
          '70_79': 0,
          atas_80: 0
        }
      },
      barChartUmurJenisKelaminData: {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '>80' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 80, f: '70-79' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 70, f: '60-69' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 60, f: '50-59' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 50, f: '40-49' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 40, f: '30-39' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 30, f: '20-29' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 20, f: '6-19' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 10, f: '<5' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      },
      barChartUmurJenisKelaminOptions: {
        height: 350,
        marginRight: -100,
        series: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        vAxis: {
          format: '##;##'
        },
        hAxis: {
          format: ';',
          title: 'Umur',
          viewWindowMode: 'explicit',
          viewWindow: {
            min: -150,
            max: 150
          },
          ticks: [
            { v: -10, f: '10' },
            { v: -25, f: '25' },
            { v: -50, f: '50' },
            { v: -100, f: '100' },
            { v: -200, f: '200' },
            { v: -500, f: '500' },
            0, 10, 25, 50, 100, 200, 500
          ]
        },
        chartArea: { width: '80%' }
      }
    }
  },
  watch: {
    propsDataRekapitulasiJabar () {
      this.jsonDataRekapitulasiJabar = this.propsDataRekapitulasiJabar
      this.changeGroupUsia('Positif Aktif')
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
    resetBarChartUmurJenisKelaminData () {
      this.barChartUmurJenisKelaminData = {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '>80' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 80, f: '70-79' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 70, f: '60-69' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 60, f: '50-59' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 50, f: '40-49' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 40, f: '30-39' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 30, f: '20-29' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 20, f: '6-19' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          },
          {
            c: [
              { v: 10, f: '<5' },
              { v: 0, f: '0' },
              { v: 0, f: '0' }
            ]
          }
        ]
      }
    },
    changeGroupUsia (stat) {
      const self = this
      let filter = 'positif_per_usia'
      this.resetBarChartUmurJenisKelaminData()

      if (stat === 'ODP') {
        filter = 'odp_total_per_usia'
      } else if (stat === 'PDP') {
        filter = 'pdp_total_per_usia'
      } else if (stat === 'Positif Aktif') {
        filter = 'positif_per_usia'
      } else if (stat === 'Positif - Sembuh') {
        filter = 'sembuh_per_usia'
      } else if (stat === 'Positif - Meninggal') {
        filter = 'meninggal_per_usia'
      }

      this.barChartUmurJenisKelaminData = {
        cols: [
          { id: 'Umur', label: 'Umur', type: 'string' },
          { id: 'Pria', label: 'Pria', type: 'number' },
          { id: 'Wanita', label: 'Wanita', type: 'number' }
        ],
        rows: [
          {
            c: [
              { v: 100, f: '>80' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter].atas_80) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter].atas_80)).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter].atas_80), f: parseInt(this.jsonDataRekapitulasiJabar[filter].atas_80).toString() }
            ]
          },
          {
            c: [
              { v: 80, f: '70-79' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['70_79']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['70_79'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['70_79']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['70_79']).toString() }
            ]
          },
          {
            c: [
              { v: 70, f: '60-69' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['60_69']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['60_69'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['60_69']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['60_69']).toString() }
            ]
          },
          {
            c: [
              { v: 60, f: '50-59' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['50_59']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['50_59'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['50_59']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['50_59']).toString() }
            ]
          },
          {
            c: [
              { v: 50, f: '40-49' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['40_49']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['40_49'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['40_49']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['40_49']).toString() }
            ]
          },
          {
            c: [
              { v: 40, f: '30-39' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['30_39']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['30_39'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['30_39']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['30_39']).toString() }
            ]
          },
          {
            c: [
              { v: 30, f: '20-29' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['20_29']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['20_29'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['20_29']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['20_29']).toString() }
            ]
          },
          {
            c: [
              { v: 20, f: '6-19' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['6_19']) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter]['6_19'])).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter]['6_19']), f: parseInt(this.jsonDataRekapitulasiJabar[filter]['6_19']).toString() }
            ]
          },
          {
            c: [
              { v: 10, f: '<5' },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter].bawah_5) * -1, f: (parseInt(this.jsonDataRekapitulasiJabar[filter].bawah_5)).toString() },
              { v: parseInt(this.jsonDataRekapitulasiJabar[filter].bawah_5), f: parseInt(this.jsonDataRekapitulasiJabar[filter].bawah_5).toString() }
            ]
          }
        ]
      }

      let max = 0
      let asc = 0
      // find max count for scala
      for (let j = 0; j < self.barChartUmurJenisKelaminData.rows.length; j++) {
        if (self.barChartUmurJenisKelaminData.rows[j].c[2].v > max) {
          max = self.barChartUmurJenisKelaminData.rows[j].c[2].v
        }
        if (self.barChartUmurJenisKelaminData.rows[j].c[1].v * -1 > max) {
          max = self.barChartUmurJenisKelaminData.rows[j].c[1].v * -1
        }
        asc = Math.ceil(max / 10)
        self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.min = (max + asc) * -1
        self.barChartUmurJenisKelaminOptions.hAxis.viewWindow.max = max + asc
      }

      // set number of scala
      self.barChartUmurJenisKelaminOptions.hAxis.ticks = []
      if (max > 0) {
        asc = Math.ceil(max / 10)
        for (let k = 0; k <= max + asc; k = k + asc) {
          self.barChartUmurJenisKelaminOptions.hAxis.ticks.push({ v: k * -1, f: k.toString() })
        }
        for (let k = 0; k <= max + asc; k = k + asc) {
          self.barChartUmurJenisKelaminOptions.hAxis.ticks.push(k)
        }
      } else {
        self.barChartUmurJenisKelaminOptions.hAxis.ticks.push({ v: 0, f: '0' })
        self.barChartUmurJenisKelaminOptions.hAxis.ticks.push(0)
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

.select-option-selector {
  border-radius: 0.2rem;
  border-width: 1px;
  border-style: solid;
  border-color: #555;
  color: #555;
  background-color: #fff;
  height: 30px;
  width: 160px;
  margin: auto;
  padding: 0px;
  margin-right: 20px;
}
</style>
