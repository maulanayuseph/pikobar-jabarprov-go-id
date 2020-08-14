<template>
  <div class="row -mx-4">
    <div
      class="bg-white p-1 col-md mx-2 mb-4"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    >
      <h3 class="m-3" style="font-size: 23px !important;">
        <b>ODP (Orang Dalam Pemantauan)</b>
      </h3>
      <hr>
      <div class="row p-2">
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.odp_proses }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.odp_proses_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pemantauan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.odp_selesai }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.odp_selesai_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pemantauan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.odp_total }}</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total ODP</span>
          </div>
        </div>
      </div>
      <div class="row p-2 m-1">
        <span><b>Keterangan : </b></span>
        <span style="margin-top: 5px; text-align: justify;">
          <b>ODP</b> adalah singkatan dari <b>Orang Dalam Pemantauan.</b> Seseorang dikatakan masuk dalam kategori ODP apabila ia sempat berpergian ke negara lain yang merupakan
          pusat penyebaran virus Covid-19. Anda juga akan masuk sebagai ODP apabila pernah berkontak langsung dengan pasien yang positif Covid-19. Orang yang masuk dalam kelompok ini
          adalah mereka yang belum menunjukkan gejala sakit.
        </span>
      </div>
    </div>
    <div
      class="bg-white p-1 col-md mx-2 mb-4"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    >
      <h4 class="m-3" style="font-size: 23px !important;">
        <b>PDP (Pasien Dalam Pengawasan)</b>
      </h4>
      <hr>
      <div class="row p-2">
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 34px; font-weight: bold;">{{ jsonDataResult.pdp_proses }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_proses_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Proses Pengawasan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.pdp_selesai }}</span>
            <span style="color: #000000; font-size: 12px; font-weight: bold;">({{ jsonDataResult.pdp_selesai_persen }}%)</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Selesai Pengawasan</span>
          </div>
        </div>
        <div style="margin-top: auto;">
          <div class="col-md m-2 mr-4">
            <span style="color: #2DAC55; font-size: 27px; font-weight: bold;">{{ jsonDataResult.pdp_total }}</span><br>
            <span style="color: #8A8A8A; font-size: 14px; font-weight: normal;">Total PDP</span>
          </div>
        </div>
      </div>
      <div class="row p-2 m-1">
        <span><b>Keterangan : </b></span>
        <span style="margin-top: 5px; text-align: justify;">
          <b>PDP</b> adalah singkatan dari <b>Pasien Dalam Pengawasan.</b> Artinya, orang yang masuk ke dalam kategori ini sudah dirawat oleh tenaga
          kesehatan (menjadi pasien) dan menunjukkan gejala sakit seperti demam, batuk, pilek dan sesak napas.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'BarStatDetail',
  components: {
  },
  data () {
    return {
      jsonDataProvinsi: {},
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
