<template>
  <TableauViz
    :title="title"
    :subtitle="subtitle"
    :disclaimer="disclaimer"
    :url="url"
  >
    <template #action="{renderTableau}">
      <div class="flex justify-center items-center">
        <button
          class="px-10 py-4 rounded-lg bg-brand-green hover:bg-brand-green-lighter text-white"
          @click="renderTableau"
        >
          Mengerti
        </button>
      </div>
    </template>
  </TableauViz>
</template>

<script>
import TableauViz from './TableauViz'
export default {
  components: {
    TableauViz
  },
  data () {
    return {
      url: 'https://public.tableau.com/views/PetaSebaranODPPDP-BlueVersion/DashboardMapAllCases?:embed=y&:origin=viz_share_link&:toolbar=n&:embed_code_version=3&:loadOrderID=0&showTabs=false&:display_count=y',
      title: 'Silakan Baca Dahulu',
      disclaimer: `
      Perbesar peta untuk melihat jumlah titik akurat. Beberapa titik yang saling berdekatan terlihat menyatu pada pembesaran peta skala besar.
      <br><br>
      Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus.
      <br><br>
      Saat ini, data yang Pikobar tampilkan berasal dari sinkronisasi data dengan Dinas Kesehatan Kabupaten/Kota. Proses ini mungkin membutuhkan waktu 1-2 hari setiap perbaruan data terjadi. Oleh karena itu, untuk sementara Anda mungkin melihat perbedaan antara angka yang tampil di Pikobar dengan yang diumumkan di kabupaten/kota selama proses sinkronisasi berlangsung. Silakan periksa kembali 1-2 hari setelah perbaruan terakhir dari masing-masing kabupaten/kota.
      <br><br>
      Terima kasih dan mohon untuk dimaklumi.
      `
    }
  },
  computed: {
    lastUpdate () {
      return this.$store.getters['corona/lastUpdate']
    },
    subtitle () {
      return ''
    }
  }
}
</script>
