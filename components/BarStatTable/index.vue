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
import SortableDatatable from '../SortableDatatable'

export default {
  name: 'BarStatTable',
  components: {
    SortableDatatable
  },
  props: {
    propsDataRekapitulasiJabarKab: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      jsonDataKabupaten: [],
      temp: [],
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
            label: 'ODP - Proses',
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
  watch: {
    propsDataRekapitulasiJabarKab () {
      this.temp = this.propsDataRekapitulasiJabarKab
      this.fetchDataKabupaten()
    }
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
      for (let i = 0; i < self.temp.length; i++) {
        self.jsonDataKabupaten.push({
          no: i + 1,
          nama_kab: self.temp[i].nama_kab,
          odp_proses: self.ifNullReturnZero(self.temp[i].odp_proses),
          pdp_proses: self.ifNullReturnZero(self.temp[i].pdp_proses),
          positif_aktif: self.ifNullReturnZero(
            self.ifNullReturnZero(self.temp[i].positif) -
            (self.ifNullReturnZero(self.temp[i].sembuh) + self.ifNullReturnZero(self.temp[i].meninggal))
          ),
          positif_sembuh: self.ifNullReturnZero(self.temp[i].sembuh),
          positif_meninggal: self.ifNullReturnZero(self.temp[i].meninggal)
        })
      }
      self.jsonDataKabupaten.sort(self.compareValues('positif_aktif', 'desc'))

      for (let i = 0; i < self.jsonDataKabupaten.length; i++) {
        self.data.rows.push({
          no: i + 1,
          nama_kab: self.jsonDataKabupaten[i].nama_kab,
          odp_proses: Number(self.ifNullReturnZero(self.jsonDataKabupaten[i].odp_proses)).toLocaleString('id-ID'),
          pdp_proses: Number(self.ifNullReturnZero(self.jsonDataKabupaten[i].pdp_proses)).toLocaleString('id-ID'),
          positif_aktif: Number(self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_aktif)).toLocaleString('id-ID'),
          positif_sembuh: Number(self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_sembuh)).toLocaleString('id-ID'),
          positif_meninggal: Number(self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_meninggal)).toLocaleString('id-ID')
        })
      }
    }
  }
}

</script>
