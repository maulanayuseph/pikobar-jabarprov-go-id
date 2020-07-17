<template>

  <div class="container-map">
    <div class="bg-white col-md-12 shadow-md" style="height:50em;">
        <div id="map-wrap" style="height: 75%;z-index:0;" />
        <div class="filter-layer">

          <div class="text-right mb-2">
            <button class="btn bg-white" >
              <font-awesome-icon :icon="faHome" @click="backToHome"/>
            </button>
          </div>

          <div class="text-right">
            <button class="btn bg-white" @click="showFilter">
              <font-awesome-icon :icon="faFilter" />
            </button>
          </div>
          <div data-v-dfef036a="" v-if="isShowFilter" class="filter-data">
            <li @click="setFilter('odp', 'proses')" :class="filter.odp.proses ? 'filter-active' : ''">
              <div data-v-dfef036a="" class="legend-color" style="background: rgb(45, 156, 219);margin-right: 0.5em;"></div>
                ODP - Proses
            </li>
            <li @click="setFilter('odp', 'belumupdate')" :class="filter.odp.belumupdate ? 'filter-active' : ''">
              <div class="legend-color" style="background:#2d9cdb; border: 2px solid #bdbdbd" /> &nbsp;
              ODP (belum diupdate)
            </li>
            <li @click="setFilter('pdp', 'proses')" :class="filter.pdp.proses ? 'filter-active' : ''">
              <div class="legend-color" style="background:#f2c94c;" /> &nbsp;
              PDP - Proses
            </li>
            <li @click="setFilter('pdp', 'belumupdate')" :class="filter.pdp.belumupdate ? 'filter-active' : ''">
              <div class="legend-color" style="background:#f2c94c; border: 2px solid #bdbdbd" /> &nbsp;
              PDP (belum diupdate)
            </li>
            <li @click="setFilter('positif', 'meninggal')" :class="filter.positif.meninggal ? 'filter-active' : ''">
              <div class="legend-color" style="background:#a51212; border: 2px solid #eb5757" /> &nbsp;
              Positif - Meninggal
            </li>
            <li @click="setFilter('positif', 'proses')" :class="filter.positif.proses ? 'filter-active' : ''">
              <div class="legend-color" style="background:#eb5757" /> &nbsp;
              Positif - Aktif
            </li>
            <li @click="setFilter('positif', 'sembuh')" :class="filter.positif.sembuh ? 'filter-active' : ''">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #eb5757" /> &nbsp;
              Positif - Sembuh
            </li>
          </div>
        </div>
        <div class="info-legend p-2">
          <b>Keterangan: </b>
          <div class="flex mb-4">
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#2d9cdb" /> &nbsp;
              ODP - Proses
            </div>
            <!-- <div class="col-md">
              <div class="legend-color" style="background:#f2c94c; border: 2px solid #2d9cdb" /> &nbsp;
              ODP - naik satus ke PDP
            </div> -->
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#2d9cdb; border: 2px solid #bdbdbd" /> &nbsp;
              ODP (belum diupdate)
            </div>
            <!-- <div class="col-md">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #f2c94c" /> &nbsp;
              PDP - Selesai
            </div> -->
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#f2c94c; border: 2px solid #bdbdbd" /> &nbsp;
              PDP (belum diupdate)
            </div>
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#a51212; border: 2px solid #eb5757" /> &nbsp;
              Positif - Meninggal
            </div>
          </div>
          <div class="flex mb-4">
            <!-- <div class="col-md">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #3aa2dd" /> &nbsp;
              ODP - Selesai
            </div> -->
            <!-- <div class="col-md">
              <div class="legend-color" style="background:#eb5757; border: 2px solid #3aa2dd" /> &nbsp;
              ODP - naik satus ke Positif
            </div> -->
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#f2c94c;" /> &nbsp;
              PDP - Proses
            </div>
            <!-- <div class="col-md">
              <div class="legend-color" style="background:#eb5757; border: 2px solid #f2c94c" /> &nbsp;
              PDP - naik status ke Positif
            </div> -->
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#eb5757" /> &nbsp;
              Positif - Aktif
            </div>
            <div class="w-1/4 h-auto">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #eb5757" /> &nbsp;
              Positif - Sembuh
            </div>
          </div>
          <hr>
          <!-- <div class="row">
            <div class="col-md mt-1">
              <b>ODP (Orang Dalam Pemantauan)</b><br>
              Data yang divisualisasikan sebanyak 635 dari 1412 kasus dan 20 dari 27 kabupaten/kota
            </div>
            <div class="col-md">
              <b>PDP (Pasien Dalam Pengawasan)</b><br>
              Data yang divisualisasikan sebanyak 94 dari 132 kasus dan 16 dari 23 kabupaten/kota
            </div>
            <div class="col-md">
              <b>Positif (Pasien terkonfirmasi positif COVID-19)</b><br>
              Data yang divisualisasikan sebanyak 22 dari 26 kasus dan 7 dari 7 kabupaten/kota
            </div>
          </div> -->
          <div class="row">
            <div class="col-md mt-1">
              <b>Catatan:</b><br>
              Perbesar peta untuk melihat jumlah titik akurat. Beberapa titik yang saling berdekatan terlihat menyatu pada pembesaran peta skala besar.

              Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus.

              Saat ini, data yang Pikobar tampilkan berasal dari sinkronisasi data dengan Dinas Kesehatan Kabupaten/Kota. Proses ini mungkin membutuhkan waktu 1-2 hari setiap perbaruan data terjadi. Oleh karena itu, untuk sementara Anda mungkin melihat perbedaan antara angka yang tampil di Pikobar dengan yang diumumkan di kabupaten/kota selama proses sinkronisasi berlangsung. Silakan periksa kembali 1-2 hari setelah perbaruan terakhir dari masing-masing kabupaten/kota.

              Terima kasih dan mohon untuk dimaklumi.
            </div>
          </div>
        </div>
        <div v-if="!isHidden" class="disclaimer">
          <div class="backdrop" />
          <div class="text-disclaimer">
            <div class="title">
              Disclaimer
            </div>
            <!-- <div class="subtitle">
              Sumber: Dinas Kesehatan Provinsi Jawa Barat
            </div> -->
            <div class="description mt-2 text-justify pl-5 pr-5">
              Perbesar peta untuk melihat jumlah titik akurat. Beberapa titik yang saling berdekatan terlihat menyatu pada pembesaran peta skala besar.

              Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus.

              Saat ini, data yang Pikobar tampilkan berasal dari sinkronisasi data dengan Dinas Kesehatan Kabupaten/Kota. Proses ini mungkin membutuhkan waktu 1-2 hari setiap perbaruan data terjadi. Oleh karena itu, untuk sementara Anda mungkin melihat perbedaan antara angka yang tampil di Pikobar dengan yang diumumkan di kabupaten/kota selama proses sinkronisasi berlangsung. Silakan periksa kembali 1-2 hari setelah perbaruan terakhir dari masing-masing kabupaten/kota.

              Terima kasih dan mohon untuk dimaklumi.
            </div>
            <button class="px-6 py-2 bg-brand-green hover:bg-brand-green-lighter text-white rounded-lg shadow-md mt-8" style="color: #fff" @click="isHidden = !isHidden">
              <b>Mengerti</b>
            </button>
          </div>
        </div>
      <div class="loading-page" v-if="loading">
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="rotate(0 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(30 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(60 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(90 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(120 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(150 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(180 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(210 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(240 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(270 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(300 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate>
              </rect>
            </g><g transform="rotate(330 50 50)">
              <rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#85a2b6">
                <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate>
              </rect>
            </g>
          </svg>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as turf from '@turf/turf'
