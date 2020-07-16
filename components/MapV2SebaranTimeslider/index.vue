<template>
  <div class="container-map">
    <div class="bg-white col-md-12 shadow-md">
      <div
        style="height: 500px;  position: relative;"
      >
        <div id="map-wrap" />
        <div class="control-bottom-left">
          <div class="time-slider p-5">
            <div class="flex mb-4">
              <div class="w-1/6 h-auto">
                <font-awesome-icon v-if="!isStartPlayer" :icon="faPlay" @click="startTimeSlider" />
                <font-awesome-icon v-if="isStartPlayer" :icon="faPause" @click="pauseTimeSlider" />
                <font-awesome-icon class="ml-1" :icon="faStop" @click="stopTimeSlider" />
              </div>
              <div class="w-5/6 h-auto">
                <vue-slider v-model="sliderValue" :min="min" :max="max" tooltip="none" @change="onChangeTimeSlider()" />
              </div>
            </div>
            {{
              new Date(sliderValue).toLocaleDateString(['ban', 'id'],{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
            }}
            <div class="timeslider">
              <label class="block text-gray-500  font-bold">
                <input class="mr-2" type="checkbox" @click="onClickGroup()">
                <div class="text-xs text-label">
                  Pengelompokan berdasarkan Kota/ Kabupaten
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-layer">
        <div class="text-right mb-2">
          <button class="btn bg-white">
            <font-awesome-icon :icon="faHome" @click="backToHome" />
          </button>
        </div>

        <!-- <div class="text-right">
          <button class="btn bg-white" @click="showFilter">
            <font-awesome-icon :icon="faFilter" />
          </button>

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
        </div>  -->
      </div>

      <div class="info-legend p-2">
        <b>Keterangan: </b>
        <div class="flex mb-4">
          <div class="w-1/3 h-auto">
            <div class="legend-color" style="background:#a51212; border: 2px solid #eb5757" /> &nbsp;
            Positif - Meninggal
          </div>

          <div class="w-1/3 h-auto">
            <div class="legend-color" style="background:#eb5757" /> &nbsp;
            Positif - Aktif
          </div>
          <div class="w-1/3 h-auto">
            <div class="legend-color" style="background:#27ae60; border: 2px solid #eb5757" /> &nbsp;
            Positif - Sembuh
          </div>
        </div>
        <hr>
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
      <div v-if="loading" class="loading-page">
        <div class="loading-image" />
      </div>
    </div>
  </div>
</template>

<script>

import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import * as L from 'leaflet'
// import * as turf from '@turf/turf'
import { faFilter, faHome, faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

// eslint-disable-next-line no-unused-vars
let tileLayer = []
// eslint-disable-next-line prefer-const
let geojsonArea = []
let provider = []
// let wilayahLayer = []
let listWilActive = []
const markerClusters = []
const deletedListCluster = []
let deletedListMarker = []
let mapView = []
export default {
  name: 'MapV2SebaranTimeSlider',
  components: {
    VueSlider
  },
  props: {
    propsDataSebaranJabar: {
      type: Array,
      default: () => [{}]
    }
  },
  asyncData () {
    return {
      listMarkerCluster: {
        odp: {
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
      jsonData: []
    }
  },
  data () {
    return {
      isStartPlayer: false,
      dataSlide: 0,
      sliderValue: new Date('03-04-2020').getTime(),
      min: new Date('03-04-2020').getTime(),
      max: new Date().setDate(new Date().getDate()),

      map: [],
      loading: false,
      filter: {
        odp: {
          proses: false,
          belumupdate: false
        },
        pdp: {
          proses: false,
          belumupdate: false
        },
        positif: {
          proses: true,
          meninggal: true,
          sembuh: true
        }
      },
      isShowFilter: false,
      faFilter,
      faHome,
      faPlay,
      faPause,
      faStop,
      // map: '',
      zoom: 9,
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
        positif_proses: 'Positif - Aktif',
        positif_meninggal: 'Positif - Meninggal',
        positif_sembuh: 'Positif - Sembuh',
        pdp_proses: 'PDP - Proses',
        pdp_selesai: 'PDP - Selesai',
        pdp_meninggal: 'PDP - Meninggal',
        odp_proses: 'ODP - Proses',
        odp_selesai: 'ODP - Selesai',
        odp_meninggal: 'ODP - Meninggal'
      },
      searchControl: [],
      listMarker: [],
      deletedListMarker: [],
      deletedListCluster: [],
      groupCluster: [],
      isGrouping: false
    }
  },
  computed: {
    dataSebaranJabar () {
      return this.$store.getters['data-sebaran-jabar/itemsMap']
    }
  },
  watch: {
    dataSebaranJabar (val) {
      this.jsonData = val
    }
  },
  beforeMount () {
    // this.tesMap()
  },
  mounted () {
    this.createBasemap()
    this.fetchData()
  },
  created () {
  },
  beforeDestroy () {
    mapView = ''
  },
  methods: {
    setFilter (status, stage) {
      try {
        this.removeLayer(false)
        this.filter[status][stage] = !this.filter[status][stage]
        for (const status in this.filter) {
          for (const stage in this.filter[status]) {
            this.listMarkerCluster[status][stage].forEach((element) => {
              if (this.filter[status][stage]) {
                element.addTo(mapView)
              }
            })
          }
        }
      } catch (e) {
        console.log(e.message)
      }
    },
    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    backToHome () {
      mapView.flyTo([-6.932694, 107.627449], 9)
    },
    fetchData () {
      const self = this
      // axios
      //   .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar')
      //   .then(function (response) {
      //     // self.jsonData = response.data.data.content
      //     self.createMap('kota')
      //     console.log(response.data.data.content)
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      // self.jsonData = self.propsDataSebaranJabar
      if (this.$store.getters['data-sebaran-jabar/itemsMap']) {
        self.jsonData = self.$store.getters['data-sebaran-jabar/itemsMap']
        // console.log(self.jsonData)
      }
      self.createMap('kota')
    },
    createBasemap () {
      mapView = new L.Map('map-wrap', {
        zoomControl: false,
        fullscreenControl: true
      }).setView([-6.932694, 107.627449], 9)

      tileLayer = new L.TileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(mapView)

      provider = new OpenStreetMapProvider()

      // add search control
      this.searchControl = new GeoSearchControl({
        provider,
        position: 'topleft'
      }).addTo(mapView)
      mapView.on('geosearch/showlocation', (e) => {
        // this.createMapByZoomLevel()
      })

      // add zoom control with your options
      // eslint-disable-next-line new-cap
      new L.control.zoom({
        position: 'bottomright'
      }).addTo(mapView)
      // // // on zoom
      // // // Here the events for zooming and dragging
      mapView.on('zoomend', () => {
        // this.createMapByZoomLevel()
      })
      // mapView.on('dragend', () => {
      //   // if (this.zoom > 15) {
      //   //   this.removeLayer()
      //   //   this.createLayerByKelurahan()
      //   // } else
      //   if (mapView.getZoom()  > 12) {
      //     this.removeLayer()
      //     this.createLayerPasien('kelurahan')
      //   }
      //   else if (mapView.getZoom()  > 10) {
      //     this.removeLayer()
      //     this.createLayerPasien('kecamatan')
      //   }
      // })
      // end

      // // create layer group
      // this.layerGroup = new L.layerGroup().addTo(mapView)
    },
    createMap (level) {
      this.createLayerPasien(level)
    },
    createLayerPasien (level) {
      this.listMarkerCluster = {
        odp: {
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
      let kodeWilayahDataMarker = ''
      let kodeWilayahJSON = ''

      if (level === 'kota') {
        geojsonActive = jsonKota
        kodeWilayahDataMarker = 'kode_kab'
        kodeWilayahJSON = 'bps_kabupaten_kode'
      } else if (level === 'kecamatan') {
        geojsonActive = jsonKecamatan
        kodeWilayahDataMarker = 'kode_kec'
        kodeWilayahJSON = 'bps_kecamatan_kode'
      } else {
        kodeWilayahDataMarker = 'kode_kel'
        geojsonActive = jsonKelurahan
        kodeWilayahJSON = 'bps_kelurahan_kode'
      }

      if (geojsonArea.length !== 0) {
        geojsonArea.remove()
      }
      geojsonArea = new L.GeoJSON(geojsonActive, {
        style: this.styleBatasWilayah
      }).addTo(mapView)
      const jsonData = this.jsonData
      const result = jsonData.reduce(function (r, a) {
        r[a[kodeWilayahDataMarker]] = r[a[kodeWilayahDataMarker]] || []
        r[a[kodeWilayahDataMarker]].push(a)
        return r
      }, Object.create(null))

      const keysResult = Object.keys(result)
      const geoJSONArea = geojsonActive.features.filter((el) => {
        return keysResult.includes(el.properties[kodeWilayahJSON])
      })
      listWilActive = []

      new L.GeoJSON(geoJSONArea, {
        style: this.styleBatasWilayah
      }).eachLayer((el) => {
        markerClusters[el.feature.properties[kodeWilayahJSON]] = this.paramMarkerCluster()
        listWilActive.push(el)
        for (const keyStatus in this.statusStage) {
          markerClusters[el.feature.properties[kodeWilayahJSON]][keyStatus].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(keyStatus)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
            popup += `<b> Kota/Kabupaten </b> : ${el.feature.properties.kemendagri_kabupaten_nama} <br>`

            if (el.feature.properties.kemendagri_kecamatan_nama !== undefined) {
              popup += `<b> Kecamatan </b> : ${el.feature.properties.kemendagri_kecamatan_nama} <br>`
            }

            if (el.feature.properties.kemendagri_desa_nama) {
              popup += `<b> Kel/Desa </b> : ${el.feature.properties.kemendagri_desa_nama} <br>`
            }
            this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(mapView)
          }).on('clustermouseout', (c) => {
            mapView.closePopup()
          })
        }
        const deletedList = []
        for (const i in result[el.feature.properties[kodeWilayahJSON]]) {
          // namaKab = result[el.feature.properties.bps_kode][i].nama_kab
          // namaKec = result[el.feature.properties.bps_kode][i].nama_kec
          // namaKel = result[el.feature.properties.bps_kode][i].nama_kel
          this.addMarkerLayer(level, el.feature.properties[kodeWilayahJSON], result[el.feature.properties[kodeWilayahJSON]][i])
          deletedList.push(i)
        }

        for (const i in deletedList) {
          result[el.feature.properties[kodeWilayahJSON]].splice(i, 1)
        }

        if (this.isGrouping) {
          const markProses = markerClusters[el.feature.properties[kodeWilayahJSON]].positif_proses.addTo(mapView)
          const markSembuh = markerClusters[el.feature.properties[kodeWilayahJSON]].positif_sembuh.addTo(mapView)
          const markMeninggal = markerClusters[el.feature.properties[kodeWilayahJSON]].positif_meninggal.addTo(mapView)
          deletedListCluster.push(markProses)
          deletedListCluster.push(markSembuh)
          deletedListCluster.push(markMeninggal)
        }
        // this.addMarkerClusterLayer(kotaCluster, el.feature.properties.bps_kode, level, namaKab, namaKec, namaKel)
      })
    },
    createMapByZoomLevel () {
      if (mapView.getZoom() > 12) {
        this.removeLayer()
        this.level = 'kelurahan'
        this.createLayerPasien('kelurahan')
      } else if (mapView.getZoom() > 10) {
        if (this.level !== 'kecamatan') {
          this.removeLayer()
          this.level = 'kecamatan'
          this.createLayerPasien('kecamatan')
        }
      } else if (this.level !== 'kota') {
        this.removeLayer()
        this.level = 'kota'
        this.createLayerPasien('kota')
      }
    },
    statusStageCorona (status) {
      return this.statusStage[status]
    },
    createMarkerPasien (elPasien, icon, stage) {
      const m = new L.Marker([elPasien.latitude, elPasien.longitude], { virtual: true, attributes: elPasien, icon })
      let popup = `<b> Status </b> : ${elPasien.status} - ${stage} <br>`

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

      return m
    },
    addMarkerLayer (kodeLevel, kodeWilayah, elPasien) {
      let icon = ''
      let updateMarker = false
      // console.log(elPasien)
      if (elPasien.status === 'Positif') {
        // set minimum date
        // const tanggalKonfirmasiTime = new Date(elPasien.tanggal_konfirmasi).getTime()
        const tanggalUpdateTime = new Date(elPasien.tanggal_update).getTime()
        // if (tanggalKonfirmasiTime < this.min) {
        //   this.min = tanggalKonfirmasiTime
        // }
        if (elPasien.stage === 'Meninggal' && tanggalUpdateTime <= this.sliderValue) {
          icon = new L.DivIcon({
            className: 'cluster cluster-positif-meninggal digits-0',
            iconSize: null
          })
          updateMarker = this.createMarkerPasien(elPasien, icon, 'Meninggal')
        } else if (elPasien.stage === 'Sembuh' && tanggalUpdateTime <= this.sliderValue) {
          icon = new L.DivIcon({
            className: 'cluster cluster-positif-sembuh digits-0',
            iconSize: null
          })
          updateMarker = this.createMarkerPasien(elPasien, icon, 'Sembuh')
        }

        elPasien.updateMarker = updateMarker
        icon = new L.DivIcon({
          className: 'cluster cluster-positif-proses digits-0',
          iconSize: null
        })
        const marker = this.createMarkerPasien(elPasien, icon, 'Proses')

        if (new Date(elPasien.tanggal_konfirmasi).getTime() <= this.sliderValue) {
          if (updateMarker) {
            if (updateMarker.options.attributes.stage === 'Sembuh') {
              markerClusters[kodeWilayah].positif_sembuh.addLayer(updateMarker)
            } else {
              markerClusters[kodeWilayah].positif_meninggal.addLayer(updateMarker)
            }

            if (!this.isGrouping) {
              updateMarker.addTo(mapView)
              deletedListMarker.push(updateMarker)
            }
          } else {
            markerClusters[kodeWilayah].positif_proses.addLayer(marker)
            if (!this.isGrouping) {
              marker.addTo(mapView)
              deletedListMarker.push(marker)
            }
          }
        }
        this.listMarker.push(marker)
      }
    },
    configCluster (className) {
      return {
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
          return this.$L.divIcon({
            html: count,
            className: classMarker,
            iconSize: null
          })
        }
      }
    },
    paramMarkerCluster () {
      return {
        positif_proses: this.$L.markerClusterGroup(this.configCluster('cluster-positif-proses')),
        positif_meninggal: this.$L.markerClusterGroup(this.configCluster('cluster-positif-meninggal')),
        positif_sembuh: this.$L.markerClusterGroup(this.configCluster('cluster-positif-sembuh')),
        pdp_proses: this.$L.markerClusterGroup(this.configCluster('cluster-pdp-proses')),
        pdp_selesai: this.$L.markerClusterGroup(this.configCluster('cluster-pdp-selesai')),
        pdp_meninggal: this.$L.markerClusterGroup(this.configCluster('cluster-pdp-meninggal')),
        odp_proses: this.$L.markerClusterGroup(this.configCluster('cluster-odp-proses')),
        odp_selesai: this.$L.markerClusterGroup(this.configCluster('cluster-odp-selesai')),
        odp_meninggal: this.$L.markerClusterGroup(this.configCluster('cluster-odp-meninggal'))
      }
    },
    addCluster () {

    },
    removeLayer () {
      deletedListMarker.forEach((el) => {
        mapView.removeLayer(el)
      })

      deletedListCluster.forEach((el) => {
        el.clearLayers()
      })
    },
    onChangeTimeSlider () {
      const listMarker = []
      this.removeLayer()

      this.listMarker.forEach((el) => {
        const tanggalKonfirmasi = new Date(el.options.attributes.tanggal_konfirmasi)
        const tanggalUpdate = new Date(el.options.attributes.tanggal_update)
        if (tanggalKonfirmasi.getTime() <= this.sliderValue) {
          let m = []
          if (el.options.attributes.updateMarker && tanggalUpdate.getTime() < this.sliderValue) {
            m = el.options.attributes.updateMarker
          } else {
            m = el
          }

          listMarker.push(m)
          if (!this.isGrouping) {
            m.addTo(mapView)
          }
        }
      })
      if (!this.isGrouping) {
        deletedListMarker = listMarker
      } else {
        // const groupCluster = []
        let kodeWilayahJSON = ''
        let kodeWilayahDataMarker = ''

        if (this.level === 'kota') {
          kodeWilayahDataMarker = 'kode_kab'
          kodeWilayahJSON = 'bps_kabupaten_kode'
        } else if (this.level === 'kecamatan') {
          kodeWilayahDataMarker = 'kode_kec'
          kodeWilayahJSON = 'bps_kecamatan_kode'
        } else {
          kodeWilayahDataMarker = 'kode_kel'
          kodeWilayahJSON = 'bps_kelurahan_kode'
        }

        const statusByStage = []
        statusByStage.Sembuh = 'positif_sembuh'
        statusByStage.Meninggal = 'positif_meninggal'
        for (const i in listWilActive) {
          // console.log(listWilActive[i].feature.properties)
          // console.log(listWilActive[i].feature.properties[kodeWilayahJSON])
          // console.log(kodeWilayahJSON)
          const deletedArr = []
          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_proses.clearLayers()
          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_sembuh.clearLayers()
          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_meninggal.clearLayers()
          this.createPopupCluster(markerClusters, listWilActive[i], kodeWilayahJSON)
          for (const j in listMarker) {
            const tanggalUpdate = new Date(listMarker[j].options.attributes.tanggal_update)
            if (listWilActive[i].feature.properties[kodeWilayahJSON] === listMarker[j].options.attributes[kodeWilayahDataMarker]) {
              if (listMarker[j].options.attributes.updateMarker && tanggalUpdate.getTime() < this.sliderValue) {
                const status = statusByStage[listMarker[j].options.attributes.stage]
                markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]][status].addLayer(listMarker[j])
              } else {
                markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_proses.addLayer(listMarker[j])
              }
              deletedArr.push(i)
            }
          }

          for (const j in deletedArr) {
            listMarker.splice(j, 1)
          }

          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_proses.addTo(mapView)
          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_sembuh.addTo(mapView)
          markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_meninggal.addTo(mapView)
          // deletedListMarker.push(markProses)
          // deletedListMarker.push(markSembuh)
          // deletedListMarker.push(markMeninggal)
          deletedListCluster.push(markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_sembuh)
          deletedListCluster.push(markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_meninggal)
          deletedListCluster.push(markerClusters[listWilActive[i].feature.properties[kodeWilayahJSON]].positif_proses)
        }
      }
    },
    createPopupCluster (cluster, el, kodeWilayah) {
      for (const keyStatus in this.statusStage) {
        cluster[el.feature.properties[kodeWilayah]][keyStatus].on('clusterclick', (c) => {
          let popup = ''
          popup += `<b> Status </b> : ${this.statusStageCorona(keyStatus)} <br>`
          popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
          popup += `<b> Kota/Kabupaten </b> : ${el.feature.properties.kemendagri_kabupaten_nama} <br>`

          if (el.feature.properties.kemendagri_kecamatan_nama !== undefined) {
            popup += `<b> Kecamatan </b> : ${el.feature.properties.kemendagri_kecamatan_nama} <br>`
          }

          if (el.feature.properties.kemendagri_desa_nama) {
            popup += `<b> Kel/Desa </b> : ${el.feature.properties.kemendagri_desa_nama} <br>`
          }
          this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(mapView)
        }).on('clustermouseout', (c) => {
          mapView.closePopup()
        })
      }
      return cluster
    },
    onClickGroup () {
      this.isGrouping = !this.isGrouping
      this.onChangeTimeSlider()
    },
    startTimeSlider () {
      this.isStartPlayer = true
      this.moveTimeDay()
    },
    pauseTimeSlider () {
      this.isStartPlayer = false
    },
    stopTimeSlider () {
      this.isStartPlayer = false
      this.sliderValue = this.min
      this.onChangeTimeSlider()
    },
    moveTimeDay () {
      setTimeout(() => {
        let date = new Date(this.sliderValue)
        date = date.setDate(date.getDate() + 1)
        if (date < new Date().getTime() && this.isStartPlayer) {
          this.sliderValue = date
          this.onChangeTimeSlider()
          this.moveTimeDay()
        } else {
          this.isStartPlayer = false
        }
      }, 1000)
    },
    tes () {
    }
  },
  head () {
    return {
      script: [
        // { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' }
      ]
    }
  }
}
</script>
<style scoped>
#map-wrap{
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  height: 100%; z-index: 0;
    position: relative;
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

.control-bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-left: 1em;
  padding-bottom: 1em;
}

