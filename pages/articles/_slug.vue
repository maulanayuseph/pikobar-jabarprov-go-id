<template>
  <div class="">
    <div class="container mx-auto lg:max-w-4xl">
      <div class="m-4 p-5 rounded-lg bg-white shadow">
        <template v-if="!isLoading && item">
          <div class="">
            <p class="text-2xl font-bold leading-normal">
              {{ item['title'] }}
            </p>
            <p class="text-base text-gray-700">
              {{ formatDateTimeShort(item['published_at']) }}
            </p>
          </div>
          <br>
          <img
            v-if="item.image"
            :src="item.image"
            class="block mb-8 rounded-lg shadow-lg"
          >
          <!-- eslint-disable-next-line -->
          <div 
            class="mt-5 html-content"
            v-html="formatContent(item['content'])"
          />
          <template v-if="item['action_url']">
            <div class="my-2">
              <a
                :href="item['action_url']"
                class="w-full text-center shadow block bg-brand-blue text-white font-bold py-2 px-4 rounded"
                @click.prevent="clickAction"
              >
                Baca Selengkapnya
              </a>
            </div>
          </template>
        </template>

        <template v-else>
          <content-loader
            :speed="2"
            primary-color="#f3f3f3"
            secondary-color="#ecebeb"
          >
            <rect
              x="0"
              y="15"
              rx="0"
              ry="0"
              width="100%"
              height="15"
            />
            <rect
              x="0"
              y="45"
              rx="0"
              ry="0"
              width="100%"
              height="75"
            />
          </content-loader>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { formatDateTimeShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'
import { useArticleMetaInfo } from '~/lib/metainfo'

const regex = /(?:(-artcl(\.|--)))(.*)$/
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
      isLoading: true
    }
  },

  computed: {
    itemId () {
      const id = this.$route.query && 'id' in this.$route.query ? this.$route.query.id : null
      if (id) {
        return id
      }
      const slug = this.$route.params.slug
      if (slug.includes('-artcl.') || slug.includes('-artcl--')) {
        const matched = regex.exec(slug)
        return matched && matched.length ? matched[3] : null
      } else {
        return slug
      }
    },
    item () {
      return this.$store.getters['news/itemsMap'][this.itemId]
    }
  },

  methods: {
    formatDateTimeShort,
    fetchItem () {
      this.isLoading = true
      return this.$store.dispatch('news/getItemById', this.itemId)
        .then(() => {
          if (process.client || process.browser) {
            analytics.logEvent('article_detail_view', { id: this.itemId })
          }
        }).finally(() => {
          this.isLoading = false
        })
    },
    formatContent (content) {
      return content
    },
    clickAction (e) {
      if (process.client || process.browser) {
        analytics.logEvent('article_detail_click_action', { id: this.$route.params.slug })
      }
      window.open(e.target.href, '_blank')
    }
  },
  head () {
    if (this.item) {
      const {
        title,
        published_at: publishedAt,
        image,
        route,
        news_channel: newsChannel
      } = this.item
      const date = publishedAt && typeof publishedAt.toISOString === 'function'
        ? publishedAt.toISOString()
        : ''
      return useArticleMetaInfo({
        author: newsChannel,
        title,
        publishedTime: date,
        image,
        url: `${process.env.URL}${route}`
      })
    }
  }
}
</script>
