<template>
  <div class="container mx-auto p-5">
    <header class="flex flex-row justify-start md:justify-center items-center">
      <img
        class="w-20 mr-4 lg:mr-6 h-full object-contain object-center"
        src="/logo.jpg"
      >
      <h3 class="text-xl lg:text-2xl leading-none">
        <b>Pikobar</b>
        <br>
        <small class="opacity-75">
          Pusat Informasi dan Koordinasi COVID-19 Jawa Barat
        </small>
      </h3>
    </header>
    <section class="max-w-3xl mx-auto my-8 md:p-8 md:bg-white md:rounded-lg md:shadow-xl md:border md:border-solid md:border-gray-300">
      <div class="html-content" v-html="contentToUse" />
    </section>
  </div>
</template>

<script>
/* eslint-disable import/no-webpack-loader-syntax */
import contentForReactive from '!!html-loader!../../../assets/content/test-result/reactive.html'
import contentForNonReactive from '!!html-loader!../../../assets/content/test-result/non-reactive.html'
import contentFooter from '!!html-loader!../../../assets/content/test-result/footer.html'
import { useNoIndexMeta } from '~/lib/metainfo'

const PREFIX = {
  REACTIVE: 'r-',
  NON_REACTIVE: 'nr-'
}

export default {
  layout: 'blank',
  validate ({ params, redirect }) {
    const { id } = params
    if (!id || typeof id !== 'string') {
      redirect('/')
      return false
    }
    if (!id.startsWith(PREFIX.REACTIVE) && !id.startsWith(PREFIX.NON_REACTIVE)) {
      redirect('/')
      return false
    }
    return true
  },
  asyncData ({ params }) {
    const { id } = params
    const isReactive = id.startsWith(PREFIX.REACTIVE)
    const isNonReactive = id.startsWith(PREFIX.NON_REACTIVE)
    return {
      isReactive,
      isNonReactive
    }
  },
  data () {
    return {
      isReactive: false,
      isNonReactive: false,
      contentForReactive,
      contentForNonReactive,
      contentFooter
    }
  },
  computed: {
    contentToUse () {
      if (this.isReactive) {
        return this.contentForReactive.concat(contentFooter)
      }
      if (this.isNonReactive) {
        return this.contentForNonReactive.concat(contentFooter)
      }
      return ''
    }
  },
  head () {
    return useNoIndexMeta()
  }
}
</script>

<style lang="scss">
/* purgecss start ignore */
.temp-result-call-button {
  color: #404040 !important;
  @apply inline-block px-3 py-1 rounded-md border border-solid border-green-300 bg-green-100;

  &:hover {
    @apply opacity-50;
  }
}

.page-footer {
  @apply py-8 flex flex-row flex-wrap justify-start items-center;

  @screen md {
    @apply justify-center;
  }

  > img {
    @apply w-1/2 object-contain object-center;
    @screen md {
      @apply w-1/4;
    }
  }
}
/* purgecss end ignore */
</style>
