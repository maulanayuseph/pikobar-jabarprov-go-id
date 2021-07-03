<template>
  <div
    :class="{
      'exp-content': true,
      'exp-content--open': mOpen,
    }"
  >
    <h3 class="exp-content__header">
      <strong>
        <slot name="title" />
      </strong>
      <svg
        id="Capa_1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 256 256"
        class="exp-content__trigger"
        style="enable-background:new 0 0 256 256;"
        xml:space="preserve"
        @click="toggle"
      >
        <g>
          <g>
            <polygon points="225.813,48.907 128,146.72 30.187,48.907 0,79.093 128,207.093 256,79.093" />
          </g>
        </g>
      </svg>
    </h3>
    <div
      v-show="mOpen"
      class="exp-content__body"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean
    }
  },
  data: () => ({
    mOpen: false
  }),
  watch: {
    open: {
      immediate: true,
      handler (v) {
        this.mOpen = !!v
      }
    }
  },
  methods: {
    toggle () {
      this.mOpen = !this.mOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.exp-content {
  @apply border border-solid border-gray-300
  rounded-md;

  & + & {
    @apply mt-4;

    @screen lg {
      @apply mt-6;
    }
  }

  &--open & {
    &__header {
      @apply border-b border-solid border-gray-300;
    }
    &__trigger {
      transform: rotate(180deg);
    }
  }

  &__header {
    @apply flex justify-between items-center
    px-6 py-4
    text-xl
  }

  &__trigger {
    transition: transform 0.15s ease-out;
    @apply flex-none w-4 h-4 ml-8
    text-green-500
    cursor-pointer
    fill-current;
  }

  &__body {
    @apply p-6;
  }
}
</style>
