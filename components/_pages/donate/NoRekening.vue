<template>
  <div class="w-full md:w-1/2 mb-4">
    <div class="rounded border border-grey-100 px-4 py-2">
      <div>
        <img :src="logo" style="width: 50px;">
      </div>
      <div class="text-gray-600 text-xs">
        No Rekening
      </div>
      <div class="py-1">
        <span class="float-right text-green text-sm cursor-pointer mt-1" @click="copyRekening()">
          <FontAwesomeIcon class="inline-block mr-1 text-green-600" :icon="icons.faCopy" />
          SALIN
        </span>
        <span class="text-xl font-bold text-blank" ref="norekening">{{ nomor }}</span>
      </div>
      <div class="text-sm text-gray-700">
        an. {{ atasNama }}
      </div>
    </div>
  </div>
</template>

<script>
import { faCopy } from '@fortawesome/free-solid-svg-icons'
export default {
  props: {
    logo: {
      type: String,
      default: ''
    },
    nomor: {
      type: String,
      default: ''
    },
    atasNama: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      icons: {
        faCopy
      }
    }
  },
  methods: {
    copyRekening () {
      const element = this.$refs.norekening
      let range
      let selection
      if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
      } else if (window.getSelection) {
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      try {
        document.execCommand('copy')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
