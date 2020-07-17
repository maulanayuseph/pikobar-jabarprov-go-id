<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-row flex-wrap">
        <!-- Terkonfirmasi -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage"
          style="background-color: #E0E6F6; border-color: #747BAD; padding: 1rem;"
          label="Terkonfirmasi"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4><b>Jawa Barat</b></h4>
            <span>
              <b>{{ formatNumber(jsonDataKasusTotal.positif_total) }}</b>
              <b><span class="text-xl tag-purple-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(jsonDataKasusTotal.positif_total_pertumbuhan) }}</span></b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4><b>Indonesia</b></h4>
            <span>
              <b>{{ formatNumber(positifNasional) }}</b>
              <b><span class="text-base tag-purple-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalPositif) }}</span></b>
            </span>
          </div>
        </CounterCardLoader>

        <!-- Positif AKtif -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage"
          style="background-color: #FCDFE0; border-color: #FFB4B5; padding: 1rem;"
          label="Positif Aktif"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4><b>Jawa Barat</b></h4>
            <span>
              <b>{{ formatNumber(jsonDataKasusTotal.positif_aktif) }}</b>
              <b><span class="text-xl tag-red-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(jsonDataKasusTotal.positif_aktif_pertumbuhan) }}</span></b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4><b>Indonesia</b></h4>
            <span>
              <b>{{ formatNumber(positifNasional - sembuhNasional - meninggalNasional) }}</b>
              <b><span class="text-base tag-red-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalPositif - pertumbuhan.nasionalSembuh - pertumbuhan.nasionalMeninggal) }}</span></b>
            </span>
          </div>
        </CounterCardLoader>

        <!-- Positif Sembuh -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border border-solid digital-signage"
          style="background-color: #D3EEE3; border-color: #91DCBD; padding: 1rem;"
          label="Sembuh"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4><b>Jawa Barat</b></h4>
            <span>
              <b>{{ formatNumber(jsonDataKasusTotal.positif_sembuh) }}</b>
              <b><span class="text-xl tag-green-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(jsonDataKasusTotal.positif_sembuh_pertumbuhan) }}</span></b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4><b>Indonesia</b></h4>
            <span>
              <b>{{ formatNumber(sembuhNasional) }}</b>
              <b><span class="text-base tag-green-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalSembuh) }}</span></b>
            </span>
          </div>
        </CounterCardLoader>

        <!-- Positif Meninggal -->
        <CounterCardLoader
          :is-pending="isLoading"
          class="mb-8 border order-solid digital-signage"
          style="background-color: #FBEADF; border-color: #FED1B1; padding: 1rem;"
          label="Meninggal"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4><b>Jawa Barat</b></h4>
            <span>
              <b>{{ formatNumber(jsonDataKasusTotal.positif_meninggal) }}</b>
              <b><span class="text-xl tag-orange-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(jsonDataKasusTotal.positif_meninggal_pertumbuhan) }}</span></b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4><b>Indonesia</b></h4>
            <span>
              <b>{{ formatNumber(meninggalNasional) }}</b>
              <b><span class="text-base tag-orange-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalMeninggal) }}</span></b>
            </span>
          </div>
        </CounterCardLoader>
      </section>

      <section class="flex flex-col xl:flex-row xl:flex-no-wrap">
        <!-- ODP -->
        <StatisticLoader
          class="w-full xl:w-auto xl:mr-8"
          :is-pending="isLoading"
          label="ODP (Orang Dalam Pemantauan)"
          processed-label="Proses Pemantauan"
          finished-label="Selesai Pemantauan"
          died-label="Meninggal"
          total-label="Total ODP"
          :processed="jsonDataKasusTotal.odp_aktif"
          :processed-percentage="_round(jsonDataKasusTotal.odp_aktif * 100 / jsonDataKasusTotal.odp_total, 2)"
          :finished="jsonDataKasusTotal.odp_selesai"
          :finished-percentage="_round(jsonDataKasusTotal.odp_selesai * 100 / jsonDataKasusTotal.odp_total, 2)"
          :died="jsonDataKasusTotal.odp_meninggal"
          :died-percentage="_round(jsonDataKasusTotal.odp_meninggal * 100 / jsonDataKasusTotal.odp_total, 2)"
          :total="jsonDataKasusTotal.odp_total"
        >
          <template #footnote>
            <footer class="p-5">
              <p>
                <b>Keterangan:&nbsp;&nbsp;</b><br>
                <b>ODP</b> adalah singkatan dari <b>Orang Dalam Pemantauan</b>.
                Seseorang dikatakan masuk dalam kategori ODP apabila ia sempat berpergian ke negara lain yang merupakan pusat penyebaran virus corona.
                Anda juga akan masuk sebagai ODP apabila pernah berkontak langsung dengan pasien yang postifi corona.
                Orang yang masuk dalam kelompon ini adalah mereka yang belum menunjukkan gejala sakit.
              </p>
            </footer>
          </template>
        </StatisticLoader>

        <!-- PDP -->
        <StatisticLoader
          class="w-full xl:w-auto"
          :is-pending="isLoading"
          label="PDP (Pasien Dalam Pengawasan)"
          processed-label="Proses Pengawasan"
          finished-label="Selesai Pengawasan"
          died-label="Meninggal"
          total-label="Total PDP"
          :processed="jsonDataKasusTotal.pdp_aktif"
          :processed-percentage="_round(jsonDataKasusTotal.pdp_aktif * 100 / jsonDataKasusTotal.pdp_total, 2)"
          :finished="jsonDataKasusTotal.pdp_selesai"
          :finished-percentage="_round(jsonDataKasusTotal.pdp_selesai * 100 / jsonDataKasusTotal.pdp_total, 2)"
          :died="jsonDataKasusTotal.pdp_meninggal"
          :died-percentage="_round(jsonDataKasusTotal.pdp_meninggal * 100 / jsonDataKasusTotal.pdp_total, 2)"
          :total="jsonDataKasusTotal.pdp_total"
        >
          <template #footnote>
            <footer class="p-5">
              <p>
                <b>Keterangan:&nbsp;&nbsp;</b><br>
                <b>PDP</b> adalah singkatan dari <b>Pasien Dalam Pengawasan</b>.
                Artinya, orang yang masuk ke dalam kategori ini sudah dirawat oleh tenaga kesehatan (menjadi pasien) dan menunjukkan gejala sakit seperti demam, batuk, pilek dan sesak napas.
              </p>
            </footer>
          </template>
        </StatisticLoader>
      </section>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import _get from 'lodash/get'
