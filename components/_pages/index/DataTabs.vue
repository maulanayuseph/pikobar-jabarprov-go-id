<template>
  <div>
    <ul
      class="flex flex-row flex-no-wrap items-stretch border-b-2 border-solid border-gray-300"
    >
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        ref="tabItems"
        :class="['relative cursor-pointer p-6 whitespace-no-wrap select-none hover:bg-gray-200', tab.id === activeTabId && 'border-b-4 border-solid border-brand-green']"
        style="transform: translateY(3px);"
        @click="activeTabId = tab.id"
      >
        <a :class="['text-lg', tab.id === activeTabId && 'font-bold text-brand-green']">
          {{ tab.title }}
        </a>
      </li>
    </ul>
    <br>
    <keep-alive :max="tabs.length">
      <component :is="tabComponent" />
    </keep-alive>
  </div>
</template>

<script>
import BarStatHarianAkumulatif from '~/components/BarStatHarianAkumulatif'
export default {
  data () {
    return {
      tabs: [
        {
          id: 'stat',
          title: 'Statistik',
          component: BarStatHarianAkumulatif
        },
        {
          id: 'map-kota',
          title: 'Peta Kota'
        },
        {
          id: 'map-kel',
          title: 'Peta Kelurahan'
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

<style>

</style>
