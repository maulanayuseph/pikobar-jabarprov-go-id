import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  methods: {
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    options () {
      this.renderChart(this.chartData, this.options)
    }
  }
}
