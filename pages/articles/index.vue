<template>
  <div class="relative lg:border-t border-solid border-gray-300" style="top: -2px;">
    <div class="bg-white border-b border-solid border-gray-300">
      <div class="mx-auto max-w-xl">
        <ul class="h-20 flex flex-row justify-center items-end">
          <li
            v-for="tab in tabs"
            :key="tab.id"
            class="flex-1 px-4"
          >
            <button
              :class="['relative w-full focus:outline-none', isTabActive(tab.id) && 'text-brand-green-light font-bold']"
              @click="currentTab = tab.id"
            >
              <span class="inline-block align-middle mb-4">
                <span class="hidden md:inline">Berita</span>&nbsp;{{ tab.label }}
              </span>
              <br>
              <i v-if="isTabActive(tab.id)" class="absolute bottom-0 block w-full h-1 bg-brand-green" />
            </button>
          </li>
        </ul>
      </div>
    </div>
    <br>
    <ArticleList v-show="currentTab === 'jabar'" key="jabar" />
    <LatestUpdateList
      v-show="isTabActive('national')"
      key="national"
      type="national"
    />
    <LatestUpdateList
      v-show="isTabActive('world')"
      key="world"
      type="world"
    />
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList'
import LatestUpdateList from '~/components/LatestUpdateList'
export default {
  components: {
    ArticleList,
    LatestUpdateList
  },
  data () {
    return {
      tabs: [
        {
          id: 'jabar',
          label: 'Jabar'
        },
        {
          id: 'national',
          label: 'Nasional'
        },
        {
          id: 'world',
          label: 'Dunia'
        }
      ]
    }
  },
  computed: {
    currentTab: {
      get () {
        return this.$route.query.tab || 'jabar'
      },
      set (tab) {
        if (tab === this.$route.query.tab) {
          return
        }
        this.$router.replace({
          path: this.$route.path,
          query: {
            tab
          }
        })
      }
    }
  },
  methods: {
    isTabActive (tab) {
      return this.currentTab && tab === this.currentTab
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!['world', 'national', 'jabar'].includes(to.query.tab)) {
      next({
        path: to.path,
        query: {
          tab: 'jabar'
        }
      })
    } else {
      next()
    }
  },
  head () {
    const title = 'Berita - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
.faq-list {
  &__item {
    > header::before {
      align-self: flex-start;
      content: '-';
      @apply mr-4;
    }
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.85);
    opacity: 1;
  }
  50% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    opacity: 0.4;
    transform: scale(1.2);
  }
}

.is-rippling {
  animation: ripple 0.75s ease-out infinite alternate;
}
</style>
