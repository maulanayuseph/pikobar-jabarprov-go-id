<template>
  <div>
    <section class="bg-brand-green-darker">
      <div class="container mx-auto">
        <div class="mx-4 flex flex-wrap gap-8 py-8 justify-between">
          <div class="flex flex-col items-start justify-center">
            <h1 class="text-3xl font-semibold tracking-wider md:tracking-normal md:text-4xl md:font-bold leading-normal text-white">
              Informasi Vaksinasi Covid-19
            </h1>
            <p class="text-white text-lg tracking-wide">
              Pertanyaan dan berita terkini seputar vaksinasi.
            </p>
          </div>
          <img class="mx-auto md:mx-0" src="~/assets/illustrations/vaksin.svg" alt="illustrasi vaksin">
        </div>
      </div>
    </section>
    <div class="container mx-auto">
      <div class="m-4 p-5 rounded-lg bg-white shadow">
        <div v-if="contentVaksin.length > 0" class="flex flex-col gap-8">
          <div v-for="data of contentVaksin" :key="data.id">
            <h2 class="text-3xl md:text-2xl font-bold leading-normal text-gray-800">
              {{ data.title }}
            </h2>
            <p class="text-gray-700 text-lg md:text-base" v-html="data.content" />
            <span class="text-blue-500 italic underline">{{ data.source || '' }}</span>
          </div>
        </div>
        <content-loader
          v-else
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
        >
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="15%"
            height="10"
          />
          <rect
            x="0"
            y="12"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="22"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="32"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="42"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="52"
            rx="0"
            ry="0"
            width="25%"
            height="10"
          />
        </content-loader>
      </div>
    </div>
    <div class="container mx-auto">
      <div class="m-4 p-5 rounded-lg bg-white shadow grid grid-cols-2 gap-4">
        <div class="bg-gray-100 rounded-md col-span-2 md:col-span-1 grid grid-cols-2 p-4 gap-8">
          <img class="m-auto col-span-2 md:col-span-1" width="80%" src="~/assets/illustrations/chatbot.svg" alt="illutrasi chatbot">
          <div class="flex flex-col gap-6 justify-center items-start col-span-2 md:col-span-1">
            <h3 class="font-bold text-xl">
              Ada pertanyaan seputar vaksinasi? Hubungi hotline kami di sini
            </h3>
            <a href="https://api.whatsapp.com/send/?phone=6285697391854&text=Halo+Admin%21+Saya+ingin+tanya+seputar+Vaksinasi+Covid-19&app_absent=0" target="_blank" class="bg-brand-green-darker text-white text-lg px-6 py-2 rounded-lg focus:outline-none gap-3 flex flex-row items-center justify-between">
              <span>
                Chatbot Pikobar
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
        <div class="bg-gray-100 rounded-md col-span-2 md:col-span-1 grid grid-cols-2 p-4 gap-8">
          <img class="m-auto col-span-2 md:col-span-1" width="80%" src="~/assets/illustrations/faq.svg" alt="illustrasi faq">
          <div class="flex flex-col gap-6 justify-center items-start col-span-2 md:col-span-1">
            <h3 class="font-bold text-xl">
              Ingin mencari pertanyaan lain seputar vaksinasi? Cek di sini
            </h3>
            <button class="bg-brand-green-darker text-white text-lg px-6 py-2 rounded-lg focus:outline-none gap-3 flex flex-row items-center justify-between" @click="$router.push('/faq')">
              <span>
                Halaman FAQ
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
import { analytics } from '~/lib/firebase'
export default {
  components: {
    ContentLoader
  },
  computed: {
    contentVaksin () {
      return this.$store.state.vaksin.items
    }
  },
  mounted () {
    this.$store.dispatch('vaksin/getItems')
    analytics.logEvent('vaccinepage_view')
  },
  head () {
    const title = 'Informasi Vaksinasi Covid-19 - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>
