<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="flex flex-wrap">
      <h4 class="p-5 text-xl md:w-1/2">
        <b>Jenis Kelamin</b>
      </h4>
      <select
        v-model="optionSelected"
        class="select-option-selector md:w-1/2"
        @change="changeGroupJenisKelamin($event.target.value)"
      >
        <option
          v-for="list in optionList"
          :key="list"
          :value="list"
        >
          {{ list }}
        </option>
      </select>
    </div>
    <hr>
    <div
      class="w-full p-5"
      style="min-height: 300px;"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="350"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="300"
          rx="3"
          ry="3"
        />
        <rect
          :key="2"
          x="0"
          :y="310"
          width="100%"
          height="30"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div
      :class="!isLoading?'':'hidden'"
    >
      <GChart
        class="p-5"
        type="PieChart"
        :data="pieChartJenisKelaminData"
        :options="pieChartJenisKelaminOptions"
      />
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStatJenisKelamin',
  components: {
    GChart,
    ContentLoader
  },
  data () {
    return {
      optionList: [
        'ODP',
        'PDP',
        'Positif - Aktif',
        'Positif - Sembuh',
        'Positif - Meninggal'
      ],
      optionSelected: 'Positif - Sembuh',
      jsonDataKasusGender: {
        odp_meninggal: {
          perempuan: 0,
          lakilaki: 0
        },
        pdp_total: {
          perempuan: 0,
          lakilaki: 0
        },
        pdp_aktif: {
          perempuan: 0,
          lakilaki: 0
        },
        odp_total: {
          perempuan: 0,
          lakilaki: 0
        },
        positif_meninggal: {
          perempuan: 0,
          lakilaki: 0
        },
        pdp_selesai: {
          perempuan: 0,
          lakilaki: 0
        },
        positif_total: {
          perempuan: 0,
          lakilaki: 0
        },
        odp_selesai: {
          perempuan: 0,
          lakilaki: 0
        },
        odp_aktif: {
          perempuan: 0,
          lakilaki: 0
        },
        pdp_meninggal: {
          perempuan: 0,
          lakilaki: 0
        },
        positif_sembuh: {
          perempuan: 0,
          lakilaki: 0
        },
        positif_aktif: {
          perempuan: 0,
          lakilaki: 0
        }
      },
      pieChartJenisKelaminData: [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ],
      pieChartJenisKelaminOptions: {
        height: 350,
        widht: 350,
        slices: {
          0: { color: '#2DAC55' },
          1: { color: '#F6D039' },
          2: { color: '#7D7D7D' }
        },
        legend: {
          position: 'bottom'
        },
        pieHole: 0.4,
        chartArea: { width: '80%' }
      }
    }
  },
  computed: {
    dataKasusGender () {
      return this.$store.getters['data-kasus-gender/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-gender/isLoading']
    }
  },
  watch: {
    dataKasusGender (val) {
      this.jsonDataKasusGender = val
      this.changeGroupJenisKelamin('Positif - Sembuh')
    }
  },
  mounted () {
    this.getDataKasusGender()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    resetPieChartJenisKelaminData () {
      this.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', 0],
        ['Wanita', 0],
        ['N/A', 0]
      ]
    },
    changeGroupJenisKelamin (stat) {
      const self = this
      this.resetPieChartJenisKelaminData()

      let tempJenisKelaminPria = 0
      let tempJenisKelaminWanita = 0

      if (stat === 'ODP') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.odp_total.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.odp_total.perempuan)
      } else if (stat === 'PDP') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.pdp_total.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.pdp_total.perempuan)
      } else if (stat === 'Positif - Aktif') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.positif_aktif.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.positif_aktif.perempuan)
      } else if (stat === 'Positif - Sembuh') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.positif_sembuh.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.positif_sembuh.perempuan)
      } else if (stat === 'Positif - Meninggal') {
        tempJenisKelaminPria = parseInt(this.jsonDataKasusGender.positif_meninggal.lakilaki)
        tempJenisKelaminWanita = parseInt(this.jsonDataKasusGender.positif_meninggal.perempuan)
      }

      self.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', tempJenisKelaminPria],
        ['Wanita', tempJenisKelaminWanita],
        ['N/A', 0]
      ]
    },
    // get data
    getDataKasusGender () {
      this.$store.dispatch('data-kasus-gender/getItems')
    }
  }
}

</script>

<style lang="scss" scoped>
.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}

.select-option-selector {
  border-radius: 0.2rem;
  border-width: 1px;
  border-style: solid;
  border-color: #555;
  color: #555;
  background-color: #fff;
  height: 30px;
  width: 160px;
  margin: auto;
  padding: 0px;
}

</style>
