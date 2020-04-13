<template>
  <client-only>
    <div class="relative overflow-hidden rounded-lg shadow-md mb-8">
      <div
        v-show="hasReadDisclaimer && showMap"
        :id="`vizContainer-${id}`"
        class="w-full"
        style="min-height: 25vh;"
      />
      <div
        v-show="!hasReadDisclaimer || !showMap"
        class="relative text-center text-white bg-black"
      >
        <img class="absolute z-0 w-full h-full pointer-events-none object-cover object-center opacity-50" src="https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Fjabar-map.jpg?alt=media&token=2f8c56e1-8fab-4192-8cf1-c1adb9e3afb9">
        <div
          class="relative block py-20 md:py-32 w-3/4 max-w-4xl mx-auto flex flex-col justify-center items-center"
          style="z-index: 1;"
        >
          <h4 class="text-lg md:text-xl">
            <strong>{{ title }}</strong><br>
            <small class="opacity-75">{{ subtitle }}</small>
          </h4>
          <br>
          <!-- eslint-disable-next-line -->
        <p class="text-base md:text-lg lg:text-xl" v-html="disclaimer">
          </p>
          <br>
          <br>
          <div
            :class="[hasReadDisclaimer ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none']"
            style="transition: opacity 0.5s ease-out;"
          >
            <slot name="action" v-bind="{renderTableau: renderTableauViz}" />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    disclaimer: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      hasReadDisclaimer: false,
      showMap: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.hasReadDisclaimer = true
      }, 3000)
    })
  },
  beforeDestroy () {
    if (this.viz && typeof this.viz.dispose === 'function') {
      this.viz.dispose()
    }
  },
  methods: {
    renderTableauViz () {
      this.showMap = false
      const placeholderDiv = document.getElementById(`vizContainer-${this.id}`)
      const options = {
        showTabs: false,
        hideToolbar: true,
        hideTabs: true
      }
      // eslint-disable-next-line
      this.viz = new tableau.Viz(placeholderDiv, this.url, options)
      this.showMap = true
    }
  }
}
</script>

<style lang="scss" scoped>
/* purgecss start ignore */
.vizOverlay {
  padding-top: 100%;
  background-color: rgba(0,0,0,0.75);
  backdrop-filter: blur(10px);
}
/* purgecss end ignore */
</style>
