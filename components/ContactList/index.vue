<template>
  <div class="">
    <ul class="list-none list-outside contact-list">
      <li
        v-for="(item, i) in items"
        :key="i"
      >
        <slot name="list-item" v-bind="item" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-list  {
  @apply block;

  @screen lg {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    row-gap: 1rem;
  }
}
</style>
