<template>
  <div />
</template>

<script>
import { useArticleMetaInfo } from '~/lib/metainfo'
import { analytics } from '~/lib/firebase'

const regex = /(?:(-dcmnt\.))(.*)$/
export default {
  layout: 'blank',
  validate ({ redirect, params }) {
    const { slug } = params
    if (!slug || typeof slug !== 'string') {
      redirect('/info/documents')
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
  computed: {
    itemId () {
      const slug = this.$route.params.slug
      if (slug.includes('-dcmnt.')) {
        const matched = regex.exec(slug)
        return matched && matched.length ? matched[2] : null
      } else {
        return slug
      }
    },
    item () {
      return this.$store.getters['documents/itemsMap'][this.itemId]
    }
  },
  watch: {
    itemId: {
      immediate: true,
      handler (v) {
        if (v) {

        }
      }
    }
  },
  mounted () {
    this.fetchItem()
      .then(() => {
        window.open(this.item.document_url, '_self')
      })
  },
  methods: {
    fetchItem () {
      this.isPending = true
      return this.$store.dispatch('documents/getItemById', this.itemId)
        .then(() => {
          if (process.client || process.browser) {
            analytics.logEvent('document_detail_view', { id: this.$route.params.slug })
          }
        })
        .finally(() => {
          this.isPending = false
        })
    }
  },
  head () {
    if (this.item) {
      const { title, description, route, published_at: publishedAt } = this.item
      const date = publishedAt && typeof publishedAt.toISOString === 'function'
        ? publishedAt.toISOString()
        : ''
      return useArticleMetaInfo({
        title,
        description,
        publishedTime: date,
        url: `${process.env.URL}${route}`
      })
    }
  }
}
</script>

<style>

</style>