.time-slider {
  border-radius: 5px;
  font-size: 0.8em;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  background: #ffffff;
  width: 25em;
}

.timeslider input{
  vertical-align: middle;
  position: relative;
  float: left;
  margin-top: 4px;
}

.timeslider .text-label {
  margin-left: 25px;
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
    height: 14px;
    width: 14px;
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
  .loading-image {
    height: 10em;
    background-position: center;
    background-repeat: no-repeat;
    background-image:
          url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDUwKSI+CiAgICAgICAgICAgICAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iMyIgcnk9IjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjODVhMmI2Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuOTE2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgICAgICAgPC9yZWN0PgogICAgICAgICAgICA8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAgNTAgNTApIj4KICAgICAgICAgICAgICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSIzIiByeT0iNiIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiM4NWEyYjYiPgogICAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC44MzMzMzMzMzMzMzMzMzM0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg2MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjc1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg5MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjY2NjY2NjY2NjY2NjY2NjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDEyMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjU4MzMzMzMzMzMzMzMzMzRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE1MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjQxNjY2NjY2NjY2NjY2NjdzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDIxMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjMzMzMzMzMzMzMzMzMzMzNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI0MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgNTAgNTApIj4KICAgICAgICAgICAgICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSIzIiByeT0iNiIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiM4NWEyYjYiPgogICAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC4xNjY2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgICAgICAgPC9yZWN0PgogICAgICAgICAgICA8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAwIDUwIDUwKSI+CiAgICAgICAgICAgICAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iMyIgcnk9IjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjODVhMmI2Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuMDgzMzMzMzMzMzMzMzMzMzNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMzMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgPC9zdmc+")
  }
</style>
