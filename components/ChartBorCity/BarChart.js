import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    this.addPlugin({
      afterDatasetsDraw: (ev) => {
        const scale = window.devicePixelRatio
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

        const sourceCanvas = ev.chart.ctx.canvas
        const copyWidth = ev.chart.width
        const copyHeight = ev.chart.height * scale
        const targetCtx = document.getElementById('myChartAxis').getContext('2d')
        targetCtx.canvas.width = copyWidth
        targetCtx.canvas.height = 360
        targetCtx.fillStyle = '#ffffff'
        targetCtx.fillRect(0, 320, copyWidth, 350)
        targetCtx.drawImage(
          sourceCanvas,
          0,
          copyHeight - 32 * scale,
          copyWidth * scale,
          copyHeight * scale,
          0,
          350 - 32,
          copyWidth,
          copyHeight
        )
      }
    })
  },
  watch: {
    options () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
