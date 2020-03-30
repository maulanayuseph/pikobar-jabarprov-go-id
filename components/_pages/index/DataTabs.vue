<template>
  <div>
    <ul
      class="flex flex-row flex-no-wrap items-stretch border-b-2 border-solid border-gray-300"
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
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          id: 'stat',
          title: 'Statistik',
          component: () => import('../../BarStatHarianAkumulatif')
        },
        {
          id: 'map-kota',
          title: 'Peta Kota',
          component: () => import('../../Tableau/PetaSebaranKotaKabupaten')
        },
        {
          id: 'map-kel',
          title: 'Peta Kelurahan',
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

<style>

</style>
