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
      <div id="map-wrap-polygon">
        <button
          class="btn-custom btn-fullscreen btn btn-light mb-2"
          style="background-color: white"
          @click="toggleFullscreen"
        >
          <font-awesome-icon v-if="fullscreen" :icon="faCompress" />
          <font-awesome-icon v-if="!fullscreen" :icon="faExpand" />
        </button>
      </div>
      <div :class="activeTitle.className" class="title-map mt-2 ml-2 p-2 rounded">
        Peta Sebaran {{ activeTitle.name }}
      </div>
      <div class="sub-title-map bg-gray-700 text-white absolute mt-2 ml-2 p-2 rounded">
        Total Kasus : {{ totalCase.toLocaleString('id') }}
      </div>
      <div class="filter-layer">
        <div class="text-right">
          <button
            class="btn-custom btn btn-light"
            style="background-color: white"
            @click="toggleBackToHome()"
          >
            <font-awesome-icon :icon="faHome" />
            <i class="fas fa-home cc-primary" style="color: black !important;" />
          </button><br>
          <button
            class="btn-custom btn btn-light mt-2"
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
            :class="filter.gabungan_aktif?'filter-active':''"
            @click="setFilter('gabungan_aktif')"
          >
            <div
              class="legend-color cluster-gabungan-aktif"
              style="margin-right: 0.5em;"
            />Gabungan Kasus Aktif
          </li>
          <li
            :class="filter.confirmation_total?'filter-active':''"
            @click="setFilter('confirmation_total')"
          >
            <div
              class="legend-color cluster-confirmation-total"
              style="margin-right: 0.5em;"
            />Terkonfirmasi Positif
          </li>
          <li
            :class="filter.confirmation_diisolasi?'filter-active':''"
            @click="setFilter('confirmation_diisolasi')"
          >
            <div
              class="legend-color cluster-confirmation-diisolasi"
              style="margin-right: 0.5em;"
            />Positif - Isolasi/ Dalam Perawatan
          </li>
          <li
            :class="filter.confirmation_selesai?'filter-active':''"
            @click="setFilter('confirmation_selesai')"
          >
            <div
              class="legend-color cluster-confirmation-selesai"
              style="margin-right: 0.5em;"
            />Positif - Selesai Isolasi/ Sembuh
          </li>
          <li
            :class="filter.confirmation_meninggal?'filter-active':''"
            @click="setFilter('confirmation_meninggal')"
          >
            <div
              class="legend-color cluster-confirmation-meninggal"
              style="margin-right: 0.5em;"
            />Positif - Meninggal
          </li>
          <li
            :class="filter.suspect_diisolasi?'filter-active':''"
            @click="setFilter('suspect_diisolasi')"
          >
            <div
              class="legend-color cluster-suspect-diisolasi"
              style="margin-right: 0.5em;"
            />Suspek - Isolasi/ Dalam Perawatan
          </li>
          <!-- <li
            :class="filter.suspect_meninggal?'filter-active':''"
            @click="setFilter('suspect_meninggal')"
          >
            <div
              class="legend-color cluster-suspect-meninggal"
              style="margin-right: 0.5em;"
            />Suspek - Meninggal
          </li> -->
          <li
            :class="filter.closecontact_dikarantina?'filter-active':''"
            @click="setFilter('closecontact_dikarantina')"
          >
            <div
              class="legend-color cluster-closecontact-dikarantina"
              style="margin-right: 0.5em;"
            />Kontak Erat - Masih Dikarantina
          </li>
        </div>
      </div>
      <div class="hint-map mt-2 p-2 text-center text-sm font-bold">
        Lakukan klik dua kali pada peta untuk memperdalam wilayah peta
      </div>
      <div class="legend-data info-legend p-3">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="mb-1" v-html="infolegend" />
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
import { faFilter, faHome, faLayerGroup, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons'
// eslint-disable-next-line no-unused-vars
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'
export default {
  name: 'MapV3SebaranPolygonIstilahBaru',
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
    },
    activeParentRegionName: {
      type: String,
      default: ''
    },
    activeCaseCategory: {
      type: String,
      default: 'confirmation_diisolasi'
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
      activeTitle: {
        className: 'cluster-confirmation-diisolasi',
        name: 'Positif - Aktif'
      },
      isShowFilter: false,
      filter: {
        gabungan_aktif: false,
        confirmation_total: false,
        confirmation_diisolasi: true,
        confirmation_meninggal: false,
        confirmation_selesai: false,
        suspect_diisolasi: false,
        // suspect_meninggal: false,
        closecontact_dikarantina: false
      },
      stat: {
        isActivePolygon: true,
        isActiveCluster: false,
        isActiveFaskes: false,
        isActiveTimeslider: false
      },
      range: [],
      infolegend: '',
      totalCase: 0,

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
      activeDataCategory: 'confirmation_diisolasi'
    }
  },
  computed: {
    dataSebaranPolygon () {
      return this.$store.getters['data-sebaran-polygon-v2/itemMap']
    },
    isLoading () {
      return this.$store.getters['data-sebaran-polygon-v2/isLoading']
    }
  },
  watch: {
    activeRegionId (newVal, oldVal) {
    },
    dataSebaranPolygon (val) {
      this.removeLayer()
      this.createPolygonRegion()
      this.countTotalCase()
      this.createLegend()
    }
  },
  mounted () {
    this.initMap()
    this.getDataSebaranPolygon(this.activeRegionCategory, this.activeDataCategory, this.activeRegionId)
  },
  created () {
  },
  methods: {
    initMap () {
      // initial map
      this.map = this.$L.map('map-wrap-polygon', {
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
          position: 'bottomleft'
        })
        .addTo(this.map)

      // add search control
      // eslint-disable-next-line no-unused-vars
      const searchProvider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider: searchProvider,
        position: 'bottomleft',
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

      let activeRegion = 'kota'
      if (featureProperties.bps_kecamatan_kode !== undefined) {
        activeRegion = 'kelurahan'
        keyParentRegion = 'bps_kecamatan_kode'
        nameParentRegion = 'kemendagri_kecamatan_nama'
      } else if (featureProperties.bps_kabupaten_kode !== undefined) {
        activeRegion = 'kecamatan'
        keyParentRegion = 'bps_kabupaten_kode'
        nameParentRegion = 'kemendagri_kabupaten_nama'
      }
      this.activeParentCode = featureProperties[keyParentRegion]

      // move map
      this.map.fitBounds(e.target.getBounds())
      this.map.flyTo(e.target.getCenter())

      this.getDataSebaranPolygon(activeRegion, this.activeDataCategory, this.activeParentCode)

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', activeRegion)
      this.$emit('update:activeParentRegionName', this.capitalizeFirstLetter(featureProperties[nameParentRegion]))
    },
    createPolygonRegion () {
      const self = this
      const dataSebaranPolygon = this.dataSebaranPolygon
      let jsonRegion = {
        type: 'FeatureCollection',
        features: []
      }
      let geojson = []
      let keyParentRegion = ''
      let keyRegion = 'bps_kabupaten_kode'
      let keyApiRegion = 'kode_kab'
      let nameRegion = 'kemendagri_kabupaten_nama'

      if (this.activeRegionCategory === 'kelurahan') {
        keyParentRegion = 'bps_kecamatan_kode'
        keyRegion = 'bps_desa_kode'
        keyApiRegion = 'kode_kel'
        geojson = jsonKelurahan
        nameRegion = 'kemendagri_desa_nama'
      } else if (this.activeRegionCategory === 'kecamatan') {
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

      if (this.activeRegionCategory !== 'kota') {
        for (let i = 0; i < geojson.features.length; i++) {
          if (geojson.features[i].properties[keyParentRegion] === this.activeRegionId) {
            jsonRegion.features.push(geojson.features[i])
          }
        }
      } else {
        jsonRegion = geojson
      }

      this.$L.geoJSON(jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          let jumlahKasus = 0
          let jumlahKasusConfirmationMeninggal = 0
          let jumlahKasusConfirmationSelesai = 0
          let jumlahKasusConfirmationDiisolasi = 0
          let jumlahKasusSuspectDiisolasi = 0
          let jumlahKasusClosecontactDikarantina = 0
          let styleBatasWilayah = {
            fillOpacity: Number,
            fillColor: String,
            weight: Number,
            opacity: Number,
            color: String
          }

          for (let i = 0; i < dataSebaranPolygon.wilayah.length; i++) {
            let color = 'rgba(59, 38, 58, 0)'
            if (feature.properties[keyRegion] === dataSebaranPolygon.wilayah[i][keyApiRegion]) {
              color = dataSebaranPolygon.wilayah[i].color
              jumlahKasus = dataSebaranPolygon.wilayah[i].value
              if (this.activeDataCategory === 'gabungan_aktif') {
                jumlahKasusConfirmationDiisolasi = dataSebaranPolygon.wilayah[i].confirmation_diisolasi
                jumlahKasusSuspectDiisolasi = dataSebaranPolygon.wilayah[i].suspect_diisolasi
                jumlahKasusClosecontactDikarantina = dataSebaranPolygon.wilayah[i].closecontact_dikarantina
              } else if (this.activeDataCategory === 'confirmation_total') {
                jumlahKasusConfirmationDiisolasi = dataSebaranPolygon.wilayah[i].confirmation_diisolasi
                jumlahKasusConfirmationSelesai = dataSebaranPolygon.wilayah[i].confirmation_selesai
                jumlahKasusConfirmationMeninggal = dataSebaranPolygon.wilayah[i].confirmation_meninggal
              }
              styleBatasWilayah = {
                fillOpacity: 1,
                fillColor: color,
                weight: 0.7,
                opacity: 0.7,
                color: '#000000'
              }
              break
            }
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
          let popup = feature.properties[nameRegion]
          if (this.activeDataCategory === 'gabungan_aktif') {
            popup += '<br>Positif - Isolasi/ Dalam Perawatan : ' + jumlahKasusConfirmationDiisolasi
            popup += '<br>Suspek - Isolasi/ Dalam Perawatan : ' + jumlahKasusSuspectDiisolasi
            popup += '<br>Kontak Erat - Masih Dikarantina : ' + jumlahKasusClosecontactDikarantina
            popup += '<br>Gabungan Kasus Aktif : ' + jumlahKasus
          } else if (this.activeDataCategory === 'confirmation_total') {
            popup += '<br>Positif - Isolasi/ Dalam Perawatan : ' + jumlahKasusConfirmationDiisolasi
            popup += '<br>Positif - Selesai Isolasi/ Sembuh : ' + jumlahKasusConfirmationSelesai
            popup += '<br>Positif - Meninggal : ' + jumlahKasusConfirmationMeninggal
            popup += '<br>Terkonfirmasi Positif : ' + jumlahKasus
          } else {
            popup += '<br>Jumlah Kasus : ' + jumlahKasus
          }
          layer.bindTooltip(popup)
        }
      })
    },
    createLegend () {
      let detailLabel = ''
      const dataSebaranPolygon = this.dataSebaranPolygon

      if (dataSebaranPolygon.range !== undefined) {
        // create legend
        const labels = ['<b>Jumlah Kasus: </b>', '<br>', '<ul style="display: flex; margin-top: 10px;overflow-x:auto">']

        let region = ''
        switch (this.activeRegionCategory) {
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
    countTotalCase () {
      const dataSebaranPolygon = this.dataSebaranPolygon
      let totalCase = 0
      let jumlahKasusConfirmationMeninggal = 0
      let jumlahKasusConfirmationSelesai = 0
      let jumlahKasusConfirmationDiisolasi = 0
      let jumlahKasusSuspectDiisolasi = 0
      let jumlahKasusClosecontactDikarantina = 0
      for (let i = 0; i < dataSebaranPolygon.wilayah.length; i++) {
        if (this.activeDataCategory === 'gabungan_aktif') {
          jumlahKasusConfirmationDiisolasi = dataSebaranPolygon.wilayah[i].confirmation_diisolasi
          jumlahKasusSuspectDiisolasi = dataSebaranPolygon.wilayah[i].suspect_diisolasi
          jumlahKasusClosecontactDikarantina = dataSebaranPolygon.wilayah[i].closecontact_dikarantina

          totalCase += jumlahKasusConfirmationDiisolasi + jumlahKasusSuspectDiisolasi + jumlahKasusClosecontactDikarantina
        } else if (this.activeDataCategory === 'confirmation_total') {
          jumlahKasusConfirmationDiisolasi = dataSebaranPolygon.wilayah[i].confirmation_diisolasi
          jumlahKasusConfirmationSelesai = dataSebaranPolygon.wilayah[i].confirmation_selesai
          jumlahKasusConfirmationMeninggal = dataSebaranPolygon.wilayah[i].confirmation_meninggal

          totalCase += jumlahKasusConfirmationDiisolasi + jumlahKasusConfirmationSelesai + jumlahKasusConfirmationMeninggal
        } else {
          totalCase += dataSebaranPolygon.wilayah[i][this.activeDataCategory]
        }
      }

      this.totalCase = totalCase
    },
    onLayerClicked (e) {
      this.changeRegionMap(e)
      // this.removeLayer()
    },
    onFullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-polygon').style.height = '85%'
      } else {
        document.getElementById('map-wrap-polygon').style.height = '500px'
      }
    },
    toggleFullscreen () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.onFullscreenChange
      })
    },
    toggleSearch () {
    },
    toggleBackToHome () {
      this.activeRegion = 'kota'
      this.activeParentCode = ''
      this.map.flyTo([-6.932694, 107.627449], 8)

      this.getDataSebaranPolygon(this.activeRegion, this.activeDataCategory)

      // update props region
      this.$emit('update:activeRegionId', this.activeParentCode)
      this.$emit('update:activeRegionCategory', this.activeRegion)
      this.$emit('update:activeParentRegionName', 'Jawa Barat')
    },

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    setFilter (category) {
      this.setTitle(category)
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.activeDataCategory = category
      // this.removeLayer()
      this.getDataSebaranPolygon(this.activeRegionCategory, this.activeDataCategory, this.activeParentCode)
      // this.createPolygonRegion()
      this.$emit('update:activeCaseCategory', category)
    },
    setTitle (category) {
      switch (category) {
        case 'gabungan_aktif': {
          this.activeTitle = {
            name: 'Gabungan Kasus Aktif',
            className: 'cluster-gabungan-aktif'
          }
          break
        }
        case 'confirmation_total': {
          this.activeTitle = {
            name: 'Terkonfirmasi Positif',
            className: 'cluster-confirmation-total'
          }
          break
        }
        case 'confirmation_selesai': {
          this.activeTitle = {
            name: 'Positif - Selesai Isolasi/ Sembuh',
            className: 'cluster-confirmation-selesai'
          }
          break
        }
        case 'confirmation_meninggal': {
          this.activeTitle = {
            name: 'Positif - Meninggal',
            className: 'cluster-confirmation-meninggal'
          }
          break
        }
        case 'confirmation_diisolasi': {
          this.activeTitle = {
            name: 'Positif - Isolasi/ Dalam Perawatan',
            className: 'cluster-confirmation-diisolasi'
          }
          break
        }
        case 'suspect_diisolasi': {
          this.activeTitle = {
            name: 'Suspek - Isolasi/ Dalam Perawatan',
            className: 'cluster-suspect-diisolasi'
          }
          break
        }
        // case 'suspect_meninggal': {
        //   this.activeTitle = {
        //     name: 'Suspek - Meninggal',
        //     className: 'cluster-suspect-meninggal'
        //   }
        //   break
        // }
        case 'closecontact_dikarantina': {
          this.activeTitle = {
            name: 'Kontak Erat - Masih Dikarantina',
            className: 'cluster-closecontact-dikarantina'
          }
          break
        }
        default: {
          this.activeTitle = {
            name: 'Positif - Isolasi/ Dalam Perawatan',
            className: 'cluster-confirmation-diisolasi'
          }
        }
      }
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

      this.$store.dispatch('data-sebaran-polygon-v2/getItem', query)
    }
  }
}
</script>

