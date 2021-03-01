<template>
  <div>
    <div :class="!isLoading ? 'mx-2 my-3 bg-white rounded-lg shadow-lg' : 'hidden'">
      <div class="flex flex-row items-center border-b-2 p-4">
        <h4 class="font-bold text-lg">
          Ketersediaan Tempat Tidur (TT) RS Menangani Covid-19 di Jawa Barat
        </h4>
        <div class="ml-auto flex flex-col">
          <client-only>
            <multiselect
              v-model="selectedZone"
              class="optZone mx-1"
              :options="optionsZone"
              :allow-empty="false"
              track-by="value"
              label="label"
              select-label=""
              deselect-label=""
              selected-label=""
              @input="setSelectedZone"
            />
            <multiselect
              v-model="selectedCategory"
              class="optCategory mx-1 mt-2 whitespace-nowrap"
              :options="optionsCategory"
              :allow-empty="false"
              track-by="value"
              label="label"
              select-label=""
              deselect-label=""
              selected-label=""
              @input="setSelectedCategory"
            />
          </client-only>
        </div>
      </div>
      <div class="chartWrapper relative p-4">
        <div class="overflow-y-auto relative" style="height: 335px">
          <bar-chart :chart-data="chartData" :options="chartOptions" :styles="{height: heightChart + 'px', position: 'relative'}" />
        </div>
        <canvas
          id="myChartAxis"
          class="ml-4"
          height="355"
          width="600"
        />
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
import { ContentLoader } from 'vue-content-loader'
import _ from 'lodash'
import BarChart from './BarChart.js'

export default {
  name: 'ChartBorCity',
  components: {
    ContentLoader,
    BarChart
  },
  data () {
    return {
      dataBor: [],
      heightChart: 350,
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
      optionsZone: [
        { value: 'all', label: 'Seluruh Kota/Kab' },
        { value: 'bodebek', label: 'Bodebek' },
        { value: 'bandungraya', label: 'Bandung Raya' },
        { value: 'purwasuka', label: 'Purwasuka' },
        { value: 'ciayumajakuning', label: 'Ciayumajakuning' },
        { value: 'prianganbarat', label: 'Priangan Barat' },
        { value: 'priangantimur', label: 'Priangan Timur' }
      ],
      selectedZone: { value: 'all', label: 'Seluruh Kota/Kab' },
      icons: {
      },
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        elements: {
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              ticks: {
                min: 0
              },
              display: true,
              gridLines: {
                color: '#bfbfbf'
              },
              scaleLabel: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display: true,
              gridLines: {
                display: false,
                color: '#bfbfbf'
              },
              scaleLabel: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          enabled: true,
          displayColors: false,
          callbacks: {
            label: (tooltipItems, data) => {
              const tooltipLabel = this.tooltipSet(tooltipItems.index)
              return tooltipLabel
            }
          }
        },
        layout: {
          padding: {
            left: 0,
            right: 50,
            top: 0,
            bottom: 0
          }
        }
      },
      activeCategory: {
        bor: 'total_persentase',
        available: 'total_tersedia',
        filled: 'total_terisi',
        color: '#f19b78',
        colorCenter: '#a36d56'
      },
      groupZone: {
        bodebek: ['3275', '3276', '3216', '3201', '3271'],
        bandungraya: ['3273', '3277', '3204', '3217', '3211'],
        purwasuka: ['3214', '3213', '3215'],
        ciayumajakuning: ['3209', '3274', '3210', '3212', '3208'],
        prianganbarat: ['3203', '3272', '3202'],
        priangantimur: ['3205', '3278', '3206', '3207', '3218', '3279']
      }
    }
  },
  computed: {
    isolateLastData () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-lastdata-kemenkes-v2/isLoading']
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
        bor: {
          default: '#f19b78',
          center: '#a36d56'
        },
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
    setSelectedZone () {
      this.setDataBor()
    },
    setDataBor () {
      const data = this.isolateLastData
      const activeZone = this.selectedZone.value
      const zona = [
        'Bodebek',
        'Bandung Raya',
        'Ciayumajakuning',
        'Purwasuka',
        'Priangan Barat',
        'Priangan Timur'
      ]

      let dataBor = _.filter(data, (o) => {
        if (!zona.includes(o.kode_wilayah)) {
          if (activeZone !== 'all') {
            const groupZone = this.groupZone[activeZone]
            if (groupZone.includes(o.kode_wilayah)) {
              return o
            }
          } else {
            return o
          }
        }
      })

      dataBor = _.orderBy(
        dataBor,
        this.activeCategory.bor,
        ['desc']
      )
      this.dataBor = dataBor

      this.dataBor = dataBor
      this.renderChart()
    },
    tooltipSet (index) {
      const tooltip = []
      const available = this.dataBor[index][this.activeCategory.available]
      const filled = this.dataBor[index][this.activeCategory.filled]
      const bor = this.dataBor[index][this.activeCategory.bor]

      tooltip.push('Total TT Tersedia: ' + available)
      tooltip.push('Total TT Terisi: ' + filled)
      tooltip.push('BOR: ' + bor + '%')

      return tooltip
    },
    renderChart () {
      const data = []
      const bgColors = []
      const chartData = {
        labels: [],
        datasets: [
          {
            label: 'Hijau',
            data: [],
            borderColor: '#87b07d',
            backgroundColor: '#87b07d'
          }
        ]
      }

      _.forEach(this.dataBor, (res) => {
        const bgColor = (res.kode_wilayah === '32') ? this.activeCategory.colorCenter : this.activeCategory.color

        chartData.labels.push(res.nama_wilayah)
        data.push(res[this.activeCategory.bor])
        bgColors.push(bgColor)
      })

      chartData.datasets[0].label = this.selectedCategory.label
      chartData.datasets[0].data = data
      chartData.datasets[0].backgroundColor = bgColors
      chartData.datasets[0].hoverBackgroundColor = this.activeCategory.colorCenter

      this.heightChart = (data.length <= 7) ? 350 : data.length * 14 + 300
      this.chartData = chartData
    }
  }
}
</script>
<style scoped>
  .optZone {
    width: 200px;
    font-size: 14px;
  }
  .optCategory {
    width: 200px;
    font-size: 14px;
  }

  .chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
