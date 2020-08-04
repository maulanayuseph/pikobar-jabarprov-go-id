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
      default: 'kota'
    },
    activeParentRegionName: {
      type: String,
      default: ''
    },
    activeCaseCategory: {
      type: String,
      default: 'positif_aktif'
    }
  },
  data () {
    return {
      titleCase: 'Rasio Kasus Terkonfirmasi',
      chartData: {
        cols: [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'Positif Aktif', label: 'Positif Aktif', type: 'number' }
          // { id: 'annot', type: 'string', role: 'annotation' }
        ],
        rows: []
      },
      rowHeight: 500,

      title: {
        gabungan_aktif: 'Gabungan Kasus Aktif',
        positif_total: 'Terkonfirmasi',
        positif_aktif: 'Positif Aktif',
        positif_meninggal: 'Positif Meninggal',
        positif_sembuh: 'Positif Sembuh',
        pdp_total: 'PDP Total',
        pdp_aktif: 'PDP Proses',
        pdp_selesai: 'PDP Selesai',
        pdp_meninggal: 'PDP Meninggal',
        odp_total: 'ODP Total',
        odp_aktif: 'ODP Proses',
        odp_selesai: 'ODP Selesai',
        odp_meninggal: 'ODP Meninggal'
      },

      color: {
        gabungan_aktif: '#C25302',
        positif_total: '#eb5757',
        positif_aktif: '#eb5757',
        positif_meninggal: '#a51212',
        positif_sembuh: '#3CB670',
        pdp_total: '#f2c94c',
        pdp_aktif: '#f2c94c',
        pdp_selesai: '#ffdb6f',
        pdp_meninggal: '#a51212',
        odp_total: '#2d9cdb',
        odp_aktif: '#2d9cdb',
        odp_selesai: '#73ccff',
        odp_meninggal: '#a51212'
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
    chartOptions () {
      return {
        chartArea: {
          width: '60%',
          top: 40,
          left: 140,
          height: this.rowHeight
        },
        orientation: 'vertical',
        height: this.rowHeight + 60,
        isStacked: true,
        legend: {
          position: 'top',
          textStyle: {
            fontName: 'Arial',
            fontSize: 12,
            opacity: 1
          }
        },
        bar: { groupWidth: '50%' },
        series: {
          0: {
            color: '#eb5757'
          },
          1: {
            color: '#eb5757'
          },
          2: {
            color: '#eb5757'
          },
          3: {
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
        // annotations: {
        //   textStyle: {
        //     fontSize: 10,
        //     bold: true,
        //     color: '#000000',
        //     opacity: 0.8
        //   },
        //   alwaysOutside: true
        // },
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
    activeRegionId (newVal, oldVal) {
    },
    dataSebaranPolygon (val) {
      // let category = this.activeCaseCategory
      // category = category.split('_')
      // this.setChartData(val, category[0])
      this.setChartData(val, this.activeCaseCategory)
    }
  },
  methods: {
    onChartReady (chart, google) {
      const data = new google.visualization.DataTable(this.chartData)
      const view = new google.visualization.DataView(data)
      return chart.draw(view)
    },
    setChartData (data, category) {
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
        data.wilayah,
        [category],
        ['desc']
      )

      this.rowHeight = data.wilayah.length * 30
      sortedData.forEach((element) => {
        const data = this.setData(element, category, nameApiRegion)
        rows.push(data)
      })

      this.setColorSeries(category)
      this.setCols(category)
      this.chartData.rows = rows
    },
    setData (el, category, nameApiRegion) {
      let tooltip = ''
      let data = ''
      if (category === 'gabungan_aktif') {
        this.titleCase = 'Rasio Gabungan Kasus Aktif'
        tooltip = `
        <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
          <b>${el[nameApiRegion]}</b> <br>
          Positif Aktif : ${el.positif_aktif} <br>
          PDP Proses : ${el.pdp_aktif} <br>
          ODP Proses : ${el.odp_aktif} <br>
          Gabungan Kasus : ${el.gabungan_aktif} <br>
        </div>
        `
        data = {
          c: [
            { v: '0', f: el[nameApiRegion] },
            { v: el.odp_aktif, f: el.odp_aktif },
            { v: '', f: tooltip },
            { v: el.pdp_aktif, f: el.pdp_aktif },
            { v: '', f: tooltip },
            { v: el.positif_aktif, f: el.positif_aktif },
            { v: '', f: tooltip }
            // { v: el.positif_total, f: el.positif_total }
          ]
        }
        this.series = {
          0: { color: this.color.odp_aktif },
          1: { color: this.color.pdp_aktif },
          2: { color: this.color.positif_aktif },
          3: { color: '#000000' }
        }
      } else if (category === 'positif_total') {
        this.titleCase = 'Rasio Kasus Terkonfirmasi'
        tooltip = `
        <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
          <b>${el[nameApiRegion]}</b> <br>
          Aktif : ${el.positif_aktif} <br>
          Sembuh : ${el.positif_sembuh} <br>
          Meninggal : ${el.positif_meninggal} <br>
          Terkonfirmasi : ${el.positif_total} <br>
        </div>
        `
        data = {
          c: [
            { v: '0', f: el[nameApiRegion] },
            { v: el.positif_meninggal, f: el.positif_meninggal },
            { v: '', f: tooltip },
            { v: el.positif_sembuh, f: el.positif_sembuh },
            { v: '', f: tooltip },
            { v: el.positif_aktif, f: el.positif_aktif },
            { v: '', f: tooltip }
            // { v: el.positif_total, f: el.positif_total }
          ]
        }
        this.series = {
          0: { color: this.color.positif_meninggal },
          1: { color: this.color.positif_sembuh },
          2: { color: this.color.positif_aktif },
          3: { color: '#000000' }
        }
      } else {
        this.titleCase = 'Rasio Kasus ' + this.title[category]
        tooltip = `
        <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
          <b>${el[nameApiRegion]}</b> <br>
          ` + category + ` : ${el[category]} <br>
        </div>
        `
        data = {
          c: [
            { v: '0', f: el[nameApiRegion] },
            { v: el[category], f: el[category] },
            { v: '', f: tooltip }
          ]
        }
        this.series = {
          0: { color: this.color[category] }
        }
      }

      return data
    },
    setColorSeries (category) {
      if (category === 'gabungan_aktif') {
        this.chartOptions.series[0].color = this.color.odp_aktif
        this.chartOptions.series[1].color = this.color.pdp_aktif
        this.chartOptions.series[2].color = this.color.positif_aktif
      } else if (category === 'positif_total') {
        this.chartOptions.series[0].color = this.color.positif_meninggal
        this.chartOptions.series[1].color = this.color.positif_sembuh
        this.chartOptions.series[2].color = this.color.positif_aktif
      } else {
        this.chartOptions.series[0].color = this.color[category]
      }
    },
    setCols (category) {
      if (category === 'gabungan_aktif') {
        this.chartData.cols = [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'ODP Proses', label: 'ODP Proses', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'PDP Proses', label: 'PDP Proses', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Positif Aktif', label: 'Positif Aktif', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } }
          // { id: 'annot', type: 'string', role: 'annotation' }
        ]
      } else if (category === 'positif_total') {
        this.chartData.cols = [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'Meninggal', label: 'Meninggal', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Sembuh', label: 'Sembuh', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Aktif', label: 'Aktif', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } }
          // { id: 'annot', type: 'string', role: 'annotation' }
        ]
      } else {
        this.chartData.cols = [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: this.title[category], label: this.title[category], type: 'number' }
          // { id: 'annot', type: 'string', role: 'annotation' }
        ]
      }
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

  .legend-rasio-box {
    width: 20px;
    height: 13px;
    float: left;
    margin-right: 8px;
  }
</style>
