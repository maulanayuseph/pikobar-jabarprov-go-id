<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-polygon"
        style="height: 500px; z-index:0; position: relative;"
      />
      <div class="filter-layer">
        <div class="text-right">
          <button
            class="btn btn-light"
            style="background-color: white"
            @click="backToHome()"
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
          </button><br>
          <button
            class="btn btn-light mt-2"
            style="background-color: white"
            @click="showLayer()"
          >
            <font-awesome-icon :icon="faLayerGroup" />
            <i class="fas fa-filter cc-primary" style="color: black !important;" />
          </button>
        </div>
        <div
          v-if="isShowLayer"
          class="filter-data"
        >
          <li
            :class="layer.custom?'filter-active':''"
            @click="setLayer('custom')"
          >
            Otomatis
          </li>
          <li
            :class="layer.kota?'filter-active':''"
            @click="setLayer('kota')"
          >
            Kota/Kabupaten
          </li>
          <li
            :class="layer.kecamatan?'filter-active':''"
            @click="setLayer('kecamatan')"
          >
            Kecamatan
          </li>
          <li
            :class="layer.kelurahan?'filter-active':''"
            @click="setLayer('kelurahan')"
          >
            Kelurahan/Desa
          </li>
        </div>
        <div
          v-if="isShowFilter"
          class="filter-data"
        >
          <li
            :class="filter.positif_proses?'filter-active':''"
            @click="setFilter('positif_proses')"
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
            :class="filter.pdp_proses?'filter-active':''"
            @click="setFilter('pdp_proses')"
          >
            <div
              class="legend-color cluster-pdp-proses"
              style="margin-right: 0.5em;"
            />PDP - Proses
          </li>
          <!--
          <li
            :class="filter.pdp_selesai?'filter-active':''"
            @click="setFilter('pdp_selesai')"
          >
            <div
              class="legend-color cluster-pdp-selesai"
              style="margin-right: 0.5em;"
            />PDP - Selesai
          </li>
          !-->
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
            :class="filter.odp_proses?'filter-active':''"
            @click="setFilter('odp_proses')"
          >
            <div
              class="legend-color cluster-odp-proses"
              style="margin-right: 0.5em;"
            />ODP - Proses
          </li>
          <!--
          <li
            :class="filter.odp_selesai?'filter-active':''"
            @click="setFilter('odp_selesai')"
          >
            <div
              class="legend-color cluster-odp-selesai"
              style="margin-right: 0.5em;"
            />ODP - Selesai
          </li>
          !-->
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
      <div class="legend-data info-legend p-3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="mb-1" v-html="infolegend" />
      </div>
    </div>
  </div>
</template>

<script>

