<template>
  <div class="container mx-auto">
    <br>
    <div class="m-4 mb-4 md:m-8 md:mb-4">
      <div class="flex flex-col lg:flex-row lg:items-stretch">
        <div class="lg md:auto sm:w-auto">
          <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
            Peta Potensi dan Risiko Penularan Covid-19 di Jawa Barat
          </h3>
        </div>
      </div>
    </div>
    <div class="m-5 md:m-8 rounded-lg" style="height: 44rem;">
      <iframe src="https://potensi-risiko-penularan.digitalservice.id/" height="100%" width="100%" title="Iframe Example" />
    </div>
    <div class="logo ml-auto mr-5 md:mr-8 mt-3 flex bg-gray-200 p-3">
      <img src="/img/logo-plj.png">
      <img src="/img/logo-jds-full.png">
      <img src="/img/logo-bappenas.png">
      <img src="/img/logo-jabar.png">
    </div>
  </div>
</template>

<script>
export default {
  head () {
    const title =
      'Peta Potensi Penularan'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>
<style scoped>
.logo {
  width: 350px;
}
.logo img {
  height: 50px
}
</style>
