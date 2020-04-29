<template>
  <div class="p-5 md:p-8">
    <h4 class="text-center text-xl md:text-3xl">
      <b>Thanks To</b>
    </h4>
    <div class="mt-8 max-w-4xl mx-auto flex flex-row flex-wrap justify-center items-center text-base">
      <a
        v-for="i in 5"
        :key="i"
        :href="'#'"
      >
        <img
          class="cursor-pointer hover:opacity-50 object-contain object-center w-32 mx-4 mb-8"
          :style="{ height: '5em'}"
          src="~/assets/logo-placeholder.png"
          alt=""
        >
      </a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
