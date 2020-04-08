<template>
  <div
    class="container mx-auto"
  >
    <div class="m-4 md:m-8 p-5 bg-white rounded-lg shadow-md">
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
          <div class="flex flex-col justify-start items-start lg:flex-row lg:justify-between lg:items-center">
            <h2 class="text-xl font-bold leading-tight mb-3 lg:mb-0">
              {{ item.title }}
            </h2>
            <p class="flex-none text-sm text-gray-600">
              <button
                class="px-2 py-2 mr-1 rounded-md hover:bg-gray-300"
                @click="beforeDownload"
              >
                <FontAwesomeIcon :icon="icon.faDownload" class="mr-1" />
                <span>
                  Unduh
                </span>
              </button>
              <button
                class="px-2 py-2 rounded-md hover:bg-gray-300"
                @click="beforeShare"
              >
                <FontAwesomeIcon :icon="icon.faShare" class="mr-1" />
                <span>
                  Bagikan
                </span>
              </button>
            </p>
          </div>
          <br>
          <img
            :src="item.images[0] || null"
            class="cursor-pointer w-full lg:max-w-2xl mx-auto h-full object-contain object-center"
          >
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import { faDownload, faShare } from '@fortawesome/free-solid-svg-icons'
import { ContentLoader } from 'vue-content-loader'
import { onDownload, onShare } from '~/lib/download-and-share-firestore-doc'
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
      .then(() => {
        this.isPending = false
      })
  },
  data () {
    return {
      icon: {
        faDownload,
        faShare
      },
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
    },
    beforeShare () {
      onShare(this.item.shareText)
    },
    beforeDownload () {
      onDownload(this.item.downloadURL, this.item.title)
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