import { faFilter, faHome, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import _cloneDeep from 'lodash/cloneDeep'
import { isJsonKotaReady, isJsonKecamatanReady, isJsonKelurahanReady } from '../../lib/data'
const percentile = require('percentile')

let jsonKota = null
let jsonKecamatan = null
let jsonKelurahan = null

isJsonKotaReady().then((json) => {
  jsonKota = json
})
isJsonKecamatanReady().then((json) => {
  jsonKecamatan = json
})
isJsonKelurahanReady().then((json) => {
  jsonKelurahan = json
})

/**
 * OPTIMIZED:
 * define default shape of data to prevent manual assignment if data reset is needed in the future
*/
const defaultDataJson = {
  positif_proses: [],
  positif_meninggal: [],
  positif_sembuh: [],
  pdp_proses: [],
  pdp_selesai: [],
  pdp_meninggal: [],
  odp_proses: [],
  odp_selesai: [],
  odp_meninggal: []
}

export default {
  name: 'MapV2SebaranPolygon',
  props: {
    propsDataSebaranJawaBarat: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      map: '',
      zoom: 9,

      faFilter,
      faHome,
      faLayerGroup,

      distributionProvinceData: [],

      dataKota: {},
      dataKecamatan: {},
      dataKelurahan: {},
      dataJson: _cloneDeep(defaultDataJson),

      layerGroup: '',
      dataMarker: [],
      dataLayer: [],

      styleColorPolygon: {
        positif_proses: 'EB5757',
        positif_meninggal: 'A51212',
        positif_sembuh: '27AE60',
        pdp_proses: 'F2C94C',
        pdp_selesai: 'F2C94C',
        pdp_meninggal: 'F2C94C',
        odp_proses: '2D9CDB',
        odp_selesai: '2D9CDB',
        odp_meninggal: '2D9CDB'
      },

      isShowFilter: false,
      filter: {
        positif_proses: true,
        positif_meninggal: false,
        positif_sembuh: false,
        pdp_proses: false,
        pdp_selesai: false,
        pdp_meninggal: false,
        odp_proses: false,
        odp_selesai: false,
        odp_meninggal: false
      },
      filterActive: 'positif_proses',
      isShowLayer: false,
      layer: {
        custom: false,
        kota: true,
        kecamatan: false,
        kelurahan: false
      },
      layerActive: 'kota',

      rangeColor: {
        positif_proses: ['#E54C95', '#E40769', '#CE005E', '#B30253', '#940047'],
        positif_meninggal: ['#F78C5B', '#EE654C', '#CF331D', '#B60008', '#7D0005'],
        positif_sembuh: ['#63C4A5', '#3EAE7A', '#228945', '#036A2B', '#00441F'],
        pdp_proses: ['#F9EAA0', '#FDE175', '#FCD648', '#F6C304', '#F0BE06'],
        pdp_selesai: ['#F9DC7F', '#FDD153', '#FEB728', '#F7AE03', '#EFA400'],
        pdp_meninggal: ['#E7D068', '#FACD58', '#F3C448', '#EFB211', '#C79403'],
        odp_proses: ['#86B8FC', '#72A5ED', '#588DE8', '#3E78D0', '#2962BD'],
        odp_selesai: ['#66C9E6', '#49B5D2', '#298CC2', '#0267AD', '#053755'],
        odp_meninggal: ['#68AED5', '#3F91C8', '#2171B6', '#094E9F', '#02275D']
      },

      range: [],
      infolegend: '',
      unwatchData: null
    }
  },
  mounted () {
    if (typeof this.unwatchData === 'function') {
      this.unwatchData()
    }
    this.unwatchData = this.$watch(
      'propsDataSebaranJawaBarat',
      function handler (arr) {
        console.log('polygon on watch')
        this.distributionProvinceData = Array.isArray(arr) ? arr : []
        if (this.map instanceof this.$L.Class === false) {
          this.initMap()
        }
        this.onChanges()
      },
      { immediate: true }
    )
    // OPTIMIZED: no need to call onChanges since watcher is already set to immediate
    // if (this.distributionProvinceData.length > 0) {
    //   console.log('polygon on mounted ada')
    //   this.onChanges()
    // } else {
    //   console.log('polygon on mounted no data')
    // }
  },
  created () {
    console.log('polygon on created')
    // OPTIMIZED: no need to assign value to distributionProvinceData since watcher is already set to immediate
    // this.distributionProvinceData = this.propsDataSebaranJawaBarat
    // this.onChanges()
  },
  methods: {
    async onChanges () {
      console.log('polygon on changes')
      // OPTIMIZED: use default shape for data resetting
      this.dataJson = _cloneDeep(defaultDataJson)

      // OPTIMIZED: use async on big array operation, use for loop instead of foreach
      await new Promise((resolve) => {
        for (let i = 1, len = this.distributionProvinceData.length; i < len; i++) {
          const row = this.distributionProvinceData[i]
          if (row.status === 'Positif' && row.stage === 'Proses') {
            this.dataJson.positif_proses.push(row)
          } else if (row.status === 'Positif' && row.stage === 'Meninggal') {
            this.dataJson.positif_meninggal.push(row)
          } else if (row.status === 'Positif' && row.stage === 'Sembuh') {
            this.dataJson.positif_sembuh.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Proses') {
            this.dataJson.pdp_proses.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Selesai') {
            this.dataJson.pdp_selesai.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Meninggal') {
            this.dataJson.pdp_meninggal.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Proses') {
            this.dataJson.odp_proses.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Selesai') {
            this.dataJson.odp_selesai.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Meninggal') {
            this.dataJson.odp_meninggal.push(row)
          }
        }
        resolve()
      })

      this.removeLayer()
      this.removeMarker()
      this.createLayerKota(this.filterActive)
      this.setZoomLevel()
    },

    initMap () {
      this.map = this.$L.map('map-wrap-polygon', {
        zoomControl: false,
        fullscreenControl: false
      }).setView([-6.932694, 107.627449], 9)

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

      // add full screen control with your options
      this.$L.control
        .fullscreen({
          position: 'bottomleft'
        })
        .addTo(this.map)

      // add search control
      const searchProvider = new OpenStreetMapProvider()
      // eslint-disable-next-line no-unused-vars
      const searchControl = new GeoSearchControl({
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

      // create layer group
      this.layerGroup = this.$L.layerGroup().addTo(this.map)
    },

    setZoomLevel () {
      // listening zoomed level
      this.map.on('zoomend', () => {
        if (this.map.getZoom() <= 10 && this.layerActive === 'custom') {
          this.removeLayer()
          this.createLayerKota(this.filterActive)
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 12 && this.layerActive === 'custom') {
          this.removeLayer()
          this.createLayerKecamatan(this.filterActive)
        } else if (this.map.getZoom() > 12 && this.layerActive === 'custom') {
          this.removeLayer()
          this.createLayerKelurahan(this.filterActive)
        }
      })
    },

    removeMarker () {
      this.dataMarker.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataMarker = []
    },

    removeLayer () {
      this.dataLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },

    async createLayerKota (category) {
      await isJsonKotaReady()
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kota', this.dataJson[category], jsonKota.features)
      this.range = result[0]
      this.dataKota = result[1]

      this.$L.geoJSON(this.dataKota, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            // fillColor: '#' + self.styleColorPolygon[category],
            // fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            fillOpacity: 1,
            fillColor: self.getColor(this.range, feature.properties.jumlah_kasus, category),
            weight: 0.7,
            opacity: 0.7,
            color: '#000000'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Jumlah Kasus : ' + (feature.properties.jumlah_kasus || '-')
          layer.bindTooltip(popup)
        }
      })
    },

    async createLayerKecamatan (category) {
      await isJsonKecamatanReady()
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kecamatan', this.dataJson[category], jsonKecamatan.features)
      this.range = result[0]
      this.dataKecamatan = result[1]

      this.$L.geoJSON(this.dataKecamatan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            // fillColor: '#' + self.styleColorPolygon[category],
            // fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            fillOpacity: 1,
            fillColor: self.getColor(this.range, feature.properties.jumlah_kasus, category),
            weight: 0.4,
            opacity: 0.4,
            color: '#000000'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
          popup += '<br>Jumlah Kasus : ' + (feature.properties.jumlah_kasus || '-')
          layer.bindTooltip(popup)
        }
      })
    },

    async createLayerKelurahan (category) {
      await isJsonKelurahanReady()
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kelurahan', this.dataJson[category], jsonKelurahan.features)
      this.range = result[0]
      this.dataKelurahan = result[1]

      this.$L.geoJSON(this.dataKelurahan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            // fillColor: '#' + self.styleColorPolygon[category],
            // fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            fillOpacity: 1,
            fillColor: self.getColor(this.range, feature.properties.jumlah_kasus, category),
            weight: 0.1,
            opacity: 0.7,
            color: '#000000'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
          popup += '<br>Kel/Desa ' + feature.properties.kemendagri_desa_nama
          popup += '<br>Jumlah Kasus : ' + (feature.properties.jumlah_kasus || '-')
          layer.bindTooltip(popup)
        }
      })
    },

    createRange (hex, wilayah, data, geojson) {
      const self = this
      // let max = 0
      // let min = 0
      // let z = 0
      const arrTobePercentile = []

      geojson.forEach((feature) => {
        // count kasus by wilayah & category kasus
        let sum = 0
        if (wilayah === 'kota') {
          data.forEach((row) => {
            if (feature.properties.bps_kabupaten_kode === row.kode_kab) {
              sum = sum + 1
            }
          })
        } else if (wilayah === 'kecamatan') {
          data.forEach((row) => {
            if (feature.properties.bps_kecamatan_kode === row.kode_kec) {
              sum = sum + 1
            }
          })
        } else if (wilayah === 'kelurahan') {
          data.forEach((row) => {
            if (feature.properties.bps_desa_kode === row.kode_kel) {
              sum = sum + 1
            }
          })
        }
        // add to element
        if (sum > 0) {
          arrTobePercentile.push(sum)
        }
        const temp = { jumlah_kasus: sum }
        feature.properties = { ...feature.properties, ...temp }
        // get max kasus
        // if (feature.properties.jumlah_kasus > max) {
        //   max = feature.properties.jumlah_kasus
        // }
        // get min kasus
        // if (z > 0) {
        //   min = feature.properties.jumlah_kasus
        // }
        // if (feature.properties.jumlah_kasus < min) {
        //   min = feature.properties.jumlah_kasus
        // }
        // z = z + 1
      })

      // count range per list
      const range = []
      const q1 = percentile(0, arrTobePercentile)
      const q2 = percentile(20, arrTobePercentile)
      const q3 = percentile(40, arrTobePercentile)
      const q4 = percentile(60, arrTobePercentile)
      const q5 = percentile(80, arrTobePercentile)
      const q6 = percentile(100, arrTobePercentile)
      range.push({ from: q1, to: q2 })
      range.push({ from: q2, to: q3 })
      range.push({ from: q3, to: q4 })
      range.push({ from: q4, to: q5 })
      range.push({ from: q5, to: q6 })

      // create legend
      const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;">']
      range.forEach((element, index) => {
        const rangeLabel = typeof element.from !== 'undefined' && typeof element.to !== 'undefined'
          ? `${element.from} - ${element.to}`
          : '-'
        labels.push(
          '<li style="margin-right: 20px;"><i style="background:' + self.rangeColor[self.filterActive][index] + '; ' +
          'opacity: 1;"></i>' +
          rangeLabel + '</li>'
        )
      })
      labels.push('</ul>')
      this.infolegend = labels.join('')
      return [range, geojson]
    },

    getColor (range, angka, category) {
      let color = ''
      if (angka === 0) {
        color = '#00000000'
      } else if (angka >= range[0].from && angka < range[0].to + 1) {
        color = this.rangeColor[category][0]
      } else if (angka >= range[1].from && angka < range[1].to + 1) {
        color = this.rangeColor[category][1]
      } else if (angka >= range[2].from && angka < range[2].to + 1) {
        color = this.rangeColor[category][2]
      } else if (angka >= range[3].from && angka < range[3].to + 1) {
        color = this.rangeColor[category][3]
      } else if (angka >= range[4].from && angka < range[4].to + 1) {
        color = this.rangeColor[category][4]
      }
      return color
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    setFilter (category) {
      this.removeMarker()
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.filterActive = category

      if (this.layerActive === 'custom') {
        if (this.map.getZoom() <= 10) {
          this.removeLayer()
          this.createLayerKota(this.filterActive)
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13) {
          this.removeLayer()
          this.createLayerKecamatan(this.filterActive)
        } else if (this.map.getZoom() > 13) {
          this.removeLayer()
          this.createLayerKelurahan(this.filterActive)
        }
      } else if (this.layerActive === 'kota') {
        this.removeLayer()
        this.createLayerKota(this.filterActive)
      } else if (this.layerActive === 'kecamatan') {
        this.removeLayer()
        this.createLayerKecamatan(this.filterActive)
      } else if (this.layerActive === 'kelurahan') {
        this.removeLayer()
        this.createLayerKelurahan(this.filterActive)
      }
    },

    showLayer () {
      this.isShowLayer = !this.isShowLayer
    },
    setLayer (category) {
      for (const cat of Object.keys(this.layer)) {
        this.layer[cat] = false
      }
      this.layer[category] = !this.layer[category]
      this.layerActive = category

      if (this.layerActive === 'custom') {
        if (this.map.getZoom() <= 10) {
          this.removeLayer()
          this.createLayerKota(this.filterActive)
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13) {
          this.removeLayer()
          this.createLayerKecamatan(this.filterActive)
        } else if (this.map.getZoom() > 13) {
          this.removeLayer()
          this.createLayerKelurahan(this.filterActive)
        }
      } else if (this.layerActive === 'kota') {
        this.removeLayer()
        this.createLayerKota(this.filterActive)
      } else if (this.layerActive === 'kecamatan') {
        this.removeLayer()
        this.createLayerKecamatan(this.filterActive)
      } else if (this.layerActive === 'kelurahan') {
        this.removeLayer()
        this.createLayerKelurahan(this.filterActive)
      }
    },

    backToHome () {
      this.map.flyTo([-6.932694, 107.627449], 9)
    },

    titleize (sentence) {
      if (!sentence.split) {
        return sentence
      }
      const titleizeWord = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      }
      const result = []
      sentence.split(' ').forEach((w) => {
        result.push(titleizeWord(w))
      })
      return result.join(' ')
    }
  }
}
</script>
