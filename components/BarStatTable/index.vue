<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <h4 class="p-5 text-xl">
      <b>Tabel Pertumbuhan Kasus Covid-19 Jawa Barat</b>
    </h4>
    <hr>
    <SortableDatatable :data="dataV2" :category="selectedCategory" />
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
    },
    propsDataRekapitulasiJabarKumulatifKab: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kabupaten Bandung'
        },
        {
          kode: '3217',
          nama: 'Kabupaten Bandung Barat'
        },
        {
          kode: '3216',
          nama: 'Kabupaten Bekasi'
        },
        {
          kode: '3201',
          nama: 'Kabupaten Bogor'
        },
        {
          kode: '3207',
          nama: 'Kabupaten Ciamis'
        },
        {
          kode: '3203',
          nama: 'Kabupaten Cianjur'
        },
        {
          kode: '3209',
          nama: 'Kabupaten Cirebon'
        },
        {
          kode: '3205',
          nama: 'Kabupaten Garut'
        },
        {
          kode: '3212',
          nama: 'Kabupaten Indramayu'
        },
        {
          kode: '3215',
          nama: 'Kabupaten Karawang'
        },
        {
          kode: '3208',
          nama: 'Kabupaten Kuningan'
        },
        {
          kode: '3210',
          nama: 'Kabupaten Majalengka'
        },
        {
          kode: '3218',
          nama: 'Kabupaten Pangandaran'
        },
        {
          kode: '3214',
          nama: 'Kabupaten Purwarkarta'
        },
        {
          kode: '3213',
          nama: 'Kabupaten Subang'
        },
        {
          kode: '3202',
          nama: 'Kabupaten Sukabumi'
        },
        {
          kode: '3211',
          nama: 'Kabupaten Sumedang'
        },
        {
          kode: '3206',
          nama: 'Kabupaten Tasikmalaya'
        },
        {
          kode: '3273',
          nama: 'Kota Bandung'
        },
        {
          kode: '3279',
          nama: 'Kota Banjar'
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi'
        },
        {
          kode: '3271',
          nama: 'Kota Bogor'
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi'
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon'
        },
        {
          kode: '3276',
          nama: 'Kota Depok'
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi'
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya'
        }
      ],
      jsonDataKabupaten: [],
      temp: [],
      temporary: [],
      data: {
        columns: [
          // {
          //   label: 'No',
          //   field: 'no',
          //   backgroundColor: '#eee'
          // },
          {
            label: 'Nama Kota / Kabupaten',
            field: 'nama_kab',
            sort: 'desc',
            backgroundColor: '#eee'
          },
          {
            label: 'ODP',
            field: 'odp_total',
            sort: 'desc',
            backgroundColor: '#009EDC',
            textColor: 'white'
          },
          {
            label: 'PDP',
            field: 'pdp_total',
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
      },
      dataV2: {
        columns: [
          // {
          //   label: 'Kode Kota / Kabupaten',
          //   field: 'kode',
          //   backgroundColor: '#eee'
          // },
          {
            label: 'Nama Kota / Kabupaten',
            field: 'nama',
            sort: 'desc',
            backgroundColor: '#eee',
            category: 'kota'
          },
          {
            label: 'H-1',
            field: 'positif_aktif_h1',
            sort: 'desc',
            backgroundColor: '#D93F40',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-7',
            field: 'positif_aktif_h7',
            sort: 'desc',
            backgroundColor: '#D93F40',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'Total',
            field: 'positif_aktif_total',
            sort: 'desc',
            backgroundColor: '#D93F40',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-1',
            field: 'positif_sembuh_h1',
            sort: 'desc',
            backgroundColor: '#039658',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-7',
            field: 'positif_sembuh_h7',
            sort: 'desc',
            backgroundColor: '#039658',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'Total',
            field: 'positif_sembuh_total',
            sort: 'desc',
            backgroundColor: '#039658',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-1',
            field: 'positif_meninggal_h1',
            sort: 'desc',
            backgroundColor: '#9C0000',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-7',
            field: 'positif_meninggal_h7',
            sort: 'desc',
            backgroundColor: '#9C0000',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'Total',
            field: 'positif_meninggal_total',
            sort: 'desc',
            backgroundColor: '#9C0000',
            textColor: 'white',
            category: 'Terkonfirmasi'
          },
          {
            label: 'H-1',
            field: 'odp_total_h1',
            sort: 'desc',
            backgroundColor: '#008ec6',
            textColor: 'white',
            category: 'ODP_PDP'
          },
          {
            label: 'H-7',
            field: 'odp_total_h7',
            sort: 'desc',
            backgroundColor: '#008ec6',
            textColor: 'white',
            category: 'ODP_PDP'
          },
          {
            label: 'Total',
            field: 'odp_total_total',
            sort: 'desc',
            backgroundColor: '#008ec6',
            textColor: 'white',
            category: 'ODP_PDP'
          },
          // {
          //   label: 'H-1',
          //   field: 'odp_selesai_h1',
          //   sort: 'desc',
          //   backgroundColor: '#19a7df',
          //   textColor: 'white',
          //   category: 'ODP'
          // },
          // {
          //   label: 'H-7',
          //   field: 'odp_selesai_h7',
          //   sort: 'desc',
          //   backgroundColor: '#19a7df',
          //   textColor: 'white',
          //   category: 'ODP'
          // },
          // {
          //   label: 'Total',
          //   field: 'odp_selesai_total',
          //   sort: 'desc',
          //   backgroundColor: '#19a7df',
          //   textColor: 'white',
          //   category: 'ODP'
          // },
          {
            label: 'H-1',
            field: 'pdp_total_h1',
            sort: 'desc',
            backgroundColor: '#e3b342',
            textColor: 'white',
            category: 'ODP_PDP'
          },
          {
            label: 'H-7',
            field: 'pdp_total_h7',
            sort: 'desc',
            backgroundColor: '#e3b342',
            textColor: 'white',
            category: 'ODP_PDP'
          },
          {
            label: 'Total',
            field: 'pdp_total_total',
            sort: 'desc',
            backgroundColor: '#e3b342',
            textColor: 'white',
            category: 'ODP_PDP'
          }
          // {
          //   label: 'H-1',
          //   field: 'pdp_selesai_h1',
          //   sort: 'desc',
          //   backgroundColor: '#fdcc5c',
          //   textColor: 'white',
          //   category: 'PDP'
          // },
          // {
          //   label: 'H-7',
          //   field: 'pdp_selesai_h7',
          //   sort: 'desc',
          //   backgroundColor: '#fdcc5c',
          //   textColor: 'white',
          //   category: 'PDP'
          // },
          // {
          //   label: 'Total',
          //   field: 'pdp_selesai_total',
          //   sort: 'desc',
          //   backgroundColor: '#fdcc5c',
          //   textColor: 'white',
          //   category: 'PDP'
          // }
        ],
        rows: [
        ]
      },
      selectedCategory: 'Terkonfirmasi'
    }
  },
  watch: {
    propsDataRekapitulasiJabarKab () {
      this.temp = this.propsDataRekapitulasiJabarKab
      this.fetchDataKabupaten()
    },
    propsDataRekapitulasiJabarKumulatifKab () {
      this.temporary = this.propsDataRekapitulasiJabarKumulatifKab
      this.groupingKota()
    }
  },
  created () {
    this.defineColumnName()
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
      // const year = d.getFullYear()
      // let month = '' + (d.getMonth() + 1)
      // let day = '' + d.getDate()
      // if (month.length < 2) {
      //   month = '0' + month
      // }
      // if (day.length < 2) {
      //   day = '0' + day
      // }
      // return [day, month, year].join('-')
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }
      return d.toLocaleString('id-ID', options)
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
    defineColumnName () {
      // const now = new Date()
      // const yesterday = new Date()
      // yesterday.setDate(now.getDate() - 1)
      // this.dataV2.columns[1].label = this.formatDate(now)
      // this.dataV2.columns[4].label = this.formatDate(now)
      // this.dataV2.columns[7].label = this.formatDate(now)
      // this.dataV2.columns[10].label = this.formatDate(now)
      // this.dataV2.columns[13].label = this.formatDate(now)
      // this.dataV2.columns[16].label = this.formatDate(yesterday)
      // this.dataV2.columns[19].label = this.formatDate(yesterday)
    },
    fetchDataKabupaten () {
      const self = this
      for (let i = 0; i < self.temp.length; i++) {
        self.jsonDataKabupaten.push({
          // no: i + 1,
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
          // no: i + 1,
          nama_kab: self.jsonDataKabupaten[i].nama_kab,
          odp_proses: self.ifNullReturnZero(self.jsonDataKabupaten[i].odp_proses),
          pdp_proses: self.ifNullReturnZero(self.jsonDataKabupaten[i].pdp_proses),
          positif_aktif: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_aktif),
          positif_sembuh: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_sembuh),
          positif_meninggal: self.ifNullReturnZero(self.jsonDataKabupaten[i].positif_meninggal)
        })
      }
    },
    groupingKota () {
      const rangeTotalSampai = this.temporary.length - (0 * 27) - 1
      const rangeTotalDari = this.temporary.length - (1 * 27)
      const rangeH1Sampai = this.temporary.length - (1 * 27) - 1
      const rangeH1Dari = this.temporary.length - (2 * 27)
      const rangeH7Sampai = this.temporary.length - (8 * 27) - 1
      const rangeH7Dari = this.temporary.length - (9 * 27)

      // const rangeTotalSampai = this.temporary.length - (1 * 27) - 1
      // const rangeTotalDari = this.temporary.length - (2 * 27)
      // const rangeH1Sampai = this.temporary.length - (2 * 27) - 1
      // const rangeH1Dari = this.temporary.length - (3 * 27)
      // const rangeH7Sampai = this.temporary.length - (9 * 27) - 1
      // const rangeH7Dari = this.temporary.length - (10 * 27)

      // temporary data
      this.jsonDataKota.forEach((element, index) => {
        const tempMerge = {
          positif_aktif_h1: 0,
          positif_aktif_h7: 0,
          positif_aktif_total: 0,
          positif_sembuh_h1: 0,
          positif_sembuh_h7: 0,
          positif_sembuh_total: 0,
          positif_meninggal_h1: 0,
          positif_meninggal_h7: 0,
          positif_meninggal_total: 0,
          odp_total_h1: 0,
          odp_total_h7: 0,
          odp_total_total: 0,
          // odp_proses_h1: 0,
          // odp_proses_h7: 0,
          // odp_proses_total: 0,
          // odp_selesai_h1: 0,
          // odp_selesai_h7: 0,
          // odp_selesai_total: 0,
          pdp_total_h1: 0,
          pdp_total_h7: 0,
          pdp_total_total: 0
          // pdp_proses_h1: 0,
          // pdp_proses_h7: 0,
          // pdp_proses_total: 0
          // pdp_selesai_h1: 0,
          // pdp_selesai_h7: 0,
          // pdp_selesai_total: 0
        }
        this.jsonDataKota[index] = { ...element, ...tempMerge }
      })
      this.jsonDataKota.forEach((element, index) => {
        for (let i = rangeTotalDari; i <= rangeTotalSampai; i++) {
          if (element.kode.toString() === this.temporary[i].kode_kab) {
            // this.jsonDataKota[index].positif_aktif_total = this.temporary[i].positif - this.temporary[i].sembuh - this.temporary[i].meninggal
            this.jsonDataKota[index].positif_aktif_total = this.temporary[i].positif
            this.jsonDataKota[index].positif_sembuh_total = this.temporary[i].sembuh
            this.jsonDataKota[index].positif_meninggal_total = this.temporary[i].meninggal
            this.jsonDataKota[index].odp_total_total = this.temporary[i].odp
            // this.jsonDataKota[index].odp_proses_total = this.temporary[i].odp_proses
            // this.jsonDataKota[index].odp_selesai_total = this.temporary[i].odp_selesai
            this.jsonDataKota[index].pdp_total_total = this.temporary[i].pdp
            // this.jsonDataKota[index].pdp_proses_total = this.temporary[i].pdp_proses
            // this.jsonDataKota[index].pdp_selesai_total = this.temporary[i].pdp_selesai
          }
        }
      })
      this.jsonDataKota.forEach((element, index) => {
        for (let i = rangeH1Dari; i <= rangeH1Sampai; i++) {
          if (element.kode.toString() === this.temporary[i].kode_kab) {
            // this.jsonDataKota[index].positif_aktif_h1 = this.temporary[i].positif - this.temporary[i].sembuh - this.temporary[i].meninggal
            this.jsonDataKota[index].positif_aktif_h1 = this.temporary[i].positif
            this.jsonDataKota[index].positif_sembuh_h1 = this.temporary[i].sembuh
            this.jsonDataKota[index].positif_meninggal_h1 = this.temporary[i].meninggal
            this.jsonDataKota[index].odp_total_h1 = this.temporary[i].odp
            // this.jsonDataKota[index].odp_proses_h1 = this.temporary[i].odp_proses
            // this.jsonDataKota[index].odp_selesai_h1 = this.temporary[i].odp_selesai
            this.jsonDataKota[index].pdp_total_h1 = this.temporary[i].pdp
            // this.jsonDataKota[index].pdp_proses_h1 = this.temporary[i].pdp_proses
            // this.jsonDataKota[index].pdp_selesai_h1 = this.temporary[i].pdp_selesai
          }
        }
      })
      this.jsonDataKota.forEach((element, index) => {
        for (let i = rangeH7Dari; i <= rangeH7Sampai; i++) {
          if (element.kode.toString() === this.temporary[i].kode_kab) {
            // this.jsonDataKota[index].positif_aktif_h7 = this.temporary[i].positif - this.temporary[i].sembuh - this.temporary[i].meninggal
            this.jsonDataKota[index].positif_aktif_h7 = this.temporary[i].positif
            this.jsonDataKota[index].positif_sembuh_h7 = this.temporary[i].sembuh
            this.jsonDataKota[index].positif_meninggal_h7 = this.temporary[i].meninggal
            this.jsonDataKota[index].odp_total_h7 = this.temporary[i].odp
            // this.jsonDataKota[index].odp_proses_h7 = this.temporary[i].odp_proses
            // this.jsonDataKota[index].odp_selesai_h7 = this.temporary[i].odp_selesai
            this.jsonDataKota[index].pdp_total_h7 = this.temporary[i].pdp
            // this.jsonDataKota[index].pdp_proses_h7 = this.temporary[i].pdp_proses
            // this.jsonDataKota[index].pdp_selesai_h7 = this.temporary[i].pdp_selesai
          }
        }
      })

      this.jsonDataKota.forEach((element, index) => {
        this.jsonDataKota[index].positif_aktif_h1 = this.jsonDataKota[index].positif_aktif_total - this.jsonDataKota[index].positif_aktif_h1
        this.jsonDataKota[index].positif_aktif_h7 = this.jsonDataKota[index].positif_aktif_total - this.jsonDataKota[index].positif_aktif_h7
        this.jsonDataKota[index].positif_sembuh_h1 = this.jsonDataKota[index].positif_sembuh_total - this.jsonDataKota[index].positif_sembuh_h1
        this.jsonDataKota[index].positif_sembuh_h7 = this.jsonDataKota[index].positif_sembuh_total - this.jsonDataKota[index].positif_sembuh_h7
        this.jsonDataKota[index].positif_meninggal_h1 = this.jsonDataKota[index].positif_meninggal_total - this.jsonDataKota[index].positif_meninggal_h1
        this.jsonDataKota[index].positif_meninggal_h7 = this.jsonDataKota[index].positif_meninggal_total - this.jsonDataKota[index].positif_meninggal_h7
        this.jsonDataKota[index].odp_total_h1 = this.jsonDataKota[index].odp_total_total - this.jsonDataKota[index].odp_total_h1
        this.jsonDataKota[index].odp_total_h7 = this.jsonDataKota[index].odp_total_total - this.jsonDataKota[index].odp_total_h7
        this.jsonDataKota[index].pdp_total_h1 = this.jsonDataKota[index].pdp_total_total - this.jsonDataKota[index].pdp_total_h1
        this.jsonDataKota[index].pdp_total_h7 = this.jsonDataKota[index].pdp_total_total - this.jsonDataKota[index].pdp_total_h7
      })

      this.jsonDataKota.sort(this.compareValues('positif_aktif_total', 'desc'))

      // datatable
      this.dataV2.columns[1].label = this.formatDate(this.temporary[rangeH1Sampai].tanggal)
      this.dataV2.columns[4].label = this.formatDate(this.temporary[rangeH1Sampai].tanggal)
      this.dataV2.columns[7].label = this.formatDate(this.temporary[rangeH1Sampai].tanggal)
      this.dataV2.columns[10].label = this.formatDate(this.temporary[rangeH1Sampai].tanggal)
      this.dataV2.columns[13].label = this.formatDate(this.temporary[rangeH1Sampai].tanggal)
      // this.dataV2.columns[16].label = this.formatDate(this.temporary[rangeH1Dari].tanggal)
      // this.dataV2.columns[19].label = this.formatDate(this.temporary[rangeH1Dari].tanggal)
      this.dataV2.rows = this.jsonDataKota
    }
  }
}

</script>
