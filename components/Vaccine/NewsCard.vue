<template>
  <div>
    <div class="news-card container border-grey bg-white">
      <img class="news-content rounded-t-lg object-cover" :src="data.image">
      <div class="news-content p-4 flex flex-col justify-between items-start">
        <div class="news-source">
          {{ data.news_channel }}
        </div>
        <strong class="text-md">{{ title }}</strong>
        <div class="news-date">
          <strong>{{ data.published_at }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  }
}
</script>

<style lang="scss" scoped>
// TODO: use css for line wrapping like news card
.news-card {
  max-width: 260px;
  min-width: 260px;
  height: 290px;
  @apply rounded-lg flex flex-col;
}
.news-content {
  min-height: 145px;
}
</style>
