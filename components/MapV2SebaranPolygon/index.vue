<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-polygon"
        style="height: 500px; width: 100%; z-index:0; position: relative;">
        <button
          class="btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggle"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
      <div :class="activeTitle.className" class="title-map mt-2 ml-2 p-2 rounded">
        Peta Sebaran {{ activeTitle.name }}
      </div>
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
      <div v-if="!isHiddenDisclaimer" class="disclaimer">
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
          <button class="px-6 py-2 bg-brand-green hover:bg-brand-green-lighter text-white rounded-lg shadow-md mt-8" style="color: #fff" @click="onClickDisclaimer">
            <b>Mengerti</b>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import Percentile from '@iusername/percentile'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

export default {
  name: 'MapV2SebaranPolygon',
  props: {
    propsDataSebaranJawaBarat: {
      type: Array,
      default: () => [{}]
    },
    activeId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      fullscreen: false,
      map: '',
      zoom: 9,
      isHiddenDisclaimer: false,
      isRendered: false,

      faFilter,
      faHome,
      faLayerGroup,
      faExpand,
      faCompress,

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
        positif_proses: ['#ffa3cf', '#940047'],
        positif_meninggal: ['#ffbea0', '#7D0005'],
        positif_sembuh: ['#92ffdc', '#00441F'],
        pdp_proses: ['#fff8d4', '#F0BE06'],
        pdp_selesai: ['#ffefbb', '#EFA400'],
        pdp_meninggal: ['#fff1af', '#C79403'],
        odp_proses: ['#b3d3ff', '#2962BD'],
        odp_selesai: ['#90e6ff', '#053755'],
        odp_meninggal: ['#8cd6ff', '#02275D']
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
      activeTitle: {
        className: 'cluster-positif-proses',
        name: 'Positif - Aktif'
      },
      rangeColor: {
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

      range: [],
      infolegend: '',
      totalPerCluster: {
        kota: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        kecamatan: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        },
        kelurahan: {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0
        }
      }
    }
  },
  computed: {
    dataSebaranJabar () {
      return this.$store.getters['data-sebaran-jabar/itemsMap']
    }
  },
  watch: {
    // propsDataSebaranJawaBarat () {
    //   console.log('polygon on watch')
    //   this.distributionProvinceData = this.propsDataSebaranJawaBarat
    //   this.onChanges()
    // }
    dataSebaranJabar (val) {
      console.log('polygon on watch')
      this.distributionProvinceData = val
      // this.onChanges()
    },
    activeId () {
      if (this.activeId === 'map-area' && !this.isRendered) {
        this.initMap()
      }
    }
  },
  mounted () {
    if (this.activeId === 'map-area' && !this.isRendered) {
      this.initMap()
    }

    if (this.distributionProvinceData.length > 0) {
      console.log('polygon on mounted ada')
      // this.onChanges()
    } else {
      console.log('polygon on mounted no data')
    }
  },
  created () {
    console.log('polygon on created')
    // this.distributionProvinceData = this.propsDataSebaranJawaBarat
    if (this.$store.getters['data-sebaran-jabar/itemsMap']) {
      this.distributionProvinceData = this.$store.getters['data-sebaran-jabar/itemsMap']
    }
    // this.onChanges()
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
      })

      this.removeLayer()
      this.removeMarker()
      this.createLayerKota(this.filterActive)
      this.setZoomLevel()
    },
    onClickDisclaimer () {
      if (this.distributionProvinceData.length > 0 && this.isRendered) {
        this.isHiddenDisclaimer = true
        this.onChanges()
      }
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
      // this.$L.control
      //   .fullscreen({
      //     position: 'bottomleft'
      //   })
      //   .addTo(this.map)

      // add search control
      const searchProvider = new OpenStreetMapProvider()
      // eslint-disable-next-line no-unused-vars
      const searchControl = new GeoSearchControl({
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
      this.isRendered = true
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

    createLegend () {
      let detailLabel = ''
      // create legend
      const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;">']

      let region = ''
      switch (this.layerActive) {
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
      detailLabel = '<li style="margin-right: 20px;"><i style="background:#ffffff;border: 1px solid #000000;width: 13px;height: 13px;float: left;margin-right: 8px;' +
          'opacity: 1;"></i>' + '0 - 0'
      detailLabel += ' <br> <span class="text-xs">' + this.totalPerCluster[this.layerActive][0] + ' ' + region + '</span></li>'
      labels.push(
        detailLabel
      )
      this.range.forEach((element, index) => {
        detailLabel = '<li style="margin-right: 20px;"><i style="background:' + this.rangeColor[this.filterActive][index] + '; ' +
            'opacity: 1; width: 13px;height: 13px;float: left;margin-right: 8px;border: white 1px solid;"></i>' +
            element.from + ' - ' + element.to
        detailLabel += ' <br> <span class="text-xs">' + this.totalPerCluster[this.layerActive][index + 1] + ' ' + region + '</span></li>'
        labels.push(
          detailLabel
        )
      })
      labels.push('</ul>')
      this.infolegend = labels.join('')
    },

    createLayerKota (category) {
      const self = this
      const result = this.createRange(category, 'kota', this.dataJson[category], jsonKota.features)
      this.range = result[0]
      this.dataKota = result[1]

      this.$L.geoJSON(this.dataKota, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
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
          popup += '<br>Jumlah Kasus : ' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })

      this.createLegend()
    },

    createLayerKecamatan (category) {
      const self = this
      const result = this.createRange(category, 'kecamatan', this.dataJson[category], jsonKecamatan.features)
      this.range = result[0]
      this.dataKecamatan = result[1]

      this.$L.geoJSON(this.dataKecamatan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
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
          popup += '<br>Jumlah Kasus : ' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
      this.createLegend()
    },

    createLayerKelurahan (category) {
      const self = this
      const result = this.createRange(category, 'kelurahan', this.dataJson[category], jsonKelurahan.features)
      this.range = result[0]
      this.dataKelurahan = result[1]

      this.$L.geoJSON(this.dataKelurahan, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
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
          popup += '<br>Jumlah Kasus :' + feature.properties.jumlah_kasus
          layer.bindTooltip(popup)
        }
      })
      this.createLegend()
    },

    createRange (category, wilayah, data, geojson) {
      // count case per area (grouping)
      let occurences = []
      if (wilayah === 'kota') {
        occurences = data.reduce(function (r, row) {
          r[row.kode_kab] = ++r[row.kode_kab] || 1
          return r
        }, {})
      } else if (wilayah === 'kecamatan') {
        occurences = data.reduce(function (r, row) {
          r[row.kode_kec] = ++r[row.kode_kec] || 1
          return r
        }, {})
      } else if (wilayah === 'kelurahan') {
        occurences = data.reduce(function (r, row) {
          r[row.kode_kel] = ++r[row.kode_kel] || 1
          return r
        }, {})
      }

      // define data for generate cluster
      let arrTobePercentile = []
      Object.keys(occurences).forEach(function (key) {
        arrTobePercentile.push(occurences[key])
      })

      // loop data geojson
      geojson.forEach((feature) => {
        let sum = 0
        let temp = {}
        if (wilayah === 'kota') {
          // check if jumlah kasus is not null
          if (occurences[feature.properties.bps_kabupaten_kode]) {
            sum = occurences[feature.properties.bps_kabupaten_kode]
          }
        } else if (wilayah === 'kecamatan') {
          // check if jumlah kasus is not null
          if (occurences[feature.properties.bps_kecamatan_kode]) {
            sum = occurences[feature.properties.bps_kecamatan_kode]
          }
        } else if (wilayah === 'kelurahan') {
          // check if jumlah kasus is not null
          if (occurences[feature.properties.bps_desa_kode]) {
            sum = occurences[feature.properties.bps_desa_kode]
          }
        }
        // add data jumlah kasus to geojson
        temp = { jumlah_kasus: sum }
        feature.properties = { ...feature.properties, ...temp }
      })

      // prepare hierarchical clustering
      const percentile = new Percentile()
      let count = 5
      let isDuplicate = false
      let arrPercentile = []

      // looping hierarchical clustering
      do {
        // define differencial per cluster
        const diff = 100 / count

        // count percentile
        for (let j = 0; j < count + 1; j++) {
          const perc = Math.ceil(percentile.incOnce(arrTobePercentile, j * diff))
          arrPercentile.push(perc)
        }

        // check if data percentile is duplicate (not valid)
        isDuplicate = this.isDuplicate(arrPercentile)
        if (isDuplicate === false) {
          // if valid then finish
          break
        } else {
          // if duplicate then looping again (hierarchical)
          count--
          arrTobePercentile = arrPercentile
          arrPercentile = []
        }
      } while (count >= 1)

      // create range
      const range = []
      for (let i = 0; i < arrPercentile.length - 1; i++) {
        range.push({ from: arrPercentile[i], to: arrPercentile[i + 1] })
      }

      // create range color
      const color = this.generateRangeColor(this.styleColorPolygon[category][0], this.styleColorPolygon[category][1], range.length)
      this.rangeColor[category] = color

      return [range, geojson]
    },

    isDuplicate (arrPercentile) {
      return arrPercentile.length !== new Set(arrPercentile).size
    },

    getColor (range, angka, category) {
      // define color
      let color = ''
      if (angka === 0) {
        this.totalPerCluster[this.layerActive][0] += 1
        color = '#ffffff'
      } else {
        // loop data range, match data
        for (let i = 0; i <= range.length - 1; i++) {
          if (angka >= range[i].from && angka <= range[i].to) {
            this.totalPerCluster[this.layerActive][i + 1] += 1
            color = this.rangeColor[category][i]
          }
        }
      }
      // return color
      return color
    },

    processHEX (val) {
      const hex = (val.length > 6) ? val.substr(1, val.length - 1) : val
      let r
      let g
      let b
      if (hex.length > 3) {
        r = hex.substr(0, 2)
        g = hex.substr(2, 2)
        b = hex.substr(4, 2)
      } else {
        r = hex.substr(0, 1) + hex.substr(0, 1)
        g = hex.substr(1, 1) + hex.substr(1, 1)
        b = hex.substr(2, 1) + hex.substr(2, 1)
      }
      return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16)
      ]
    },

    pad (n, width, z) {
      z = z || '0'
      n = n + ''
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
    },

    generateRangeColor (val1El, val2El, stepsEl) {
      const val1RGB = this.processHEX(val1El)
      const val2RGB = this.processHEX(val2El)
      const colors = []

      const stepsInt = parseInt(stepsEl, 10)
      const stepsPerc = 100 / (stepsInt + 1)

      const valClampRGB = [
        val2RGB[0] - val1RGB[0],
        val2RGB[1] - val1RGB[1],
        val2RGB[2] - val1RGB[2]
      ]

      for (let i = 0; i < stepsInt; i++) {
        const clampedR = (valClampRGB[0] > 0)
          ? this.pad((Math.round(valClampRGB[0] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
          : this.pad((Math.round((val1RGB[0] + (valClampRGB[0]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2)

        const clampedG = (valClampRGB[1] > 0)
          ? this.pad((Math.round(valClampRGB[1] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
          : this.pad((Math.round((val1RGB[1] + (valClampRGB[1]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2)

        const clampedB = (valClampRGB[2] > 0)
          ? this.pad((Math.round(valClampRGB[2] / 100 * (stepsPerc * (i + 1)))).toString(16), 2)
          : this.pad((Math.round((val1RGB[2] + (valClampRGB[2]) / 100 * (stepsPerc * (i + 1))))).toString(16), 2)
        colors[i] = [
          '#',
          clampedR,
          clampedG,
          clampedB
        ].join('')
      }
      return colors
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },

    resetTotalCluster () {
      this.totalPerCluster[this.layerActive] = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      }
    },

    setFilter (category) {
      this.resetTotalCluster()

      this.setTitle(category)
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

    setTitle (category) {
      switch (category) {
        case 'positif_sembuh': {
          this.activeTitle = {
            name: 'Positif - Sembuh',
            className: 'cluster-positif-sembuh'
          }
          break
        }
        case 'positif_meninggal': {
          this.activeTitle = {
            name: 'Positif - Meninggal',
            className: 'cluster-positif-meninggal'
          }
          break
        }
        case 'pdp_proses': {
          this.activeTitle = {
            name: 'PDP - Proses',
            className: 'cluster-pdp-proses'
          }
          break
        }
        case 'pdp_meninggal': {
          this.activeTitle = {
            name: 'PDP - Meninggal',
            className: 'cluster-pdp-meninggal'
          }
          break
        }
        case 'odp_proses': {
          this.activeTitle = {
            name: 'ODP - Proses',
            className: 'cluster-odp-proses'
          }
          break
        }
        case 'odp_meninggal': {
          this.activeTitle = {
            name: 'ODP - Meninggal',
            className: 'cluster-odp-meninggal'
          }
          break
        }
        default: {
          this.activeTitle = {
            name: 'Positif - Aktif',
            className: 'cluster-positif-proses'
          }
        }
      }
    },

    showLayer () {
      this.isShowLayer = !this.isShowLayer
    },

    setLayer (category) {
      this.resetTotalCluster()

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
<style>

@import "leaflet-geosearch/assets/css/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>
<style scoped>
.bg-green-100 {
  background-color: #5AAA4E;
}
.text-white {
  color: white;
}
.btn {
  border-radius: 0.25rem;
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

.filter-active {
    opacity: 1 !important;
}

.filter-data {
    background: #fff;
    color: black;
    margin-top: 0.5em;
    padding: 0.6em;
    border-radius: 0.6em;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
}

.legend-color {
    width: 1em;
    height: 1em;
    float: left;
    border-radius: 10px;
    margin-top: 4px;
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

.legend-layer {
  /* position: absolute; */
  /* bottom: 10px; */
  /* left: 30px; */
  /* padding-right: 1em; */
  /* padding-top: 1em; */
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

/* .legend-data i {
  width: 13px;
  height: 13px;
  float: left;
  margin-right: 8px;
  border: white 1px solid;
} */

.leaflet-div-icon {
  border: none!important;
  border-radius: 20px;
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

.text-disclaimer {
  top:15%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
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

.btn-fullscreen {
  position: absolute;
  bottom: 0px;
  left: 10px;
  font-size: 1.3em;
  padding: 2px 6px;
  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
  z-index: 401;
}

.btn-fullscreen:hover {
  cursor: pointer;
}

.title-map {
  position: absolute;
  top: 0;
  color: #ffffff;
}

</style>
