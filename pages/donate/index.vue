
<template>
  <div class="container mx-auto">
    <section class="m-4 md:m-8">
      <div class="relative container-with-ratio rounded-lg overflow-hidden shadow-md">
        <ImageCarousel
          class="absolute inset-0 w-full h-full"
          :items="banners"
          :carousel-props="carouselProps"
        />
      </div>
      <h4 class="px-8 py-8 md:pt-16 md:pb-12 text-center text-xl md:text-3xl">
        <b>Ambil Bagianmu Sekarang!</b>
      </h4>
      <div class="action-buttons">
        <button class="action-button bg-brand-green-light">
          <span class="action-button__text">
            Bantu kebutuhan Non Tunai
          </span>
          <FontAwesomeIcon class="flex-none ml-3 text-2xl lg:text-4xl" :icon="icon.faArrowCircleRight" />
        </button>
        <button class="action-button bg-brand-blue-light">
          <span class="action-button__text">
            Bantu kebutuhan Tunai
          </span>
          <FontAwesomeIcon class="flex-none ml-3 text-2xl lg:text-4xl" :icon="icon.faArrowCircleRight" />
        </button>
      </div>
    </section>
    <section class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <h4 class="text-center text-xl md:text-3xl">
          <b>Logistik yang Terkumpul</b>
        </h4>
        <CollectedDonationTable class="mt-12" />
      </div>
    </section>
    <section class="m-4 md:m-8 rounded-lg border border-solid border-gray-300 bg-white">
      <div class="p-5 lg:p-8 md:-mx-4 flex flex-col md:flex-row md:items-center">
        <div class="mb-4 md:mb-0 md:mx-4 md:w-1/2">
          <img src="~/assets/banner-placeholder.jpg" class="w-full h-48 object-cover">
        </div>
        <div class="md:w-1/2 md:mx-4">
          <h5 class="text-left text-xl md:text-2xl mb-8">
            <b>Kontak informasi terkait donasi</b>
          </h5>
          <div class="flex flex-row items-start">
            <span class="inline-block rounded-full w-8 h-8 mr-4 flex flex-row items-center justify-center bg-green-200">
              <FontAwesomeIcon :icon="icon.faPhoneAlt" class="text-green-500" />
            </span>
            <p>
              <b>Ani Widiani (0821-2159-0085)</b><br>
              <small class="opacity-75">
                Divisi Kemitraan dan Penggalangan Bantuan Masyarakat
              </small>
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="m-4 md:m-8 rounded-lg border border-solid border-gray-300 bg-white">
      <div class="p-5 md:p-8">
        <h4 class="text-center text-xl md:text-3xl">
          <b>Thanks To</b>
        </h4>
        <div class="mt-8 max-w-4xl mx-auto flex flex-row flex-wrap justify-center items-center text-base">
          <a
            v-for="i in 5"
            :key="i"
            :href="'#'"
          >
            <img
              class="cursor-pointer hover:opacity-50 object-contain object-center w-32 mx-4 mb-8"
              :style="{ height: '5em'}"
              src="~/assets/logo-placeholder.png"
              alt=""
            >
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { faArrowCircleRight, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'
import ImageCarousel from '~/components/ImageCarousel'

export default {
  components: {
    ImageCarousel,
    CollectedDonationTable: () => import('../../components/_pages/donate/CollectedDonationTable')
  },
  data () {
    return {
      image: {
        // imagePlaceholder
      },
      icon: {
        faArrowCircleRight,
        faPhoneAlt
      },
      carouselProps: {
        paginationEnabled: true
      },
      banners: [
        {
          id: 0,
          sequence: 1,
          title: 'Banner 1',
          action_url: '#',
          url: require('../../assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        },
        {
          id: 1,
          sequence: 2,
          title: 'Banner 2',
          action_url: '#',
          url: require('../../assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        },
        {
          id: 2,
          sequence: 3,
          title: 'Banner 3',
          action_url: '#',
          url: require('../../assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('donate_view')
      }
    })
  }
}

</script>

<style lang="scss" scoped>
.container-with-ratio {
  padding-top: (500 * 100/ 900) * 1%;

  @screen lg {
    padding-top: (300 * 100/ 900) * 1%;
  }
}

.action-buttons {
  @apply flex flex-col;

  @screen lg {
    @apply -mx-4 flex-row flex-no-wrap items-stretch;
  }
}

.action-button {
  z-index: 1;
  @apply relative w-full px-8 py-10 my-2
  flex flex-row justify-between items-center
  rounded-lg text-white;

  @screen lg {
    &::before {
      content: '';
      border-radius: inherit;
      top: -1rem;
      left: -1rem;
      right: -1rem;
      bottom: -1rem;
      background-color: rgba(0,0,0,0.075);
      @apply absolute z-0 block opacity-0;
    }

    &:hover,
    &:focus {
      @apply outline-none;

      &::before {
        @apply opacity-100;
      }
    }

    &:active {
      opacity: 0.8;
    }
  }

  @screen lg {
    @apply flex-1 mx-4 my-0 py-16;
  }

  &__text {
    @apply inline-block flex-1 text-left text-xl font-bold;

    @screen lg {
      @apply text-3xl;
    }
  }
}
</style>
