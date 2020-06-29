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
    <GChart
      class="p-5"
      type="PieChart"
      :data="pieChartJenisKelaminData"
      :options="pieChartJenisKelaminOptions"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'BarStatJenisKelamin',
  components: {
    GChart
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        kode_prov: '',
        nama_prov: '',
        odp_total: 0,
        odp_total_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        pdp_total: 0,
        pdp_total_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        positif: 0,
        positif_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        sembuh: 0,
        sembuh_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        meninggal: 0,
        meninggal_per_gender: {
          laki_laki: 0,
          perempuan: 0
        }
      })
    }
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
      jsonDataRekapitulasiJabar: {
        kode_prov: '',
        nama_prov: '',
        odp_total: 0,
        odp_total_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        pdp_total: 0,
        pdp_total_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        positif: 0,
        positif_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        sembuh: 0,
        sembuh_per_gender: {
          laki_laki: 0,
          perempuan: 0
        },
        meninggal: 0,
        meninggal_per_gender: {
          laki_laki: 0,
          perempuan: 0
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
    dataRekapitulasiJabarProv () {
      return this.$store.getters['data-rekapitulasi-jabar-prov/itemsMap']
    }
  },
  watch: {
    // propsDataRekapitulasiJabar () {
    //   this.jsonDataRekapitulasiJabar = this.propsDataRekapitulasiJabar
    //   this.changeGroupJenisKelamin('Positif - Aktif')
    // }
    dataRekapitulasiJabarProv (val) {
      this.jsonDataRekapitulasiJabar = val
      this.changeGroupJenisKelamin('Positif - Sembuh')
    }
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
      let tempJenisKelaminNull = 0

      if (stat === 'ODP') {
        tempJenisKelaminPria = parseInt(this.jsonDataRekapitulasiJabar.odp_total_per_gender.laki_laki)
        tempJenisKelaminWanita = parseInt(this.jsonDataRekapitulasiJabar.odp_total_per_gender.perempuan)
        tempJenisKelaminNull = parseInt(this.jsonDataRekapitulasiJabar.odp_total) - parseInt(tempJenisKelaminPria + tempJenisKelaminWanita)
        if (tempJenisKelaminNull < 0) {
          tempJenisKelaminNull = 0
        }
      } else if (stat === 'PDP') {
        tempJenisKelaminPria = parseInt(this.jsonDataRekapitulasiJabar.pdp_total_per_gender.laki_laki)
        tempJenisKelaminWanita = parseInt(this.jsonDataRekapitulasiJabar.pdp_total_per_gender.perempuan)
        tempJenisKelaminNull = parseInt(this.jsonDataRekapitulasiJabar.pdp_total) - parseInt(tempJenisKelaminPria + tempJenisKelaminWanita)
        if (tempJenisKelaminNull < 0) {
          tempJenisKelaminNull = 0
        }
      } else if (stat === 'Positif - Aktif') {
        tempJenisKelaminPria = parseInt(this.jsonDataRekapitulasiJabar.positif_per_gender.laki_laki) - parseInt(this.jsonDataRekapitulasiJabar.sembuh_per_gender.laki_laki) - parseInt(this.jsonDataRekapitulasiJabar.meninggal_per_gender.laki_laki)
        tempJenisKelaminWanita = parseInt(this.jsonDataRekapitulasiJabar.positif_per_gender.perempuan) - parseInt(this.jsonDataRekapitulasiJabar.sembuh_per_gender.perempuan) - parseInt(this.jsonDataRekapitulasiJabar.meninggal_per_gender.perempuan)
        tempJenisKelaminNull = parseInt(tempJenisKelaminPria) - parseInt(tempJenisKelaminPria + tempJenisKelaminWanita)
        if (tempJenisKelaminNull < 0) {
          tempJenisKelaminNull = 0
        }
      } else if (stat === 'Positif - Sembuh') {
        tempJenisKelaminPria = parseInt(this.jsonDataRekapitulasiJabar.sembuh_per_gender.laki_laki)
        tempJenisKelaminWanita = parseInt(this.jsonDataRekapitulasiJabar.sembuh_per_gender.perempuan)
        tempJenisKelaminNull = parseInt(this.jsonDataRekapitulasiJabar.sembuh) - parseInt(tempJenisKelaminPria + tempJenisKelaminWanita)
        if (tempJenisKelaminNull < 0) {
          tempJenisKelaminNull = 0
        }
      } else if (stat === 'Positif - Meninggal') {
        tempJenisKelaminPria = parseInt(this.jsonDataRekapitulasiJabar.meninggal_per_gender.laki_laki)
        tempJenisKelaminWanita = parseInt(this.jsonDataRekapitulasiJabar.meninggal_per_gender.perempuan)
        tempJenisKelaminNull = parseInt(this.jsonDataRekapitulasiJabar.meninggal) - parseInt(tempJenisKelaminPria + tempJenisKelaminWanita)
        if (tempJenisKelaminNull < 0) {
          tempJenisKelaminNull = 0
        }
      }

      self.pieChartJenisKelaminData = [
        ['Jenis Kelamin', 'Data'],
        ['Pria', tempJenisKelaminPria],
        ['Wanita', tempJenisKelaminWanita],
        ['N/A', tempJenisKelaminNull]
      ]
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
