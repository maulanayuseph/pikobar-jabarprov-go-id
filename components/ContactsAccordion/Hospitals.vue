<template>
  <Accordion id="hospitalList">
    <template #header>
      <h2 class="text-2xl font-bold leading-tight">
        Daftar Rumah Sakit Rujukan
      </h2>
    </template>
    <template #description>
      <p class="mb-6 mt-2 text-base opacity-50 leading-tight">
        Berikut ini adalah rumah sakit yang menjadi rujukan untuk pasien dengan status Pasien dalam Pengawasan. Anda harus mengunjungi fasilitas kesehatan terdekat terlebih dahulu seperti klinik/rumah sakit umum sebelum akhirnya dapat dirujuk ke rumah sakit di bawah ini.
      </p>
    </template>
    <br>
    <template #content>
      <div>
        <ContactList :items="hospitals" />
      </div>
    </template>
  </Accordion>
</template>

<script>
import { mapState } from 'vuex'
import ContactList from '~/components/ContactList'
export default {
  components: {
    Accordion: () => import('./Accordion'),
    ContactList
  },
  computed: {
    ...mapState('hospitals', {
      hospitals: 'items'
    })
  }
}
</script>

<style>

</style>
