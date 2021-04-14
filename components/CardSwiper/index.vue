<template>
  <client-only>
    <div>
      <template v-if="!isPending">
        <VueCarousel
          ref="swiper"
          class="main-carousel"
          v-bind="carouselConfig"
        >
          <VueCarouselSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            class="mx-5 carousel-item"
            :style="{'--swiper-height': height}"
            @slide-click="onSlideClick(item)"
          >
            <NewsCard
              :data="item"
            />
          </VueCarouselSlide>
        </VueCarousel>
      </template>
      <template v-else>
        <slot name="pending">
          <div class="bg-white">
            <content-loader
              :speed="2"
              width="400"
              height="50"
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
import NewsCard from '../Vaccine/NewsCard.vue'

export default {
  name: 'CardSwiper',
  components: {
    ContentLoader,
    NewsCard
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
    onSlideClick (slide) {
      if (typeof slide.route === 'string' && slide.route.length) {
        this.$router.push(slide.route)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-slide {
  @apply relative flex flex-row gap-6 justify-center items-center;
}
.carousel-item {
  max-width: 260px;
}
</style>

<style lang="scss">
.main-carousel {
  .VueCarousel-inner{
    @screen sm {
      padding-left: calc((100vw - 640px)/ 2);
    }
    @screen md {
      padding-left: calc((100vw - 768px)/ 2);
    }
    @screen lg {
      padding-left: 0px;
    }
    @screen xl {
      padding-left: calc((100vw - 1280px)/ 2);
    }
  }
}
</style>
