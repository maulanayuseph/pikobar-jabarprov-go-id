<template>
  <div class="container mx-auto">
    <div>
      <section class="flex flex-col lg:flex-row lg:flex-no-wrap">
        <CounterCardLoader
          :is-pending="isPending"
          class="lg:mr-8 mb-8 lg:w-1/3 border border-solid"
          style="background-color: #FCDFE0; border-color: #FFB4B5;"
          label="Terkonfirmasi"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <b>
              {{ positifJabar }}
            </b>
          </div>
          <div class="flex justify-between items-baseline text-xl opacity-50">
            <h4>
              Indonesia
            </h4>
            <b>
              {{ positifNasional }}
            </b>
          </div>
        </CounterCardLoader>
        <CounterCardLoader
          :is-pending="isPending"
          class="lg:mr-8 mb-8 lg:w-1/3 border border-solid"
          style="background-color: #D3EEE3; border-color: #91DCBD;"
          label="Sembuh"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <b>
              {{ sembuhJabar }}
            </b>
          </div>
          <div class="flex justify-between items-baseline text-xl opacity-50">
            <h4>
              Indonesia
            </h4>
            <b>
              {{ sembuhNasional }}
            </b>
          </div>
        </CounterCardLoader>
        <CounterCardLoader
          :is-pending="isPending"
          class="mb-8 lg:w-1/3 border border-solid"
          style="background-color: #FBEADF; border-color: #FED1B1;"
          label="Meninggal"
        >
          <div class="flex justify-between items-baseline text-2xl">
            <h4>
              <b>Jawa Barat</b>
            </h4>
            <b>
              {{ meninggalJabar }}
            </b>
          </div>
          <div class="flex justify-between items-baseline text-xl opacity-50">
            <h4>
              Indonesia
            </h4>
            <b>
              {{ meninggalNasional }}
            </b>
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
import _get from 'lodash/get'
import _round from 'lodash/round'
import CounterCardLoader from './CounterCardLoader'
import StatisticLoader from './StatisticLoader'

export default {
  components: {
    CounterCardLoader,
    StatisticLoader
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
  methods: {
    _round
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
