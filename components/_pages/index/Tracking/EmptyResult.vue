<template>
  <div class="container mx-auto">
    <div class=" md:m-8 md:p-8 result-card">
      <img src="~assets/tracking-not-found.png" width="350px">
      <span class="text-2xl font-bold">
        Data Permohonan Tidak Ditemukan
      </span>
      <span>
        Maaf, Kami tidak dapat menemukan Data Permohonan yang Anda cari.
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      halo: null
    }
  }
}
</script>

<style scoped>
.result-card {
  @apply flex flex-col p-5 m-4
  rounded-lg bg-white shadow-md
  items-center
}
</style>
