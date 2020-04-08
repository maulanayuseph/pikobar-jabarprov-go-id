<template>
  <div class="flex flex-row justify-start items-center">
    <a
      class="appearance-none inline-block w-12 h-12 mr-6 rounded-full
            flex flex-row justify-center items-center
            lg:shadow-lg border lg:border-none border-solid border-gray-300
            bg-brand-green hover:bg-brand-green-lighter"
      :title="`Lakukan panggilan ke ${title}`"
      :href="`tel:${number}`"
    >
      <FontAwesomeIcon
        class="text-xl text-white"
        :icon="icons.faPhone"
      />
    </a>
    <div>
      <label class="block text-base" v-text="title" />
      <small
        v-if="subtitle"
        class="block text-sm opacity-50"
        v-text="subtitle"
      />
      <a class="text-xl" :href="`tel:${number}`">
        {{ number }}
      </a>
    </div>
  </div>
</template>

<script>
import { faPhone } from '@fortawesome/free-solid-svg-icons'
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
    }
  },
  data () {
    return {
      icons: {
        faPhone
      }
    }
  }
}
</script>

<style>

</style>
