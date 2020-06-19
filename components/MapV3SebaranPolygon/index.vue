<template>
  <div>
    <div class="container-map">
      <div id="map-wrap-polygon">
        <button
          class="btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggle"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
      <div class="filter-layer">
        <button
          class="btn btn-light"
          style="background-color: white"
          @click="backToHome()"
        >
          <font-awesome-icon :icon="faHome" />
          <i class="fas fa-home cc-primary" style="color: black !important;" />
        </button><br>
      </div>
    </div>
  </div>
</template>

<script>
import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV3SebaranPolygon',
  props: {
    propsDataSebaranJawaBarat: {
      type: Array,
      default: () => [{}]
    },
    activeRegionId: {
      type: String,
      default: ''
    },
    activeRegionCategory: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // map config
      fullscreen: false,
      map: '',
      zoom: 9,
      dataLayer: [],

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
      distributionProvinceData: []
    }
  },
  computed: {
    dataSebaranJabar () {
      return this.$store.getters['data-sebaran-jabar/itemsMap']
    }
  },
  watch: {
    dataSebaranJabar (val) {
      this.distributionProvinceData = val
    }
  },
  mounted () {
    this.initMap()
    this.createBorderLine(jsonKota)
  },
  created () {
    if (this.$store.getters['data-sebaran-jabar/itemsMap']) {
      this.distributionProvinceData = this.$store.getters['data-sebaran-jabar/itemsMap']
    }
  },
  methods: {
    toggle () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-polygon').style.height = '85%'
      } else {
        document.getElementById('map-wrap-polygon').style.height = '500px'
      }
    },
    initMap () {
      // set long lat map
      this.map = this.$L.map('map-wrap-polygon', {
        zoomControl: false,
        fullscreenControl: false
      }).setView([-6.932694, 107.627449], 9)

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

      this.map.on('geosearch/showlocation', (e) => {
        this.removeMarker()
        this.zoom = this.map.getZoom()

        const layerList = this.$L.marker([e.location.y, e.location.x], {
          icon: new this.$L.Icon.Default()
        })
        layerList.bindPopup(e.location.label)
        layerList.addTo(this.map)
        layerList.openPopup()
        this.dataMarker.push(layerList)
      })
    },
    onLayerClicked (e) {
      this.changeRegionMap(e)
    },
    removeLayer () {
      this.dataLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },
    createBorderLine (geojson, category = 'kota') {
      const self = this
      this.$L.geoJSON(geojson, {
        onEachFeature: (feature, layer, element) => {
          const styleBatasWilayah = {
            fillOpacity: 1,
            fillColor: '#9ffcf9',
            weight: 0.7,
            opacity: 0.7,
            color: '#000000'
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
          const popup = feature.properties.kemendagri_kabupaten_nama

          // popup += '<br>Jumlah Kasus : ' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
    },
    changeRegionMap (e) {
      const geojson = {
        type: 'FeatureCollection',
        features: []
      }
      let region = 'kota'
      let jsonRegion = []
      let parentCodeRegion = ''
      let parentBpsCode = ''

      if (e.target.feature.properties.bps_kecamatan_kode !== undefined) {
        jsonRegion = this.jsonKelurahan
        parentCodeRegion = 'bps_kecamatan_kode'
        region = 'kelurahan'
      } else if (e.target.feature.properties.bps_kabupaten_kode !== undefined) {
        jsonRegion = this.jsonKecamatan
        parentCodeRegion = 'bps_kabupaten_kode'
        region = 'kecamatan'
      }

      parentBpsCode = e.target.feature.properties[parentCodeRegion]

      for (let i = 0; i < jsonRegion.features.length; i++) {
        if (jsonRegion.features[i].properties[parentCodeRegion] === parentBpsCode) {
          geojson.features.push(jsonRegion.features[i])
        }
      }
      this.map.fitBounds(e.target.getBounds())
      this.map.flyTo(e.target.getCenter())
      this.removeLayer()
      this.createBorderLine(geojson, region)

      // update props region
      this.$emit('update:activeRegionId', parentBpsCode)
      this.$emit('update:activeRegionCategory', region)
    },
    backToHome () {
      this.map.flyTo([-6.932694, 107.627449], 9)
      this.removeLayer()
      this.createBorderLine(jsonKota)
    }
  }
}
</script>

<style lang="scss" scoped>
  #map-wrap-polygon {
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
</style>
