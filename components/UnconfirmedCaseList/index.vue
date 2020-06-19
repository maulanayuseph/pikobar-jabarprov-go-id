<template>
  <div>
    <div class="my-custom-scrollbar">
      <table class="table w-full border-t border-solid border-gray-300 tableFixHead">
        <thead class="select-none">
          <tr>
            <th rowspan="2" class="px-2 py-1 hover:opacity-75" style="background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;width: 19%" @click="onClickSort('region')">
              Nama Kota / Kabupaten
              <font-awesome-icon :icon="getSortIcon('region')" />
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #009edc; color: #ffffff;">
              ODP
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #fdc74a; color: #ffffff;">
              PDP
            </th>
          </tr>
          <tr>
            <th
              :key="0"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  18 Juni 2020
                  <font-awesome-icon :icon="getSortIcon('suspectNow')" />
                </span>
              </p>
            </th>
            <th
              :key="1"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('suspectAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="2"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#008ec6' || '', color: '#ffffff' || ''}"
              @click="onClickSort('suspectTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('suspectTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="3"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
              @click="onClickSort('probableNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  18 Juni 2020
                  <font-awesome-icon :icon="getSortIcon('probableNow')" />
                </span>
              </p>
            </th>
            <th
              :key="4"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
              @click="onClickSort('probableAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('probableAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="5"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#e3b342' || '', color: '#ffffff' || ''}"
              @click="onClickSort('probableTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('probableTotal')" />
                </span>
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in dataCase" :key="rowIndex">
            <td class="table-col border-b border-solid px-2 py-1">
              {{ row.region }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.suspectTotal }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.probableTotal }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  faSort,
  faSortUp,
  faSortDown,
  faArrowRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import _orderBy from 'lodash/orderBy'

export default {
  name: 'UnconfirmedCaseList',
  components: {
  },
  props: {
    propsDataSebaranJawaBarat: {
      type: Array,
      default: () => [{}]
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
      currentSorting: {
        suspectNow: 'none',
        suspectAverage: 'none',
        suspectTotal: 'none',
        probableNow: 'none',
        probableAverage: 'none',
        probableTotal: 'none'
      },
      dataCase: [
        {
          region: 'Kab. Bekasi',
          suspectNow: 113,
          suspectAverage: 10,
          suspectTotal: 100,
          probableNow: 8,
          probableAverage: 8,
          probableTotal: 30
        },
        {
          region: 'Kab. Bekasi',
          suspectNow: 1013,
          suspectAverage: 10,
          suspectTotal: 100,
          probableNow: 8,
          probableAverage: 8,
          probableTotal: 30
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    getSortIcon (field) {
      try {
        const sortingType = this.currentSorting[field]
        switch (sortingType) {
          case 'asc':
            return this.icon.faSortUp
          case 'desc':
            return this.icon.faSortDown
          case 'none':
          default:
            return this.icon.faSort
        }
      } catch (e) {
        return this.icon.faSort
      }
    },
    onClickSort (field) {
      const currentSorting = this.currentSorting
      let sorting = 'desc'
      if (this.currentSorting[field] === 'desc') {
        sorting = 'asc'
      }

      if (this.currentSorting[field] === 'asc') {
        sorting = 'desc'
      }
      Object.keys(currentSorting).forEach(function (key) {
        currentSorting[key] = 'none'
      })

      this.currentSorting[field] = sorting

      this.dataCase = _orderBy(
        this.dataCase,
        [field],
        [sorting]
      )
    }
  }
}
</script>
<style lang="scss" scoped>
  .table-col {
    border-color: rgba(0,0,0,0.1);
    padding-left: 1.5em !important;
  }

  .table {
    font-size: 14px;
    font-weight: 500;
  }

  thead tr:nth-child(1) th { position: sticky; top: 0; }
  thead tr:nth-child(2) th { position: sticky; top: 29px; }

  .textright {
    text-align: right;
  }

  .my-custom-scrollbar {
    position: relative;
    height: 365px;
    overflow-y: scroll;
  }
</style>
