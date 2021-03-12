import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: HorizontalBar,
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
    formatLabel (chart) {
      chart.data.labels.forEach((e, i, a) => {
        if (e !== undefined) {
          if (e.length > 20) {
            const words = e.split(' ')
            const labels = []
            let mergeWord = ''
            for (let i = 0; i < words.length; i++) {
              const length = mergeWord.length + words[i].length
              if (length < 20) {
                mergeWord += ' ' + words[i]
              } else {
                labels.push(mergeWord)
                mergeWord = words[i]
              }
              if (i + 1 === words.length) {
                labels.push(mergeWord)
              }
            }
            a[i] = labels
          }
        }
      })
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
    this.addPlugin({
      afterInit: (chart) => {
        this.formatLabel(chart)
      },
      afterUpdate: (chart) => {
        this.formatLabel(chart)
      },
      afterDatasetsDraw: (ev) => {
        const scale = window.devicePixelRatio
        const sourceCanvas = ev.chart.ctx.canvas
        const copyWidth = ev.chart.width
        const copyHeight = ev.chart.height * scale
        const targetCtx = document.getElementById('myChartAxis').getContext('2d')

        console.log(copyHeight)
        if (copyHeight > 660) {
          targetCtx.canvas.width = copyWidth + 80
          targetCtx.canvas.height = 670
          targetCtx.fillStyle = '#ffffff'
          targetCtx.fillRect(0, 630, copyWidth, 660)
          targetCtx.drawImage(
            sourceCanvas,
            0,
            copyHeight - 32 * scale,
            copyWidth * scale,
            copyHeight * scale,
            0,
            660 - 32,
            copyWidth,
            copyHeight
          )
        } else {
          targetCtx.clearRect(0, 0, targetCtx.canvas.width, 670)
        }
      }
    })
  },
  watch: {
    options () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