import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
// import kotaGeojson from '@/assets/kotaV2.json'
// import kecamatanGeojson from '@/assets/kecamatanV2.json'
// import kelurahanGeojson from '@/assets/kelurahanV2.json'

let map = []
let tileLayer = []
let geojsonArea = []
let geojsonActive =[]
let markerClusters = []
let provider = []
let wilayahLayer = []
let kotaCluster = []
let kotaGeojson = []
let kecamatanGeojson = []
let kelurahanGeojson = []

export default {
  head: {
    script: [
      // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' }
    ]
  },
  name: 'MapSebaranCovid',
  data () {
    return {
      loading: false,
      filter: {
        odp : {
          proses: true,
          belumupdate: false
        },
        pdp: {
          proses: true,
          belumupdate: false
        },
        positif: {
          proses: true,
          meninggal: true,
          sembuh: true
        }
      },
      isShowFilter: false,
      faFilter: faFilter,
      faHome: faHome,
      // map: '',
      zoom: 8,
      isHidden: false,
      activeLayer: 'ODP',
      styleBatasWilayah: {
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: '#D7B6AE',
        fillOpacity: 0
      },
      level: 'kota',

      statusStage: {
        positif: {
          proses: 'Positif - Aktif',
          meninggal: 'Positif - Meninggal',
          sembuh: 'Positif - Sembuh'
        },
        pdp: {
          proses: 'PDP - Proses',
          belumupdate: 'PDP (belum diupdate)'
        },
        odp: {
          proses: 'ODP - Proses',
          belumupdate: 'ODP (belum diupdate)'
        }
      },

      searchControl: [],
    }
  },
  asyncData() {
    return {

      listLayer: {
        odp : {
          proses: [],
          belumupdate: []
        },
        pdp: {
          proses: [],
          belumupdate: []
        },
        positif: {
          proses: [],
          meninggal: [],
          sembuh: []
        }
      },
      listLayerPasienWilayah: {
        kota: [],
        kecamatan: [],
        kelurahan: []
      },
      listLayerAreaWilayah: {
        kota: [],
        kecamatan: [],
        kelurahan: []
      },

      jsonData: [],
    }
  },
  beforeMount () {
    // this.tesMap()
    this.createBasemap()
  },
  created() {
    this.importJSON()
      .then(() => {
        this.fetchData()
      })

  },
  beforeDestroy () {
    map.remove()
  },
  methods: {
    setFilter (status, stage) {
      try {
        this.removeLayer(false)
        this.filter[status][stage] = !this.filter[status][stage]
        for (let status in this.filter) {
          for (let stage in this.filter[status]) {
            this.listLayer[status][stage].forEach((element) => {

              if (this.filter[status][stage]) {
                element.addTo(map)
              }
            })
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    showFilter() {
      this.isShowFilter = !this.isShowFilter
    },
    backToHome() {
      map.flyTo([-6.932694, 107.627449], 8)
    },
    importJSON () {
      const files = [
        {
          name: 'kota.json',
          onLoad: (module) => {
            kotaGeojson = module
          }
        },
        {
          name: 'kecamatan.json',
          onLoad: (module) => {
            kecamatanGeojson = module
          }
        },
        {
          name: 'kelurahan.json',
          onLoad: (module) => {
            kelurahanGeojson = module
          }
        }
      ]
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          import(`~/assets/${file.name}`)
            .then(m => {
              return m ? m.default || m : {}
            }).then(module => {
              file.onLoad(module)
            }).finally(() => {
              resolve()
            })
        })
      })
      return Promise.all(promises)
    },
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar')
        .then(function (response) {
          self.jsonData = response.data.data.content
          self.createMap('kota')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createBasemap () {
      map = new L.map('map-wrap', {
        zoomControl: false
      }).setView([-6.932694, 107.627449], 8)

      tileLayer = new L.tileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(map)

      provider = new OpenStreetMapProvider();

      // add search control
      this.searchControl = new GeoSearchControl({
        provider: provider,
        position: 'topleft'
      }).addTo(map)
      map.on('geosearch/showlocation', (e) => {
        this.createMapByZoomLevel()
      })

      // add zoom control with your options
      new L.control.zoom({
        position: 'bottomright'
      }).addTo(map)


      // // // on zoom
      // // // Here the events for zooming and dragging
      map.on('zoomend', () => {
        this.createMapByZoomLevel()
      })


      // map.on('dragend', () => {
      //   // if (this.zoom > 15) {
      //   //   this.removeLayer()
      //   //   this.createLayerByKelurahan()
      //   // } else
      //   if (map.getZoom()  > 12) {
      //     this.removeLayer()
      //     this.createLayerPasien('kelurahan')
      //   }
      //   else if (map.getZoom()  > 10) {
      //     this.removeLayer()
      //     this.createLayerPasien('kecamatan')
      //   }
      // })
      // end

      // // create layer group
      // this.layerGroup = new L.layerGroup().addTo(map)
    },

    configCluster (className) {
      return {
        chunkedLoading: true,
        singleMarkerMode: true,
        maxClusterRadius: 10000,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false,
        spiderLegPolylineOptions: { weight: 1.5, color: '#222', opacity: 0 },
        iconCreateFunction: (cluster) => {
          // get the number of items in the cluster
          let count = cluster.getChildCount()
          const digits = (count + '').length
          let classMarker = 'cluster ' + className + ' digits-' + digits

          if (count === 1) {
            count = ''
            classMarker = 'cluster ' + className + ' digits-0'
          }
          return new L.divIcon({
            html: count,
            className:  classMarker,
            iconSize: null
          })
        }
      }
    },
    statusStageCorona (status, stage) {
      return this.statusStage[status][stage]
    },
    paramMarkerCluster () {
      const markerClusters = {
        odp: {
          proses: '',
          // selesai: '',
          // pdp: '',
          // positif: '',
          belumupdate: ''
        },
        pdp: {
          proses: '',
          // selesai: '',
          // positif: '',
          belumupdate: ''
        },
        positif: {
          proses: '',
          meninggal: '',
          sembuh: ''
        }
      }
      markerClusters.positif.proses = new L.markerClusterGroup(this.configCluster('cluster-positif-proses'))
      markerClusters.positif.meninggal = new L.markerClusterGroup(this.configCluster('cluster-positif-meninggal'))
      markerClusters.positif.sembuh = new L.markerClusterGroup(this.configCluster('cluster-positif-sembuh'))
      markerClusters.pdp.proses = new L.markerClusterGroup(this.configCluster('cluster-pdp-proses'))
      // markerClusters.pdp.selesai = new L.markerClusterGroup(this.configCluster('cluster-pdp-selesai'))
      // markerClusters.pdp.positif = new L.markerClusterGroup(this.configCluster('cluster-pdp-positif'))
      markerClusters.pdp.belumupdate = new L.markerClusterGroup(this.configCluster('cluster-pdp-belumupdate'))
      markerClusters.odp.proses = new L.markerClusterGroup(this.configCluster('cluster-odp-proses'))
      // markerClusters.odp.selesai = new L.markerClusterGroup(this.configCluster('cluster-odp-selesai'))
      // markerClusters.odp.pdp = new L.markerClusterGroup(this.configCluster('cluster-odp-pdp'))
      // markerClusters.odp.positif = new L.markerClusterGroup(this.configCluster('cluster-odp-positif'))
      markerClusters.odp.belumupdate = new L.markerClusterGroup(this.configCluster('cluster-odp-belumupdate'))
      return markerClusters
    },
    addMarkerLayer(cluster, kode_level, elPasien) {
      const m = new L.marker([elPasien.latitude, elPasien.longitude], {virtual : true })
      let popup = `<b> Status </b> : ${elPasien.status} <br>`

      if (elPasien.nama_kab !== '' && elPasien.nama_kab !== null) {
        popup += '<b> Kab/Kota </b> : ' + elPasien.nama_kab + '<br />'
      }

      if (elPasien.nama_kec !== '' && elPasien.nama_kec !== null) {
        popup += '<b> Kecamatan </b> : ' + elPasien.nama_kec + '<br />'
      }

      if (elPasien.gender !== '' && elPasien.gender !== null) {
        popup += '<b> Jenis Kelamin </b> : ' + elPasien.gender + '<br />'
      }

      if (elPasien.umur !== '' && elPasien.umur !== null) {
        popup += '<b> Usia </b> : ' + elPasien.umur + ' tahun <br />'
      }
      m.bindPopup(popup)
      m.on('mouseover', function (e) {
        this.openPopup()
      })
      m.on('mouseout', function (e) {
        this.closePopup()
      })
      if (elPasien.status === 'Positif' && elPasien.stage === 'Aktif') {
        cluster[kode_level].positif.proses.addLayer(m)
      } else if (elPasien.status === 'Positif' && elPasien.stage === 'Meninggal') {
        cluster[kode_level].positif.meninggal.addLayer(m)
      } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
        cluster[kode_level].positif.sembuh.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Proses') {
        cluster[kode_level].pdp.proses.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Selesai') {
        // cluster[kode_level].pdp.selesai.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Positif') {
        // cluster[kode_level].pdp.positif.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === null) {
        cluster[kode_level].pdp.belumupdate.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Proses') {
        cluster[kode_level].odp.proses.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Selesai') {
        // cluster[kode_level].odp.selesai.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'PDP') {
        // cluster[kode_level].odp.pdp.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Positif') {
        // cluster[kode_level].odp.positif.addLayer(m)
      } else {
        cluster[kode_level].odp.belumupdate.addLayer(m)
      }
    },
    addMarkerClusterLayer(cluster, kode_level = '', wilayah = '', kabkotNama = '', kecNama = '', kelNama = '') {
      for (const key in cluster[kode_level]) {
        for (const keySub in cluster[kode_level][key]) {
          // console.log(cluster[kode_level][key][keySub])

          let newLayer = cluster[kode_level][key][keySub]
          if (this.filter[key][keySub]) {
            newLayer.addTo(map)
            this.listLayer[key][keySub].push(newLayer)
          }

          cluster[kode_level][key][keySub].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(key, keySub)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`

            if (wilayah === 'kelurahan')  {
              if (kabkotNama !== '') {
                popup += `<b> Kota/Kabupaten </b> : ${ kabkotNama } <br>`
              }
              if (kecNama !== '') {
                popup += `<b> Kecamatan </b> : ${ kecNama } <br>`

              }
              popup += `<b> Kelurahan </b> : ${kelNama} <br>`
            }
            else if (wilayah === 'kecamatan') {
              if (kabkotNama !== '') {
                popup += `<b> Kota/Kabupaten </b> : ${ kabkotNama } <br>`
              }
              popup += `<b> Kecamatan </b> : ${kecNama} <br>`
            }  else {
              popup += `<b> Kota/Kabupaten </b> : ${ kabkotNama } <br>`
            }

            new L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(map)
          }).on('clustermouseout', (c) => {
            map.closePopup()
          })
        }
      }

    },
    createMap (level) {
      this.createLayerPasien(level)
    },
    createLayerPasien(level) {
      this.listLayer = {
        odp : {
          proses: [],
          belumupdate: []
        },
        pdp: {
          proses: [],
          belumupdate: []
        },
        positif: {
          proses: [],
          meninggal: [],
          sembuh: []
        }
      }
      let geojsonActive = []
      let kode_wilayah = ''

      let kotaCluster = []

      if (level === 'kota') {
        geojsonActive = kotaGeojson
        kode_wilayah = 'kode_kab'
      } else if(level === 'kecamatan') {
        geojsonActive = kecamatanGeojson
        kode_wilayah = 'kode_kec'
      } else {
        kode_wilayah = 'kode_kel'
        geojsonActive = kelurahanGeojson
      }

      if (geojsonArea.length != 0) {
        geojsonArea.remove()
      }

      geojsonArea = new L.geoJSON(geojsonActive, {
        style: this.styleBatasWilayah,
        virtual: true
      }).addTo(map)


      let jsonData = this.jsonData

      const result = jsonData.reduce(function (r, a) {
        r[a[kode_wilayah]] = r[a[kode_wilayah]] || [];
        r[a[kode_wilayah]].push(a);
        return r;
      }, Object.create(null))

      const keys_result = Object.keys(result)
      let geoJSONArea = geojsonActive.features.filter((el) => {
        return keys_result.includes(el.properties.bps_kode)
      })

      new L.geoJSON(geoJSONArea, {
        style: this.styleBatasWilayah
      }).eachLayer((el) => {
        if (map.getBounds().intersects(el._bounds)) {
            let nama_kab = ''
            let nama_kec = ''
            let nama_kel = ''
            const markerClusters = this.paramMarkerCluster()
            kotaCluster[el.feature.properties.bps_kode] = markerClusters
            for (let i in result[el.feature.properties.bps_kode]) {
              nama_kab = result[el.feature.properties.bps_kode][i].nama_kab
              nama_kec = result[el.feature.properties.bps_kode][i].nama_kec
              nama_kel = result[el.feature.properties.bps_kode][i].nama_kel
              this.addMarkerLayer(kotaCluster, el.feature.properties.bps_kode, result[el.feature.properties.bps_kode][i])
              result[el.feature.properties.bps_kode].splice(i, 1)
            }
            this.addMarkerClusterLayer(kotaCluster, el.feature.properties.bps_kode, level, nama_kab, nama_kec, nama_kel)
        }
      })
      // for (let kode_level in result) {
      //   let nama_kab = ''
      //   let nama_kec = ''
      //   let nama_kel = ''
      //   const markerClusters = this.paramMarkerCluster()
      //   kotaCluster[kode_level] = markerClusters
      //   for (let i in result[kode_level]) {
      //     nama_kab = result[kode_level][i].nama_kab
      //     nama_kec = result[kode_level][i].nama_kec
      //     nama_kel = result[kode_level][i].nama_kel
      //     this.addMarkerLayer(kotaCluster, kode_level, result[kode_level][i])
      //   }

      //   console.log(kotaCluster)
      //   console.log(kode_level)
      //   console.log(level)
      //   console.log(nama_kab)
      //   console.log(nama_kec)
      //   console.log(nama_kel)
      //   this.addMarkerClusterLayer(kotaCluster, kode_level, level, nama_kab, nama_kec, nama_kel)
      // }
    },
    async createMapByZoomLevel() {
      if (map.getZoom() > 12) {
        this.removeLayer ()


        this.level = 'kelurahan'
        this.createLayerPasien('kelurahan')
      }
      else if (map.getZoom() > 10) {

        if (this.level !== 'kecamatan') {
          this.removeLayer ()

          this.level = 'kecamatan'
          this.createLayerPasien('kecamatan')
        }
      }
      else {
        if (this.level !== 'kota') {
          this.removeLayer ()
          this.level = 'kota'
          this.createLayerPasien('kota')
        }
      }
    },
    removeBatasWilayah () {
      wilayahLayer.forEach((element) => {
        map.removeLayer(element)
        element.clearLayers()
        element.remove()
      })
      wilayahLayer = []
    },
    removeLayer (all = true) {
      if (all) {
        // for (let key in kotaCluster) {
        //   for (let status in this.filter) {
        //     for (let stage in this.filter[status]) {
        //       kotaCluster[key][status][stage].clearLayers()
        //     }
        //   }
        // }

        for (let status in this.filter) {
          for (let stage in this.filter[status]) {
            this.listLayer[status][stage].forEach((element) => {
              map.removeLayer(element)
              element.clearLayers()
              element.remove()
            })
          }
        }
      } else {
        for (let status in this.filter) {
          for (let stage in this.filter[status]) {
            this.listLayer[status][stage].forEach((element) => {
              map.removeLayer(element)
            })
          }
        }
      }

      this.listLayer = []
    },
    isMarkerInsidePolygon(marker, poly) {
      var polyPoints = poly.getLatLngs();
      var x = marker[0], y = marker[1];

      var inside = false;
      for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
          var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
    },
    tesMap () {

    }
  }
}
</script>
<style scoped>
#map-wrap{
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.container-map {
  width:100%; height:100%;
}
.leaflet-popup-content {
    width: 130px;
    padding: 5px;
    line-height: 1.4;
}
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
.info-legend {
  height: 26%;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 13px;
}
.legend {
    line-height: 18px;
    color: #555;
}
.text-disclaimer {
  top:15%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
}
.backdrop {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: black;
  opacity: 0.5;
  border-radius: 1em;
}

.title{
  font-size: large;
  font-weight: bold;
}
.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-top: 4px;
}

.filter-layer {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 1em;
  padding-top: 1em;
}

.filter-layer .btn {
  width: 2em;
  height: 2em;
  border-radius: 5px;
  font-size: 0.8em;
  padding: 2px 6px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}
.filter-data {
  background: #fff;
  margin-top: 0.5em;
  padding: 0.6em;
  border-radius: 0.6em;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}
.filter-layer li {
  list-style: none;
  opacity: 0.4;
  padding-bottom: 0.2em;
}

.filter-layer li:hover {
  cursor: pointer;
}
.filter-active {
  opacity: 1 !important;
}
.loading-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.5em;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

@media only screen and (max-width: 400px) {
  .text-disclaimer {
    top: 10%;
  }
}


@media only screen and (max-width: 340px) {
  .text-disclaimer .description{
    overflow: auto;
    height: 20em;
    top:0;
  }
}
</style>
<style>
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
  .cluster {
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 700;
    font-family: monospace;
  }

  .cluster-odp-proses {
    background: rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-selesai {
    background: #27ae60;
  }

  .cluster-odp-pdp {
    background: #f2c94c;
    border: 3px solid rgb(45, 156, 219, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-odp-positif {
    background: #eb5757;
    border: 3px solid rgb(45, 156, 219, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-odp-belumupdate {
    background: rgb(45, 156, 219, 0.9);
    border: 3px solid #bdbdbd;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-proses {
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-pdp-selesai {
    border: 3px solid rgb(242, 201, 76, 0.9);
    background: #27ae60;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-positif {
    border: 3px solid rgb(242, 201, 76, 0.9);
    background: #eb5757;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-belumupdate {
    border: 3px solid #bdbdbd;
    background: rgb(242, 201, 76, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-positif-proses {
    background: rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-meninggal {
    background: #a51212;
    border: 3px solid rgb(235, 87, 87, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-positif-sembuh {
    background: #27ae60;
    border: 3px solid rgb(235, 87, 87, 0.9);
    line-height: 1.8em  !important;
  }
  .cluster:before {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    /* border: 3px solid white; */
  }

  .digits-0 {
    height: 17px;
    width: 17px;
    margin-top: -14px;
    margin-left: -14px;
  }

  .digits-1 {
    font-size: 14px;
    height: 28px;
    width: 28px;
    line-height: 28px;
    margin-top: -14px;
    margin-left: -14px;
  }

  .digits-2 {
    font-size: 16px;
    height: 34px;
    width: 34px;
    line-height: 35px;
    margin-top: -17px;
    margin-left: -17px;
  }

  .digits-3 {
    font-size: 18px;
    height: 48px;
    width: 47px;
    line-height: 47px;
    /* border-width: 3px; */
    margin-top: -24px;
    margin-left: -24px;
  }

  .digits-4 {
    font-size: 18px;
    height: 58px;
    width: 58px;
    line-height: 57px;
    /* border-width: 4px; */
    margin-top: -29px;
    margin-left: -29px;
  }

  .glass {
    height: 26px !important;
  }

</style>
