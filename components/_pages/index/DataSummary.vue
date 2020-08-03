<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-row flex-wrap">
        <!-- Terkonfirmasi -->
        <CounterCardLoader
          :is-pending="false"
          class="mb-8 border border-solid digital-signage"
          style="background: linear-gradient(90deg, #2C347C, #424CA6);"
          label="Total Terkonfirmasi"
        >
          <div class="flex flex-row text-white text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md">Jawa Barat</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-white px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
            <div class="w-1/2">
              <b class="text-md">Indonesia</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-white px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer" style="color:#2C347C" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Isolasi -->
        <CounterCardLoader
          :is-pending="false"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Isolasi/Masih Sakit"
        >
          <div class="flex flex-row text-red-500 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-red-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-red-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Selesai -->
        <CounterCardLoader
          :is-pending="false"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Selesai Isolasi/Sembuh"
        >
          <div class="flex flex-row text-green-500 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-green-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl"> 5000 </div>
              <div><span class="rounded-full bg-green-500 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
          </div>
        </CounterCardLoader>

        <!-- Meninggal -->
        <CounterCardLoader
          :is-pending="false"
          class="mb-8 border border-solid digital-signage bg-white"
          label="Meninggal"
        >
          <div class="flex flex-row text-red-700 text-center mt-3 font-bold">
            <div class="w-1/2">
              <b class="text-md text-black">Jawa Barat</b>
              <div class="text-3xl"> 7000 </div>
              <div><span class="rounded-full bg-red-700 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
            <div class="w-1/2">
              <b class="text-md  text-black">Indonesia</b>
              <div class="text-3xl"> 7000 </div>
              <div><span class="rounded-full bg-red-700 px-custom-1 mr-1" style=""><FontAwesomeIcon class="text-xs cursor-pointer text-white" :icon="iconPlusMinus(73)" /></span> 73</div>
            </div>
          </div>
        </CounterCardLoader>
      </section>

      <section class="flex flex-col xl:flex-row xl:flex-no-wrap">
        <!-- ODP -->
        <StatisticLoader
          class="w-full xl:w-auto xl:mr-8"
          :is-pending="false"
          label="ODP (Orang Dalam Pemantauan)"
          processed-label="Proses Pemantauan"
          finished-label="Selesai Pemantauan"
          died-label="Meninggal"
          total-label="Total ODP"
          :processed="400"
          :processed-percentage="_round(30, 2)"
          :finished="500"
          :finished-percentage="_round(40, 2)"
          :died="800"
          :died-percentage="_round(30, 2)"
          :total="3000"
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
          :is-pending="false"
          label="PDP (Pasien Dalam Pengawasan)"
          processed-label="Proses Pengawasan"
          finished-label="Selesai Pengawasan"
          died-label="Meninggal"
          total-label="Total PDP"
          :processed="300"
          :processed-percentage="_round(40, 2)"
          :finished="400"
          :finished-percentage="_round(30, 2)"
          :died="800"
          :died-percentage="_round(30, 2)"
          :total="4000"
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
import _round from 'lodash/round'
import { faAngleDoubleUp, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
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
      },
      icons: {
        faAngleDoubleUp,
        faAngleDoubleDown
      }
    }
  },
  computed: {
    covidCases () {
      return this.$store.getters['covid-cases/itemsMap']
    },
    isLoading () {
      return this.$store.getters['covid-cases/isLoading']
    }
  },
  watch: {
    covidCases (val) {
      console.log(val)
      this.covidCases = val
    }
  },
  mounted () {
    this.getCovidCases()
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
    },
    iconPlusMinus (val) {
      if (val > 0) {
        return this.icons.faAngleDoubleUp
      } else {
        return this.icons.faAngleDoubleDown
      }
    },

    // GET
    getCovidCases () {
      this.$store.dispatch('covid-cases/getItems')
    }
  }
}
</script>
<style lang="scss" scoped>
.px-custom-1 {
  padding-left:0.325rem;
  padding-right:0.325rem
}
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
