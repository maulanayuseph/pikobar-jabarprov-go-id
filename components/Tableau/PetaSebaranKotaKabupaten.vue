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
          Sudah Baca
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
      url: 'https://public.tableau.com/views/SISTEMPEMANTAUANCOVID-19JAWABARAT-BLACKVERSION/DashboardPikobar?:display_count=y&:toolbar=n&:origin=viz_share_link',
      title: 'Silakan Baca Dahulu',
      disclaimer: `Perbesar peta untuk melihat jumlah titik akurat. Beberapa titik yang saling berdekatan terlihat menyatu pada pembesaran peta skala besar.
      <br><br>Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus, data yang ditampilkan akan terus diperbarui sesuai dengan informasi yang diterima melalui Pemerintah Provinsi Jawa Barat.`
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
