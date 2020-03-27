<template>
  <div class="row">
    <div
      class="bg-white p-1 col-md mx-2 mb-4"
      style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);"
    >
      <h4 class="m-3">
        <b>Tabel Covid-19 Jawa Barat</b>
      </h4>
      <hr>
      <div class="p-2 table-wrapper-scroll-y my-custom-scrollbar">
        <mdb-datatable
          :data="data"
          :searching="false"
          :pagination="false"
          :tfoot="false"
          bordered
        />
      </div>
    </div>
  </div>
</template>

<style >
  .my-custom-scrollbar {
    position: relative;
    height: 365px;
    overflow-y: scroll;
  }
  .table-wrapper-scroll-y {
    display: block;
  }
  .dataTables_wrapper {
    max-width: 98% !important;
  }

  .table {
    font-size: 14px;
    font-weight: 500;
  }

  .table th {
    border: #FFFFFF;
  }
  .table tr {
    border: #E3E3E3;
  }

  tr th {
    background-color: #EBEBEB;
    color: #4F4F4F;
    text-align: center;
  }
  tr td {
    background-color: #FFFFFF;
    text-align: center;
  }

  tr th + th{
    background-color: #EBEBEB;
    color: #4F4F4F;
    text-align: left;
  }
  tr td + td{
    background-color: #FFFFFF;
    text-align: left;
  }

  tr th + th + th{
    background-color: #009EDC;
    color: #FFFFFF;
    text-align: center;
  }
  tr td + td + td {
    background-color: #E7F5FB;
    text-align: center;
  }

  tr th + th + th + th{
    background-color: #FDC74A;
    color: #FFFFFF;
  }
  tr td + td + td + td{
    background-color: #FFFAED;
  }

  tr th + th + th + th + th{
    background-color: #FF4A4B;
    color: #FFFFFF;
  }
  tr td + td + td + td + td{
    background-color: #FFEDED;
  }

  tr th + th + th + th + th + th{
    background-color: #00B167;
    color: #FFFFFF;
  }
  tr td + td + td + td + td + td{
    background-color: #E5F7F0;
  }

  tr th + th + th + th + th + th + th{
    background-color: #B80000;
    color: #FFFFFF;
  }
  tr td + td + td + td + td + td + td{
    background-color: #FAE6E6;
  }
</style>
<script>
import axios from 'axios'
import { mdbDatatable } from 'mdbvue'

export default {
  name: 'BarStatTable',
  components: {
    mdbDatatable
  },
  data () {
    return {
      jsonDataKabupaten: [],
      data: {
        columns: [
          {
            label: 'No',
            field: 'no'
          },
          {
            label: 'Nama Kota / Kabupaten',
            field: 'nama_kab',
            sort: 'desc'
          },
          {
            label: 'ODP - Proses',
            field: 'odp_proses',
            sort: 'desc'
          },
          {
            label: 'PDP - Proses',
            field: 'pdp_proses',
            sort: 'desc'
          },
          {
            label: 'Positif - Aktif',
            field: 'positif_aktif',
            sort: 'desc'
          },
          {
            label: 'Positif - Sembuh',
            field: 'positif_sembuh',
            sort: 'desc'
          },
          {
            label: 'Positif - Meninggal',
            field: 'positif_meninggal',
            sort: 'desc'
          }
        ],
        rows: [
        ]
      }
    }
  },
  created () {
    this.fetchDataKabupaten()
  },
  methods: {
    ifNullReturnZero (str) {
      if (str === null) {
        return 0
      } else if (str === '-') {
        return 0
      } else {
        return str
      }
    },
    formatDate (date) {
      const d = new Date(date)
      const year = d.getFullYear()
      let month = '' + (d.getMonth() + 1)
      let day = '' + d.getDate()
      if (month.length < 2) {
        month = '0' + month
      }
      if (day.length < 2) {
        day = '0' + day
      }
      return [day, month, year].join('-')
    },
    compareValues (key, order = 'asc') {
      return function innerSort (a, b) {
        // eslint-disable-next-line no-prototype-builtins
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          return 0
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key]
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key]

        let comparison = 0
        if (varA > varB) {
          comparison = 1
        } else if (varA < varB) {
          comparison = -1
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        )
      }
    },
    fetchDataKabupaten () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/rekapitulasi/jabar?level=kab')
        .then(function (response) {
          // self.jsonDataKabupaten = response.data.data.content

          for (let i = 0; i < response.data.data.content.length; i++) {
            self.jsonDataKabupaten.push({
              no: i + 1,
              nama_kab: response.data.data.content[i].nama_kab,
              odp_proses: self.ifNullReturnZero(response.data.data.content[i].odp_proses),
              pdp_proses: self.ifNullReturnZero(response.data.data.content[i].pdp_proses),
              positif_aktif: self.ifNullReturnZero(
                self.ifNullReturnZero(response.data.data.content[i].positif) -
                (self.ifNullReturnZero(response.data.data.content[i].sembuh) + self.ifNullReturnZero(response.data.data.content[i].meninggal))
              ),
              positif_sembuh: self.ifNullReturnZero(response.data.data.content[i].sembuh),
              positif_meninggal: self.ifNullReturnZero(response.data.data.content[i].meninggal)
            })
          }
          self.jsonDataKabupaten.sort(self.compareValues('positif_aktif', 'desc'))

          for (let i = 0; i < self.jsonDataKabupaten.length; i++) {
            self.data.rows.push({
              no: i + 1,
              nama_kab: self.jsonDataKabupaten[i].nama_kab,
              odp_proses: self.ifNullReturnZero(self.jsonDataKabupaten[i].odp_proses),
              pdp_proses: self.ifNullReturnZero(self.jsonDataKabupaten[i].pdp_proses),
              positif_aktif: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_aktif),
              positif_sembuh: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_sembuh),
              positif_meninggal: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_meninggal)
            })
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  head () {
    return {
      link: [
        /* { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css' } */
        { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.8.2/css/all.css' }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>

.btnActive {
  color: #ffffff;
  background-color: #2DAC55;
}
.btnNonActive {
  color: #2DAC55;
  background-color: #FFFFFF;
}

</style>
