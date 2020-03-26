<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <h4 class="p-5 text-xl">
      <b>Tabel Covid-19 Jawa Barat</b>
    </h4>
    <hr>
    <SortableDatatable :data="data" />
  </div>
</template>

<script>
import axios from 'axios'
import SortableDatatable from '../SortableDatatable'

export default {
  name: 'BarStatTable',
  components: {
    SortableDatatable
  },
  data () {
    return {
      jsonDataKabupaten: [],
      data: {
        columns: [
          {
            label: 'No',
            field: 'no',
            backgroundColor: '#eee'
          },
          {
            label: 'Nama Kota / Kabupaten',
            field: 'nama_kab',
            sort: 'desc',
            backgroundColor: '#eee'
          },
          {
            label: 'OPD - Proses',
            field: 'odp_proses',
            sort: 'desc',
            backgroundColor: '#009EDC',
            textColor: 'white'
          },
          {
            label: 'PDP - Proses',
            field: 'pdp_proses',
            sort: 'desc',
            backgroundColor: '#FDC74A',
            textColor: 'white'
          },
          {
            label: 'Positif - Aktif',
            field: 'positif_aktif',
            sort: 'desc',
            backgroundColor: '#FF4A4B',
            textColor: 'white'
          },
          {
            label: 'Positif - Sembuh',
            field: 'positif_sembuh',
            sort: 'desc',
            backgroundColor: '#00B167',
            textColor: 'white'
          },
          {
            label: 'Positif - Meninggal',
            field: 'positif_meninggal',
            sort: 'desc',
            backgroundColor: '#B80000',
            textColor: 'white'
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
  }
}

</script>
