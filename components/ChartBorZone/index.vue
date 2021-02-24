<template>
  <div>
    <div :class="!isLoading ? 'md:flex md:flex-row flex-nowrap' : 'hidden'">
      <div class="total-bor md:flex-1 my-3 bg-white rounded-lg shadow-lg">
        <div class="md:flex md:flex-row items-center border-b-2 px-4 pt-8 pb-10">
          <h4 class="font-bold text-lg">
            Ketersediaan Tempat Tidur berdasarkan Zonasi
          </h4>
          <multiselect
            v-model="selectedCategory"
            class="optCategory justify-self-right ml-auto"
            :options="optionsCategory"
            track-by="value"
            label="label"
            select-label=""
            deselect-label=""
            selected-label=""
            @input="setSelectedCategory"
          />
        </div>
        <div class="p-4">
          <GChart
            id="chart_div"
            class="chart-area"
            :settings="{packages: ['corechart']}"
            :data="chartData"
            :options="chartOptions"
            :create-chart="(el, google) => {
              let chart = new google.visualization.BarChart(el)
              return chart
            }"
            @ready="onChartReady"
          />
        </div>
      </div>
    </div>
    <div :class="!isLoading ? 'hidden': ''">
      <div class="md:flex md:flex-row flex-wrap'">
        <div class="md:flex-1 my-1">
          <div class=" rounded-lg p-6 shadow-lg bg-white">
            <ContentLoader
              :speed="2"
              width="400"
              height="120"
              primary-color="rgba(214, 210, 210,0.6)"
              secondary-color="rgba(214, 210, 210,1)"
            >
              <rect
                x="0"
                y="0"
                rx="8"
                ry="6"
                width="50%"
                height="17"
              />
              <rect
                x="0"
                y="50"
                rx="8"
                ry="6"
                width="66%"
                height="17"
              />
              <rect
                x="0"
                y="94"
                rx="8"
                ry="6"
                width="20%"
                height="17"
              />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'
import { ContentLoader } from 'vue-content-loader'
import _filter from 'lodash/filter'
import _foreach from 'lodash/foreach'
import _orderBy from 'lodash/orderBy'

export default {
  name: 'ChartBorZone',
  components: {
    GChart,
    ContentLoader
  },
  data () {
    return {
      dataZone: [],
      optionsCategory: [
        { value: 'bor', label: 'Total BOR' },
        { value: 'green', label: 'Hijau' },
        { value: 'yellow', label: 'Kuning' },
        { value: 'red', label: 'Merah' },
        { value: 'icu', label: 'ICU' },
        { value: 'igd', label: 'IGD' },
        { value: 'birth', label: 'Ruang Bersalin' }
      ],
      selectedCategory: { value: 'bor', label: 'Total BOR' },
      icons: {
      },
      chartData: {
        cols: [
          { id: 'Zone', label: 'Zonasi', type: 'string' },
          { id: 'Total', label: 'Total', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { type: 'string', role: 'style' }
        ],
        rows: []
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
    isolateLastData () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/isLoading']
    },
    chartOptions () {
      return {
        annotations: {
          alwaysOutside: true,
          textStyle: {
            fontSize: 14,
            color: '#000',
            auraColor: 'none'
          }
        },
        chartArea: {
          height: '85%',
          width: '60%',
          top: 40,
          left: 140
        },
        orientation: 'vertical',
        height: 450,
        legend: { position: 'none' },
        bar: { groupWidth: '50%' },
        tooltip: {
          textStyle: {
            fontSize: 10
          },
          isHtml: true
        },
        vAxis: {
          html: true,
          textStyle: {
            fontSize: 10,
            bold: true
          }
        },
        hAxis: {
          format: ';',
          viewWindowMode: 'explicit'
        }
      }
    }
  },
  watch: {
    isolateLastData () {
      this.setDataBor()
    }
  },
  mounted () {
  },
  methods: {
    setSelectedCategory () {
      const val = this.selectedCategory.value
      const category = { bor: 'total', green: 'hijau', yellow: 'kuning', red: 'merah', icu: 'icu', igd: 'igd', birth: 'ruang_bersalin' }
      const colors = {
        green: {
          default: '#70cd94',
          center: '#069550'
        },
        yellow: {
          default: '#ffe79e',
          center: '#f2c94c'
        },
        red: {
          default: '#fb8b83',
          center: '#e04f45'
        },
        icu: {
          default: '#938bd2',
          center: '#595482'
        },
        igd: {
          default: '#64b5f6',
          center: '#1976d2'
        },
        birth: {
          default: '#ff21f6',
          center: '#aa1aa4'
        }
      }
      this.activeCategory = {
        bor: category[val] + '_persentase',
        available: category[val] + '_tersedia',
        filled: category[val] + '_terisi',
        color: colors[val].default,
        colorCenter: colors[val].center
      }

      this.setDataBor()
    },
    setDataBor () {
      const data = this.isolateLastData
      const zona = [
        '32',
        'Bodebek',
        'Bandung Raya',
        'Ciayumajakuning',
        'Purwasuka',
        'Priangan Barat',
        'Priangan Timur'
      ]

      const dataZone = _filter(data, (o) => {
        if (zona.includes(o.kode_wilayah)) {
          return o
        }
      })

      this.dataZone = dataZone
      this.renderChart()
    },
    onChartReady (chart, google) {
      const data = new google.visualization.DataTable(this.chartData)
      const view = new google.visualization.DataView(data)

      return chart.draw(view)
    },
    renderChart () {
      const dataZone = _orderBy(
        this.dataZone,
        this.activeCategory.bor,
        ['desc']
      )
      const rows = []

      _foreach(dataZone, (res) => {
        const tooltip = `
        <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
          <b>${res.nama_wilayah}</b> <br>
          Total Tersedia : ${res[this.activeCategory.available]} <br>
          Total Terisi : ${res[this.activeCategory.filled]} <br>
          BOR : ${res[this.activeCategory.bor]}% <br>
        </div>
        `

        let data = {}
        if (res.kode_wilayah === '32') {
          data = {
            c: [
              { v: '0', f: res.nama_wilayah },
              { v: res[this.activeCategory.bor], f: res[this.activeCategory.bor] },
              { v: '', f: tooltip },
              { v: '', f: res[this.activeCategory.bor] + '%' },
              { v: 'color: ' + this.activeCategory.colorCenter }
            ]
          }
        } else {
          data = {
            c: [
              { v: '0', f: res.nama_wilayah },
              { v: res[this.activeCategory.bor], f: res[this.activeCategory.bor] },
              { v: '', f: tooltip },
              { v: '', f: res[this.activeCategory.bor] + '%' },
              { v: 'color: ' + this.activeCategory.color }
            ]
          }
        }

        rows.push(data)
      })
      this.chartData.rows = rows
      this.chartData.cols = [
        { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
        { id: 'Total', label: 'Total', type: 'number' },
        { type: 'string', role: 'tooltip', p: { html: true } },
        { type: 'string', role: 'annotation' },
        { type: 'string', role: 'style' }
      ]
    }
  }
}
</script>
<style scoped>
  .optCategory {
    width: 180px;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
