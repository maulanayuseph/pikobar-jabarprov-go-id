<template>
  <div>
    <h3 class="p-5 text-lg md:text">
      <b>Rasio Kasus Terkonfirmasi</b>
    </h3>
    <hr>
    <p class="p-3 text-sm sm:text">
      Data yang ditampilkan berdasarkan: <b>Kota/Kabupaten di Jawa Barat</b>
    </p>
    <div class="p-3">
      <GChart
        :settings="{packages: ['corechart']}"
        :data="chartData"
        :options="chartOptions"
        :createChart="(el, google) => {
          return new google.visualization.BarChart(el)
        }"
        @ready="onChartReady"
      />
    </div>
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'RasioConfirmedCase',
  components: {
    GChart
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
          { id: 'Sembuh', label: 'Sembuh', type: 'number' },
          { id: 'Aktif', label: 'Aktif', type: 'number' },
          { id: 'annot', type: 'string', role: 'annotation' }
        ],
        rows: [
          {
            c: [
              { v: 0, f: 'Kota Bekasi' },
              { v: 10, f: '0' },
              { v: 20, f: '0' },
              { v: 100, f: '0' },
              { v: 300, f: '200' }
            ]
          },
          {
            c: [
              { v: 0, f: 'Kota Bandung' },
              { v: 20, f: '0' },
              { v: 50, f: '0' },
              { v: 100, f: '0' },
              { v: 200, f: '0' }
            ]
          },
          {
            c: [
              { v: 0, f: 'Kota Bandung' },
              { v: 20, f: '0' },
              { v: 50, f: '0' },
              { v: 100, f: '0' },
              { v: 200, f: '0' }
            ]
          }
        ]
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
          top: -20,
          height: 400
        },
        orientation: 'vertical',
        height: 500,
        isStacked: true,
        legend: {
          position: 'bottom'
        },
        bar: { groupWidth: '95%' },
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
        annotations: {
          textStyle: {
            fontSize: 14,
            bold: true,
            color: '#000000',
            opacity: 0.8
          },
          alwaysOutside: true
        },
        vAxis: {
          format: '##;##',
          html: true
        },
        hAxis: {
          format: ';',
          viewWindowMode: 'explicit'
        }
      }
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) { // watch it
      console.log('Prop changed: ', newVal, ' | was: ', oldVal)
    }
  },
  methods: {
    onChartReady (chart, google) {
      this.chartsLib = google
      const data = new google.visualization.DataTable(this.chartData)
      const view = new google.visualization.DataView(data)

      return chart.draw(view)
    }
  }
}
</script>
