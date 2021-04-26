<template>
  <div>
    <div class="flex flex-row hoax-news justify-between items-stretch mb-8" @click="onClick">
      <div class="container hoax__image border-grey-50">
        <img :src="data.image">
      </div>
      <div class="container hoax__content">
        <span class="news-source">
          Jabar Saber Hoax
        </span>
        <strong class="text-md wrap-title">{{ data.title }}</strong>
        <div class="news-date">
          <strong>{{ formatDateLong(data.published_at) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDateIndonesia as formatDateLong } from '../../lib/date'
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    formatDateLong,
    onClick () {
      const backlink = this.data?.backlink
      if (typeof backlink === 'string' && backlink.startsWith('http')) {
        window.open(backlink, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hoax-news {
  @apply cursor-pointer;
}
.hoax {
  &__image {
    max-width: 100px;
    @apply flex flex-col rounded-lg p-1 mr-6 border-2 border-solid;
  }

  &__content {
    @apply flex flex-col justify-between items-start;
  }
}
.wrap-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
