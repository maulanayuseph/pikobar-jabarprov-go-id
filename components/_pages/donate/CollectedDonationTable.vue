<template>
  <div>
    <h4 class="text-center text-xl md:text-3xl">
      <b>Logistik yang Terkumpul</b>
    </h4>
    <div class="overflow-x-auto">
      <div class="mt-12">
        <client-only>
          <Pagination :page-range="3" :page-count="totalPages" :initial-page="currentPage" :click-handler="onPaginationClick" />
        </client-only>
        <table class="mt-4 w-full text-left">
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
            <template v-if="isLoading">
              <tr v-for="j in perPage" :key="j">
                <th
                  v-for="i in columns.length"
                  :key="i"
                  class="bg-white uppercase text-gray-600 text-sm px-4 py-2 border-t-2 border-b-2 border-solid border-gray-400"
                >
                  <ContentLoader
                    style="height: 1rem;"
                    primary-color="#eee"
                    secondary-color="#fafafa"
                    :width="240"
                    :height="32"
                  />
                </th>
              </tr>
            </template>
            <template v-else-if="data && !data.length">
              <tr>
                <td :colspan="columns.length">
                  <div class="p-4">
                    Data Tidak Tersedia
                  </div>
                </td>
              </tr>
            </template>
            <template v-else-if="data && data.length">
              <tr v-for="(row, rowIndex) in data" :key="rowIndex">
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
      </div>
    </div>
  </div>
</template>

<script>

import { ContentLoader } from 'vue-content-loader'
import { getCollectedDonations } from '../../../api/donation'
export default {
  components: {
    Pagination: () => import('../../Pagination'),
    ContentLoader
  },
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
      isLoading: true,
      data: null,
      perPage: 16,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0
    }
  },
  computed: {
    skipCount () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  mounted () {
    this.getTableData()
    this.$watch(
      'currentPage',
      function handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.getTableData()
        }
      },
      { immediate: false }
    )
  },
  methods: {
    getCellValue (column, row, columnIndex, rowIndex) {
      return row[column.prop]
    },
    getTableData () {
      this.isLoading = true
      return getCollectedDonations({
        params: {
          limit: this.perPage,
          skip: this.skipCount,
          sort: 'matg_id:asc'
        }
      }).then(({ total, data }) => {
        this.data = data
        this.totalItems = total
        this.totalPages = Math.ceil(total / this.perPage)
      }).finally(() => {
        this.isLoading = false
      })
    },
    onPaginationClick (page) {
      this.currentPage = page
    }
  }
}
</script>

<style>

</style>
