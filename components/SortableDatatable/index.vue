<template>
  <div>
    <header class="px-5 py-2">
      <div
        class="my-4 flex flex-row items-stretch flex-wrap"
      >
        <label class="inline-block font-bold text-gray-800 mr-4">
          {{ multipleSort ? 'Sorting Order' : 'Sort By' }} :
        </label>
        <template v-if="!sortingOrder.length">
          <b>
            -
          </b>
        </template>
        <template v-if="sortingOrder.length">
          <p
            v-for="(sort, index) in sortingOrder"
            :key="index"
            class="cursor-pointer select-none mb-3"
          >
            <span
              class="px-3 py-2 rounded-lg opacity-75 hover:opacity-100"
              :style="{backgroundColor: getColumnBackgroundColor(sort[0]), color: getColumnTextColor(sort[0])}"
            >
              <span @click="onClickTableHeader(sort[0])">
                {{ getColumnLabel(sort[0]) }}
              </span>
              <FontAwesomeIcon
                :icon="getSortIcon(sort[0])"
                class="ml-1"
                @click="onClickTableHeader(sort[0])"
              />
              <FontAwesomeIcon
                :icon="icon.faTimesCircle"
                class="cursor-pointer ml-3 mr-1 opacity-50 hover:opacity-100"
                @click="onRemoveSorting(sort[0])"
              />
            </span>
            <FontAwesomeIcon
              v-if="index < sortingOrder.length - 1"
              class="mx-2 text-sm text-gray-600"
              :icon="icon.faArrowRight"
            />
          </p>
        </template>
      </div>
    </header>
    <div class="my-custom-scrollbar">
      <table class="table w-full border-t border-solid border-gray-300">
        <thead class="select-none">
          <tr>
            <th
              v-for="(col, index) in data.columns"
              :key="index"
              ref="tableHeaders"
              class="cursor-pointer px-2 py-1 hover:opacity-75"
              :style="{backgroundColor: col.backgroundColor || '', color: col.textColor || ''}"
              @click.capture="onClickTableHeader(col.field)"
            >
              <p class="pointer-events-none flex justify-between items-center">
                <span>
                  {{ col.label }}
                </span>
                <FontAwesomeIcon
                  v-if="index > 0"
                  :icon="getSortIcon(col.field)"
                />
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!sortedRows || !sortedRows.length">
            <tr>
              <td :colspan="data.columns.length">
                <div
                  class="w-full p-5"
                  style="min-height: 300px;"
                >
                  <ContentLoader
                    class="w-full lg:hidden"
                    :speed="3"
                    :width="400"
                    :height="200"
                    primary-color="#eee"
                    secondary-color="#fff"
                  >
                    <rect
                      v-for="i in 6"
                      :key="i"
                      x="0"
                      :y="((i - 1) * 36)"
                      width="100%"
                      height="18"
                      rx="3"
                      ry="3"
                    />
                  </ContentLoader>
                  <ContentLoader
                    class="w-full hidden lg:block"
                    :speed="3"
                    :width="400"
                    :height="100"
                    primary-color="#eee"
                    secondary-color="#fff"
                  >
                    <rect
                      v-for="i in 6"
                      :key="i"
                      x="0"
                      :y="((i - 1) * 16)"
                      width="100%"
                      height="8"
                      rx="3"
                      ry="3"
                    />
                  </ContentLoader>
                </div>
              </td>
            </tr>
          </template>
          <template v-else-if="sortedRows && sortedRows.length">
            <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
              <td
                v-for="(col, colIndex) in data.columns"
                :key="colIndex"
                class="border-b border-solid px-2 py-1"
                style="border-color: rgba(0,0,0,0.1)"
              >
                {{ getCellValue({row, column: col, rowIndex, columnIndex: colIndex}) }}
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style >
  .my-custom-scrollbar {
    position: relative;
    height: 365px;
    overflow-y: scroll;
  }

  .table {
    font-size: 14px;
    font-weight: 500;
  }
