<template>
  <div
    class="container sm:p-5 mx-auto"
  >
    <div class="p-5 bg-white border-solid border-gray-300">
      <section>
        <h2 class="text-xl font-bold leading-tight">
          Infografis Terkait COVID-19
        </h2>
        <br>
        <div class="infographic-list">
          <figure
            v-for="(item, index) in infographics"
            :key="index"
            class="w-full"
          >
            <img
              :src="item.images[0] || null"
              class="cursor-pointer infographic-list__item-image w-full object-cover object-left-top rounded-lg shadow-lg hover:opacity-75"
              @click.prevent="$router.push(item.route)"
            >
            <caption class="mt-4 text-left block w-full font-bold opacity-75 hover:underline">
              <nuxt-link :to="item.route">
                {{ item.title }}
              </nuxt-link>
            </caption>
          </figure>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { analytics } from '~/lib/firebase'
export default {
  data () {
    return {
      isPending: true
    }
  },
  computed: {
    ...mapState('infographics', {
      infographics: 'items'
    })
  },
  mounted () {
    this.isPending = true
    this.getItems({ perPage: 8, fresh: true })
      .finally(() => {
        if (process.browser) {
          analytics.logEvent('infographic_list_view')
        }
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('infographics', {
      getItems: 'getItems'
    })
  },
  head () {
    const title = 'Infografis - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.infographic-list {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1.5rem;
  row-gap: 3rem;

  &__item-image {
    height: 256px;
  }

  @screen md {
    grid-template-columns: 1fr 1fr;
  }

  @screen lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
