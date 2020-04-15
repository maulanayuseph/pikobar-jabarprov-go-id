<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-polygon"
        style="height: 450px; z-index:0; position: relative;"
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
          </button>
        </div>
        <div
          v-if="isShowFilter"
          class="filter-data">
          <li
            :class="filter.positif_proses?'filter-active':''"
            @click="setFilter('positif_proses')">
            <div
              class="legend-color cluster-positif-proses"
              style="margin-right: 0.5em;" />Positif - Aktif
          </li>
          <li
            :class="filter.positif_sembuh?'filter-active':''"
            @click="setFilter('positif_sembuh')">
            <div
              class="legend-color cluster-positif-sembuh"
              style="margin-right: 0.5em;" />Positif - Sembuh
          </li>
          <li
            :class="filter.positif_meninggal?'filter-active':''"
            @click="setFilter('positif_meninggal')">
            <div
              class="legend-color cluster-positif-meninggal"
              style="margin-right: 0.5em;" />Positif - Meninggal
          </li>
          <li
            :class="filter.pdp_proses?'filter-active':''"
            @click="setFilter('pdp_proses')">
            <div
              class="legend-color cluster-pdp-proses"
              style="margin-right: 0.5em;" />PDP - Proses
          </li>
          <li
            :class="filter.pdp_selesai?'filter-active':''"
            @click="setFilter('pdp_selesai')">
            <div
              class="legend-color cluster-pdp-selesai"
              style="margin-right: 0.5em;" />PDP - Selesai
          </li>
          <li
            :class="filter.pdp_meninggal?'filter-active':''"
            @click="setFilter('pdp_meninggal')">
            <div
              class="legend-color cluster-pdp-meninggal"
              style="margin-right: 0.5em;" />PDP - Meninggal
          </li>
          <li
            :class="filter.odp_proses?'filter-active':''"
            @click="setFilter('odp_proses')">
            <div
              class="legend-color cluster-odp-proses"
              style="margin-right: 0.5em;" />ODP - Proses
          </li>
          <li
            :class="filter.odp_selesai?'filter-active':''"
            @click="setFilter('odp_selesai')">
            <div
              class="legend-color cluster-odp-selesai"
              style="margin-right: 0.5em;" />ODP - Selesai
          </li>
          <li
            :class="filter.odp_meninggal?'filter-active':''"
            @click="setFilter('odp_meninggal')">
            <div
              class="legend-color cluster-odp-meninggal"
              style="margin-right: 0.5em;" />ODP - Meninggal
          </li>
        </div>
      </div>
      <div class="legend-data info-legend p-3">
        <div class="mb-1" v-html="infolegend" />
      </div>
    </div>
  </div>
</template>

<script>

