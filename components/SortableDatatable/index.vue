<template>
  <div>
    <header class="px-5 py-2">
      <div
        class="my-2 flex flex-row items-stretch flex-wrap"
      >
        <div class="md:w-1/2  mt-2">
          <button
            class="button-selector mr-1"
            :active="statCategory === 'Terkonfirmasi'"
            @click="enableTerkonfirmasi"
          >
            Terkonfirmasi
          </button>
          <button
            class="button-selector mr-1"
            :active="statCategory === 'ODP_PDP'"
            @click="enableODPPDP"
          >
            ODP dan PDP
          </button>
          <!-- <button
            class="button-selector mr-1"
            :active="statCategory === 'PDP'"
            @click="enablePDP"
          >
            PDP
          </button> -->
        </div>
        <div class="md:w-1/2 text-right mt-2">
          <label class="inline-block font-bold text-gray-800 mr-4">
            {{ multipleSort ? 'Sorting Order' : 'Urutkan' }} :
          </label>
          <select
            v-model="optionSelected"
            class="select-option-selector w-1/2"
            :style="{backgroundColor: getColumnBackgroundColor(optionSelected), color: getColumnTextColor(optionSelected)}"
            @change="onClickTableHeader($event.target.value)"
          >
            <option
              v-for="list in optionList"
              :key="list.id"
              :selected="optionSelected == list.col"
              :value="list.col"
            >
              {{ list.text }}
            </option>
          </select>
        </div>
      </div>
    </header>
    <div class="my-custom-scrollbar">
      <table class="table w-full border-t border-solid border-gray-300 tableFixHead">
        <thead class="select-none">
          <tr>
            <th rowspan="1" class="px-2 py-1 hover:opacity-75" style="background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;">
              Nama Kota / Kabupaten
            </th>
            <th v-if="statCategory === 'Terkonfirmasi'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #FF4A4B; color: #ffffff;">
              Positif Aktif
            </th>
            <th v-if="statCategory === 'Terkonfirmasi'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #03B167; color: #ffffff;">
              Sembuh
            </th>
            <th v-if="statCategory === 'Terkonfirmasi'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #B80000; color: #ffffff;">
              Meninggal
            </th>
            <th v-if="statCategory === 'ODP_PDP'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #009edc; color: #ffffff;">
              ODP
            </th>
            <!-- <th v-if="statCategory === 'ODP'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #4cbbe6; color: #ffffff;">
              ODP Selesai
            </th> -->
            <th v-if="statCategory === 'ODP_PDP'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #fdc74a; color: #ffffff;">
              PDP
            </th>
            <!-- <th v-if="statCategory === 'PDP'" colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #fdd780; color: #ffffff;">
              PDP Selesai
            </th> -->
          </tr>
          <tr>
            <template v-for="(col, index) in data2.columns">
              <template v-if="index === 0">
                <th
                  v-if="statCategory === col.category || 'kota' === col.category"
                  :key="index"
                  ref="tableHeaders"
                  class="px-2 py-1 hover:opacity-75"
                  style="padding-left: 1.5em !important; width: 19%;"
                  :style="{backgroundColor: col.backgroundColor || '', color: col.textColor || ''}"
                >
                  <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                    <span
                      v-if="index >= 1"
                      class="textright"
                    >
                      {{ col.label }}
                    </span>
                  </p>
                </th>
              </template>
              <template v-else>
                <template v-if="statCategory === col.category ">
                  <th
                    :key="index"
                    ref="tableHeaders"
                    class="px-2 py-1 hover:opacity-75"
                    style="padding-left: 1.5em !important; width: 9%;"
                    :style="{backgroundColor: col.backgroundColor || '', color: col.textColor || ''}"
                  >
                    <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                      <span
                        v-if="index >= 1"
                        class="textright"
                      >
                        {{ col.label }}
                      </span>
                    </p>
                  </th>
                </template>
                <template v-else-if="statCategory === col.category ">
                  <th
                    :key="index"
                    ref="tableHeaders"
                    class="px-2 py-1 hover:opacity-75"
                    style="padding-left: 1.5em !important; width: 13.5%;"
                    :style="{backgroundColor: col.backgroundColor || '', color: col.textColor || ''}"
                  >
                    <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                      <span
                        v-if="index >= 1"
                        class="textright"
                      >
                        {{ col.label }}
                      </span>
                    </p>
                  </th>
                </template>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-if="!sortedRows || !sortedRows.length">
            <tr>
              <td
                :colspan="data.columns.length"
              >
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
              <template v-for="(col, colIndex) in data.columns">
                <template v-if="colIndex == 0">
                  <td
                    :key="colIndex"
                    :class="{ textleft: colIndex==0 }"
                    class="border-b border-solid px-2 py-1 textright"
                    style="border-color: rgba(0,0,0,0.1); padding-left: 1.5em !important;"
                  >
                    {{ getCellValue({row, column: col, rowIndex, columnIndex: colIndex}) }}
                  </td>
                </template>
                <template v-if="statCategory === 'Terkonfirmasi' && colIndex >= 1 && colIndex <=9">
                  <td
                    :key="colIndex"
                    :class="{ textleft: colIndex==0 }"
                    class="border-b border-solid px-2 py-1 textright"
                    style="border-color: rgba(0,0,0,0.1); padding-left: 1.5em !important;"
                  >
                    {{ getCellValue({row, column: col, rowIndex, columnIndex: colIndex}) }}
                  </td>
                </template>
                <template v-if="statCategory === 'ODP_PDP' && colIndex >= 10 && colIndex <=15">
                  <td
                    :key="colIndex"
                    :class="{ textleft: colIndex==0 }"
                    class="border-b border-solid px-2 py-1 textright"
                    style="border-color: rgba(0,0,0,0.1); padding-left: 1.5em !important;"
                  >
                    {{ getCellValue({row, column: col, rowIndex, columnIndex: colIndex}) }}
                  </td>
                </template>
                <!-- <template v-if="statCategory === 'PDP' && colIndex >= 16 && colIndex <=21">
                  <td
                    :key="colIndex"
                    :class="{ textleft: colIndex==0 }"
                    class="border-b border-solid px-2 py-1 textright"
                    style="border-color: rgba(0,0,0,0.1); padding-left: 1.5em !important;"
                  >
                    {{ getCellValue({row, column: col, rowIndex, columnIndex: colIndex}) }}
                  </td>
                </template> -->
              </template>
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
    category: {
      type: String,
      default: 'Terkonfirmasi'
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
      sortedRows: [],
      optionList: [
        // { id: 1, col: 'no', text: 'No' },
        { id: 2, col: 'nama', text: 'Nama Kota / Kabupaten' },
        { id: 5, col: 'positif_aktif_total', text: 'Total Positif Aktif' },
        { id: 6, col: 'positif_sembuh_total', text: 'Total Positif Sembuh' },
        { id: 7, col: 'positif_meninggal_total', text: 'Total Positif Meninggal' }
      ],
      optionSelected: 'positif_aktif_total',
      statCategory: '',
      data2: {
        columns: []
      }
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
    'data.colomns': {
      immediate: true,
      deep: true,
      handler (arr) {
        this.data2.columns = this.data.columns
        // console.log(this.data2)
        // this.data2.columns = this.data2.columns.slice(1)
      }
    },
    category: {
      immediate: true,
      deep: true,
      handler (arr) {
        this.statCategory = this.category
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
    this.currentSorting.positif_aktif = 'down'
    this.sortingOrder.push(['positif_aktif', 'down'])
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
      if (columnIndex > 0) {
        return Number(_get(row, column.field)).toLocaleString('id-ID')
      } else {
        return _get(row, column.field)
      }
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
      // const newSorting = this.updateColumnSorting(field)
      let newSorting = 'down'
      if (field === 'nama') {
        newSorting = 'up'
      } else {
        newSorting = 'down'
      }
      this.upsertSorting(field, newSorting)
    },
    enableTerkonfirmasi () {
      this.statCategory = 'Terkonfirmasi'
      this.optionList = [
        // { id: 1, col: 'no', text: 'No' },
        { id: 2, col: 'nama', text: 'Nama Kota / Kabupaten' },
        { id: 5, col: 'positif_aktif_total', text: 'Total Positif Aktif' },
        { id: 6, col: 'positif_sembuh_total', text: 'Total Positif Sembuh' },
        { id: 7, col: 'positif_meninggal_total', text: 'Total Positif Meninggal' }
      ]
      this.optionSelected = 'positif_aktif_total'
      this.onClickTableHeader('positif_aktif_total')
    },
    enableODPPDP () {
      this.statCategory = 'ODP_PDP'
      this.optionList = [
        // { id: 1, col: 'no', text: 'No' },
        { id: 2, col: 'nama', text: 'Nama Kota / Kabupaten' },
        { id: 5, col: 'odp_total_total', text: 'Total ODP' },
        { id: 6, col: 'pdp_total_total', text: 'Total PDP' }
      ]
      this.optionSelected = 'odp_total_total'
      this.onClickTableHeader('odp_total_total')
    }
    // enablePDP () {
    //   this.statCategory = 'PDP'
    //   this.optionList = [
    //     // { id: 1, col: 'no', text: 'No' },
    //     { id: 2, col: 'nama', text: 'Nama Kota / Kabupaten' },
    //     { id: 5, col: 'pdp_proses_total', text: 'Proses PDP' },
    //     { id: 6, col: 'pdp_selesai_total', text: 'Selesai PDP' }
    //   ]
    //   this.optionSelected = 'pdp_total_total'
    //   this.onClickTableHeader('pdp_total_total')
    // }
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

.textcenter {
  margin: auto;
}
.textleft {
  text-align: left !important;
  margin: unset;
}
.textright {
  text-align: right;
}

.select-option-selector {
  border-radius: 0.4rem;
  // border-width: 1px;
  border-style: solid;
  border-color: #555;
  color: #555;
  background-color: #fff;
  height: 30px;
  width: 210px;
  left: 0;
  padding-left: 10px;
}

select option {
  background: #FFFFFF;
  color: #555;
}

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}

// .tableFixHead          { overflow-y: auto; height: 100px; }
// .tableFixHead thead th { position: sticky; top: 0; }

thead tr:nth-child(1) th { position: sticky; top: 0; }
thead tr:nth-child(2) th { position: sticky; top: 29px; }

</style>

<style lang="scss" scoped>
.button-selector {
  min-width: 100px !important;
  @apply px-3 py-1 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-white bg-brand-green;
  }
}
</style>
