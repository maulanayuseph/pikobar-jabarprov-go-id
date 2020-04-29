<template>
  <table class="w-full text-left">
    <thead>
      <tr>
        <th
          v-for="col in columns"
          :key="col.prop"
          class="bg-gray-300 uppercase text-gray-600 text-sm px-4 py-2 border-t-2 border-b-2 border-solid border-gray-400"
        >
          <b>
            {{ col.label }}
          </b>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="tabelData && tabelData.length">
        <tr v-for="(row, rowIndex) in tabelData" :key="rowIndex">
          <td
            v-for="(col, colIndex) in columns"
            :key="col.prop"
            class="px-4 py-2 text-gray-800 border-b-2 border-solid border-gray-300"
          >
            {{ getCellValue(col, row, colIndex, rowIndex) }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      columns: [
        {
          prop: 'matg_id',
          label: 'Jenis Logistik'
        },
        {
          prop: 'donatur_name',
          label: 'Donatur'
        },
        {
          prop: 'material_desc',
          label: 'Jumlah Diterima'
        },
        {
          prop: 'uom',
          label: 'Satuan'
        }
      ],
      tabelData: new Array(10).fill(null).map((_, index) => {
        return {
          matg_id: 'Sarung Tangan Bedah',
          donatur_name: 'PT Kimia Farma',
          material_desc: '1340',
          uom: '50 pasang/box'
        }
      })
    }
  },
  methods: {
    getCellValue (column, row, columnIndex, rowIndex) {
      return row[column.prop]
    }
  }
}
</script>

<style>

</style>
