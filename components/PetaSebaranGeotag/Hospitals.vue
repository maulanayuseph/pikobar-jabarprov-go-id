<template>
  <div class="rounded-lg border border-solid border-gray-300">
    <header class="p-5 ">
      <h5 class="text-base lg:text-lg">
        <b>Rumah Sakit Rujukan terdekat</b>
      </h5>
    </header>
    <div
      v-if="!data"
      class="p-5 text-center bg-gray-100"
    >
      <p class="opacity-50">
        Lokasi Tidak Ditemukan
      </p>
    </div>
    <template
      v-else-if="data"
    >
      <div class="p-5">
        <span class="mt-4">
          Radius:
        </span>
        <div class="">
        <!--  -->
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>
