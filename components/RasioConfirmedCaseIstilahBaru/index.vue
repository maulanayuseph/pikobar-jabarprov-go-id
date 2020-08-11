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
  name: 'RasioConfirmedCaseIstilahBaru',
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
      default: 'confirmation_diisolasi'
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
        confirmation_total: 'Terkonfirmasi Positif',
        confirmation_diisolasi: 'Positif - Isolasi/ Dalam Perawatan',
        confirmation_meninggal: 'Positif - Meninggal',
        confirmation_selesai: 'Positif - Selesai Isolasi/ Sembuh',
        suspect_diisolasi: 'Suspek - Isolasi/ Dalam Perawatan',
        suspect_meninggal: 'PSuspek - Meninggal',
        closecontact_dikarantina: 'Kontak Erat - Masih Dikarantina'
      },

      color: {
        gabungan_aktif: '#C25302',
        confirmation_total: '#eb5757',
        confirmation_diisolasi: '#CFB855',
        confirmation_meninggal: '#a51212',
        confirmation_selesai: '#3CB670',
        suspect_diisolasi: '#EFCA5B',
        suspect_meninggal: '#a51212',
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
      return this.$store.getters['data-sebaran-polygon-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-polygon-v2/isLoading']
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
          Positif - Isolasi/ Dalam Perawatan : ${el.confirmation_diisolasi} <br>
          Suspek - Isolasi/ Dalam Perawatan : ${el.suspect_diisolasi} <br>
          Kontak Erat - Masih Dikarantina : ${el.closecontact_dikarantina} <br>
          Gabungan Kasus : ${el.gabungan_aktif} <br>
        </div>
        `
        data = {
          c: [
            { v: '0', f: el[nameApiRegion] },
            { v: el.closecontact_dikarantina, f: el.closecontact_dikarantina },
            { v: '', f: tooltip },
            { v: el.suspect_diisolasi, f: el.suspect_diisolasi },
            { v: '', f: tooltip },
            { v: el.confirmation_diisolasi, f: el.confirmation_diisolasi },
            { v: '', f: tooltip }
            // { v: el.confirmation_total, f: el.confirmation_total }
          ]
        }
        this.series = {
          0: { color: this.color.closecontact_dikarantina },
          1: { color: this.color.suspect_diisolasi },
          2: { color: this.color.confirmation_diisolasi },
          3: { color: '#000000' }
        }
      } else if (category === 'confirmation_total') {
        this.titleCase = 'Rasio Kasus Terkonfirmasi'
        tooltip = `
        <div class="p-3" style="font-size: 0.7rem; border-radius: 0.5rem; width: 8rem;">
          <b>${el[nameApiRegion]}</b> <br>
          Positif - Isolasi/ Dalam Perawatan : ${el.confirmation_diisolasi} <br>
          Positif - Selesai Isolasi/ Sembuh : ${el.confirmation_selesai} <br>
          Positif - Meninggal : ${el.confirmation_meninggal} <br>
          Terkonfirmasi : ${el.confirmation_total} <br>
        </div>
        `
        data = {
          c: [
            { v: '0', f: el[nameApiRegion] },
            { v: el.confirmation_meninggal, f: el.confirmation_meninggal },
            { v: '', f: tooltip },
            { v: el.confirmation_selesai, f: el.confirmation_selesai },
            { v: '', f: tooltip },
            { v: el.confirmation_diisolasi, f: el.confirmation_diisolasi },
            { v: '', f: tooltip }
            // { v: el.confirmation_total, f: el.confirmation_total }
          ]
        }
        this.series = {
          0: { color: this.color.confirmation_meninggal },
          1: { color: this.color.confirmation_selesai },
          2: { color: this.color.confirmation_diisolasi },
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
        this.chartOptions.series[0].color = this.color.closecontact_dikarantina
        this.chartOptions.series[1].color = this.color.suspect_diisolasi
        this.chartOptions.series[2].color = this.color.confirmation_diisolasi
      } else if (category === 'confirmation_total') {
        this.chartOptions.series[0].color = this.color.confirmation_meninggal
        this.chartOptions.series[1].color = this.color.confirmation_selesai
        this.chartOptions.series[2].color = this.color.confirmation_diisolasi
      } else {
        this.chartOptions.series[0].color = this.color[category]
      }
    },
    setCols (category) {
      if (category === 'gabungan_aktif') {
        this.chartData.cols = [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'Kontak Erat - Masih Dikarantina', label: 'Kontak Erat - Masih Dikarantina', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Suspek - Isolasi/ Dalam Perawatan', label: 'Suspek - Isolasi/ Dalam Perawatan', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Positif - Isolasi/ Dalam Perawatan', label: 'Positif - Isolasi/ Dalam Perawatan', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } }
          // { id: 'annot', type: 'string', role: 'annotation' }
        ]
      } else if (category === 'confirmation_total') {
        this.chartData.cols = [
          { id: 'Kasus', label: 'Jumlah Kasus', type: 'string' },
          { id: 'Positif - Meninggal', label: 'Positif - Meninggal', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Positif - Selesai Isolasi/ Sembuh', label: 'Positif - Selesai Isolasi/ Sembuh', type: 'number' },
          { type: 'string', role: 'tooltip', p: { html: true } },
          { id: 'Positif - Isolasi/ Dalam Perawatan', label: 'Positif - Isolasi/ Dalam Perawatan', type: 'number' },
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
