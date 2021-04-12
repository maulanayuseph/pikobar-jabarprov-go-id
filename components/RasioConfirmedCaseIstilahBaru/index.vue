<template>
  <div>
    <h3 class="p-5 text-lg md:text">
      <b>{{ titleCase }}</b>
    </h3>
    <hr>
    <div
      class="w-full p-5"
      style="min-height: 300px;"
      :class="!isLoading?'hidden':''"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="560"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="100%"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div :class="isLoading?'hide-chart':''">
      <p class="p-3 text-sm sm:text">
        Data yang ditampilkan berdasarkan: <b>{{ parentLabel[activeRegionCategory].label }} di {{ activeParentRegionName }}</b>
      </p>
      <div class="p-3">
        <div class="chartWrapper relative p-4">
          <div class="overflow-y-auto relative" style="height: 650px">
            <bar-chart :chart-data="chartData" :options="chartOptions" :styles="{height: heightChart + 'px', position: 'relative'}" />
          </div>
          <canvas
            id="myChartAxis"
            class="ml-4"
            height="900"
            width="600"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import _forEach from 'lodash/forEach'
import _orderBy from 'lodash/orderBy'
import BarChart from './BarChart.js'

export default {
  name: 'RasioConfirmedCaseIstilahBaru',
  components: {
    BarChart,
    ContentLoader
  },
  props: {
    propsDataSebaranJawaBarat: {
      type: Array,
      default: () => [{}]
    },
    activeRegionId: {
      type: String,
      default: '32'
    },
    activeRegionCategory: {
      type: String,
      default: 'kota'
    },
    activeParentRegionName: {
      type: String,
      default: ''
    },
    activeCaseCategory: {
      type: String,
      default: 'confirmation_diisolasi'
    }
  },
  data () {
    return {
      titleCase: 'Rasio Kasus Terkonfirmasi',
      heightChart: 900,
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
              stacked: true,
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
              stacked: true,
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
              const tooltipLabel = this.tooltipSet(tooltipItems.index, tooltipItems.datasetIndex)
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
      title: {
        gabungan_aktif: 'Gabungan Kasus Aktif',
        confirmation_total: 'Terkonfirmasi Positif',
        confirmation_diisolasi: 'Positif - Isolasi/ Dalam Perawatan',
        confirmation_meninggal: 'Positif - Meninggal',
        confirmation_selesai: 'Positif - Selesai Isolasi/ Sembuh',
        suspect_diisolasi: 'Suspek - Isolasi/ Dalam Perawatan',
        probable_diisolasi: 'Probable - Isolasi/ Dalam Perawatan',
        probable_meninggal: 'Probable - Meninggal',
        closecontact_dikarantina: 'Kontak Erat - Masih Dikarantina'
      },
      colors: {
        gabungan_aktif: '#C25302',
        confirmation_total: '#eb5757',
        confirmation_diisolasi: '#CFB855',
        confirmation_meninggal: '#a51212',
        confirmation_selesai: '#3CB670',
        suspect_diisolasi: '#EFCA5B',
        probable_diisolasi: '#c5bd97',
        probable_meninggal: '#a51212',
        closecontact_dikarantina: '#FBA252'
      },

      // data
      parentLabel: {
        kota: {
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          label: 'Kecamatan'
        },
        kelurahan: {
          label: 'Kelurahan/Desa'
        }
      }
    }
  },
  computed: {
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-polygon-v2/isLoading']
    }
  },
  watch: {
    dataSebaranPolygon (val) {
      this.setChartData(val)
    }
  },
  methods: {
    setChartData (data) {
      const category = this.activeCaseCategory
      const colors = this.colors
      const chartData = {
        labels: [],
        datasets: []
      }
      const sortedData = _orderBy(
        data.wilayah,
        [category],
        ['desc']
      )
      let codeLabel = 'nama_kab'

      if (this.activeRegionCategory === 'kecamatan') {
        codeLabel = 'nama_kec'
      } else if (this.activeRegionCategory === 'kelurahan') {
        codeLabel = 'nama_kel'
      } else {
        codeLabel = 'nama_kab'
      }

      if (category === 'gabungan_aktif') {
        chartData.datasets = [
          {
            label: this.title.probable_diisolasi,
            data: [],
            borderColor: colors.probable_diisolasi,
            backgroundColor: colors.probable_diisolasi,
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.title.closecontact_dikarantina,
            data: [],
            borderColor: colors.closecontact_dikarantina,
            backgroundColor: colors.closecontact_dikarantina,
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.title.suspect_diisolasi,
            data: [],
            borderColor: colors.suspect_diisolasi,
            backgroundColor: colors.suspect_diisolasi,
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.title.confirmation_diisolasi,
            data: [],
            borderColor: colors.confirmation_diisolasi,
            backgroundColor: colors.confirmation_diisolasi,
            categoryPercentage: 0.5,
            barPercentage: 1
          }
        ]

        _forEach(sortedData, (element) => {
          chartData.labels.push(element[codeLabel])
          chartData.datasets[0].data.push(element.probable_diisolasi)
          chartData.datasets[1].data.push(element.closecontact_dikarantina)
          chartData.datasets[2].data.push(element.suspect_diisolasi)
          chartData.datasets[3].data.push(element.confirmation_diisolasi)
        })
      } else if (category === 'confirmation_total') {
        chartData.datasets = [
          {
            label: this.title.confirmation_meninggal,
            data: [],
            borderColor: colors.confirmation_meninggal,
            backgroundColor: colors.confirmation_meninggal,
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.title.confirmation_selesai,
            data: [],
            borderColor: colors.confirmation_selesai,
            backgroundColor: colors.confirmation_selesai,
            categoryPercentage: 0.5,
            barPercentage: 1
          },
          {
            label: this.title.confirmation_diisolasi,
            data: [],
            borderColor: colors.confirmation_diisolasi,
            backgroundColor: colors.confirmation_diisolasi,
            categoryPercentage: 0.5,
            barPercentage: 1
          }
        ]

        _forEach(sortedData, (element) => {
          chartData.labels.push(element[codeLabel])
          chartData.datasets[0].data.push(element.confirmation_meninggal)
          chartData.datasets[1].data.push(element.confirmation_selesai)
          chartData.datasets[2].data.push(element.confirmation_diisolasi)
        })
      } else {
        chartData.datasets = [
          {
            label: this.title[category],
            data: [],
            borderColor: colors[category],
            backgroundColor: colors[category],
            categoryPercentage: 0.5,
            barPercentage: 1
          }
        ]
        _forEach(sortedData, (element) => {
          chartData.labels.push(element[codeLabel])
          chartData.datasets[0].data.push(element[category])
        })
      }

      this.chartData = chartData

      this.heightChart = (sortedData.length <= 7) ? 600 : sortedData.length * 30 + 300

      this.sortedData = sortedData
    },
    tooltipSet (index, datasetIndex) {
      const category = this.activeCaseCategory
      const data = this.sortedData[index]
      const title = this.title
      let label = []

      if (category === 'gabungan_aktif') {
        switch (datasetIndex) {
          case 0: {
            label.push(title.probable_diisolasi + ': ' + data.probable_diisolasi)
            break
          }
          case 1: {
            label.push(title.closecontact_dikarantina + ': ' + data.closecontact_dikarantina)
            break
          }
          case 2: {
            label.push(title.suspect_diisolasi + ': ' + data.suspect_diisolasi)
            break
          }
          case 3: {
            const total = data.probable_diisolasi + data.closecontact_dikarantina + data.suspect_diisolasi + data.confirmation_diisolasi
            label.push(title.confirmation_diisolasi + ': ' + data.confirmation_diisolasi)

            label.push(title.gabungan_aktif + ': ' + total)
            break
          }
          default: {
            label.push(title.probable_diisolasi + ': ' + data.probable_diisolasi)
            break
          }
        }
      } else if (category === 'confirmation_total') {
        switch (datasetIndex) {
          case 0: {
            label.push(title.confirmation_meninggal + ': ' + data.confirmation_meninggal)
            break
          }
          case 1: {
            label.push(title.confirmation_selesai + ': ' + data.confirmation_selesai)
            break
          }
          case 2: {
            const total = data.confirmation_meninggal + data.confirmation_selesai + data.confirmation_diisolasi
            label.push(title.confirmation_diisolasi + ': ' + data.confirmation_diisolasi)
            label.push(title.confirmation_total + ': ' + total)
            break
          }
          default: {
            label.push(title.confirmation_meninggal + ': ' + data.confirmation_meninggal)
            break
          }
        }
      } else {
        label = this.title[category] + ': ' + this.sortedData[index][category]
      }

      return label
    }
  }
}
</script>

<style scoped>
  .hide-chart {
    width: 0;
    height: 0;
    opacity: 0;
  }

  .chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }

</style>