</style>
<script>
import { ContentLoader } from 'vue-content-loader'
import _get from 'lodash/get'
import _orderBy from 'lodash/orderBy'

import {
  faSort,
  faSortUp,
  faSortDown,
  faArrowRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'SortableDatatable',
  components: {
    ContentLoader
  },
  props: {
    data: {
      type: Object,
      default: () => ({
        columns: [],
        rows: []
      })
    },
    multipleSort: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      icon: {
        faSort,
        faSortUp,
        faSortDown,
        faArrowRight,
        faTimesCircle
      },
      sortingTypes: ['none', 'up', 'down'],
      currentSorting: {},
      sortingOrder: [],
      sortedRows: []
    }
  },
  watch: {
    'data.rows': {
      immediate: true,
      deep: true,
      handler (arr) {
        if (Array.isArray(arr)) {
          this.sortedRows = JSON.parse(JSON.stringify(arr))
          _orderBy()
        }
      }
    },
    sortingOrder: {
      immediate: false,
      deep: true,
      handler (arr) {
        if (Array.isArray(arr) && arr.length) {
          const v = arr.filter(sort => sort[1] !== 'none')
          const orderedFields = v.map(sort => sort[0])
          const orderedSorting = v.map((sort) => {
            return sort[1] === 'up' ? 'asc' : 'desc'
          })
          this.sortedRows = _orderBy(
            this.sortedRows,
            orderedFields,
            orderedSorting
          )
        } else {
          this.sortedRows = JSON.parse(JSON.stringify(this.data.rows))
        }
      }
    }
  },
  created () {
    this.currentSorting = this.data.columns.reduce((obj, col) => {
      obj[col.field] = 'none'
      return obj
    }, {})
  },
  methods: {
    getSortIcon (field) {
      try {
        const sortingType = this.currentSorting[field]
        switch (sortingType) {
          case 'up':
            return this.icon.faSortUp
          case 'down':
            return this.icon.faSortDown
          case 'none':
          default:
            return this.icon.faSort
        }
      } catch (e) {
        return this.icon.faSort
      }
    },
    getCellValue ({ row, column, rowIndex, columnIndex }) {
      return _get(row, column.field)
    },
    getColumnLabel (field) {
      const col = this.data.columns.find(c => c.field === field)
      return col ? col.label : ''
    },
    getColumnBackgroundColor (field) {
      const col = this.data.columns.find(c => c.field === field)
      return col ? col.backgroundColor : '#aaa'
    },
    getColumnTextColor (field) {
      const col = this.data.columns.find(c => c.field === field)
      return col ? col.textColor : '#404040'
    },
    updateColumnSorting (field) {
      const currentSorting = this.currentSorting[field]
      const i = this.sortingTypes.indexOf(currentSorting)
      let newSorting
      if (i === this.sortingTypes.length - 1) {
        newSorting = this.sortingTypes[0]
      } else {
        newSorting = this.sortingTypes[i + 1]
      }
      this.$set(this.currentSorting, field, newSorting)
      return newSorting
    },
    upsertSorting (field, type) {
      let sort = this.sortingOrder.find(([columnField]) => {
        return columnField === field
      })
      if (!sort) {
        sort = [field, type]
        if (this.multipleSort) {
          this.sortingOrder.push(sort)
        } else {
          this.sortingOrder = [sort]
        }
      } else {
        this.$set(sort, 1, type)
      }
    },
    onRemoveSorting (field) {
      this.sortingOrder = this.sortingOrder.filter(([columnField]) => columnField !== field)
      this.$set(this.currentSorting, field, 'none')
    },
    onClickTableHeader (field) {
      const newSorting = this.updateColumnSorting(field)
      this.upsertSorting(field, newSorting)
    }
  }
}

</script>

<style lang="scss" scoped>
.my-custom-scrollbar {
    position: relative;
    height: 365px;
    overflow-y: scroll;
  }

.table {
  font-size: 14px;
  font-weight: 500;
}
</style>
