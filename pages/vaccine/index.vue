<template>
  <!-- eslint-disable vue/html-closing-bracket-newline -->
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
          <img
            class="mx-auto md:mx-0"
            src="~/assets/illustrations/vaksin.svg"
            alt="illustrasi vaksin">
        </div>
      </div>
    </section>
    <div class="container mx-auto grid grid-cols-6">
      <div class="container mx-auto col-span-6 lg:col-span-4">
        <div class="m-4 p-5 rounded-lg bg-white shadow">
          <!-- Do not use v-if to prevent re-hydration on client renders -->
          <div
            v-show="contentVaksin.length > 0"
            class="flex flex-col gap-8">
            <div
              v-for="data of contentVaksin"
              :key="data.id"
            >
              <h2 class="text-3xl md:text-2xl font-bold leading-normal text-gray-800">
                {{ data.title }}
              </h2>
              <!-- eslint-disable vue/no-v-html -->
              <p
                class="text-gray-700 text-lg md:text-base vaccine-content"
                v-html="data.content"
              />
              <!-- eslint-enable vue/no-v-html -->
              <template v-if="data.source">
                <a
                  v-if="isExternalUrl(data.source)"
                  target="_blank"
                  :href="data.source"
                  class="text-blue-500 italic underline"
                >
                  Sumber: {{ data.source || '' }}
                </a>
                <span
                  v-else
                  class="text-blue-500"
                >
                  Sumber: {{ data.source || '' }}
                </span>
              </template>
            </div>
          </div>
          <!-- Do not use v-if to prevent re-hydration on client renders -->
          <content-loader
            v-show="contentVaksin.length === 0"
            :speed="2"
            primary-color="#f3f3f3"
            secondary-color="#ecebeb">
            <rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width="15%"
              height="10" />
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
      <div class="container mx-auto col-span-6 lg:col-span-2">
        <div class="m-4 p-5 rounded-lg bg-white shadow">
          <!-- Do not use v-if to prevent re-hydration on client renders -->
          <h3 class="text-lg lg:text-2xl mb-4">
            <strong>Anti Hoax</strong>
          </h3>
          <HoaxNews
            v-for="(item, index) in antiHoaxNews"
            :key="index"
            :data="item"
          />
          <!-- Do not use v-if to prevent re-hydration on client renders -->
          <content-loader
            v-show="contentVaksin.length === 0"
            :speed="2"
            primary-color="#f3f3f3"
            secondary-color="#ecebeb">
            <rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width="15%"
              height="10" />
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
          <div class="text-center md:self-center mb-2 xl:mt-8 py-2 rounded-lg border-grey-50 border-2 border-solid">
            <a
              target="_blank"
              class="px-4 py-2 font-bold text-lg text-gray-600 hover:text-gray-500"
              href="https://saberhoaks.jabarprov.go.id/v2/klarifikasi?key=vaksin"
            >
              Lihat Selengkapnya
              <FontAwesomeIcon class="ml-2" :icon="icon.faArrowRight" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-6 mb-12 py-6">
      <div class="container flex flex-row mx-auto items-end mb-4">
        <h3 class="text-lg lg:text-2xl ml-4 mr-8">
          <strong>Berita</strong>
        </h3>
        <nuxt-link to="/articles?tab=jabar">
          <strong class="text-green-700">Lihat Selengkapnya</strong>
        </nuxt-link>
      </div>
      <div>
        <CardSwiper
          :items="vaccineNews"
        />
      </div>
    </div>
    <div class="container mx-auto">
      <div class="m-4 p-5 rounded-lg bg-white shadow grid grid-cols-2 gap-4">
        <div class="bg-gray-100 rounded-md col-span-2 md:col-span-1 grid grid-cols-2 p-4 gap-8">
          <img
            class="m-auto col-span-2 md:col-span-1"
            width="80%"
            src="~/assets/illustrations/chatbot.svg"
            alt="illutrasi chatbot">
          <div class="flex flex-col gap-6 justify-center items-start col-span-2 md:col-span-1">
            <h3 class="font-bold text-xl">
              Ada pertanyaan seputar vaksinasi? Hubungi hotline kami di sini
            </h3>
            <a
              :href="whatsappBacklink"
              target="_blank"
              class="bg-brand-green-darker text-white text-lg px-6 py-2 rounded-lg focus:outline-none gap-3 flex flex-row items-center justify-between">
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
          <img
            class="m-auto col-span-2 md:col-span-1"
            width="80%"
            src="~/assets/illustrations/faq.svg"
            alt="illustrasi faq">
          <div class="flex flex-col gap-6 justify-center items-start col-span-2 md:col-span-1">
            <h3 class="font-bold text-xl">
              Ingin mencari pertanyaan lain seputar vaksinasi? Cek di sini
            </h3>
            <nuxt-link
              to="/faq"
              class="bg-brand-green-darker text-white text-lg px-6 py-2 rounded-lg focus:outline-none gap-3 flex flex-row items-center justify-between">
              <span>
                Halaman FAQ
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { ContentLoader } from 'vue-content-loader'
import { analytics } from '~/lib/firebase'
import HoaxNews from '~/components/Vaccine/HoaxNews.vue'
import CardSwiper from '~/components/CardSwiper/index.vue'

export default {
  components: {
    ContentLoader,
    HoaxNews,
    CardSwiper
  },
  async fetch () {
    await this.$store.dispatch('vaksin/getItems')
  },
  asyncData () {
    // param for whatsapp API is kept in env
    const number = process.env.NUXT_ENV_VACCINE_WHATSAPP_NUMBER
    const msg = process.env.NUXT_ENV_VACCINE_WHATSAPP_MSG

    // Encode URI programmatically instead of manually
    const encodedMsg = encodeURIComponent(msg)
    const whatsappBacklink = `https://api.whatsapp.com/send/?phone=${number}&text=${encodedMsg}&app_absent=0`
    return {
      whatsappBacklink
    }
  },
  data () {
    return {
      whatsappBacklink: '#',
      icon: {
        faArrowRight
      }
    }
  },
  computed: {
    ...mapState('vaccine-news', {
      vaccineNews: 'items'
    }),
    ...mapState('anti-hoax', {
      antiHoaxNews: 'items'
    }),
    contentVaksin () {
      return this.$store.state.vaksin.items
    }
  },
  created () {
    if (process.client || process.browser) {
      analytics.logEvent('vaccinepage_view')
    }
  },
  mounted () {
    this.$store.dispatch('anti-hoax/getItems')
    this.$store.dispatch('vaccine-news/getItems')
  },
  methods: {
    isExternalUrl (str) {
      return typeof str === 'string' && str.startsWith('http')
    }
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
<style lang="scss" scoped>
.pl-resp {
  @media (min-width: 1280px) {
    padding-left: 17vw;
  }
  @media (min-width: 768px) and (max-width: 1279px) {
    padding-left: 1.5vw;
  }
}
.scroll {
  scrollbar-color: rgba(255,0,0,0);
  scrollbar-width: thin;
}

.vaccine-content::v-deep {
  a {
    @apply text-blue-500 underline;
  }

  table {
    overflow-x: auto;
    display: block;
    border-top: 1px solid #eee !important;
    border-left: 1px solid #eee !important;

    td {
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 0 16px;
      vertical-align: top;
    }
  }
}
</style>
