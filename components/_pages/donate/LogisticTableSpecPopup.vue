<template>
  <div :class="['logistic-table-spec-popup', isActive && 'is-active']" @click.self="onCloseOrCancel">
    <div v-if="logistic" class="logistic-table-spec-popup__content">
      <header>
        <h5 class="text-3xl">
          <b>{{ logistic.name }}</b>
        </h5>
        <span class="text-xl text-gray-700">
          Total Kebutuhan: <strong class="text-brand-green-dark">{{ logistic.amount }} {{ logistic.unit }}</strong>
        </span>
        <br>
        <br>
        <p>
          {{ logistic.spec }}
        </p>
      </header>
      <FontAwesomeIcon
        :icon="icon.faTimesCircle"
        size="lg"
        class="logistic-table-spec-popup__close-btn"
        @click.prevent.stop="onCloseOrCancel"
      />
    </div>
  </div>
</template>

<script>
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    logistic: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      icon: {
        faTimesCircle
      }
    }
  },
  methods: {
    onCloseOrCancel () {
      this.$emit('update:isActive', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.logistic-table-spec-popup {
  @apply hidden pointer-events-none
  fixed inset-0 z-50
  justify-center items-center;

  &.is-active {
    background-color: rgba(0,0,0,0.25);
    backdrop-filter: blur(4px);
    @apply pointer-events-auto
    flex;
  }

  &__content {
    min-width: 320px;
    max-width: 600px;
    width: 75vw;
    max-height: 600px;
    @apply z-50 relative
    p-4
    rounded-md
    bg-white
    shadow-xl;

    @screen md {
      @apply p-8;
    }
  }

  &__close-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
    @apply cursor-pointer;
  }
}
</style>
