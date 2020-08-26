<template>
  <div class="relative overflow-x-auto">
    <client-only>
      <Pagination
        :page-range="3"
        :page-count="totalPages"
        :initial-page="currentPage"
        :click-handler="onPaginationClick"
      />
    </client-only>
    <a
      v-if="this.$store.state.donate.selectedLogistics.length"
      href="#donate-now"
      class="btn-donate-action"
    >({{ this.$store.state.donate.selectedLogistics.length }}) Partisipasi Sekarang</a>
    <table class="mt-4 w-full text-left">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.prop"
            class="bg-gray-300 uppercase text-gray-600 text-sm px-4 py-2 border-t-2 border-b-2 border-solid border-gray-400"
          >
            <b>{{ col.label }}</b>
          </th>
          <th
            class="bg-gray-300 uppercase text-gray-600 text-sm px-4 py-2 border-t-2 border-b-2 border-solid border-gray-400"
          >
            <span>Aksi</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="isLoading">
          <tr v-for="j in perPage" :key="j">
            <th
              v-for="i in columns.length + 1"
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
        <template v-else-if="tableData.length">
          <tr
            v-for="(row, rowIndex) in tableData"
            v-show="row.matg_id !== 'CIMAHI' && row.matg_id !== 'CANCEL'"
            :key="rowIndex"
            :class="[areSelected(row.id)]"
            class="cursor-pointer"
            @click="selectRow(row)"
          >
            <td
              v-for="(col, colIndex) in columns"
              :key="col.prop"
              class="td-row px-4 py-2 text-gray-800 border-b-2 border-solid border-gray-300"
            >
              <input
                v-if="colIndex === 0"
                :checked="areSelected(row.id)"
                type="checkbox"
                class="inline-block mr-2 cursor-pointer"
              >
              {{ col.prop === 'sisa' ? $convertToLocalNumber(getCellValue(col, row, colIndex, rowIndex)) : getCellValue(col, row, colIndex, rowIndex) }}
            </td>
            <td class="td-row px-4 py-2 text-gray-800 border-b-2 border-solid border-gray-300">
              <button
                class="flex justify-center items-center px-3 py-1 bg-brand-blue text-white rounded"
                @click.stop.prevent="onViewSpec(row, rowIndex)"
              >
                <FontAwesomeIcon :icon="icons.faEye" class="mr-2" />
                <span>Spesifikasi</span>
              </button>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td :colspan="columns.length">
              <div class="p-4">
                Data Tidak Tersedia
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <LogisticTableSpecPopup :is-active.sync="isShowingSpecPopup" :logistic="logisticSpecToShow"/>
  </div>
</template>

<script>
import { faEye, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'
import { ContentLoader } from 'vue-content-loader'
import { getLogistics } from '../../../api/donation'
let searchQueryTimeout = null

export default {
  components: {
    Pagination: () => import('../../Pagination'),
    LogisticTableSpecPopup: () => import('./LogisticTableSpecPopup'),
    ContentLoader
  },
  props: {
    tabSelected: {
      type: String,
      default: 'medic'
    }
  },
  data () {
    return {
      icons: {
        faEye,
        faSearch,
        faSort
      },
      searchInput: false,
      searchInputQuery: '',
      columns: [
        {
          prop: 'matg_id',
          label: 'Kebutuhan Logistik'
        },
        {
          prop: 'sisa',
          label: 'Jumlah Dibutuhkan'
        },
        {
          prop: 'unit',
          label: 'Satuan'
        }
      ],
      isLoading: true,
      tableData: [],
      tableSorting: 'matg_id:asc',
      perPage: 16,
      currentPage: 1,
      totalItems: 0,
      totalPages: 0,
      firstSnapshot: null,
      lastSnapshot: null,

      logisticSpecToShow: null,
      isShowingSpecPopup: false
    }
  },
  computed: {
    skipCount () {
      return (this.currentPage - 1) * this.perPage
    }
  },
  mounted () {
    this.$store.commit('donate/SET_SELECTED_LOGISTICS', [])
    this.getTableData()
    this.$watch('searchInput', (v) => {
      if (!v) {
        this.searchInputQuery = ''
      }
    })
  },
  methods: {
    triggerSearch () {
      if (searchQueryTimeout) {
        clearTimeout(searchQueryTimeout)
      }
      if (this.searchInputQuery.length > 2) {
        searchQueryTimeout = setTimeout(() => {
          this.currentPage = 1
          this.getTableData()
        }, 500)
      } else if (!this.searchInputQuery) {
        this.getTableData()
      }
    },
    getCellValue (column, row, columnIndex, rowIndex) {
      return row[column.prop]
    },
    getTableData (newPage = 1) {
      this.isLoading = true
      return getLogistics({
        newPage,
        currentPage: this.currentPage,
        perPage: this.perPage,
        firstSnapshot: this.firstSnapshot,
        lastSnapshot: this.lastSnapshot
      })
        .then(({ total, data, first, last }) => {
          this.currentPage = newPage
          this.firstSnapshot = first
          this.lastSnapshot = last
          this.totalItems = total || data.length
          this.totalPages = Math.ceil(this.totalItems / this.perPage)
          this.tableData = data
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    onPaginationClick (page) {
      this.getTableData(page)
    },
    areSelected (rid) {
      return this.$store.state.donate.selectedLogistics.find(
        result => result.id === rid
      )
        ? 'checked'
        : ''
    },
    selectRow (row) {
      const foundRow = this.$store.state.donate.selectedLogistics.find(
        result => result.id === row.id
      )
      if (!foundRow) {
        this.$store.commit(
          'donate/ADD_SELECTED_LOGISTIC',
          Object.assign({ quantity: 10 }, row)
        )
      } else {
        this.$store.commit('donate/REMOVE_SELECTED_LOGISTIC', foundRow)
      }
    },
    onViewSpec (row, rowIndex) {
      this.isShowingSpecPopup = true
      this.logisticSpecToShow = row
    }
  }
}
</script>

<style lang="scss" scoped>
.input-text {
  @apply min-w-0 px-2 py-0 rounded outline-none
    border border-solid border-gray-300;
}
tr {
  &.checked {
    background: #f3fcf2;
  }
  &:hover {
    background: #f0f0f0;
  }
}
.btn-donate-action {
  @apply absolute bg-brand-green text-white rounded-lg px-6 py-2;
  top: 0px;
  right: 0px;
  @media (max-width: 768px) {
    @apply relative block w-full mt-4 text-center;
  }
}
</style>
