<template>
  <div class="container mx-auto">
    <div class="container mx-4 p-5 max-w-3xl mx-auto">
      <br>
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
        Pertanyaan yang Sering Ditanyakan
      </h3>
      <br>
      <div class="flex flex-wrap justify-start items-stretch">
        <input
          v-model="searchString"
          list="faqList"
          class="w-full md:w-0 md:flex-1 inline-block p-4 mb-4 md:mr-0 min-w-0"
          type="text"
          placeholder="Cari pertanyaan di sini..."
          @keyup.enter="performFiltering"
        >
        <i class="flex-1 md:hidden" />
        <button
          class="flex-none inline-flex items-center justify-around mr-4 mb-4 md:mr-0 px-6 py-2 text-white bg-brand-blue hover:bg-brand-blue-lighter"
          @click="performFiltering"
        >
          <FontAwesomeIcon :icon="icon.faSearch" class="mr-4" />
          <span>
            Cari
          </span>
        </button>
        <button
          class="flex-none inline-flex items-center justify-around mr-4 mb-4 md:mr-0 px-6 py-2 text-gray-700 bg-gray-400 hover:bg-gray-500"
          @click="resetFilter"
        >
          <FontAwesomeIcon :icon="icon.faTimes" class="mr-4" />
          <span>
            Reset
          </span>
        </button>
      </div>
      <br>
      <div v-show="!filteredItems">
        <div
          v-for="i in 6"
          :key="i"
          class="mb-4 rounded-lg p-4 bg-white"
        >
          <ContentLoader
            :width="320"
            :height="16"
            :speed="3"
            primary-color="#eee"
            secondary-color="#fafafa"
          >
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx="4"
              ry="4"
            />
          </ContentLoader>
        </div>
      </div>
      <div v-show="filteredItems && filteredItems.length > 0">
        <ul class="faq-list my-4">
          <li
            v-for="(faq, index) in filteredItems"
            :key="index"
            class="faq-list__item mb-4 bg-white hover:bg-gray-200 rounded-lg shadow-lg"
          >
            <header
              class="cursor-pointer relative flex justify-start items-center p-4 pr-16 text-gray-900 text-lg font-bold clearfix"
              @click.capture="toggleItem(index)"
            >
              <span>
                {{ faq.title }}
              </span>
              <button
                class="appearance-none text-white absolute"
                style="right: 2rem;"
              >
                <FontAwesomeIcon :icon="isItemOpen(index) ? icon.faChevronUp : icon.faChevronDown" />
              </button>
            </header>
            <main
              v-show="isItemOpen(index)"
              class="html-content p-4 md:p-8 md:pt-4 text-base border-t border-solid border-gray-300"
              v-html="faq.content"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { ContentLoader } from 'vue-content-loader'
import { faChevronUp, faChevronDown, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    ContentLoader
  },
  async fetch () {
    await new Promise((resolve) => {
      this.getItems()
        .then(() => {
          this.performFiltering()
          resolve()
        })
    })
  },
  data () {
    return {
      openedItems: [],
      filteredItems: null,
      icon: {
        faChevronUp,
        faChevronDown,
        faSearch,
        faTimes
      },
      searchString: ''
    }
  },
  computed: {
    ...mapState('faqs', {
      items: 'items'
    })
  },
  watch: {
    items: {
      immediate: true,
      deep: true,
      handler (arr) {
        this.performFiltering()
      }
    }
  },
  mounted () {
    if (process.browser) {
      analytics.logEvent('faqs_view')
    }
  },
  methods: {
    ...mapActions('faqs', {
      getItems: 'getItems'
    }),
    isItemOpen (index) {
      return this.openedItems.includes(index)
    },
    openItem (index) {
      this.openedItems.push(index)
    },
    closeItem (index) {
      this.openedItems = this.openedItems.filter(x => x !== index)
    },
    toggleItem (index) {
      if (this.isItemOpen(index)) {
        this.closeItem(index)
      } else {
        this.openItem(index)
      }
    },
    performFiltering () {
      if (!this.items || !this.items.length) {
        this.filteredItems = []
        return
      }
      this.filteredItems = this.items.filter((faq) => {
        if (!this.searchString) {
          return true
        }
        return [faq.title, faq.content].some((str) => {
          return `${str}`.toLowerCase().includes(this.searchString.toLowerCase())
        })
      })
    },
    resetFilter () {
      this.searchString = ''
      this.performFiltering()
    }
  },
  head () {
    const title = 'FAQ - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
  counter-reset: faq-number 0;
  &__item {
    counter-increment: faq-number 1;
    > header::before {
      align-self: flex-start;
      content: counter(faq-number) '.';
      @apply mr-4;
    }
  }
}
</style>
