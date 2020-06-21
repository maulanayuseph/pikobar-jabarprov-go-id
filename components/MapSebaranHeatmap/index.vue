<template>
  <div class="bg-white overflow-hidden rounded-lg shadow-md">
    <div class="container-map">
      <div id="map-wrap-heat" style="height: 50em;z-index:0;">
        <button
          class="btn-fullscreen btn btn-light mb-2"
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
      <div v-if="!isHiddenDisclaimer" class="disclaimer">
        <div class="backdrop" />
        <div class="text-disclaimer">
          <div class="title">
            Disclaimer
          </div>
          <!-- <div class="subtitle">
            Sumber: Dinas Kesehatan Provinsi Jawa Barat
          </div> -->
          <div class="description mt-5 text-center pl-5 pr-5">
            Saat ini, data yang Pikobar tampilkan berasal dari sinkronisasi data dengan Dinas Kesehatan Kabupaten/Kota. Proses ini mungkin membutuhkan waktu 1-2 hari setiap perbaruan data terjadi. Oleh karena itu, untuk sementara Anda mungkin melihat perbedaan antara angka yang tampil di Pikobar dengan yang diumumkan di kabupaten/kota selama proses sinkronisasi berlangsung. Silakan periksa kembali 1-2 hari setelah perbaruan terakhir dari masing-masing kabupaten/kota.

            <div class="text-center mt-4">
              Terima kasih dan mohon untuk dimaklumi.
            </div>
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
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

export default {
  name: 'MapSebaranHeatmap',
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
      map: '',
      fullscreen: false,
      isRendered: false,
      isHiddenDisclaimer: false,
      isShowFilter: false,
      activeLayer: 'positif_proses',
      listLayer: [],
      activeTitle: {
        className: 'cluster-positif-proses',
        name: 'Positif - Aktif'
      },
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
      faFilter,
      faHome,
      faLayerGroup,
      faExpand,
      faCompress
    }
  },
  computed: {
  },
  watch: {
    activeId () {
      if (this.activeId === 'map-kel' && !this.isRendered) {
        this.initMap()
      }
    }
  },
  mounted () {
  },
  created () {
    console.log('polygon on created')
    // this.distributionProvinceData = this.propsDataSebaranJawaBarat
    if (this.$store.getters['data-sebaran-jabar/itemsMap']) {
      this.distributionProvinceData = this.$store.getters['data-sebaran-jabar/itemsMap']
    }
  },
  methods: {
    initMap () {
      this.map = this.$L.map('map-wrap-heat', {
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

      this.isRendered = true
    },
    createBorderLine (category) {
      const self = this
      let jsonRegion = ''
      let nameRegion = ''
      if (category === 'kota') {
        jsonRegion = jsonKota
        nameRegion = 'kemendagri_kabupaten_nama'
      } else if (category === 'kecamatan') {
        jsonRegion = jsonKecamatan
        nameRegion = 'kemendagri_kecamatan_nama'
      } else if (category === 'kelurahan') {
        jsonRegion = jsonKelurahan
        nameRegion = 'kemendagri_desa_nama'
      }

      this.$L.geoJSON(jsonRegion, {
        onEachFeature: (feature, layer, element) => {
          // create style color gradien
          const styleBatasWilayah = {
            fillOpacity: 0,
            fillColor: 'red',
            weight: 0.7,
            opacity: 1,
            color: '#000000'
          }
          // add layer to map
          layer.setStyle(styleBatasWilayah)
          const polygon = layer.addTo(self.map)
          self.listLayer.push(polygon)

          // add tooltip
          const popup = feature.properties[nameRegion]
          layer.bindTooltip(popup)
        }
      })
    },
    createHeatmap () {
      const dataHeat = []

      // heat
      // eslint-disable-next-line new-cap
      if (this.dataJson) {
        this.dataJson[this.activeLayer].forEach((row) => {
          dataHeat.push([row.latitude, row.longitude])
        })
      }
      const heatLayer = this.$L.heatLayer(
        dataHeat,
        {
          radius: 25,
          minOpacity: 0.5,
          position: 'front'
        }).addTo(this.map)

      this.listLayer.push(heatLayer)
    },
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    onChanges () {
      const dataJson = {
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
      if (this.distributionProvinceData) {
        this.distributionProvinceData.forEach((row) => {
          if (row.status === 'Positif' && row.stage === 'Proses') {
            dataJson.positif_proses.push(row)
          } else if (row.status === 'Positif' && row.stage === 'Meninggal') {
            dataJson.positif_meninggal.push(row)
          } else if (row.status === 'Positif' && row.stage === 'Sembuh') {
            dataJson.positif_sembuh.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Proses') {
            dataJson.pdp_proses.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Selesai') {
            dataJson.pdp_selesai.push(row)
          } else if (row.status === 'PDP' && row.stage === 'Meninggal') {
            dataJson.pdp_meninggal.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Proses') {
            dataJson.odp_proses.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Selesai') {
            dataJson.odp_selesai.push(row)
          } else if (row.status === 'ODP' && row.stage === 'Meninggal') {
            dataJson.odp_meninggal.push(row)
          }
        })
        this.dataJson = dataJson
        this.createHeatmap()
      }
    },
    onClickDisclaimer () {
      if (this.$store.getters['data-sebaran-jabar/itemsMap']) {
        this.distributionProvinceData = this.$store.getters['data-sebaran-jabar/itemsMap']
      }

      if (this.distributionProvinceData) {
        this.isHiddenDisclaimer = true
        this.onChanges()
      }

      // this.createBorderLine('kota')
    },
    backToHome () {
      this.map.flyTo([-6.932694, 107.627449], 9)
    },
    toggleFullscreen () {
      this.$fullscreen.toggle(this.$el.querySelector('.container-map'), {
        wrap: false,
        callback: this.fullscreenChange
      })
    },
    fullscreenChange (fullscreen) {
      this.fullscreen = fullscreen
      if (fullscreen) {
        document.getElementById('map-wrap-heat').style.height = '100%'
      } else {
        document.getElementById('map-wrap-heat').style.height = '500px'
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
    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    setFilter (category) {
      this.setTitle(category)
      for (const cat of Object.keys(this.filter)) {
        this.filter[cat] = false
      }
      this.filter[category] = !this.filter[category]
      this.activeLayer = category
      this.removeLayer()
      this.createHeatmap()
    }

  }
}
</script>

<style scoped>
.container-map {
    width:100%;
    height:100%;
    position: relative;
    background-color: #ffffff;
}
.btn {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 0.25rem;
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

/* cluster color */
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

/*  */

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
</style>