import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

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
      zoom: 8,

      faFilter,
      faHome,

      distributionProvinceData: [],

      dataKota: {},
      dataKecamatan: {},
      dataKelurahan: {},
      dataJson: {
        positif_proses: [],
        positif_meninggal: [],
        positif_sembuh: [],
        pdp_proses: [],
        pdp_selesai: [],
        pdp_meninggal: [],
        odp_proses: [],
        odp_selesai: [],
        odp_meninggal: []
      },

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

      range: [],
      infolegend: ''
    }
  },
  watch: {
    propsDataSebaranJawaBarat () {
      console.log('polygon on watch')
      this.distributionProvinceData = this.propsDataSebaranJawaBarat
      this.onChanges()
    }
  },
  mounted () {
    this.initMap()
    if (this.distributionProvinceData.length > 0) {
      console.log('polygon on mounted ada')
      this.onChanges()
    } else {
      console.log('polygon on mounted no data')
    }
  },
  created () {
    console.log('polygon on created')
    this.distributionProvinceData = this.propsDataSebaranJawaBarat
    // this.onChanges()
  },
  methods: {

    onChanges () {
      console.log('polygon on changes')

      this.dataJson.positif_proses = []
      this.dataJson.positif_meninggal = []
      this.dataJson.positif_sembuh = []
      this.dataJson.pdp_proses = []
      this.dataJson.pdp_selesai = []
      this.dataJson.pdp_meninggal = []
      this.dataJson.odp_proses = []
      this.dataJson.odp_selesai = []
      this.dataJson.odp_meninggal = []

      this.distributionProvinceData.forEach((row) => {
        if (row.status === 'Positif' && row.stage === 'Proses') {
          this.dataJson.positif_proses.push(row)
        } else if (row.status === 'Positif' && row.stage === 'Selesai') {
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
      })

      this.removeLayer()
      this.removeMarker()
      this.createLayerKota(this.filterActive)
      this.setZoomLevel()
    },

    initMap () {
      this.map = this.$L.map('map-wrap-polygon', {
        zoomControl: false
      }).setView([-6.932694, 107.627449], 8)

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
      // eslint-disable-next-line no-unused-vars
      const searchControl = new GeoSearchControl({
        provider: searchProvider,
        position: 'topleft',
        showMarker: false,
        autoClose: true
      }).addTo(this.map)

      this.map.on('geosearch/showlocation', (e) => {
        this.zoom = this.map.getZoom()
      })

      // create layer group
      this.layerGroup = this.$L.layerGroup().addTo(this.map)
    },

    setZoomLevel () {
      // listening zoomed level
      this.map.on('zoomend', () => {
        if (this.map.getZoom() <= 10) {
          this.removeLayer()
          this.createLayerKota(this.filterActive)
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 12) {
          this.removeLayer()
          this.createLayerKecamatan(this.filterActive)
        } else if (this.map.getZoom() > 12) {
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

    createLayerKota (category) {
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kota', this.dataJson[category], jsonKota.features)
      this.range = result[0]
      this.dataKota = result[1]

      this.$L.geoJSON(this.dataKota, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            fillColor: '#' + self.styleColorPolygon[category],
            fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            weight: 0.5,
            opacity: 0.5,
            color: '#333333'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Jumlah Kasus : ' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
    },

    createLayerKecamatan (category) {
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kecamatan', this.dataJson[category], jsonKecamatan.features)
      this.range = result[0]
      this.dataKecamatan = result[1]

      this.$L.geoJSON(this.dataKecamatan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            fillColor: '#' + self.styleColorPolygon[category],
            fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            weight: 0.5,
            opacity: 0.5,
            color: '#333333'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
          popup += '<br>Jumlah Kasus : ' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
    },

    createLayerKelurahan (category) {
      const self = this
      const result = this.createRange(self.styleColorPolygon[category], 'kelurahan', this.dataJson[category], jsonKelurahan.features)
      this.range = result[0]
      this.dataKelurahan = result[1]

      this.$L.geoJSON(this.dataKelurahan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            fillColor: '#' + self.styleColorPolygon[category],
            fillOpacity: self.getColor(this.range, feature.properties.jumlah_kasus),
            weight: 0.5,
            opacity: 0.5,
            color: '#333333'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          let popup = self.titleize(feature.properties.kemendagri_kabupaten_nama)
          popup += '<br>Kecamatan ' + feature.properties.kemendagri_kecamatan_nama
          popup += '<br>Kel/Desa ' + feature.properties.kemendagri_desa_nama
          popup += '<br>Jumlah Kasus :' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
    },

    createRange (hex, wilayah, data, geojson) {
      const self = this
      let max = 0
      let min = 0
      let z = 0
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
        const temp = { jumlah_kasus: sum }
        feature.properties = { ...feature.properties, ...temp }
        // get max kasus
        if (feature.properties.jumlah_kasus > max) {
          max = feature.properties.jumlah_kasus
        }
        // get min kasus
        if (z === 0) {
          min = feature.properties.jumlah_kasus
        }
        if (feature.properties.jumlah_kasus < min) {
          min = feature.properties.jumlah_kasus
        }
        z = z + 1
      })

      // count range per list
      const range = []
      const div = Math.ceil((max - min) / 5)
      let numFrom = 0
      // create list
      for (let i = 1; i <= 5; i++) {
        if (min === 0) {
          numFrom = 0
        } else {
          numFrom = min
        }
        range.push({
          from: numFrom + ((i - 1) * div),
          to: numFrom + (i * div),
          // color: this.shadeColor(hex, ((i * -20) + 60)),
          transparant: 0.1 + (i * (1 / 5))
        })
      }

      // create legend
      const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;">']
      range.forEach((element) => {
        labels.push(
          '<li style="margin-right: 20px;"><i style="background:#' + self.styleColorPolygon[self.filterActive] + '; ' +
          'opacity: ' + element.transparant + ';"></i>' +
          element.from + ' - ' + element.to + '</li>'
        )
      })
      labels.push('</ul>')
      this.infolegend = labels.join('')
      return [range, geojson]
    },

    shadeColor (color, percent) {
      return '#' + color
        .replace(/^#/, '')
        .replace(
          /../g, color => (
            '0' + Math.min(255, Math.max(0, parseInt(color, 16) + percent)).toString(16)
          ).substr(-2)
        )
    },

    getColor (range, angka) {
      let color = ''
      range.forEach((element) => {
        if (angka === 0) {
          color = '0'
        } else if (angka >= element.from && angka < element.to) {
          color = element.transparant
        }
      })
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
    },

    backToHome () {
      this.map.flyTo([-6.932694, 107.627449], 8)
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
