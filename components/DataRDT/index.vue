<template>
  <div
    class="rdt-main text-white overflow-hidden rounded-lg shadow-md p-5"
  >
    <b class="text-lg">RDT (Rapid Diagnostic Test)</b>
    <div class="flex flex-col md:flex-row mb-2 mt-2">
      <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 mt-2">
        Rapid Diagnostic Test (RDT) atau test diagnostik cepat merupakan test yang digunakan sebagai skrining medis awal untuk mendeteksi COVID-19. Pada hasil RDT yang Reaktif akan dilakukan pemeriksaan konfirmasi lebih lanjut dengan metode Polymerase Chain Reaction (PCR).
        <span>
          <br><br>
        </span>
        <span>
          <b>
            Jika Anda ingin mengikuti Tes Masif COVID-19,
            daftarkan diri Anda di sini <br><a class="text-sm bg-red-100 py-0 px-1 rounded text-green-500 align-middle" href="https://pikobar.jabarprov.go.id/temp/disclaimer/rdt/?uid=_userUID">Daftar RDT</a>
            <br><br>
          </b>
        </span>
      </div>
      <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm mr-10 row">
        <div class="flex flex-col md:flex-row h-auto text-left">
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="text-4xl">
              {{ Number(data.rdt.total).toLocaleString('id-ID') }}
            </div>
            <!-- <div class="text-sm"> Jumlah RDT <span class="text-xs tooltip">&#9432;<span class="tooltiptext">Tooltip text</span></span></div> -->
            <div class="text-sm">
              Jumlah RDT
              <div class="tooltip pl-1">
                &#9432;
                <span class="tooltiptext text-xs">Jumlah Rapid Diagnostic Test (RDT) yang telah dilakukan</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col md:flex-row h-auto text-left">
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.rdt.positif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.rdt_persentase_by_total.positif.toFixed(2)).toLocaleString('id-ID') }})%</span>
              </div>
              <div class="text-sm">
                Reaktif
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.rdt.negatif).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.rdt_persentase_by_total.negatif.toFixed(2)).toLocaleString('id-ID') }})%</span>
              </div>
              <div class="text-sm">
                Non Reaktif
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 lg:w-1/3 pl-2 h-auto text-left">
            <div class="h-20 pt-3">
              <div class="mb-1">
                <span class="text-2xl">{{ Number(data.rdt.invalid).toLocaleString('id-ID') }}</span>
                <span class="text-sm">({{ Number(data.rdt_persentase_by_total.invalid.toFixed(2)).toLocaleString('id-ID') }})%</span>
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
  name: 'DataRDT',
  components: {
  },
  props: {
    propsDataRekapitulasiJabar: {
      type: Object,
      default: () => ({
        rdt: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          belum_diketahui: 0
        }
      })
    }
  },
  data () {
    return {
      data: {
        rdt: {
          total: 0,
          positif: 0,
          negatif: 0,
          invalid: 0,
          belum_diketahui: 0
        },
        rdt_persentase_by_total: {
          positif: 0,
          negatif: 0,
          invalid: 0,
          belum_diketahui: 0
        }
      }
    }
  },
  watch: {
    propsDataRekapitulasiJabar () {
      this.data.rdt = this.propsDataRekapitulasiJabar.rdt
      this.countPersentage()
    }
  },
  methods: {
    countPersentage () {
      const self = this
      self.data.rdt_persentase_by_total.positif = self.data.rdt.positif / self.data.rdt.total * 100
      self.data.rdt_persentase_by_total.negatif = self.data.rdt.negatif / self.data.rdt.total * 100
      self.data.rdt_persentase_by_total.invalid = self.data.rdt.invalid / self.data.rdt.total * 100
      self.data.rdt_persentase_by_total.belum_diketahui = self.data.rdt.belum_diketahui / self.data.rdt.total * 100
    }
  }
}

</script>

<style scoped>
  .rdt-main {
    background-color: #5AAA4E;
  }
  .text-green {
    color: #5AAA4E !important;
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