<style scoped>
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
  .filter-active {
    opacity: 1 !important;
  }
  .filter-layer {
    position: absolute;
    top: 0px;
    right: 0px;
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
    right: 10px;
    font-size: 1.3em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 401;
  }

  .btn-search {
    position: absolute;
    bottom: 40px;
    right: 10px;
    font-size: 1.3em;
    padding: 2px 6px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    z-index: 401;
  }
  .btn-custom {
    width: 1.7rem;
    height: 1.7rem;
    border-radius: 0.3rem;
  }

  .cluster-gabungan-aktif {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid #c8641b;
    background: #c8641b;
  }
  .cluster-confirmation-total {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(44,52,124, 0.9);
    background: rgb(44,52,124, 0.9);
  }
  .cluster-confirmation-diisolasi {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(206, 181, 28, 0.9);
    background: rgb(206, 181, 70, 0.9);
  }

  .cluster-confirmation-selesai {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(39, 174, 96, 0.9);
    background: rgb(39, 174, 96, 0.9);
  }

  .cluster-confirmation-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(235, 87, 87, 0.9); */
    border: 2px solid rgb(165,18,18, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .cluster-closecontact-dikarantina {
    /* box-shadow: 0 0 5px 0 rgb(45, 156, 219, 0.9); */
    border: 2px solid rgb(255,156,67, 0.9);
    background: rgb(255,156,67, 0.9);
  }

  .cluster-suspect-diisolasi {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-suspect-discarded {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(242, 201, 76, 0.9);
    background: rgba(196, 195, 195, 0.9);
  }

  .cluster-suspect-meninggal {
    /* box-shadow: 0 0 5px 0 rgb(242, 201, 76, 0.9); */
    border: 2px solid rgb(165,18,18, 0.9);
    background: rgb(165,18,18, 0.9);
  }

  .title-map {
    position: absolute;
    top: 0;
    color: #ffffff;
  }

  .sub-title-map{
    top: 50px;
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

  .hint-map {
    background-color: #eaeab8;
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

  /*  ========== GEOSEARCH CONTROL ===============*/
  /* global styling */
.leaflet-control-geosearch *,
.leaflet-control-geosearch *:before,
.leaflet-control-geosearch *:after {
  box-sizing: border-box;
}

/* leaflet button styling */
.leaflet-control-geosearch .leaflet-bar-part {
  border-radius: 4px;
  border-bottom: none;
}

.leaflet-control-geosearch a.leaflet-bar-part:before,
.leaflet-control-geosearch a.leaflet-bar-part:after {
  position: absolute;
  display: block;
  content: '';
}

/* magnifying glass */
.leaflet-control-geosearch a.leaflet-bar-part:before {
  top: 19px;
  left: 16px;
  width: 8px;
  border-top: 2px solid #555;
  transform: rotateZ(45deg);
}

.leaflet-control-geosearch a.leaflet-bar-part:after {
  top: 6px;
  left: 6px;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 2px solid #555;
}

/* resets for pending and error icons */
.leaflet-control-geosearch.error a.leaflet-bar-part:before,
.leaflet-control-geosearch.pending a.leaflet-bar-part:before {
  display: none;
}

.leaflet-control-geosearch.pending a.leaflet-bar-part:after,
.leaflet-control-geosearch.error a.leaflet-bar-part:after {
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
}

/* pending icon */
.leaflet-control-geosearch.pending a.leaflet-bar-part:after {
  content: '';
  border: 2px solid #555;
  border-top: 2px solid #f3f3f3;
  animation: spin 1s linear infinite;
}

/* error icon */
.leaflet-control-geosearch.error a.leaflet-bar-part:after {
  content: '!';
  line-height: initial;
  font-weight: 600;
  font-size: 18px;
  border: none;
}

/* search form styling */
.leaflet-control-geosearch form {
  display: none;
  position: absolute;
  top: -2px;
  left: 28px;
  border-radius: 0 4px 4px 0;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-left: none;
  background-color: #fff;
  background-clip: padding-box;
  z-index: -1;
  height: auto;
  margin: 0;
  padding: 0 8px;
}

.leaflet-control-geosearch.active form {
  display: block;
}

.leaflet-control-geosearch form input {
  min-width: 200px;
  width: 100%;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  font-size: 12px;
  height: 30px;
  border-radius: 0 4px 4px 0;
  text-indent: 8px;
}

.leaflet-control-geosearch .results {
  background: #fff;
}

.leaflet-control-geosearch .results > * {
  line-height: 24px;
  padding: 0 8px;
  border: 1px solid transparent;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.leaflet-control-geosearch .results.active {
  padding: 8px 0;
  border-top: 1px solid #c6c6c6;
  height: 60px;
  overflow: auto;
}

.leaflet-control-geosearch .results > .active,
.leaflet-control-geosearch .results > :hover {
  background-color: #f8f8f8;
  border-color: #c6c6c6;
  cursor: pointer;
}

/* add missing border to form */
.leaflet-control-geosearch .results.active:after {
  content: '';
  display: block;
  width: 0;
  border-left: 2px solid rgba(0, 0, 0, .2);
  position: absolute;
  left: -2px;
  bottom: -2px;
  top: 30px;
}

/* animations */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

</style>
