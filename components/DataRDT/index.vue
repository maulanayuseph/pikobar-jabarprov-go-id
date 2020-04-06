<template>
  <div
    class="rdt-main text-white overflow-hidden rounded-lg shadow-md p-3"
  >
    <b class="text-lg">RDT (Rapid Diagnostic Test)</b>
    <div class="flex flex-col md:flex-row mb-4 mt-2">
      <div class="w-full md:w-3/6 lg:w-3/6 h-auto text-sm">
        Rapid Diagnostic Test (RDT) atau test diagnostik cepat merupakan test yang digunakan sebagai skrining medis awal untuk mendeteksi COVID-19. Pada hasil RDT yang Positif akan dilakukan pemeriksaan konfirmasi lebih lanjut dengan metode Polymerase Chain Reaction (PCR)
      </div>
      <div class="w-full md:w-1/6 lg:w-1/6 h-auto text-center">
        <div class="text-4xl">
          {{ data.rdt.total }}
        </div>
        <!-- <div class="text-sm"> Jumlah RDT <span class="text-xs tooltip">&#9432;<span class="tooltiptext">Tooltip text</span></span></div> -->
        <div class="text-sm">
          Jumlah RDT
          <div class="tooltip pl-1">
            &#9432;
            <span class="tooltiptext text-xs">Jumlah Rapid Test (RDT) yang telah dilakukan</span>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/6 lg:w-1/6 pl-2 h-auto text-center">
        <div class="h-20 pt-3">
          <div class="mb-1">
            <span class="text-2xl">{{ data.rdt.positif }}</span>
            <span class="text-sm">({{ data.rdt_persentase_by_total.positif.toFixed(2) }})%</span>
          </div>
          <div class="text-sm">
            Reaktif
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/6 lg:w-1/6 pl-2 h-auto text-center">
        <div class="h-20 pt-3">
          <div class="mb-1">
            <span class="text-2xl">{{ data.rdt.negatif }}</span>
            <span class="text-sm">({{ data.rdt_persentase_by_total.negatif.toFixed(2) }})%</span>
          </div>
          <div class="text-sm">
            Negatif
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/6 lg:w-1/6 pl-2 h-auto text-center">
        <div class="h-20 pt-3">
          <div class="mb-1">
            <span class="text-2xl">{{ data.rdt.invalid }}</span>
            <span class="text-sm">({{ data.rdt_persentase_by_total.invalid.toFixed(2) }})%</span>
          </div>
          <div class="text-sm">
            Invalid
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DataRDT',
  components: {
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
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar')
        .then(function (response) {
          self.data.rdt = response.data.data.content.rdt
          self.data.rdt_persentase_by_total.positif = self.data.rdt.positif / self.data.rdt.total * 100
          self.data.rdt_persentase_by_total.negatif = self.data.rdt.negatif / self.data.rdt.total * 100
          self.data.rdt_persentase_by_total.invalid = self.data.rdt.invalid / self.data.rdt.total * 100
          self.data.rdt_persentase_by_total.belum_diketahui = self.data.rdt.belum_diketahui / self.data.rdt.total * 100
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

</script>

<style scoped>
  .rdt-main {
    background-color: #5AAA4E;
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
