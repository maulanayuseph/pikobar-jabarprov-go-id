<template>
  <div>
    <ul
      class="overflow-y-hidden overflow-x-hidden flex flex-row flex-no-wrap items-stretch border-b-2 border-solid border-gray-300"
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
    <component :is="null" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabs: [
        {
          id: 'stat',
          title: 'Statistik'
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
  }
}
</script>

<style>

</style>
