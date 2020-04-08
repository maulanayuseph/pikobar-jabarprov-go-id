<template>
  <div>
    <div class="md:flex flex-row justify-start items-start">
      <section class="md:w-2/3 flex-shrink flex-grow-0 mr-6">
        <header>
          <figcaption
            v-show="newsChannel && newsChannelIcon"
            class="flex flex-row items-center mb-4"
          >
            <img
              :src="newsChannelIcon"
              class="mr-2 p-1 box-content w-4 h-4 object-contain object-center rounded-full border border-solid border-gray-300"
            >
            <caption class="opacity-50 hover:underline">
              <a :href="to" target="_blank">
                {{ newsChannel }}
              </a>
            </caption>
          </figcaption>
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
        <div class="html-content html-content--preview flex-1" v-html="truncatedContent" />
        <br>
        <a
          class="md:mt-4 text-brand-blue hover:text-brand-blue-lighter font-bold"
          :href="to"
          target="_blank"
        >
          <span class="mr-2 align-middle">
            Baca Selanjutnya
          </span>
        </a>
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
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    image: {
      type: String,
      default: null
    },
    category: {
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
    },
    newsChannel: {
      type: String,
      default: ''
    },
    newsChannelIcon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
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
