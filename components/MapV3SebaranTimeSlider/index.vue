<template>
  <div>
    <div
      class="w-full p-5"
      style="min-height: 300px;"
      :class="isLoading?'':'hidden'"
    >
      <ContentLoader
        class="w-full hidden lg:block"
        :speed="3"
        :width="400"
        :height="350"
        primary-color="#eee"
        secondary-color="#fff"
      >
        <rect
          :key="1"
          x="0"
          :y="4"
          width="100%"
          height="300"
          rx="3"
          ry="3"
        />
        <rect
          :key="2"
          x="0"
          :y="310"
          width="100%"
          height="30"
          rx="3"
          ry="3"
        />
      </ContentLoader>
    </div>
    <div class="container-map" :class="isLoading?'hidden':''">
      <div id="map-wrap-timeslider">
        <button
          class="btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggleFullscreen"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
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
      <div class="filter-layer">
        <div class="text-right">
          <button
            class="btn btn-light"
            style="background-color: white"
            @click="toggleBackToHome()"
          >
            <font-awesome-icon :icon="faHome" />
            <i class="fas fa-home cc-primary" style="color: black !important;" />
          </button><br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'

import { ContentLoader } from 'vue-content-loader'
import { faPause, faPlay, faStop, faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV3SebaranTimeSlider',
  components: {
    ContentLoader,
    VueSlider
  },
  props: {
    activeRegionId: {
      type: String,
      default: ''
    },
    activeRegionCategory: {
      type: String,
      default: 'kota'
    },
    activeParentRegionName: {
      type: String,
      default: 'kota'
    }
  },
  data () {
    return {
      // map config
      fullscreen: false,
      map: '',
      zoom: 9,
      dataLayer: [],

      // data
      stat: {
        isActivePolygon: true,
        isActiveCluster: false,
        isActiveFaskes: false,
        isActiveTimeslider: false
      },
      isStartPlayer: false,
      isGrouping: false,
      range: [],
      infolegend: '',
      dataSlide: 0,
      sliderValue: new Date('03-04-2020').getTime(),
      min: new Date('03-04-2020').getTime(),
      max: new Date().setDate(new Date().getDate()),
      markerClusters: [],

      // json
      jsonKota,
      jsonKecamatan,
      jsonKelurahan,
      jsonRegion: {
        type: 'FeatureCollection',
        features: []
      },

      // fontawesome
      faPause,
      faPlay,
      faFilter,
      faHome,
      faLayerGroup,
      faExpand,
      faCompress,
      faStop,

      // data
      distributionPolygonData: [],
      activeRegion: 'kota',
      activeParentCode: '',
      activeDataCategory: 'positif_aktif'
    }
  },
  computed: {
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon/itemMap']
    },
    dataSebaranMarker () {
      return this.$store.getters['data-sebaran-marker/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-marker/isLoading']
    }
  },
  watch: {
    dataSebaranPolygon (val) {
      this.createPolygonRegion()
    },
    dataSebaranMarker (val) {
      this.createMarker()
    }
  },
  mounted () {
    this.initMap()
    this.getDataSebaranPolygon(this.activeRegionCategory, this.activeDataCategory, this.activeRegionId)
    this.getDataSebaranMarker(this.activeRegionCategory, this.activeDataCategory, this.activeRegionId)
  },
  created () {
  },
  methods: {
    initMap () {
      // initial map
      this.map = this.$L.map('map-wrap-timeslider', {
        zoomControl: false,
        fullscreenControl: false
      }).setView([-6.932694, 107.627449], 8)

      // set basemap
      this.$L.tileLayer(
        'https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
        {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
          tileSize: 512,
          zoomOffset: -1
        }
      ).addTo(this.map)

      // add zoom control with your options
      this.$L.control
        .zoom({
          position: 'topleft'
        })
        .addTo(this.map)

      // add search control
      const searchProvider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider: searchProvider,
        position: 'topleft',
        showMarker: true,
        autoClose: true,
        marker: {
          icon: new this.$L.Icon.Default(),
          draggable: false
        },
        maxMarkers: 1
      }).addTo(this.map)
    },
    removeLayer () {
      this.dataLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },
    changeRegionMap (e) {
      const featureProperties = e.target.feature.properties
      let keyParentRegion = ''
      let nameParentRegion = ''

      if (featureProperties.bps_kecamatan_kode !== undefined) {
        this.activeRegion = 'kelurahan'
        keyParentRegion = 'bps_kecamatan_kode'
        nameParentRegion = 'bps_kecamatan_nama'
      } else if (featureProperties.bps_kabupaten_kode !== undefined) {
        this.activeRegion = 'kecamatan'
        keyParentRegion = 'bps_kabupaten_kode'
        nameParentRegion = 'bps_kabupaten_nama'
      }
      this.activeParentCode = featureProperties[keyParentRegion]

      // move map
      this.map.fitBounds(e.target.getBounds())
      this.map.flyTo(e.target.getCenter())

      // create polygon region
      this.createPolygonRegion()

      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory, this.activeParentCode)
      this.getDataSebaranMarker(this.activeRegion, this.activeParentCode)

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
      this.$emit('update:activeParentRegionName', this.capitalizeFirstLetter(featureProperties[nameParentRegion]))
    },
    createPolygonRegion () {
      this.jsonRegion = {
        type: 'FeatureCollection',
        features: []
      }
      let geojson = []
      let keyParentRegion = ''
      // eslint-disable-next-line no-unused-vars
      let keyRegion = 'bps_kabupaten_kode'
      // eslint-disable-next-line no-unused-vars
      let keyApiRegion = 'kode_kab'
      let nameRegion = 'kemendagri_kabupaten_nama'

      if (this.activeRegion === 'kelurahan') {
        keyParentRegion = 'bps_kecamatan_kode'
        keyRegion = 'bps_desa_kode'
        keyApiRegion = 'kode_kel'
        geojson = jsonKelurahan
        nameRegion = 'kemendagri_desa_nama'
      } else if (this.activeRegion === 'kecamatan') {
        keyParentRegion = 'bps_kabupaten_kode'
        keyRegion = 'bps_kecamatan_kode'
        keyApiRegion = 'kode_kec'
        geojson = jsonKecamatan
        nameRegion = 'kemendagri_kecamatan_nama'
      } else {
        keyRegion = 'bps_kabupaten_kode'
        keyApiRegion = 'kode_kab'
        geojson = jsonKota
      }

      if (this.activeRegion !== 'kota') {
        for (let i = 0; i < geojson.features.length; i++) {
          if (geojson.features[i].properties[keyParentRegion] === this.activeParentCode) {
            this.jsonRegion.features.push(geojson.features[i])
          }
        }
      } else {
        this.jsonRegion = geojson
      }

      const self = this
      this.$L.geoJSON(this.jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          const styleBatasWilayah = {
            fillOpacity: 0,
            fillColor: '#FFFFFF',
            weight: 0.7,
            opacity: 0.7,
            color: 'grey'
          }

          // marker cluster
          this.markerClusters[feature.properties[keyRegion]] = this.paramMarkerCluster()

          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // event clicked layer
          layer.on({
            dblclick: self.onLayerClicked
          })

          // add tooltip
          const popup = feature.properties[nameRegion]
          layer.bindTooltip(popup)
        }
      })
    },
    createMarker () {
      const dataSebaranMarker = this.dataSebaranMarker
      const apiRegion = {
        kota: {
          key: 'kode_kab',
          name: 'nama_kab',
          label: 'Kota/Kabupaten'
        },
        kecamatan: {
          key: 'kode_kec',
          name: 'nama_kec',
          label: 'Kecamatan'
        },
        kelurahan: {
          key: 'kode_kel',
          name: 'nama_kel',
          label: 'Kelurahan/Desa'
        }
      }

      if (dataSebaranMarker !== undefined) {
        dataSebaranMarker.forEach((element) => {
          if (element.latitude !== null) {
            const keyApiRegion = apiRegion[this.activeRegion].key
            const nameApiRegion = apiRegion[this.activeRegion].name
            const labelApiRegion = apiRegion[this.activeRegion].label

            let stage = element.stage
            const region = element[nameApiRegion]
            const latitude = element.latitude
            const longitude = element.longitude
            const kode = element[keyApiRegion]
            const tanggalKonfirmasiTime = new Date(element.tanggal_konfirmasi).getTime()
            const tanggalUpdateTime = new Date(element.tanggal_update).getTime()

            let keyCategory = 'positif_aktif'

            if (tanggalKonfirmasiTime <= this.sliderValue) {
              if (tanggalUpdateTime <= this.sliderValue && tanggalUpdateTime !== 0) {
                if (stage === 'Meninggal') {
                  keyCategory = 'positif_meninggal'
                } else if (stage === 'Sembuh') {
                  keyCategory = 'positif_sembuh'
                }
              } else {
                stage = 'Aktif'
              }

              const category = this.findCategory(keyCategory)
              const marker = this.$L.marker([latitude, longitude], {
                icon: new this.$L.DivIcon({
                  className: 'cluster ' + category.className + ' digits-0'
                })
              })

              // create popup
              let popup = `<b> Status </b> : Positif - ${stage} <br>`
              if (element.nama_kab !== '' && element.nama_kab !== null) {
                popup += '<b> Kab/Kota </b> : ' + element.nama_kab + '<br />'
              }

              if (element.nama_kec !== '' && element.nama_kec !== null) {
                popup += '<b> Kecamatan </b> : ' + element.nama_kec + '<br />'
              }

              marker.bindPopup(popup)
              marker.on('mouseover', function (e) {
                this.openPopup()
              })
              marker.on('mouseout', function (e) {
                this.closePopup()
              })

              // add marker to map
              if (!this.isGrouping) {
                marker.addTo(this.map)
                  .bindPopup('<b>Status:</b> ' + category.name +
                  '<br> <b>' + labelApiRegion + ':</b> ' + region)
                this.dataLayer.push(marker)
              }

              // add marker to cluster group
              this.markerClusters[kode][keyCategory].addLayer(marker)
            }
          }
        })

        if (this.isGrouping) {
          const jsonRegion = this.jsonRegion
          const markerClusters = this.markerClusters
          let keyRegion = ''
          if (this.activeRegion === 'kelurahan') {
            keyRegion = 'bps_desa_kode'
          } else if (this.activeRegion === 'kecamatan') {
            keyRegion = 'bps_kecamatan_kode'
          } else {
            keyRegion = 'bps_kabupaten_kode'
          }

          jsonRegion.features.forEach((element) => {
            const clusterAktif = markerClusters[element.properties[keyRegion]].positif_aktif.addTo(this.map)
            const clusterSembuh = markerClusters[element.properties[keyRegion]].positif_sembuh.addTo(this.map)
            const clusterMeninggal = markerClusters[element.properties[keyRegion]].positif_meninggal.addTo(this.map)

            this.dataLayer.push(clusterAktif)
            this.dataLayer.push(clusterSembuh)
            this.dataLayer.push(clusterMeninggal)

            this.createClusterPopup(element, keyRegion, 'positif_aktif')
            this.createClusterPopup(element, keyRegion, 'positif_sembuh')
            this.createClusterPopup(element, keyRegion, 'positif_meninggal')
          })
        }
      }
    },
    onLayerClicked (e) {
      this.changeRegionMap(e)
      this.removeLayer()
    },
    onFullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-timeslider').style.height = '100%'
      } else {
        document.getElementById('map-wrap-timeslider').style.height = '500px'
      }
    },
    onChangeTimeSlider () {
      this.removeLayer()
      this.createMarker()
      this.createPolygonRegion()
    },
    onClickGroup () {
      this.isGrouping = !this.isGrouping
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
    toggleFullscreen () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.onFullscreenChange
      })
    },
    toggleBackToHome () {
      this.activeRegion = 'kota'
      this.activeParentCode = ''
      this.map.flyTo([-6.932694, 107.627449], 8)

      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)
      this.getDataSebaranMarker(this.activeRegion)

      this.removeLayer()
      this.createPolygonRegion()

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
      this.$emit('update:activeParentRegionName', 'Jawa Barat')
    },
    findCategory (category) {
      let classMarker = ''
      switch (category) {
        case 'positif_sembuh': {
          classMarker = {
            name: 'Positif - Sembuh',
            className: 'cluster-positif-sembuh'
          }
          break
        }
        case 'positif_meninggal': {
          classMarker = {
            name: 'Positif - Meninggal',
            className: 'cluster-positif-meninggal'
          }
          break
        }
        case 'positif_aktif': {
          classMarker = {
            name: 'Positif - Aktif',
            className: 'cluster-positif-proses'
          }
          break
        }
        case 'pdp_aktif': {
          classMarker = {
            name: 'PDP - Proses',
            className: 'cluster-pdp-proses'
          }
          break
        }
        case 'pdp_meninggal': {
          classMarker = {
            name: 'PDP - Meninggal',
            className: 'cluster-pdp-meninggal'
          }
          break
        }
        case 'odp_aktif': {
          classMarker = {
            name: 'ODP - Proses',
            className: 'cluster-odp-proses'
          }
          break
        }
        case 'odp_meninggal': {
          classMarker = {
            name: 'ODP - Meninggal',
            className: 'cluster-odp-meninggal'
          }
          break
        }
        default: {
          classMarker = {
            name: 'Positif - Aktif',
            className: 'cluster-positif-proses'
          }
        }
      }

      return classMarker
    },

    // marker cluster
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
        positif_aktif: this.$L.markerClusterGroup(this.configCluster('cluster-positif-proses')),
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
    createClusterPopup (element, keyRegion, status) {
      const markerClusters = this.markerClusters

      const category = this.findCategory(status)
      markerClusters[element.properties[keyRegion]][status].on('clusterclick', (c) => {
        let popup = ''
        popup += '<b> Status </b> : ' + category.name + ' <br>'
        popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
        popup += `<b> Kota/Kabupaten </b> : ${element.properties.kemendagri_kabupaten_nama} <br>`

        if (element.properties.kemendagri_kecamatan_nama !== undefined) {
          popup += `<b> Kecamatan </b> : ${element.properties.kemendagri_kecamatan_nama} <br>`
        }

        if (element.properties.kemendagri_desa_nama) {
          popup += `<b> Kelurahan/Desa </b> : ${element.properties.kemendagri_desa_nama} <br>`
        }
        this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(this.map)
      }).on('clustermouseout', (c) => {
        this.map.closePopup()
      })
    },
    capitalizeFirstLetter (string) {
      const res = string.split(' ')
      const newStr = []
      for (let i = 0; i < res.length; i++) {
        const lowerStr = res[i].toLowerCase()
        newStr.push(lowerStr.charAt(0).toUpperCase() + lowerStr.slice(1))
      }

      return newStr.join(' ')
    },

    // get data
    getDataSebaranPolygon (region, category, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      if (category) {
        query += '&category=' + category
      }

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

      this.$store.dispatch('data-sebaran-polygon/getItem', query)
    },
    getDataSebaranMarker (region, regionCode = '') {
      let parentKeyCode = ''
      let query = 'wilayah=' + region

      query += '&category=positif'

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

      this.$store.dispatch('data-sebaran-marker/getItem', query)
    }
  }
}
</script>

