<template>
  <div class="">
    <div class="bg-brand-green-dark">
      <div class="container mx-auto p-8 lg:p-16 text-white">
        <h2 class="text-2xl font-bold leading-tight">
          Kontak Rumah Sakit dan Call Center
        </h2>
        <p class="mb-6 mt-2 text-base opacity-75 leading-tight">
          Informasi dan nomor alamat rumah sakit yang menjadi rujukan pemeriksaan gejala COVID-19
        </p>
      </div>
    </div>
    <br>
    <div class="container mx-auto">
      <div class="m-4 md:m-8 p-4 md:p-8 bg-white border-solid border border-gray-400 rounded-lg">
        <section id="hospitalList">
          <h2 class="text-2xl font-bold leading-tight">
            Daftar Rumah Sakit Rujukan
          </h2>
          <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
            Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien dengan status Pasien dalam Pengawasan. Anda harus mengunjungi fasilitas kesehatan terdekat terlebih dahulu seperti klinik/rumah sakit umum sebelum akhirnya dapat dirujuk ke rumah sakit di bawah ini.
          </p>
          <br>
          <div>
            <ContactList :items="hospitals" />
          </div>
        </section>
      </div>
      <div class="m-4 md:m-8 p-4 md:p-8 bg-white border-solid border border-gray-400 rounded-lg">
        <section id="callCenterList">
          <h2 class="mb-6 text-2xl font-bold leading-tight">
            Hubungi Call Center
          </h2>
          <CallCenter />
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '~/components/ContactList'
import CallCenter from '~/components/CallCenter'
export default {
  components: {
    ContactList,
    CallCenter
  },
  computed: {
    ...mapState('hospitals', {
      hospitals: 'items'
    })
  },
  head () {
    const title = 'Kontak - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
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
</style>
