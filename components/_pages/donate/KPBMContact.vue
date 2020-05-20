<template>
  <div class="p-5 lg:p-8 md:-mx-4 flex flex-col md:flex-row md:items-center">
    <div class="mb-12 md:mb-0 md:mx-4 md:w-1/2">
      <img src="/donation-contact.svg" class="w-full h-56 object-contain object-center">
    </div>
    <div class="md:w-1/2 md:mx-4">
      <h5 class="text-left text-xl md:text-2xl mb-4 md:mb-8">
        <b>Kontak informasi terkait donasi</b>
      </h5>
      <div class="flex flex-row items-start">
        <span class="inline-block rounded-full w-8 h-8 mr-4 flex flex-row items-center justify-center bg-green-200">
          <FontAwesomeIcon :icon="icon.faPhoneAlt" class="text-green-500" />
        </span>
        <p>
          <b>Ani Widiani (0821-2159-0085)</b><br>
          <small class="opacity-75">
            Divisi Kemitraan dan Penggalangan Bantuan Masyarakat
          </small>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icon: {
        faPhoneAlt
      }
    }
  }
}
</script>

<style>

</style>
