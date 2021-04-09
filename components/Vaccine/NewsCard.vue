<template>
  <div>
    <div class="news-card container border-grey">
      <img class="news-content rounded-t-lg object-cover" :src="data.image">
      <div class="news-content p-4 flex flex-col justify-between items-start">
        <div class="news-source">
          {{ data.source }}
        </div>
        <strong class="text-md">{{ title }}</strong>
        <div class="news-date">
          <strong>{{ data.date }}</strong>
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
  data () {
    return {
      maxLength: 40
    }
  },
  computed: {
    title () {
      if (this.data.title.length <= this.maxLength) { return this.data.title }
      return this.data.title.substr(0, this.data.title.lastIndexOf(' ', this.maxLength)) + ' ...'
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-card {
    max-width: 260px;
    height: 290px;
    @apply rounded-lg flex flex-col border-2 border-solid;
  }
  .news-content {
    min-height: 145px;
  }
</style>
