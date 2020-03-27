<template>
  <div>
    <div class="row mt-2 mb-2 pl-2">
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-md mr-2"
        :class="stat.isActiveHarian ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableHarian"
      >
        <font-awesome-icon :icon="fontChartBar" /> Angka Harian
      </nuxt-link>
      <nuxt-link
        tag="a"
        style="border: 1px solid #2DAC55;"
        class="btn btn-md mr-2"
        :class="stat.isActiveAkumulatif ? 'btnActive' : 'btnNonActive'"
        to=""
        @click.native="enableAkumulatif"
      >
        <font-awesome-icon :icon="fontChartLine" /> Kumulatif
      </nuxt-link>
    </div>

    <div v-if="stat.isActiveHarian" class="row">
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Angka Harian ODP</b><br>
            <b style="color: #828282;">(Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartHarianODPData"
            :options="barChartHarianODPOptions"
          />
        </div>
      </div>
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Angka Harian PDP</b><br>
            <b style="color: #828282;">(Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <GChart
            type="BarChart"
            :data="barChartHarianPDPData"
            :options="barChartHarianPDPOptions"
          />
        </div>
      </div>
    </div>

    <div v-if="stat.isActiveAkumulatif" class="row">
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Kumulatif ODP</b><br>
            <b style="color: #828282;">(Orang Dalam Pemantauan)</b>
          </h4>
          <hr>
          <GChart
            type="LineChart"
            :data="barChartAkumulatifODPData"
            :options="barChartAkumulatifODPOptions"
          />
        </div>
      </div>
      <div class="p-1 col-lg-6 col-md">
        <div
          class="bg-white p-1"
          style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
        >
          <h4 class="m-3">
            <b>Kumulatif PDP</b><br>
            <b style="color: #828282;">(Pasien Dalam Pengawasan)</b>
          </h4>
          <hr>
          <GChart
            type="LineChart"
            :data="barChartAkumulatifPDPData"
            :options="barChartAkumulatifPDPOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { GChart } from 'vue-google-charts'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartBar, faChartLine } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'BarStatHarianAkumulatif',
  components: {
    GChart,
    FontAwesomeIcon
  },
  data () {
    return {
      stat: {
        isActiveHarian: true,
        isActiveAkumulatif: false
      },
      fontChartBar: faChartBar,
      fontChartLine: faChartLine,
      jsonDataProvinsiHarian: [],
      jsonDataProvinsiKumulatif: [],
      jsonDataRekap: [
      ],
      jsonDataSatuan: [
      ],
      jsonDataResult: {
        odp: 0,
        odp_proses: 0,
        odp_proses_persen: 0,
        odp_selesai: 0,
        odp_selesai_persen: 0,
        pdp: 0,
        pdp_proses: 0,
        pdp_proses_persen: 0,
        pdp_selesai: 0,
        pdp_selesai_persen: 0,
        positif: 0,
        perawatan: 0,
        sembuh: 0,
        meninggal: 0,
        total_positif_saat_ini: 0,
        total_sembuh: 0,
        total_meninggal: 0,
        last_update: '',
        umur_max: 0,
        count_kota: 0
      },
      barChartHarianODPData: [
        ['Tanggal', 'Total Pemantauan'],
        ['0', 0]
      ],
      barChartHarianODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartHarianPDPData: [
        ['Tanggal', 'Total Pengawasan'],
        ['0', 0]
      ],
      barChartHarianPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931'],
        legend: {
          position: 'bottom'
        },
        isStacked: true,
        seriesType: 'bars',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifODPData: [
        ['Tanggal', 'Total ODP'],
        ['0', 0]
      ],
      barChartAkumulatifODPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#6DD274', '#1AB762', '#009F5D'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      },
      barChartAkumulatifPDPData: [
        ['Tanggal', 'Total PDP'],
        ['0', 0]
      ],
      barChartAkumulatifPDPOptions: {
        height: 450,
        orientation: 'horizontal',
        colors: ['#F6D039', '#F18931', '#F55A2A'],
        legend: {
          position: 'bottom',
          alignment: 'center',
          maxLines: 5
        },
        // curveType: 'function',
        hAxis: {
          slantedText: true,
          slantedTextAngle: -45
        },
        vAxis: {
          viewWindow: {
            min: 0
          }
        },
        chartArea: {
          width: '80%',
          bottom: 100
        }
      }
    }
  },
  created () {
    this.fetchDataProvinsiHarian()
    this.fetchDataProvinsiKumulatif()
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
    enableHarian () {
      this.stat.isActiveHarian = true
      this.stat.isActiveAkumulatif = false
    },
    enableAkumulatif () {
      this.stat.isActiveHarian = false
      this.stat.isActiveAkumulatif = true
    },
    fetchDataProvinsiHarian () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiHarian = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiHarian.length; i++) {
            const date = new Date(self.jsonDataProvinsiHarian[i].tanggal)
            if (stop === false) {
              self.barChartHarianODPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].odp])
              self.barChartHarianPDPData.push([self.formatDate(date), self.jsonDataProvinsiHarian[i].pdp])
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.barChartHarianODPData.splice(1, 1)
          self.barChartHarianPDPData.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataProvinsiKumulatif () {
      const self = this
      const today = new Date()
      const strToday = self.formatDate(today)

      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
        .then(function (response) {
          self.jsonDataProvinsiKumulatif = response.data.data.content

          let stop = false
          for (let i = 0; i < self.jsonDataProvinsiKumulatif.length; i++) {
            const date = new Date(self.jsonDataProvinsiKumulatif[i].tanggal)
            if (stop === false) {
              self.barChartAkumulatifODPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].odp])
              self.barChartAkumulatifPDPData.push([self.formatDate(date), self.jsonDataProvinsiKumulatif[i].pdp])
            }
            if (self.formatDate(date) === strToday) {
              stop = true
            }
          }
          self.barChartAkumulatifODPData.splice(1, 1)
          self.barChartAkumulatifPDPData.splice(1, 1)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  head () {
    return {
      link: [
        /* { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' } */
      ]
    }
  }
}

</script>

<style lang="scss" scoped>

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
</style>
