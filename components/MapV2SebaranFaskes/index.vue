<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-faskes"
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
            :class="filter.lini1_rujukan?'filter-active':''"
            @click="setFilter('lini1_rujukan')"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini1_rujukan" />Rumah Sakit Rujukan Lini 1
          </li>
          <li
            :class="filter.lini2_rujukan?'filter-active':''"
            @click="setFilter('lini2_rujukan')"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini2_rujukan" />Rumah Sakit Rujukan Lini 2
          </li>
          <li
            :class="filter.lini1_non?'filter-active':''"
            @click="setFilter('lini1_non')"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini1_non" />Rumah Sakit Non Rujukan
          </li>
          <li
            :class="filter.lini2_non?'filter-active':''"
            @click="setFilter('lini2_non')"
          >
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini2_non" />Puskesmas
          </li>
        </div>
      </div>
      <div class="info-legend p-3">
        <b>Keterangan: </b>
        <div class="flex mb-1">
          <div class="w-1/4 h-auto">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini1_rujukan" />Rumah Sakit Rujukan Lini 1
          </div>
          <div class="w-1/4 h-auto">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini2_rujukan" />Rumah Sakit Rujukan Lini 2
          </div>
          <div class="w-1/4 h-auto">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini1_non" />Rumah Sakit Non Rujukan
          </div>
          <div class="w-1/4 h-auto">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="legend-color" style="margin-right: 0.5em;" v-html="sgvMarker.lini2_non" />Puskesmas
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { faFilter, faHome, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

export default {
  name: 'MapV2SebaranFaskes',
  props: {
    propsDataSebaranJabarFaskes: {
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
      dataJson: {
        lini1_rujukan: [],
        lini2_rujukan: [],
        lini1_non: [],
        lini2_non: []
      },

      layerGroup: '',
      dataMarker: [],
      dataLayer: [],

      styleBatasWilayah: {
        fillColor: '#D7B6AE',
        fillOpacity: 0.1,
        weight: 0.5,
        opacity: 0.5,
        color: '#ff3200'
      },

      isShowFilter: false,
      filter: {
        lini1_rujukan: true,
        lini2_rujukan: true,
        lini1_non: false,
        lini2_non: false
      },

      isShowLayer: false,
      layer: {
        custom: false,
        kota: true,
        kecamatan: false,
        kelurahan: false
      },
      layerActive: 'kota',

      sgvMarker: {
        lini1_rujukan: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="4" stroke="#5AAA4E"/>
          <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#6EBE62"/>
          <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#5AAA4E"/>
          </svg>`,
        lini2_rujukan: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="4" stroke="#2D9CDB"/>
          <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#56CCF2"/>
          <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#2D9CDB"/>
          </svg>`,
        lini1_non: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="4" stroke="#F2C94C"/>
          <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#F2D57A"/>
          <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#F2C94C"/>
          </svg>`,
        lini2_non: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="4" stroke="#856f69"/>
          <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#b2b1b1"/>
          <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#856f69"/>
          </svg>`
      }

    }
  },
  computed: {
    dataSebaranJabarFaskes () {
      return this.$store.getters['data-sebaran-jabar-faskes/itemsMap']
    }
  },
  watch: {
    // propsDataSebaranJabarFaskes () {
    //   console.log('faskes on watch')
    //   this.distributionProvinceData = this.propsDataSebaranJabarFaskes
    //   this.onChanges()
    // }
    dataSebaranJabarFaskes (val) {
      console.log('faskes on watch')
      this.distributionProvinceData = val
      this.onChanges()
    }
  },
  mounted () {
    this.initMap()
    if (this.distributionProvinceData.length > 0) {
      console.log('faskes on mounted ada')
      this.onChanges()
    } else {
      console.log('faskes on mounted no data')
    }
  },
  created () {
    console.log('faskes on created')
    // this.distributionProvinceData = this.propsDataSebaranJabarFaskes
    if (this.$store.getters['data-sebaran-jabar-faskes/itemsMap']) {
      this.distributionProvinceData = this.$store.getters['data-sebaran-jabar-faskes/itemsMap']
    }
    // this.onChanges()
  },
  methods: {
    onChanges () {
      console.log('faskes on changes')
      this.dataJson.lini1_rujukan = []
      this.dataJson.lini2_rujukan = []
      this.dataJson.lini1_non = []
      this.dataJson.lini2_non = []

      this.distributionProvinceData.forEach((row) => {
        if (row.tipe_faskes === 1 && row.nomor_rujukan === 1) {
          this.dataJson.lini1_rujukan.push(row)
        } else if (row.tipe_faskes === 1 && row.nomor_rujukan === 2) {
          this.dataJson.lini2_rujukan.push(row)
        } else if (row.tipe_faskes === 1 && row.nomor_rujukan === undefined) {
          this.dataJson.lini1_non.push(row)
        } else if (row.tipe_faskes === 2 && row.nomor_rujukan === undefined) {
          this.dataJson.lini2_non.push(row)
        }
      })
      this.removeLayer()
      this.removeMarker()
      // load data
      this.createMarker('lini1_rujukan')
      this.createMarker('lini2_rujukan')
      this.createLayerKota()
      this.setZoomLevel()
    },

    initMap () {
      this.map = this.$L.map('map-wrap-faskes', {
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
        showMarker: false,
        autoClose: true
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
          this.createLayerKota()
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13 && this.layerActive === 'custom') {
          this.removeLayer()
          // this.createLayerKota()
          this.createLayerKecamatan()
        } else if (this.map.getZoom() > 13 && this.layerActive === 'custom') {
          this.removeLayer()
          // this.createLayerKota()
          // this.createLayerKecamatan()
          this.createLayerKelurahan()
        }
      })
    },

    removeMarker () {
      this.dataMarker.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataMarker = []
    },

    createMarker (category) {
      // define style icon
      const styleMarker = {
        lini1_rujukan: '',
        lini2_rujukan: '',
        lini1_non: '',
        lini2_non: ''
      }

      // set style icon class
      for (const result of Object.keys(styleMarker)) {
        styleMarker[result] = this.$L.divIcon({
          html: this.sgvMarker[result],
          iconSize: [10, 10],
          iconAnchor: [10, 10]
        })
      }
      // loop marker pasien
      this.dataJson[category].forEach((row) => {
        if (row.latitude !== '' && row.latitude !== 'null' && row.latitude !== null &&
        row.longitude !== '' && row.longitude !== 'null' && row.longitude !== null) {
          let tipefaskes = ''
          if (row.tipe_faskes === 1) {
            tipefaskes = 'Rumah Sakit'
          } else {
            tipefaskes = 'Puskesmas'
          }
          let rujukan = ''
          if (row.nomor_rujukan === 'undefined') {
            rujukan = 'Tidak'
          } else if (row.nomor_rujukan === 1) {
            rujukan = 'Rujukan ke-1'
          } else if (row.nomor_rujukan === 2) {
            rujukan = 'Rujukan ke-2'
          } else {
            rujukan = 'Tidak'
          }
          let website = ''
          if (row.url === null) {
            website = ''
          }
          const maxHeight = 250
          const maxWidth = 320
          const popupHtml =
            `
          <h3 style="font-size: larger; margin-bottom: 5px;"><b>Detail Fasilitas Kesehatan</b></h3>
          <hr>
          <table class="table table-sm" style="color: black; font-size: small;">
              <tr><th width="100px"  style="vertical-align: top;">Nama Faskes</th><td width="150px">` +
            row.nama +
            `</td></tr>
              <tr><th>Tipe Faskes</th><td>` +
            tipefaskes +
            `</td></tr>
              <tr><th>Rujukan</th><td>` +
            rujukan +
            `</td></tr>
              <tr><th style="vertical-align: top;">Alamat</th><td>` +
            row.alamat +
            `</td></tr>
              <tr><th>Telepon</th><td>` +
            row.telepon +
            `</td></tr>
              <tr><th>Website</th><td>` +
            website +
            `</td></tr>
          </table>`
          const layerList = this.$L.marker([row.latitude, row.longitude], {
            icon: styleMarker[category]
          })
          layerList.bindPopup(popupHtml, { maxHeight, maxWidth })
          layerList.addTo(this.map)
          this.dataMarker.push(layerList)
        }
      })
    },

    removeLayer () {
      this.dataLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.dataLayer = []
    },

    createLayerKota () {
      const self = this
      this.$L.geoJSON(jsonKota, {
        style: (feature) => {
          return self.styleBatasWilayah
        },
        onEachFeature: (feature, layer, element) => {
          // add layer to map
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          layer.bindTooltip(self.titleize(feature.properties.kemendagri_kabupaten_nama))
        }
      })
    },

    createLayerKecamatan () {
      const self = this
      this.$L.geoJSON(jsonKecamatan, {
        style: (feature) => {
          return self.styleBatasWilayah
        },
        onEachFeature: (feature, layer, element) => {
          // add layer to map
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          layer.bindTooltip(
            self.titleize(feature.properties.kemendagri_kabupaten_nama) + '<br>Kecamatan ' +
            feature.properties.kemendagri_kecamatan_nama)
        }
      })
    },

    createLayerKelurahan () {
      const self = this
      this.$L.geoJSON(jsonKelurahan, {
        style: (feature) => {
          return self.styleBatasWilayah
        },
        onEachFeature: (feature, layer, element) => {
          // add layer to map
          const polygon = layer.addTo(self.map)
          self.dataLayer.push(polygon)

          // add tooltip
          layer.bindTooltip(
            self.titleize(feature.properties.kemendagri_kabupaten_nama) + '<br>Kecamatan ' +
            feature.properties.kemendagri_kecamatan_nama + '<br>Kel/Desa ' +
            feature.properties.kemendagri_desa_nama
          )
        }
      })
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },

    setFilter (category) {
      this.filter[category] = !this.filter[category]
      this.removeMarker()

      for (const cat in this.filter) {
        if (this.filter[cat]) {
          this.createMarker(cat)
        }
      }

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
