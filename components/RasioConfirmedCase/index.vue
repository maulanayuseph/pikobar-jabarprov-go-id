<template>
  <div>
    <h3 class="p-5 text-lg md:text">
      <b>Rasio Kasus Terkonfirmasi</b>
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
</template>

<script>
import { GChart } from 'vue-google-charts'
import { ContentLoader } from 'vue-content-loader'
import _orderBy from 'lodash/orderBy'

export default {
  name: 'RasioConfirmedCase',
  components: {
    GChart,
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
      default: '32'
    },
    activeParentRegionName: {
      type: String,
      default: '32'
    }
  },
  data () {
    return {
      chartsLib: null,
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: {
        cols: [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'Meninggal', label: 'Meninggal', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Sembuh', label: 'Sembuh', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Aktif', label: 'Aktif', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'annot', type: 'string', role: 'annotation' }
        ],
        rows: []
      },
      rowHeight: 500,

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
    chartOptions () {
      if (!this.chartsLib) {
        return null
      }
      return {
        chartArea: {
          width: '60%',
          top: -20,
          left: 140,
          height: this.rowHeight
        },
        orientation: 'vertical',
        height: this.rowHeight + 60,
        isStacked: true,
        legend: {
          position: 'bottom',
          textStyle: {
            fontName: 'Arial',
            fontSize: 12,
            // The color of the text.
            // The color of the text outline.
            // The transparency of the text.
            opacity: 1
          }
        },
        bar: { groupWidth: '50%' },
        series: {
          0: {
            color: '#a6241f'
          },
          1: {
            color: '#3bb46d'
          },
          2: {
            color: '#ef6464'
          },
          3: {
            color: '#000000'
          },
          4: {
            color: 'grey',
            lineWidth: 0,
            pointSize: 0,
            visibleInLegend: false
          }
        },
        tooltip: {
          textStyle: {
            fontSize: 10
          },
          isHtml: true
        },
        annotations: {
          textStyle: {
            fontSize: 10,
            bold: true,
            color: '#000000',
            opacity: 0.8
          },
          alwaysOutside: true
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
    },
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-polygon/isLoading']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    },
    dataSebaranPolygon (val) {
      let nameApiRegion = 'nama_kab'
      const rows = []
      let sortedData = []

      if (this.activeRegionCategory === 'kelurahan') {
        nameApiRegion = 'nama_kel'
      } else if (this.activeRegionCategory === 'kecamatan') {
        nameApiRegion = 'nama_kec'
      } else {
        nameApiRegion = 'nama_kab'
      }

      sortedData = _orderBy(
        val.wilayah,
        ['positif_total'],
        ['desc']
      )

      this.rowHeight = val.wilayah.length * 30

      sortedData.forEach((element) => {
        const tooltip = `
          <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
            <b>${element[nameApiRegion]}</b> <br>
            Aktif : ${element.positif_aktif} <br>
            Meninggal : ${element.positif_meninggal} <br>
            Sembuh : ${element.positif_sembuh} <br>
            Terkonfirmasi : ${element.positif_total} <br>
          </div>
        `
        const data = {
          c: [
            { v: '0', f: element[nameApiRegion] },
            { v: element.positif_meninggal, f: element.positif_meninggal },
            { v: '', f: tooltip },
            { v: element.positif_sembuh, f: element.positif_sembuh },
            { v: '', f: tooltip },
            { v: element.positif_aktif, f: element.positif_aktif },
            { v: '', f: tooltip },
            { v: element.positif_total, f: element.positif_total }
          ]
        }
        rows.push(data)
      })

      this.chartData.rows = rows
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
      const data = new google.visualization.DataTable(this.chartData)
      // const view = new google.visualization.DataView(data)
      google.charts.load('current', {
        packages: ['corechart']
      }).then(() => {
        const container = document.getElementById('chart_div')
        const chart = new google.charts.Bar(container)
        return chart.draw(data, google.charts.Bar.convertOptions(this.chartOptions))
      })
      // return chart.draw(view)
    }
  }
}
</script>

<style scoped>
  .chart-area {
    overflow-y: auto;
    overflow-x: hidden;
    height: 600px;
  }
  .hide-chart {
    width: 0;
    height: 0;
    opacity: 0;
  }
</style>
