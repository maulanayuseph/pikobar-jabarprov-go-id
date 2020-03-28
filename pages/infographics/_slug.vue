<template>
  <div
    class="container sm:p-5 mx-auto"
  >
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <template v-if="isPending">
          <ContentLoader
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
          </ContentLoader>
        </template>
        <template v-else-if="item">
          <h2 class="text-xl font-bold leading-tight">
            {{ item.title }}
          </h2>
          <br>
          <img
            :src="item.images[0] || null"
            class="cursor-pointer w-full h-full object-contain object-center"
          >
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { analytics } from '~/lib/firebase'
import { useArticleMetaInfo } from '~/lib/metainfo'

const regex = /(?:(-inf\.))(.*)$/
export default {
  components: {
    ContentLoader
  },
  validate ({ redirect, params }) {
    const { slug } = params
    if (!slug || typeof slug !== 'string') {
      redirect('/articles')
      return
    }
    return true
  },
  async fetch () {
    await this.fetchItem()
  },
  data () {
    return {
      isPending: true
    }
  },
  computed: {
    itemId () {
      const slug = this.$route.params.slug
      if (slug.includes('-inf.')) {
        const matched = regex.exec(slug)
        return matched && matched.length ? matched[2] : null
      } else {
        return slug
      }
    },
    item () {
      return this.$store.getters['infographics/itemsMap'][this.itemId]
    }
  },
  methods: {
    fetchItem () {
      this.isPending = true
      return this.$store.dispatch('infographics/getItemById', this.itemId)
        .then(() => {
          if (process.client || process.browser) {
            analytics.logEvent('infographic_detail_view', { id: this.$route.params.slug })
          }
        })
        .finally(() => {
          this.isPending = false
        })
    }
  },
  head () {
    if (this.item) {
      const { title, route, published_at: publishedAt, images = [] } = this.item
      const date = publishedAt && typeof publishedAt.toISOString === 'function'
        ? publishedAt.toISOString()
        : ''
      return useArticleMetaInfo({
        title,
        publishedTime: date,
        url: `${process.env.URL}${route}`,
        image: images[0]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
