<template>
  <div>
    <div
      class="w-full pt-0 p-5"
      style="min-height: 300px;"
      :class="!isLoading?'hidden':''"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="110"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="100"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div class="my-custom-scrollbar" :class="isLoading?'hidden':''">
      <table class="table w-full border-t border-solid border-gray-300 tableFixHead">
        <thead class="select-none">
          <tr>
            <th rowspan="2" class="px-2 py-1 hover:opacity-75" style="background-color: #EBEBEB; color: #5F5F5F; text-align: left; padding-left:20px;width: 19%" @click="onClickSort('region')">
              Nama Kota / Kabupaten
              <font-awesome-icon :icon="getSortIcon('region')" />
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #FF4A4B; color: #ffffff;">
              Positif Aktif
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #03B167; color: #ffffff;">
              Sembuh
            </th>
            <th colspan="3" class="px-2 py-1 hover:opacity-75" style="background-color: #B80000; color: #ffffff;">
              Meninggal
            </th>
          </tr>
          <tr>
            <th
              :key="0"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateNow }}
                  <font-awesome-icon :icon="getSortIcon('positiveNow')" />
                </span>
              </p>
            </th>
            <th
              :key="1"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('positiveAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="2"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#d93f40' || '', color: '#ffffff' || ''}"
              @click="onClickSort('positiveTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('positiveTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="3"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateNow }}
                  <font-awesome-icon :icon="getSortIcon('recoverNow')" />
                </span>
              </p>
            </th>
            <th
              :key="4"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('recoverAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="5"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#039658' || '', color: '#ffffff' || ''}"
              @click="onClickSort('recoverTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('recoverTotal')" />
                </span>
              </p>
            </th>
            <th
              :key="6"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 10%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieNow')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  {{ dateNow }}
                  <font-awesome-icon :icon="getSortIcon('dieNow')" />
                </span>
              </p>
            </th>
            <th
              :key="7"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieAverage')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  H-7
                  <font-awesome-icon :icon="getSortIcon('dieAverage')" />
                </span>
              </p>
            </th>
            <th
              :key="8"
              ref="tableHeaders"
              class="px-2 py-1 hover:opacity-75"
              style="padding-left: 0.5em !important; width: 9%;"
              :style="{backgroundColor: '#9c0000' || '', color: '#ffffff' || ''}"
              @click="onClickSort('dieTotal')"
            >
              <p class="pointer-events-none flex justify-between items-center" style="float: right;">
                <span>
                  Total
                  <font-awesome-icon :icon="getSortIcon('dieTotal')" />
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
              {{ row.positiveNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.positiveAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.positiveTotal }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.recoverTotal }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieNow }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieAverage }}
            </td>
            <td class="table-col border-b border-solid px-2 py-1 textright">
              {{ row.dieTotal }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import {
  faSort,
  faSortUp,
  faSortDown,
  faArrowRight,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import _orderBy from 'lodash/orderBy'
import moment from 'moment'

export default {
  name: 'ConfirmedCaseList',
  components: {
    ContentLoader
  },
  props: {
    activeRegionId: {
      type: String,
      default: '32'
    },
    activeRegionCategory: {
      type: String,
      default: '32'
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
        region: 'none',
        positiveNow: 'none',
        positiveAverage: 'none',
        positiveTotal: 'none',
        recoverNow: 'none',
        recoverAverage: 'none',
        recoverTotal: 'none',
        dieNow: 'none',
        dieAverage: 'none',
        dieTotal: 'none'
      },
      dataCase: [],
      dateNow: ''
    }
  },
  computed: {
    dataSebaranPertumbuhan () {
      return this.$store.getters['data-sebaran-pertumbuhan/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-pertumbuhan/isLoading']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) { // watch it
      // console.log('Prop changed: ', newVal, ' | was: ', oldVal)
      this.getDataSebaranPertumbuhan(this.activeRegionCategory, this.activeRegionId)
    },
    dataSebaranPertumbuhan (val) {
      let nameApiRegion = 'nama_kab'
      const dataCase = []

      if (this.activeRegionCategory === 'kelurahan') {
        nameApiRegion = 'nama_kel'
      } else if (this.activeRegionCategory === 'kecamatan') {
        nameApiRegion = 'nama_kec'
      } else {
        nameApiRegion = 'nama_kab'
      }

      val.forEach((element) => {
        // console.log(element)
        // console.log(nameApiRegion)
        dataCase.push({
          region: element[nameApiRegion],
          positiveNow: element.positif.positif_aktif_h1,
          positiveAverage: element.positif.positif_aktif_h7,
          positiveTotal: element.positif.positif_aktif,
          recoverNow: element.positif.positif_sembuh_h1,
          recoverAverage: element.positif.positif_sembuh_h7,
          recoverTotal: element.positif.positif_sembuh,
          dieNow: element.positif.positif_meninggal_h1,
          dieAverage: element.positif.positif_meninggal_h7,
          dieTotal: element.positif.positif_meninggal
        })
      })

      this.dataCase = dataCase
    }
  },
  created () {
    this.dateNow = moment(new Date()).lang('id').format('DD MMMM YYYY')
  },
  mounted () {
    this.getDataSebaranPertumbuhan(this.activeRegionCategory, this.activeRegionId)
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
    },

    // get data
    getDataSebaranPertumbuhan (region, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      switch (region) {
        case 'kecamatan' : {
          parentKeyCode = 'kode_kab'
          break
        }
        case 'kelurahan' : {
          parentKeyCode = 'kode_kec'
          break
        }
        default : parentKeyCode = ''
      }

      query += `&${parentKeyCode}=${regionCode}`

      this.$store.dispatch('data-sebaran-pertumbuhan/getItem', query)
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
