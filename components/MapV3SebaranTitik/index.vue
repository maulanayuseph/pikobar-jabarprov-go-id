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
      <div id="map-wrap-titik">
        <button
          class="btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggleFullscreen"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
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
          <button
            class="btn btn-light mt-2"
            style="background-color: white"
            @click="showFilter()"
          >
            <font-awesome-icon :icon="faFilter" />
            <i class="fas fa-filter cc-primary" style="color: black !important;" />
          </button>
        </div>
        <div
          v-if="isShowFilter"
          class="filter-data"
        >
          <li
            :class="filter.positif_aktif?'filter-active':''"
            @click="setFilter('positif_aktif')"
          >
            <div
              class="legend-color cluster-positif-proses"
              style="margin-right: 0.5em;"
            />Positif - Aktif
          </li>
          <li
            :class="filter.positif_sembuh?'filter-active':''"
            @click="setFilter('positif_sembuh')"
          >
            <div
              class="legend-color cluster-positif-sembuh"
              style="margin-right: 0.5em;"
            />Positif - Sembuh
          </li>
          <li
            :class="filter.positif_meninggal?'filter-active':''"
            @click="setFilter('positif_meninggal')"
          >
            <div
              class="legend-color cluster-positif-meninggal"
              style="margin-right: 0.5em;"
            />Positif - Meninggal
          </li>
          <li
            :class="filter.pdp_aktif?'filter-active':''"
            @click="setFilter('pdp_aktif')"
          >
            <div
              class="legend-color cluster-pdp-proses"
              style="margin-right: 0.5em;"
            />PDP - Proses
          </li>
          <li
            :class="filter.pdp_meninggal?'filter-active':''"
            @click="setFilter('pdp_meninggal')"
          >
            <div
              class="legend-color cluster-pdp-meninggal"
              style="margin-right: 0.5em;"
            />PDP - Meninggal
          </li>
          <li
            :class="filter.odp_aktif?'filter-active':''"
            @click="setFilter('odp_aktif')"
          >
            <div
              class="legend-color cluster-odp-proses"
              style="margin-right: 0.5em;"
            />ODP - Proses
          </li>
          <li
            :class="filter.odp_meninggal?'filter-active':''"
            @click="setFilter('odp_meninggal')"
          >
            <div
              class="legend-color cluster-odp-meninggal"
              style="margin-right: 0.5em;"
            />ODP - Meninggal
          </li>
        </div>
      </div>
      <div class="info-legend p-3">
        <b>Keterangan: </b>
        <div class="flex mb-1">
          <div class="w-1/3 h-auto">
            <div
              class="legend-color cluster-positif-proses"
              style="margin-right: 0.5em;"
            />Positif - Aktif <br>
            <div
              class="legend-color cluster-positif-sembuh"
              style="margin-right: 0.5em;"
            />Positif - Sembuh <br>
            <div
              class="legend-color cluster-positif-meninggal"
              style="margin-right: 0.5em;"
            />Positif - Meninggal <br>
          </div>
          <div class="w-1/3 h-auto">
            <div
              class="legend-color cluster-pdp-proses"
              style="margin-right: 0.5em;"
            />PDP - Aktif <br>
            <!--
            <div
              class="legend-color cluster-pdp-selesai"
              style="margin-right: 0.5em;"
            />PDP - Selesai <br>
            -->
            <div
              class="legend-color cluster-pdp-meninggal"
              style="margin-right: 0.5em;"
            />PDP - Meninggal <br>
          </div>
          <div class="w-1/3 h-auto">
            <div
              class="legend-color cluster-odp-proses"
              style="margin-right: 0.5em;"
            />ODP - Aktif <br>
            <!--
            <div
              class="legend-color cluster-odp-selesai"
              style="margin-right: 0.5em;"
            />ODP - Selesai <br>
            -->
            <div
              class="legend-color cluster-odp-meninggal"
              style="margin-right: 0.5em;"
            />ODP - Meninggal <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV3SebaranPolygon',
  components: {
    ContentLoader
  },
  props: {
    activeRegionId: {
      type: String,
      default: ''
    },
    activeRegionCategory: {
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
      activeFilter: this.activeDataCategory,
      isShowFilter: false,
      filter: {
        positif_aktif: true,
        positif_meninggal: false,
        positif_sembuh: false,
        pdp_aktif: false,
        pdp_selesai: false,
        pdp_meninggal: false,
        odp_aktif: false,
        odp_selesai: false,
        odp_meninggal: false
      },
      stat: {
        isActivePolygon: true,
        isActiveCluster: false,
        isActiveFaskes: false,
        isActiveTimeslider: false
      },
      range: [],
      infolegend: '',

      // json
      jsonKota,
      jsonKecamatan,
      jsonKelurahan,

      // fontawesome
      faFilter,
      faHome,
      faLayerGroup,
      faExpand,
      faCompress,

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
    this.getDataSebaranPolygon('kota', this.activeDataCategory)
    this.getDataSebaranMarker('kota', this.activeDataCategory)
  },
  created () {
  },
  methods: {
    initMap () {
      // initial map
      this.map = this.$L.map('map-wrap-titik', {
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
          position: 'bottomright'
        })
        .addTo(this.map)

      // add search control
      const searchProvider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider: searchProvider,
        position: 'bottomright',
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

      if (featureProperties.bps_kecamatan_kode !== undefined) {
        this.activeRegion = 'kelurahan'
        keyParentRegion = 'bps_kecamatan_kode'
      } else if (featureProperties.bps_kabupaten_kode !== undefined) {
        this.activeRegion = 'kecamatan'
        keyParentRegion = 'bps_kabupaten_kode'
      }
      this.activeParentCode = featureProperties[keyParentRegion]

      // move map
      this.map.fitBounds(e.target.getBounds())
      this.map.flyTo(e.target.getCenter())

      // create polygon region
      this.createPolygonRegion()

      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory, this.activeParentCode)
      this.getDataSebaranMarker(this.activeRegion, this.activeDataCategory, this.activeParentCode)

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
    },
    createPolygonRegion () {
      let jsonRegion = {
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
            jsonRegion.features.push(geojson.features[i])
          }
        }
      } else {
        jsonRegion = geojson
      }

      const self = this
      this.$L.geoJSON(jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          let styleBatasWilayah = {
            fillOpacity: Number,
            fillColor: String,
            weight: Number,
            opacity: Number,
            color: String
          }

          styleBatasWilayah = {
            fillOpacity: 0,
            fillColor: '#FFFFFF',
            weight: 0.7,
            opacity: 0.7,
            color: 'grey'
          }

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
      const category = this.findCategory(this.activeDataCategory)
      if (dataSebaranMarker !== undefined) {
        dataSebaranMarker.forEach((element) => {
          const total = element.count
          const region = element.nama_kab
          const latitude = element.latitude
          const longitude = element.longitude

          const marker = this.$L.marker([latitude, longitude], {
            icon: new this.$L.DivIcon({
              className: 'cluster ' + category.className + ' digits-2',
              html: total
            })
          }).addTo(this.map)
            .bindPopup('<b>Status:</b> ' + category.name +
            '<br> <b>Jumlah:</b> ' + total +
            '<br> <b>Kota/Kabupaten:</b> ' + region)
          this.dataLayer.push(marker)
        })
      }
    },
    createLegend () {
      let detailLabel = ''
      const dataSebaranPolygon = this.dataSebaranPolygon

      if (dataSebaranPolygon.range !== undefined) {
        // create legend
        const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;">']

        let region = ''
        switch (this.activeRegion) {
          case 'kecamatan': {
            region = 'Kecamatan'
            break
          }
          case 'kelurahan': {
            region = 'Kelurahan/Desa'
            break
          }
          default: {
            region = 'Kota/Kabupaten'
          }
        }
        dataSebaranPolygon.range.forEach((element, index) => {
          detailLabel = '<li style="margin-right: 20px;"><i class="legend-data-box" style="background:' + element.color + '; ' +
              'opacity: 1;"></i>' +
              element.from + ' - ' + element.to
          detailLabel += ' <br> <span style="font-size: 0.6rem">' + element.total_cluster + ' ' + region + '</span></li>'
          labels.push(
            detailLabel
          )
        })
        labels.push('</ul>')
        this.infolegend = labels.join('')
      }
    },
    onLayerClicked (e) {
      this.changeRegionMap(e)
      this.removeLayer()
    },
    onFullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-titik').style.height = '85%'
      } else {
        document.getElementById('map-wrap-titik').style.height = '500px'
      }
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
      this.getDataSebaranMarker(this.activeRegion, this.activeDataCategory)

      this.removeLayer()
      this.createPolygonRegion()

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    setFilter (category) {
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.activeDataCategory = category
      this.removeLayer()
      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory, this.activeParentCode)
      this.getDataSebaranMarker(this.activeRegion, this.activeDataCategory, this.activeParentCode)
      this.createPolygonRegion()
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
    getDataSebaranMarker (region, category, regionCode = '') {
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

      this.$store.dispatch('data-sebaran-marker/getItem', query)
    }
  }
}
</script>

<style scoped>
  #map-wrap-titik {
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
    bottom: 0px;
    left: 10px;
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

</style>

<style>
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
