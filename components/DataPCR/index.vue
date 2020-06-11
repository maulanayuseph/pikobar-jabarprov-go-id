<template>
  <div
    class="pcr-main text-white overflow-hidden rounded-lg shadow-md p-5"
  >
    <b class="text-lg">PCR (Polymerase Chain Reaction)</b>
    <div class="flex flex-col md:flex-row mb-2 mt-2">
      <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 mt-2">
        Polymerase Chain Reaction atau PCR merupakan pemeriksaan diagnostik yang dianggap paling akurat untuk memastikan apakah seseorang menderita COVID-19 atau tidak.<br>
        <br><b style="font-size: larger;">Disclaimer :</b><br>
        <span style="opacity: 0.6;">Jumlah tes PCR yang ditampilkan adalah hasil pengujian di Labkes Jabar.</span>
        <span v-if="showMore" style="opacity: 0.6;">Angka Positif hasil tes PCR tidak merepresentasikan seluruh kasus terkonfirmasi dan jumlah pengujian massal di Jawa Barat, tim Pikobar sedang dalam proses pengumpulan dan integrasi data dari lab-lab satelit se-Jawa Barat.  </span>
        <!-- <b><a v-if="!showMore" style="color: #17689D; cursor:pointer;" @click="clickShowMore"> Selengkapnya</a></b> -->
        <!-- <b><a v-if="showMore" style="color: #17689D; cursor:pointer;" @click="clickShowMore"> Sembunyikan</a></b> -->
        <br>
      </div>
      <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 row">
        <div class="flex flex-col md:flex-row h-auto text-left">
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="text-4xl">
              {{ Number(data.pcr.total).toLocaleString('id-ID') }}
            </div>
            <div class="text-sm">
              Jumlah PCR
              <div class="tooltip pl-1">
                &#9432;
                <span class="tooltiptext text-xs">Jumlah Polymerase Chain Reaction (PCR) yang telah dilakukan</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row h-auto text-left">
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.pcr.positif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.pcr_persentase_by_total.positif.toFixed(2)).toLocaleString('id-ID') }})%</span>
              </div>
              <div class="text-sm">
                Positif
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.pcr.negatif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.pcr_persentase_by_total.negatif.toFixed(2)).toLocaleString('id-ID') }})%</span>
              </div>
              <div class="text-sm">
                Negatif
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.pcr.invalid).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.pcr_persentase_by_total.invalid.toFixed(2)).toLocaleString('id-ID') }})%</span>
              </div>
              <div class="text-sm">
                Invalid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DataPCR',
  components: {
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        pcr: {
          positif: 0,
          negatif: 0,
          jumlah_sampling: 0,
          tanggal: 0
        }
      })
    }
  },
  data () {
    return {
      data: {
        pcr: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          jumlah_sampling: 0,
          tanggal: 0
        },
        pcr_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0
        }
      },
      showMore: true
    }
  },
  computed: {
    dataRekapitulasiJabarProv () {
      return this.$store.getters['data-rekapitulasi-jabar-prov/itemsMap']
    }
  },
  watch: {
    // propsDataRekapitulasiJabar () {
    //   this.data.pcr = this.propsDataRekapitulasiJabar.pcr
    //   this.countPersentage()
    // }
    dataRekapitulasiJabarProv (val) {
      this.data.pcr = val.pcr
      this.countPersentage()
    }
  },
  methods: {
    countPersentage () {
      const self = this
      self.data.pcr.total = self.data.pcr.jumlah_sampling
      self.data.pcr_persentase_by_total.positif = self.data.pcr.positif / self.data.pcr.total * 100
      self.data.pcr_persentase_by_total.negatif = self.data.pcr.negatif / self.data.pcr.total * 100
      self.data.pcr_persentase_by_total.invalid = self.data.pcr.invalid / self.data.pcr.total * 100
    },
    clickShowMore () {
      this.showMore = !this.showMore
    }
  }
}

</script>

<style scoped>
  .pcr-main {
    background-color: #41A5DE;
  }
  /* Tooltip container */
  .tooltip {
    position: absolute;
    display: inline-block;
  }

  /* Tooltip text */
  .tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: white;
    color:#000;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
     width: 120px;
    top: 100%;
    left: 50%;
    margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14)
  }

  .tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
