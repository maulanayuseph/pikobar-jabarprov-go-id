<template>
  <div class="container mx-auto">
    <br>
    <header class="m-4 mb-8 md:m-8">
      <h3 class="text-3xl text-gray-900 font-bold text-left leading-none" style="margin-bottom: 10px; ">
        Data ODP PDP COVID-19 Jawa Barat (Public Version): DATA
      </h3>
    </header>

    <section class="m-4 mb-8 md:m-8">
      <div style="display: flow-root;">
        <div class="flex" style="float: right">
          <button
            class="button-selector m-1 w-full xl:w-auto "
            style="display: flex;"
            @click="downloadCSV"
          >
            <FontAwesomeIcon :icon="faDownload" style="margin-right: 5px; margin-top: 2px;" />
            Download CSV
          </button>
          <button
            class="button-selector m-1 w-full xl:w-auto "
            style="display: flex;"
            @click="downloadExcel"
          >
            <FontAwesomeIcon :icon="faDownload" style="margin-right: 5px; margin-top: 2px;" />
            Download Excel
          </button>
        </div>
      </div>
    </section>

    <section class="m-4 mb-8 md:m-8">
      <div class="table-wrapper-scroll-y table-wrapper-scroll-x my-custom-scrollbar">
        <data-table
          v-if="jsonDataRekapitulasiJabarHarianKab"
          :header-fields="headerFields"
          :sort-field="sortField"
          :sort="sort"
          :data="data || []"
          :is-loading="isLoading"
          :css="datatableCss"
          not-found-msg="Items not found"
          @on-update="dtUpdateSort"
        />
      </div>
      <div class="m-2 pb-10" style="display: flow-root">
        <!-- <div slot="ItemsPerPage" class="items-per-page"> -->
        <div class="items-per-page mr-4" style="float: left;">
          <items-per-page-dropdown
            :list-items-per-page="listItemsPerPage"
            :items-per-page="itemsPerPage"
            :css="itemsPerPageCss"
            @on-update="updateItemsPerPage"
          />
          <label>Baris Per Halaman</label>
        </div>
        <!-- <template v-slot:pagination> -->
        <div style="float: right;">
          <template>
            <pagination
              :page="currentPage"
              :total-items="totalItems"
              :items-per-page="itemsPerPage"
              :css="paginationCss"
              @on-update="changePage"
              @update-current-page="updateCurrentPage"
            />
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { formatDateTimeShort } from '~/lib/date'
import { analytics } from '~/lib/firebase'
import { DataTable, ItemsPerPageDropdown, Pagination  } from 'v-datatable-light'
import { orderBy } from "lodash.orderby";
import XLSX from 'xlsx'

const addZero = value => ("0" + value).slice(-2);
const formatDate = value => {
  if (value) {
    const d = new Date(value)
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
    return d.toLocaleString('id-ID', options)
  }
  return "";
};

