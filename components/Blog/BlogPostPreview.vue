<template>
  <div>
    <div class="md:flex flex-row justify-start items-start">
      <section class="md:w-2/3 flex-shrink flex-grow-0 mr-6">
        <header>
          <nuxt-link
            tag="a"
            :to="to"
            class="text-brand-green text-lg lg:text-2xl hover:underline"
          >
            <strong>{{ title }}</strong>
          </nuxt-link>
          <p class="text-base mt-2 opacity-75">
            {{ subtitle }}
          </p>
        </header>
        <p class="opacity-75">
          {{ date }}
        </p>
        <br>
        <!-- eslint-disable-next-line -->
        <div class="content flex-1" v-html="truncatedContent" />
      </section>
      <img
        v-if="image"
        class="hidden md:block w-1/3 self-stretch rounded-lg overflow-hidden object-cover object-center flex-none"
        :src="image"
      >
    </div>
  </div>
</template>

<script>
import _truncate from 'lodash/truncate'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '#'
    }
  },
  data () {
    return {
      icon: {
        faChevronRight
      }
    }
  },
  computed: {
    truncatedContent () {
      if (typeof this.content === 'string') {
        return _truncate(this.content, {
          length: 300
        })
      }
      return ''
    }
  }
}
</script>

<style>

</style>
