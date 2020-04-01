<template>
  <div>
    <div class="tab-container">
      <div class="relative md:hidden rounded-lg overflow-hidden border-2 border-solid border-brand-green">
        <i
          class="pointer-events-none block absolute top-0 right-0 bottom-0 p-5 text-xl text-brand-green bg-white border-l-2 border-solid border-brand-green"
        >
          <FontAwesomeIcon :icon="icon.faChevronDown" />
        </i>
        <select
          ref="dropdown"
          v-model="activeTabId"
          class="w-full p-5 bg-white text-2xl text-green-700 font-bold"
        >
          <option
            v-for="(tab, index) in tabs"
            :key="index"
            :value="tab.id"
            class="text-lg text-gray-900 font-normal"
          >
            {{ tab.title }}
          </option>
        </select>
      </div>
      <ul
        class="hidden md:flex flex-row flex-no-wrap items-stretch border-b-2 border-solid border-gray-300"
      >
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['relative cursor-pointer p-4 sm:p-6 whitespace-no-wrap select-none hover:bg-gray-200', tab.id === activeTabId && 'border-b-4 border-solid border-brand-green']"
          style="transform: translateY(3px);"
          @click="activeTabId = tab.id"
        >
          <a :class="['text-lg', tab.id === activeTabId && 'font-bold text-brand-green']">
            {{ tab.title }}
          </a>
        </li>
      </ul>
      <br>
      <component
        :is="tab.component"
        v-for="(tab, index) in tabs"
        v-show="tab.id === activeTabId"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faChevronDown
      },
      tabs: [
        {
          id: 'stat',
          title: 'Statistik',
          component: () => import('./DataSummary')
        },
        {
          id: 'map-kota',
          title: 'Peta Sebaran Kota/Kab',
          component: () => import('../../Tableau/PetaSebaranKotaKabupaten')
        },
        {
          id: 'map-kel',
          title: 'Peta Sebaran Kelurahan',
          component: () => import('../../Tableau/PetaPersebaranAllCases')
        }
      ],
      activeTabId: 'stat',
      currentX: null
    }
  },
  computed: {
    tabComponent () {
      if (!this.activeTabId) {
        return null
      }
      return this.tabs.find(tab => tab.id === this.activeTabId).component || null
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-container {
  //
}
</style>