export default {
  components: {
    DataTable,
    ItemsPerPageDropdown,
    Pagination
  },
  data () {
    return {
      faDownload,
      isLoading: true,
      jsonDataRekapitulasiJabarHarianKab: [],
      headerFields: [
        {
          name: "tanggal",
          label: "Tanggal",
          sortable: true,
          format: formatDate,
          // width: '80'
        },
        {
          name: "nama_kab",
          label: "Nama Kabupaten/Kota",
          sortable: true,
          // width: '200'
        },
        {
          name: "odp",
          label: "Jumlah Pemantauan (ODP)",
          sortable: true
        },
        {
          name: "odp_selesai",
          label: "Selesai Pemantauan",
          sortable: true
        },
        {
          name: "odp_proses",
          label: "Proses Pemantauan",
          sortable: true
        },
        {
          name: "pdp",
          label: "Jumlah Pengawasan (PDP)",
          sortable: true
        },
        {
          name: "pdp_selesai",
          label: "Selesai Pengawasan",
          sortable: true
        },
        {
          name: "pdp_proses",
          label: "Proses Pengawasan",
          sortable: true
        },
        {
          name: "positif",
          label: "Positif",
          sortable: true
        },
        {
          name: "sembuh",
          label: "Sembuh",
          sortable: true
        },
        {
          name: "meninggal",
          label: "Meninggal",
          sortable: true
        },
      ],
      data: [],
      datatableCss: {
        table: "table table-bordered table-hover table-striped table-center",
        theadTh: "header-item",
        thWrapper: "th-wrapper",
        thWrapperCheckboxes: "th-wrapper checkboxes",
        arrowsWrapper: "arrows-wrapper",
        arrowUp: "arrow up",
        arrowDown: "arrow down",
        footer: "footer"
      },
      paginationCss: {
        paginationItem: "pagination-item",
        moveFirstPage: "move-first-page",
        movePreviousPage: "move-previous-page",
        moveNextPage: "move-next-page",
        moveLastPage: "move-last-page",
        pageBtn: "page-btn"
      },
      itemsPerPageCss: {
        select: "item-per-page-dropdown"
      },
      sort: "asc",
      sortField: "tanggal",
      listItemsPerPage: [5, 10, 20, 50, 100],
      itemsPerPage: 50,
      currentPage: 1,
      totalItems: 0,
      hometown: null,
      createHeaderName: "created:header"
    }
  },
  created () {
    this.fetchDataRekapitulasiJabarHarianKab()
  },
  methods: {
    formatDateTimeShort,
    fetchDataRekapitulasiJabarHarianKab () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar/harian?level=kab')
        .then(function (response) {
          self.jsonDataRekapitulasiJabarHarianKab = response.data.data.content
          self.data = self.jsonDataRekapitulasiJabarHarianKab.slice(0, self.itemsPerPage)
          self.totalItems = self.jsonDataRekapitulasiJabarHarianKab.length
          self.isLoading = false
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    dtEditClick: props => alert("Click props:" + JSON.stringify(props)),

    dtUpdateSort: function({ sortField, sort }) {
      const sortedData = orderBy(this.jsonDataRekapitulasiJabarHarianKab, [sortField], [sort]);
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      this.data = sortedData.slice(start, end);
    },

    updateItemsPerPage: function(itemsPerPage) {
      this.itemsPerPage = parseInt(itemsPerPage);
      if (itemsPerPage >= this.jsonDataRekapitulasiJabarHarianKab.length) {
        this.data = this.jsonDataRekapitulasiJabarHarianKab;
      } else {
        this.data = this.jsonDataRekapitulasiJabarHarianKab.slice(0, itemsPerPage);
      }
    },

    changePage: function(currentPage) {
      this.currentPage = currentPage;
      const start = (currentPage - 1) * this.itemsPerPage;
      const end = currentPage * this.itemsPerPage;
      this.data = this.jsonDataRekapitulasiJabarHarianKab.slice(start, end);
    },

    updateCurrentPage: function(currentPage) {
      this.currentPage = currentPage;
    },

    changeHometown: function(event, id) {
      this.data = this.data.map(item =>
        item.id === id ? { ...item, hometown: event.target.value } : item
      );
    },

    actionFirstClick: params => {
      alert(JSON.stringify(params));
    },

    formatDate (date) {
      const d = new Date(date)
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
    },
    downloadCSV () {
      const col = ['tanggal','kode_prov','nama_prov','kode_kab','nama_kab','odp','odp_proses','odp_selesai','pdp','pdp_proses','pdp_selesai','positif','sembuh','meninggal']
      let csvString = '';
      col.forEach((row) => {
        csvString += row + ','
      })
      csvString += '\n'
      this.jsonDataRekapitulasiJabarHarianKab.forEach((obj) => {
        Object.keys(obj).forEach((key) => {
          csvString += obj[key] + ','
        })
        csvString += '\n';
      })

      let anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvString);
      anchor.target = '_blank';
      anchor.download = 'Data COVID-19 Jawa Barat.csv';
      anchor.click();
    },
    downloadExcel () {
      var harian = XLSX.utils.json_to_sheet(this.jsonDataRekapitulasiJabarHarianKab)
      var wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, harian, 'Data Harian')
      XLSX.writeFile(wb, 'Data COVID-19 Jawa Barat.xlsx')
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  @screen md {
    grid-template-columns: 2fr 4fr;
  }
}

.button-selector {
  @apply px-6 py-2 rounded-md border border-solid border-brand-green
  text-brand-green bg-white;

  &[active] {
    @apply text-brand-green bg-white;
  }
}
</style>

<style>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
}

.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #eceeef;
}

.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #eceeef;
}

.table tbody + tbody {
  border-top: 2px solid #eceeef;
}

.table .table {
  background-color: #fff;
}

.table-sm th,
.table-sm td {
  padding: 0.3rem;
}

.table-bordered {
  border: 1px solid #eceeef;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #eceeef;
}