import _round from 'lodash/round'
import CounterCardLoader from './CounterCardLoader'
import StatisticLoader from './StatisticLoader'
import { formatNumber, formatNumberPlusMinus, formatNumberOnlyPlus } from '~/lib/number'

export default {
  components: {
    CounterCardLoader,
    StatisticLoader
  },
  data () {
    return {
      jsonDataKasusTotal: {},
      jsonDataRekapitulasiJabarKumulatifProv: [],
      jsonDataNasionalHarianKumulatif: [],
      pertumbuhan: {
        nasionalPositif: 0,
        nasionalSembuh: 0,
        nasionalMeninggal: 0
      }
    }
  },
  computed: {
    cases () {
      return this.$store.state.statistics.cases
    },
    positifNasional () {
      return _get(this.cases, 'aktif.nasional')
    },
    sembuhNasional () {
      return _get(this.cases, 'sembuh.nasional')
    },
    meninggalNasional () {
      return _get(this.cases, 'meninggal.nasional')
    },
    isPending () {
      return this.$store.state.statistics.cases === null
    },
    dataKasusTotal () {
      return this.$store.getters['data-kasus-total/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-kasus-total/isLoading']
    }
  },
  watch: {
    dataKasusTotal (val) {
      this.jsonDataKasusTotal = val[0]
    }
  },
  mounted () {
  },
  methods: {
    _round,
    formatNumber,
    formatNumberPlusMinus,
    formatNumberOnlyPlus,
    fetchDataNasionalHarian () {
      const self = this
      axios
        .get('https://indonesia-covid-19.mathdro.id/api/harian')
        .then(function (response) {
          self.jsonDataNasionalHarianKumulatif = response.data.data
          const numArr = self.jsonDataNasionalHarianKumulatif.length
          if (self.jsonDataNasionalHarianKumulatif[numArr - 1].jumlahKasusBaruperHari !== null) {
            self.pertumbuhan.nasionalPositif = self.jsonDataNasionalHarianKumulatif[numArr - 1].jumlahKasusBaruperHari
            self.pertumbuhan.nasionalSembuh = self.jsonDataNasionalHarianKumulatif[numArr - 1].jumlahKasusSembuhperHari
            self.pertumbuhan.nasionalMeninggal = self.jsonDataNasionalHarianKumulatif[numArr - 1].jumlahKasusMeninggalperHari
          } else {
            self.pertumbuhan.nasionalPositif = self.jsonDataNasionalHarianKumulatif[numArr - 2].jumlahKasusBaruperHari
            self.pertumbuhan.nasionalSembuh = self.jsonDataNasionalHarianKumulatif[numArr - 2].jumlahKasusSembuhperHari
            self.pertumbuhan.nasionalMeninggal = self.jsonDataNasionalHarianKumulatif[numArr - 2].jumlahKasusMeninggalperHari
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.text-white {
  color: white;
}
.tag-purple-100 {
  background-color: #2C347C;
}
.tag-purple-camouflage {
  background-color: #E0E6F6;
  color: #E0E6F6;
}
.tag-red-100 {
  background-color: #EF6464;
}
.tag-red-camouflage {
  background-color: #FCDFE0;
  color: #FCDFE0;
}
.tag-green-100 {
  background-color: #3BB46E;
}
.tag-green-camouflage {
  background-color: #D3EEE3;
  color: #D3EEE3;
}
.tag-orange-100 {
  background-color: #EFA965;
}
.tag-orange-camouflage {
  background-color: #FBEADF;
  color: #FBEADF;
}
.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}
.div-only-mobile {
    display: none !important;
}
.div-no-mobile {
    display: flex !important;
}
@media screen and (max-width: 549px) {

  .div-no-mobile {
      display:none !important;
  }

  .div-only-mobile {
      display: flex !important;
  }

}
</style>
<style>
@media screen and (min-width: 1080px) {
  .digital-signage {
    width: 24% !important;
    margin: 0.5%;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 1080px) {
  .digital-signage {
    width: 48% !important;
    margin: 1%;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 576px) {
  .digital-signage {
    width: 100% !important;
    margin-bottom: 20px;
  }
}
</style>