<style scoped>
  #map-wrap-timeslider {
    height: 500px;
    z-index:0;
    position: relative;
  }

  .container-map {
    width:100%;
    height:100%;
    position: relative;
    background-color: #ffffff;
  }
  .filter-active {
    opacity: 1 !important;
  }
  .filter-layer {
    position: absolute;
    top: 0px;
    right: 10px;
    padding-right: 1em;
      padding-top: 1em;
  }

  .filter-layer .btn {
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

  .btn-fullscreen {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 1.3em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 401;
  }

  .title-map {
    position: absolute;
    top: 0;
    color: #ffffff;
  }

  .leaflet-top .leaflet-control-geosearch.bar,
  .leaflet-bottom .leaflet-control-geosearch.bar {
    display: none;
  }

  .leaflet-control-geosearch.bar {
    position: relative;
    display: block;
    height: auto;
    width: 400px;
    margin: 10px auto 0;
    cursor: auto;
    z-index: 1000;
  }

  .leaflet-control-geosearch.bar form {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  .leaflet-control-geosearch.bar form input {
    min-width: 100%;
    width: 100%;
  }

  .leaflet-control-geosearch.bar .results.active:after {
    opacity: .2;
  }

  .leaflet-right .leaflet-control-geosearch form {
    right: 28px;
    left: initial;
    border-radius: 4px 0 0 4px;
    border-left: inherit;
    border-right: none;
  }

  .leaflet-control-geosearch a.reset {
    color: black;
    position: absolute;
    line-height: 30px;
    padding: 0 8px;
    right: 0;
    top: 0;
    cursor: pointer;
    border: none;
  }

  .leaflet-control-geosearch a.reset:hover {
    background: #f5f5f5;
  }

  .legend-color {
      width: 1em;
      height: 1em;
      float: left;
      border-radius: 10px;
      margin-top: 4px;
  }
  .legend-data {
    background: rgb(255,255,2555);
    margin-top: 0.5em;
    padding: 0.6em;
    /* border-radius: 0.6em; */
    /* box-shadow: 0 1px 5px rgba(0,0,0,0.65); */
    line-height: 18px;
    color: #252525;
  }

  .legend-data ul {
    list-style: none;
    margin-bottom: 0px;
  }

  .legend-data li {
    padding: 3px;
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

  .legend-data-box {
    width: 13px;
    height: 13px;
    float: left;
    margin-right: 8px;
    border: #000 1px solid;
  }
  .cluster {
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 700;
    font-family: monospace;
    height: 10px;
    width: 10px;
  }
  .cluster-odp-proses {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(45, 156, 219, 0.9);
    background: rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-selesai {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(45, 156, 219, 0.9);
    background: rgba(196, 195, 195, 0.9);
  }

  .cluster-odp-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(45, 156, 219, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .cluster-pdp-proses {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-pdp-selesai {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgba(196, 195, 195, 0.9);
  }

  .cluster-pdp-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .cluster-positif-proses {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(235, 87, 87, 0.9);
    background: rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-sembuh {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(235, 87, 87, 0.9);
    background: rgb(39, 174, 96, 0.9);
  }

  .cluster-positif-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(235, 87, 87, 0.9);
    background: rgb(165,18,18, 0.9);
  }
  .digits-0 {
    height: 17px !important;
    width: 17px !important;
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
    height: 34px !important;
    width: 34px !important;
    line-height: 35px;
    margin-top: -17px;
    margin-left: -17px;
  }

  .digits-3 {
    font-size: 18px;
    height: 48px !important;
    width: 47px !important;
    line-height: 47px;
    /* border-width: 3px; */
    margin-top: -24px;
    margin-left: -24px;
  }

  .digits-4 {
    font-size: 18px;
    height: 58px !important;
    width: 58px !important;
    line-height: 57px;
    /* border-width: 4px; */
    margin-top: -29px;
    margin-left: -29px;
  }
</style>
