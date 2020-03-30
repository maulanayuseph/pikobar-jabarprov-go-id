<template>
  <div class="container mx-auto">
    <div
      class="container m-4 px-5 max-w-3xl mx-auto"
    >
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none">
        Pesan
      </h3>
      <br>
    </div>
    <div>
      <template v-if="!isPending">
        <div class="px-5">
          <div
            v-for="item in notifications"
            :key="item.id"
            class="w-full bg-white hover:bg-gray-200 shadow-lg mb-4 p-5"
            style="border-radius: 0.8rem;"
          >
            <router-link :to="`/notifications/${item.id}`">
              <div class="flex">
                <div class="flex items-center block mx-auto mr-4">
                  <FontAwesomeIcon
                    :icon="icon.faEnvelope"
                    class="text-brand-green text-lg"
                  />
                </div>
                <div class="text-left flex-grow">
                  <p class="text-base leading-normal">
                    {{ item['title'] }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ formatDateTimeShort(item['published_at']) }}
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-for="n in 5" :key="n" class="bg-white shadow p-4">
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
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapState, mapActions } from 'vuex'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    ContentLoader
  },

  data () {
    return {
      isPending: true,
      icon: {
        faEnvelope
      }
    }
  },

  computed: {
    ...mapState('notifications', {
      notifications: 'items'
    })
  },
  mounted () {
    this.isPending = true
    this.getItems()
      .finally(() => {
        if (process.browser) {
          analytics.logEvent('messages_list_view')
        }
        this.isPending = false
      })
  },
  methods: {
    formatDateTimeShort,
    ...mapActions('notifications', {
      getItems: 'getItems'
    })
  }
}
</script>
