<template>
  <div>
    <slot>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <ShareableItem
            class="px-5 md:px-8"
            v-bind="item"
          />
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  components: {
    ShareableItem: () => import('./ShareableItem')
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>
