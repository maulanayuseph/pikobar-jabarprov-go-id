import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
  },
  mounted () {
    this.addPlugin({
      afterDatasetsDraw: (ev) => {
        const chartInstance = ev.chart
        const ctx = chartInstance.ctx

        ctx.textAlign = 'right'
        ctx.textBaseline = 'bottom'
        ctx.fillColor = 'rgba(255, 0, 0, 0.6)'
        ctx.font = 'bold 11px Arial'
        ev.chart.data.datasets.forEach((dataset, i) => {
          const meta = chartInstance.controller.getDatasetMeta(i)
          meta.data.forEach((bar, index) => {
            const data = dataset.data[index]
            if (data !== 0) {
              ctx.fillStyle = '#000000'
              ctx.fillText(data + '%', bar._model.x + 50, bar._model.y + 6)
            }
          })
        })
      }
    })
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    options () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
