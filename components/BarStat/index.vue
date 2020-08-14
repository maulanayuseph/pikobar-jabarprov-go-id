<template>
  <div class="row -mx-4">
    <div
      class="p-1 col-md m-2"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FCDFE0 !important; border: solid 1px #FFB4B5;"
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>POSITIF COVID-19</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 24px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 24px; float: right;">
          <b>{{ jsonDataResult.positif }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-2" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: right;">
          <b>{{ jsonDataResult.positif_nasional }}</b>
        </h3>
      </div>
    </div>
    <div
      class="p-1 col-md m-2"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #D3EEE3 !important; border: solid 1px #91DCBD; "
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>SEMBUH</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: right;">
          <b>{{ jsonDataResult.sembuh }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 22px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 22px; float: right;">
          <b>{{ jsonDataResult.sembuh_nasional }}</b>
        </h3>
      </div>
    </div>
    <div
      class="p-1 col-md m-2 "
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); background-color: #FBEADF !important; border: solid 1px #FED1B1; "
    >
      <h4 class="ml-3 mt-2" style="color: #4F4F4F;">
        <b>MENINGGAL</b>
      </h4>
      <div class="mt-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: left;">
          <b>Jawa Barat</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 27px; float: right;">
          <b>{{ jsonDataResult.meninggal }}</b>
        </h3>
      </div>
      <div class="mt-1 mb-1" style="display: flow-root;">
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: left;">
          <b>Indonesia</b>
        </h3>
        <h3 class="ml-3 mr-3" style="font-size: 20px; float: right;">
          <b>{{ jsonDataResult.meninggal_nasional }}</b>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BarStat',
  components: {
  },
  data () {
    return {
      jsonDataProvinsi: {},
      jsonDataNasional: [],
      jsonDataResult: {
        odp_total: 0,
        odp_proses: 0,
        odp_proses_persen: 0,
        odp_selesai: 0,
        odp_selesai_persen: 0,
        pdp_total: 0,
        pdp_proses: 0,
        pdp_proses_persen: 0,
        pdp_selesai: 0,
        pdp_selesai_persen: 0,
        positif: 0,
        sembuh: 0,
        meninggal: 0,
        positif_nasional: 0,
        sembuh_nasional: 0,
        meninggal_nasional: 0,
        last_update: ''
      }
    }
  },
  created () {
    this.fetchDataProvinsi()
    this.fetchDataNasional()
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
    fetchDataProvinsi () {
      const self = this

      this.$covid19PublicApi
        .get('v1/rekapitulasi/jabar?level=prov')
        .then(function (response) {
          self.jsonDataProvinsi = response.data.data.content

          self.jsonDataResult.positif = self.ifNullReturnZero(self.jsonDataProvinsi.positif)
          self.jsonDataResult.sembuh = self.ifNullReturnZero(self.jsonDataProvinsi.sembuh)
          self.jsonDataResult.meninggal = self.ifNullReturnZero(self.jsonDataProvinsi.meninggal)
          self.jsonDataResult.odp_total = self.ifNullReturnZero(self.jsonDataProvinsi.odp_total)
          self.jsonDataResult.odp_proses = self.ifNullReturnZero(self.jsonDataProvinsi.odp_proses)
          self.jsonDataResult.odp_proses_persen = ((self.jsonDataResult.odp_proses / self.jsonDataResult.odp_total) * 100).toFixed(2)
          self.jsonDataResult.odp_selesai = self.ifNullReturnZero(self.jsonDataProvinsi.odp_selesai)
          self.jsonDataResult.odp_selesai_persen = ((self.jsonDataResult.odp_selesai / self.jsonDataResult.odp_total) * 100).toFixed(2)
          self.jsonDataResult.pdp_total = self.ifNullReturnZero(self.jsonDataProvinsi.pdp_total)
          self.jsonDataResult.pdp_proses = self.ifNullReturnZero(self.jsonDataProvinsi.pdp_proses)
          self.jsonDataResult.pdp_proses_persen = ((self.jsonDataResult.pdp_proses / self.jsonDataResult.pdp_total) * 100).toFixed(2)
          self.jsonDataResult.pdp_selesai = self.ifNullReturnZero(self.jsonDataProvinsi.pdp_selesai)
          self.jsonDataResult.pdp_selesai_persen = ((self.jsonDataResult.pdp_selesai / self.jsonDataResult.pdp_total) * 100).toFixed(2)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    fetchDataNasional () {
      const self = this
      axios
        .get('https://indonesia-covid-19.mathdro.id/api')
        .then(function (response) {
          self.jsonDataNasional = response.data

          self.jsonDataResult.positif_nasional = response.data.jumlahKasus
          self.jsonDataResult.sembuh_nasional = response.data.sembuh
          self.jsonDataResult.meninggal_nasional = response.data.meninggal
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
* {
  font-family: 'Product Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
