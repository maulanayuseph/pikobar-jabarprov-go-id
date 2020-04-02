<template>
  <div class="px-5 py-2">
    <p>
      <span class="mr-2">
        Radius:
      </span>
      <button
        v-for="(r, index) in options.radius"
        :key="index"
        :class="['appearance-none inline-block text-sm cursor-pointer p-2 mr-2 mb-2 rounded-md border border-solid', isRadiusOptionSelected(r.value) ? 'bg-brand-green hover:opacity-75 border-brand-green text-white font-bold' : 'border-gray-300 text-gray-800 hover:bg-gray-300 hover:opacity-75']"
        style="min-width: 4.5rem;"
        @click="onRadiusOptionSelected(r.value)"
      >
        {{ r.label }}
      </button>
    </p>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 5
    },
    options: {
      type: Object,
      default: () => ({
        radius: []
      })
    }
  },
  methods: {
    isRadiusOptionSelected (optionValue) {
      return optionValue === this.value
    },
    onRadiusOptionSelected (optionValue) {
      this.$emit('change', optionValue)
    }
  }
}
</script>

<style>

</style>
