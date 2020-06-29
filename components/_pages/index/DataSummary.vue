<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-col lg:flex-row lg:flex-no-wrap">
        <CounterCardLoader
          :is-pending="isPending"
          class="lg:mr-5 mb-8 lg:w-1/4 border border-solid"
          style="background-color: #E0E6F6; border-color: #747BAD; padding: 1rem;"
          label="Terkonfirmasi"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(positifJabar) }}
              </b>
              <b>
                <span class="text-xl tag-purple-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.jabarPositif) }}</span>
              </b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4>
              <b>Indonesia</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(positifNasional) }}
              </b>
              <b>
                <span class="text-base tag-purple-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalPositif) }}</span>
              </b>
            </span>
          </div>
        </CounterCardLoader>
        <CounterCardLoader
          :is-pending="isPending"
          class="lg:mr-5 mb-8 lg:w-1/4 border border-solid"
          style="background-color: #FCDFE0; border-color: #FFB4B5; padding: 1rem;"
          label="Positif Aktif"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(positifJabar - sembuhJabar - meninggalJabar) }}
              </b>
              <b>
                <span class="text-xl tag-red-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.jabarPositif - pertumbuhan.jabarSembuh - pertumbuhan.jabarMeninggal) }}</span>
              </b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4>
              <b>Indonesia</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(positifNasional - sembuhNasional - meninggalNasional) }}
              </b>
              <b>
                <span class="text-base tag-red-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalPositif - pertumbuhan.nasionalSembuh - pertumbuhan.nasionalMeninggal) }}</span>
              </b>
            </span>
          </div>
        </CounterCardLoader>
        <CounterCardLoader
          :is-pending="isPending"
          class="lg:mr-5 mb-8 lg:w-1/4 border border-solid"
          style="background-color: #D3EEE3; border-color: #91DCBD; padding: 1rem;"
          label="Sembuh"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(sembuhJabar) }}
              </b>
              <b>
                <span class="text-xl tag-green-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.jabarSembuh) }}</span>
              </b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4>
              <b>Indonesia</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(sembuhNasional) }}
              </b>
              <b>
                <span class="text-base tag-green-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalSembuh) }}</span>
              </b>
            </span>
          </div>
        </CounterCardLoader>
        <CounterCardLoader
          :is-pending="isPending"
          class="mb-8 lg:w-1/4 border border-solid"
          style="background-color: #FBEADF; border-color: #FED1B1; padding: 1rem;"
          label="Meninggal"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(meninggalJabar) }}
              </b>
              <b>
                <span class="text-xl tag-orange-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.jabarMeninggal) }}</span>
              </b>
            </span>
          </div>
          <div class="flex justify-between items-baseline text-xl">
            <h4>
              <b>Indonesia</b>
            </h4>
            <span>
              <b>
                {{ formatNumber(meninggalNasional) }}
              </b>
              <b>
                <span class="text-base tag-orange-100 py-0 px-1 rounded text-white align-middle">{{ formatNumberPlusMinus(pertumbuhan.nasionalMeninggal) }}</span>
              </b>
            </span>
          </div>
        </CounterCardLoader>
      </section>

      <section class="flex flex-col xl:flex-row xl:flex-no-wrap">
        <StatisticLoader
          class="w-full xl:w-auto xl:mr-8"
          :is-pending="isPending"
          label="ODP (Orang Dalam Pemantauan)"
          processed-label="Proses Pemantauan"
          finished-label="Selesai Pemantauan"
          total-label="Total ODP"
          :processed="ODPProses"
          :processed-percentage="_round(ODPProses * 100 / ODPTotal, 2)"
          :finished="ODPSelesai"
          :finished-percentage="_round(ODPSelesai * 100 / ODPTotal, 2)"
          :total="ODPTotal"
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
        <StatisticLoader
          class="w-full xl:w-auto"
          :is-pending="isPending"
          label="PDP (Pasien Dalam Pengawasan)"
          processed-label="Proses Pengawasan"
          finished-label="Selesai Pengawasan"
          total-label="Total PDP"
          :processed="PDPProses"
          :processed-percentage="_round(PDPProses * 100 / PDPTotal, 2)"
          :finished="PDPSelesai"
          :finished-percentage="_round(PDPSelesai * 100 / PDPTotal, 2)"
          :total="PDPTotal"
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
      jsonDataRekapitulasiJabarKumulatifProv: [],
      jsonDataNasionalHarianKumulatif: [],
      pertumbuhan: {
        jabarPositif: 0,
        jabarSembuh: 0,
        jabarMeninggal: 0,
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
    ODPProses () {
      return _get(this.cases, 'odp.proses.jabar')
    },
    ODPSelesai () {
      return _get(this.cases, 'odp.selesai.jabar')
    },
    ODPTotal () {
      return _get(this.cases, 'odp.total.jabar')
    },
    PDPProses () {
      return _get(this.cases, 'pdp.proses.jabar')
    },
    PDPSelesai () {
      return _get(this.cases, 'pdp.selesai.jabar')
    },
    PDPTotal () {
      return _get(this.cases, 'pdp.total.jabar')
    },
    positifJabar () {
      return _get(this.cases, 'aktif.jabar')
    },
    positifNasional () {
      return _get(this.cases, 'aktif.nasional')
    },
    sembuhJabar () {
      return _get(this.cases, 'sembuh.jabar')
    },
    sembuhNasional () {
      return _get(this.cases, 'sembuh.nasional')
    },
    meninggalJabar () {
      return _get(this.cases, 'meninggal.jabar')
    },
    meninggalNasional () {
      return _get(this.cases, 'meninggal.nasional')
    },
    isPending () {
      return this.$store.state.statistics.cases === null
    }
  },
  created () {
    this.fetchDataRekapitulasiJabarKumulatifProv()
    this.fetchDataNasionalHarian()
  },
  methods: {
    _round,
    formatNumber,
    formatNumberPlusMinus,
    formatNumberOnlyPlus,
    fetchDataRekapitulasiJabarKumulatifProv () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/kumulatif?level=prov')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarKumulatifProv = response.data.data.content
          const numArr = self.jsonDataRekapitulasiJabarKumulatifProv.length
          if (self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 1].positif !== null && self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 1].positif > 0) {
            self.pertumbuhan.jabarPositif = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 1].positif - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].positif
            self.pertumbuhan.jabarSembuh = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 1].sembuh - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].sembuh
            self.pertumbuhan.jabarMeninggal = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 1].meninggal - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].meninggal
          } else {
            self.pertumbuhan.jabarPositif = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].positif - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 3].positif
            self.pertumbuhan.jabarSembuh = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].sembuh - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 3].sembuh
            self.pertumbuhan.jabarMeninggal = self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 2].meninggal - self.jsonDataRekapitulasiJabarKumulatifProv[numArr - 3].meninggal
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
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
