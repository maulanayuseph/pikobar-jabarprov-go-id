<template>
  <client-only>
    <div>
      <template v-if="!isPending">
        <VueCarousel ref="swiper" v-bind="carouselConfig">
          <VueCarouselSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            class="swiper-slide"
            :style="{'--swiper-height': height}"
            @slide-click="$router.push(getInfographicURL(item))"
          >
            <div>
              <img
                tag="img"
                :src="item.images[0]"
              >
              <br>
              <nuxt-link
                tag="a"
                class="text-lg"
                :to="getInfographicURL(item)"
              >
                <strong>{{ item.title }}</strong>
              </nuxt-link>
            </div>
          </VueCarouselSlide>
        </VueCarousel>
      </template>
      <template v-else>
        <slot name="pending">
          <div class="bg-white">
            <content-loader
              :speed="2"
              width="400"
              height="200"
            >
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width="100%"
                height="100%"
              />
            </content-loader>
          </div>
        </slot>
      </template>
    </div>
  </client-only>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'

export default {
  name: 'ImageSwiper',
  components: {
    ContentLoader
  },
  props: {
    items: {
      type: [Array, Function, Promise],
      default: null
    },
    height: {
      type: String,
      default: '256px'
    }
  },
  data () {
    return {
      carouselConfig: {
        autoplay: false,
        // autoplayTimeout: 4000,
        spacePadding: 0,
        paginationEnabled: false,
        paginationColor: '#90a4ae',
        paginationActiveColor: '#00b0ff',
        paginationSize: 12,
        perPage: 1.5,
        perPageCustom: [[800, 2.5], [1200, 3.5]],
        mouseDrag: true,
        loop: true
      },

      isPending: true,
      error: null,
      carouselItems: null
    }
  },
  watch: {
    items: {
      immediate: true,
      handler (v) {
        let promise
        if (Array.isArray(this.items)) {
          promise = Promise.resolve(this.items)
        } else if (typeof this.items === 'function') {
          promise = this.items()
        } else if (this.items instanceof Promise) {
          promise = this.items
        } else {
          promise = Promise.resolve([])
        }
        this.isPending = true
        this.error = null
        this.carouselItems = null
        promise
          .then((carouselItems) => {
            this.carouselItems = JSON.parse(JSON.stringify(carouselItems))
          }).catch((e) => {
            this.error = e
          }).finally(() => {
            this.isPending = false
          })
      }
    }
  },
  methods: {
    encodeURI (string) {
      return encodeURI(string)
    },
    getInfographicURL (item) {
      return item.route
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  width: auto;
  height: auto;
  margin-right: 1.5rem;
  @apply relative flex flex-row justify-center items-center;

  > div {
    @apply w-full h-full;

    > img {
      cursor: pointer;
      width: 100%;
      height: var(--swiper-height, 256px);
      border-radius: 0.75rem;
      @apply block w-full object-cover object-left-top;
    }

    > a {
      cursor: pointer;
      flex: 0 0 auto;

      &:hover {
        @apply underline;
      }
    }
  }
}
</style>

<style lang="scss">
// @screen sm {
//   .VueCarousel-wrapper {
//     @apply rounded-lg overflow-hidden shadow;
//   }
// }
// .VueCarousel-pagination {
//   background-color: transparent !important;
// }
// .VueCarousel-dot-container {
//   margin-top: 0 !important;
//   margin-bottom: 1rem !important;
// }
</style>