.table-bordered thead th,
.table-bordered thead td {
  border-bottom-width: 2px;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-active,
.table-active > th,
.table-active > td {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-hover .table-active:hover > td,
.table-hover .table-active:hover > th {
  background-color: rgba(0, 0, 0, 0.075);
}

.table-success,
.table-success > th,
.table-success > td {
  background-color: #dff0d8;
}

.table-hover .table-success:hover {
  background-color: #d0e9c6;
}

.table-hover .table-success:hover > td,
.table-hover .table-success:hover > th {
  background-color: #d0e9c6;
}

.table-info,
.table-info > th,
.table-info > td {
  background-color: #d9edf7;
}

.table-hover .table-info:hover {
  background-color: #c4e3f3;
}

.table-hover .table-info:hover > td,
.table-hover .table-info:hover > th {
  background-color: #c4e3f3;
}

.table-warning,
.table-warning > th,
.table-warning > td {
  background-color: #fcf8e3;
}

.table-hover .table-warning:hover {
  background-color: #faf2cc;
}

.table-hover .table-warning:hover > td,
.table-hover .table-warning:hover > th {
  background-color: #faf2cc;
}

.table-danger,
.table-danger > th,
.table-danger > td {
  background-color: #f2dede;
}

.table-hover .table-danger:hover {
  background-color: #ebcccc;
}

.table-hover .table-danger:hover > td,
.table-hover .table-danger:hover > th {
  background-color: #ebcccc;
}

.thead-inverse th {
  color: #fff;
  background-color: #292b2c;
}

.thead-default th {
  color: #464a4c;
  background-color: #eceeef;
}

.table-inverse {
  color: #fff;
  background-color: #292b2c;
}

.table-inverse th,
.table-inverse td,
.table-inverse thead th {
  border-color: #fff;
}

.table-inverse.table-bordered {
  border: 0;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.table-responsive.table-bordered {
  border: 0;
}
</style>

<style>

.my-custom-scrollbar {
    position: relative;
    height: 500px;
    overflow-y: scroll;
  }
.table {
  table-layout: auto;
}
/* thead tr:nth-child(1) th { position: sticky; top: 0; background-color: white;}
tbody td:nth-child(1) { position: sticky; left: 0; background-color: white; }
head th:nth-child(1) { position: sticky; left: 0; top:0; background-color: white; } */

thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
}

tbody td:first-child {
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  background-color: white;
  width: 100px;
}

/* To have the header in the first column stick to the left: */
thead th:first-child {
  left: 0;
  z-index: 1;
  background-color: white;
}

/* Datatable CSS */
.v-datatable-light .header-item {
  cursor: pointer;
  color: #337ab7;
  transition: color 0.15s ease-in-out;
  vertical-align: top;
  font-size: smaller;
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
}

.v-datatable-light .header-item:hover {
  color: #ed9b19;
}

.v-datatable-light .header-item.no-sortable{
  cursor: default;
}
.v-datatable-light .header-item.no-sortable:hover {
  color: #337ab7;
}

.v-datatable-light .header-item .th-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  font-weight: bold;
}

.v-datatable-light .header-item .th-wrapper.checkboxes {
  justify-content: center;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  justify-content: space-between;
}

.v-datatable-light .header-item .th-wrapper .arrows-wrapper.centralized {
  justify-content: center;
}

.v-datatable-light .arrow {
  transition: color 0.15s ease-in-out;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

.v-datatable-light .arrow.up {
  border-bottom: 5px solid #337ab7;
}

.v-datatable-light .arrow.up:hover {
  border-bottom: 5px solid #ed9b19;
}

.v-datatable-light .arrow.down {
  border-top: 5px solid #337ab7;
}

.v-datatable-light .arrow.down:hover {
  border-top: 5px solid #ed9b19;
}

.v-datatable-light .footer {
  display: flex;
  justify-content: space-between;
  width: 500px;
}

.v-datatable-light tbody {
  font-size: small;
}

/* #app .v-datatable-light .row-7 .column-4 {
  color: steelblue;
}

#app .v-datatable-light .row-1 .column-2 {
  color: green;
}

#app .v-datatable-light .row-2 .column-1 {
  color: red;
}

#app .v-datatable-light .row-3 {
  color: pink;
}

#app .v-datatable-light .column-5 {
  color: goldenrod;
}

#app .v-datatable-light .row-3 .column-5 {
  color: purple;
} */


/* End Datatable CSS */

/* Pagination CSS */
 .v-datatable-light-pagination {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 30px;
  }

  .v-datatable-light-pagination .pagination-item {
    width: 30px;
    margin-right: 5px;
    font-size: 16px;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item.selected {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn {
    background-color: transparent;
    outline: none;
    border: none;
    color: #337ab7;
    transition: color 0.15s ease-in-out;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:hover {
    color: #ed9b19;
  }

  .v-datatable-light-pagination .pagination-item .page-btn:disabled{
    cursor: not-allowed;
    box-shadow: none;
    opacity: .65;
  }
  /* END PAGINATION CSS */

  /* ITEMS PER PAGE DROPDOWN CSS */
  .item-per-page-dropdown {
    background-color: transparent;
    min-height: 30px;
    border: 1px solid #337ab7;
    border-radius: 5px;
    color: #337ab7;
  }
  .item-per-page-dropdown:hover {
    cursor: pointer;
  }
  /* END ITEMS PER PAGE DROPDOWN CSS */

</style>
