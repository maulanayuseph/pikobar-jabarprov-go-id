<template>
  <div class="md:flex md:flex-row flex-nowrap mx-1">
    <div class="total-bor md:flex-1 mx-2 my-3 rounded-lg p-6 shadow-lg text-white">
      <h4 class="text-center font-bold">
        TOTAL BOR
      </h4>
      <div class="w-full mt-3 text-center">
        <div class="text-3xl font-bold">
          {{ dataIsolate.total_persentase }}%
        </div>
        <span class="text-sm">7.602 dari 13.359 TT Terisi</span>
      </div>
    </div>
    <div class="md:flex-1 mx-2 my-3 rounded-lg p-6 bg-white shadow-lg">
      <h4 class="text-center font-bold">
        TOTAL RS
      </h4>
      <div class="w-full mt-3 text-center">
        <div class="text-3xl font-bold">
          {{ dataIsolate.total_rs }}
        </div>
        <span class="text-sm">Total RS menangani COVID-19 di Jabar</span>
      </div>
    </div>
    <div class="md:flex-1 mx-2 my-3 rounded-lg p-6 bg-white shadow-lg">
      <h4 class="text-center font-bold">
        TOTAL RS RUJUKAN
      </h4>
      <div class="w-full mt-3 text-center">
        <div class="text-3xl font-bold">
          {{ dataIsolate.total_rs_rujukan }}
        </div>
        <span class="text-sm">{{ dataIsolate.total_rs_rujukan_persentase }}% dari Total RS</span>
      </div>
    </div>
    <div class="md:flex-1 mx-2 my-3 rounded-lg p-6 bg-white shadow-lg">
      <h4 class="text-center font-bold">
        TOTAL RS NON RUJUKAN
      </h4>
      <div class="w-full mt-3 text-center">
        <div class="text-3xl font-bold">
          {{ dataIsolate.total_rs_nonrujukan }}
        </div>
        <span class="text-sm">{{ dataIsolate.total_rs_nonrujukan_persentase }}% dari Total RS</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BorAggregation',
  props: {
    propsDataIsolateTotal: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      dataIsolate: {
        hijau_persentase: 0,
        hijau_terisi: 0,
        hijau_tersedia: 0,
        icu_persentase: 0,
        icu_terisi: 0,
        icu_tersedia: 0,
        igd_persentase: 0,
        igd_terisi: 0,
        igd_tersedia: 0,
        kuning_persentase: 0,
        kuning_terisi: 0,
        kuning_tersedia: 0,
        merah_persentase: 0,
        merah_terisi: 0,
        merah_tersedia: 0,
        ruang_bersalin_persentase: 0,
        ruang_bersalin_terisi: 0,
        ruang_bersalin_tersedia: 0,
        total_persentase: 0,
        total_rs: 0,
        total_rs_nonrujukan: 0,
        total_rs_nonrujukan_persentase: 0,
        total_rs_rujukan: 0,
        total_rs_rujukan_persentase: 0,
        total_terisi: 0,
        total_tersedia: 0
      }
    }
  },
  computed: {
    dataIsolateTotal () {
      return this.$store.getters['data-isolasi-total-kemenkes-v2/itemsMap']
    }
  },
  watch: {
    dataIsolateTotal (val) {
      this.dataIsolate = val
    }
  },
  mounted () {
    this.$nextTick(() => {
      Promise.all([
        this.$store.dispatch('data-isolasi-total-kemenkes-v2/getItems')
      ]).then(() => {})
    })
  },
  methods: {}
}
</script>
<style scoped>
 .total-bor {
   background-color: #f09b78;
 }
</style>
