<template>
  <div>
    <div class="news-card container border-grey bg-white">
      <img class="news-content rounded-t-lg object-cover" :src="data.image">
      <div class="news-content p-4 flex flex-col justify-between items-start">
        <div class="news-source">
          {{ data.news_channel }}
        </div>
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
    formatDateLong
  }
}
</script>

<style lang="scss" scoped>
.news-card {
  max-width: 260px;
  min-width: 260px;
  height: 290px;
  @apply
  cursor-pointer
  rounded-lg flex flex-col;
}
.news-content {
  min-height: 145px;
}
.wrap-title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
