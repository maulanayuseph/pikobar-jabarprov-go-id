<template>
  <div class="container mx-auto">
    <div class="flex flex-col-reverse lg:flex-row md:m-8 md:p-8 header-card gap-4">
      <div class="flex flex-col justify-center gap-2">
        <h2 class="text-2xl font-bold leading-tight">
          Lacak Permohonan Vitamin/Obat Anda
        </h2>
        <p class="mb-6 mt-2 text-base opacity-75 leading-tight">
          Anda dapat mengetahui status tindak lanjut permohonan obat/vitamin yang
          telah diajukan melalui Pikobar
        </p>
        <div class="relative rounded-md shadow-sm">
          <div class="icon-search">
            <span class="text-gray-500 sm:text-sm">
              <FontAwesomeIcon :icon="icons.faSearch" />
            </span>
          </div>
          <input
            id="search"
            v-model="searchTracking"
            type="text"
            name="search"
            class="block pl-8 py-2 sm:text-sm border rounded-md w-full"
            placeholder="Masukkan ID Permohonan/NIK Anda"
          >
        </div>
        <p class="text-xs">
          *ID permohonan didapatkan setelah anda melakukan pengisian form
          pemohonan obat/vitamin
        </p>
        <vue-recaptcha
          :sitekey="recaptchaKey"
          :load-recaptcha-script="true"
          @verify="verifyCaptcha"
          @expired="onRecaptchaExpired"
          @error="onRecaptchaError"
        />
        <button
          class="sm:mr-0 hover:bg-brand-green-light lg:w-40 search-button"
          @click="onSearch"
        >
          Cari
        </button>
      </div>
      <img
        class="mx-auto md:mx-0 object-contain"
        src="~/assets/illustrations/isoman.png"
        alt="ilustrasi isoman"
      >
    </div>
  </div>
</template>

<script>
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
export default {
  components: {
    VueRecaptcha
  },
  props: {
    isSearched: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icons: {
        faSearch
      },
      recaptchaKey: process.env.GOOGLE_RECAPTCHA_KEY,
      isSearch: this.isSearched,
      searchTracking: '',
      captchaResponse: null
    }
  },
  methods: {
    verifyCaptcha (response) {
      this.captchaResponse = response
    },
    onRecaptchaError () {
      console.log('recaptcha error')
    },
    onRecaptchaExpired () {
      console.log('recaptcha expired')
    },
    async onSearch () {
      this.isSearch = true
      const params = {
        request_id: this.searchTracking,
        'g-recaptcha-response': this.captchaResponse
      }
      const response = await this.$store.dispatch('tracking/getTracking', params)
      console.log(response)
      // Display Example response
      // {
      //   "alamat_tempat": "Jl. Anggrek 21 no. 18 AS 22 Kranggan Permai Bekasi",
      //   "city": "Kota Bekasi",
      //   "id_permohonan": "REQ-0000008214",
      //   "nama_lengkap": "Satriyo A*** Nu***",
      //   "nik": "3404********0006",
      //   "paket_obatvitamin": "Paket A - Vitamin Tanpa Konsultasi Dokter",
      //   "status": "DELIVERED",
      //   "delivery_info": {
      //     "airwaybill": "0233852100119075",
      //     "courier": "JNE",
      //     "track_url": "https://shipdeo.com/tracking-airwaybill?jne&0233852100119075"
      //   }
      // }
      this.$emit('update:isSearch', this.isSearch)
    }
  }
}
</script>

<style scoped>
.header-card {
  @apply p-5 m-4
  rounded-lg bg-white shadow-md
  content-center justify-between
}
.search-button {
  @apply mr-2 px-4 py-2 rounded-lg
  bg-brand-green text-white
  justify-center items-center
}
.icon-search {
  @apply absolute inset-y-0 left-0 pl-3
  flex items-center pointer-events-none
}
</style>
