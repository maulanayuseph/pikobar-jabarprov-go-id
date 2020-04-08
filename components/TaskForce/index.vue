<template>
  <div>
    <div class="flex flex-row flex-wrap md:flex-no-wrap items-stretch rounded-none sm:rounded overflow-hidden">
      <input
        v-model="searchString"
        class="min-w-0 inline-block w-full flex-none sm:flex-1 bg-gray-200 p-4"
        placeholder="Cari kabupaten atau kota..."
        @keyup.enter="performFiltering"
      >
      <div class="flex-1 w-full mt-2 sm:mt-0 sm:flex-none sm:w-auto flex justify-end items-stretch">
        <button
          class="mr-2 sm:mr-0 px-4 py-2 bg-brand-blue hover:bg-brand-blue-lighter text-white flex justify-center items-center"
          @click="performFiltering"
        >
          <FontAwesomeIcon :icon="icon.faSearch" class="mr-2" />
          <span>
            Cari
          </span>
        </button>
        <button
          class="px-4 py-2 bg-gray-300 hover:bg-gray-200 text-gray-800 flex justify-center items-center"
          @click="onReset"
        >
          <FontAwesomeIcon :icon="icon.faTimes" class="mr-2" />
          <span>
            Reset
          </span>
        </button>
      </div>
    </div>
    <br>
    <table class="w-full">
      <thead class="hidden md:table-header-group">
        <tr class="bg-gray-300 flex flex-col flex-no wrap md:table-row text-left text-gray-600">
          <th class="hidden md:table-cell p-4 w-1/12 text-center">
            Kode
          </th>
          <th class="p-4">
            Kota/Kab
          </th>
          <th class="whitespace-no-wrap p-4">
            WEBSITE
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isPending || !filteredTaskForces">
          <tr v-for="i in 4" :key="i">
            <td colspan="3" class="pt-4" style="border: none !important; background: none !important;">
              <ContentLoader :speed="3" :height="16">
                <rect width="100%" height="100%" rx="2" ry="2" />
              </ContentLoader>
            </td>
          </tr>
        </template>
        <template v-else-if="!filteredTaskForces.length">
          <tr>
            <td colspan="3" class="py-4">
              <div class="w-full p-4 rounded-lg bg-gray-200 text-center">
                Data Tidak Tersedia
              </div>
            </td>
          </tr>
        </template>
        <template v-else-if="filteredTaskForces && filteredTaskForces.length">
          <tr
            v-for="(item, index) in filteredTaskForces"
            :key="index"
            class="relative flex flex-col flex-no wrap md:table-row pl-5 md:pl-0 mb-8 md:mb-0"
          >
            <td class="hidden md:table-cell text-center">
              {{ item.code }}
            </td>
            <td class="title-cell text-lg font-bold md:font-normal md:text-base md:p-2 text-left">
              {{ item.name }}
            </td>
            <td :class="['text-left md:table-cell', item.website ? '' : 'hidden']">
              <h6 class="md:hidden leading-loose opacity-50">
                Website:
              </h6>
              <p v-if="item.website">
                <a
                  class="text-sm inline-block px-4 py-1 bg-green-100 rounded mr-4 mb-4 md:m-1 text-gray-800 hover:opacity-50"
                  target="_blank"
                  :href="item.website"
                >
                  {{ item.website }}
                </a>
              </p>
              <span v-else class="m-4">-</span>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { mapActions } from 'vuex'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
export default {
  name: 'TaskForce',
  components: {
    ContentLoader
  },
  props: {
    count: {
      type: Number,
      default: 9999
    }
  },
  data () {
    return {
      isPending: true,
      searchString: '',
      icon: {
        faSearch,
        faTimes
      },
      filteredTaskForces: null
    }
  },
  computed: {
    taskForces () {
      return this.$store.state['task-forces'].items
    }
  },
  mounted () {
    this.isPending = true
    this.getItems()
      .then(() => {
        this.performFiltering()
      })
      .finally(() => {
        this.isPending = false
      })
  },
  methods: {
    ...mapActions('task-forces', {
      getItems: 'getItems'
    }),
    performFiltering () {
      if (!this.taskForces) {
        this.filteredTaskForces = null
      }
      if (!this.searchString) {
        this.filteredTaskForces = this.taskForces.filter((_, index) => index < this.count)
      }
      if (this.searchString) {
        this.filteredTaskForces = this.taskForces.filter((taskForce) => {
          return taskForce.name.toLowerCase().includes(this.searchString.toLowerCase())
        }).filter((_, index) => index < this.count)
      }
    },
    onReset () {
      this.searchString = ''
      this.performFiltering()
    }
  }
}
</script>

<style lang="scss" scoped>
  td {
    vertical-align: middle;
  }
  td:not(:last-child) {
    border-bottom: 0;
  }

  tbody tr:nth-child(even) td {
    @screen md {
      @apply bg-gray-200;
    }
  }

  tbody tr td {
    @screen md {
      @apply border-t-2 border-solid border-gray-300;
    }
  }

  .title-cell::before {
    content: '';
    @apply absolute top-0 left-0 bottom-0 block w-1 bg-orange-300;
    @screen md {
      @apply hidden;
    }
  }
</style>
