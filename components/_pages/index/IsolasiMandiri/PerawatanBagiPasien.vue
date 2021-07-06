<template>
  <div>
    <p class="text-gray-800">
      Seiring meningkatnya kasus Covid-19 di Jawa Barat, Pemerintah Daerah Provinsi
      Jawa Barat berupaya mengendalikan angka keterisian tempat tidur (<em>Bed Occupancy Rate</em>/BOR)
      Rumah Sakit dengan melakukan manajemen distribusi perawatan pasien Covid-19.
      Berikut adalah anjuran perawatan pasien Covid-19 di Jawa Barat yang dikategorikan
      berdasarkan gejala yang dialami oleh pasien Covid-19:
    </p>
    <br>
    <h4 class="text-center text-lg mt-2">
      <strong>Anjuran tempat perawatan pasien Covid-19 berdasarkan gejalanya</strong>
    </h4>
    <br>
    <AnjuranTempatPerawatan />
    <br>
    <p class="text-right text-sm text-gray-600">
      Sumber: Kementerian Kesehatan RI
    </p>
  </div>
</template>

<script>
import AnjuranTempatPerawatan from './AnjuranTempatPerawatan'
export default {
  components: {
    AnjuranTempatPerawatan
  }
}
</script>

<style>

</style>
