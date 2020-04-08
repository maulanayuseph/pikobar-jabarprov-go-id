<template>
  <div
    class="call-card cursor-pointer px-4 p-5
    flex flex-row flex-wrap justify-start items-center
    rounded-lg
    lg:flex-col lg:flex-no-wrap lg:items-start lg:p-6 bg-white
    hover:bg-green-200
    lg:shadow-md
    border lg:border-none border-solid border-gray-300"
    @click.capture="onClick"
  >
    <div class="hidden sm:block lg:inline-flex lg:order-2 lg:w-full items-center text-green-500">
      <FontAwesomeIcon
        class="mr-3 text-2xl pointer-events-none lg:hidden xl:inline-block"
        :icon="icon.faPhoneAlt"
      />
      <label class="hidden text-xl lg:inline-block font-bold ml-2">
        {{ number }}
      </label>
    </div>
    <div class="pointer-events-none text-gray-900 lg:order-1 sm:ml-2 lg:ml-0 lg:mb-4">
      <label class="block text-base" v-text="title" />
      <small
        v-if="subtitle"
        class="block text-sm opacity-75"
        v-text="subtitle"
      />
      <label class="hidden sm:block lg:hidden text-xl lg:inline-block font-bold text-green-500">
        {{ number }}
      </label>
    </div>
    <label class="flex-none w-full sm:hidden text-xl font-bold text-green-500">
      {{ number }}
    </label>
  </div>
</template>

<script>
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    number: {
      type: String,
      required: true
    },
    logOnClick: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icon: {
        faPhoneAlt
      }
    }
  },
  methods: {
    onClick () {
      if ((process.client || process.browser) && this.logOnClick) {
        analytics.logEvent('click_call_action', {
          to: this.number
        })
      }
      window.open(`tel:${this.number}`, '_blank')
    }
  }
}
</script>

<style lang="scss">
@keyframes ripple {
  0%, 35% {
    transform: scale(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.3;
  }
  100% {
    opacity: 0;
    transform: scale(4);
  }
}

.call-card {
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    mix-blend-mode: screen;
    position: absolute;
    width: 4rem;
    height: 4rem;
    left: 0;
    background: rgba(51, 204, 84, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform-origin: 50% 50%;
    animation: ripple 1.2s ease-out infinite;
    animation-delay: 1s;
  }
}
</style>
