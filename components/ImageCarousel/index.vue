<template>
  <client-only>
    <div>
      <template v-if="!isPending">
        <VueCarousel v-bind="carouselConfig">
          <VueCarouselSlide
            v-for="(item, index) in carouselItems"
            :key="index"
            :class="['banner-slide', item.action_url && 'cursor-pointer']"
            @slide-click="onItemClick(item)"
          >
            <img role="main" :src="item.url">
          </VueCarouselSlide>
        </VueCarousel>
      </template>
      <template v-else>
        <slot name="pending">
          <div class="bg-white p-8 rounded-lg">
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
  name: 'ImageCarousel',
  components: {
    ContentLoader
  },
  props: {
    items: {
      type: [Array, Function, Promise],
      default: null
    }
  },
  data () {
    return {
      carouselConfig: {
        autoplay: true,
        autoplayTimeout: 4000,
        paginationEnabled: false,
        paginationColor: '#90a4ae',
        paginationActiveColor: '#00b0ff',
        paginationSize: 12,
        perPage: 1,
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
    onItemClick (item) {
      if (item.action_url) {
        window.open(item.action_url, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-slide {
  padding-top: (400% / 713);
  @apply relative flex flex-row justify-center items-center;

  > img[role="main"] {
    @apply absolute top-0 w-full h-full
    object-contain object-top;
  }
}

.banner-slide.cursor-pointer:hover {
  @apply opacity-50;
}
</style>

<style lang="scss">
.VueCarousel,
.VueCarousel-wrapper,
.VueCarousel-inner {
  height: 100% !important;
}
</style>
