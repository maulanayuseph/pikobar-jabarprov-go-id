<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-cluster"
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
          <li
            :class="filter.pdp_selesai?'filter-active':''"
            @click="setFilter('pdp_selesai')"
          >
            <div
              class="legend-color cluster-pdp-selesai"
              style="margin-right: 0.5em;"
            />PDP - Selesai
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
            :class="filter.odp_proses?'filter-active':''"
            @click="setFilter('odp_proses')"
          >
            <div
              class="legend-color cluster-odp-proses"
              style="margin-right: 0.5em;"
            />ODP - Proses
          </li>
          <li
            :class="filter.odp_selesai?'filter-active':''"
            @click="setFilter('odp_selesai')"
          >
            <div
              class="legend-color cluster-odp-selesai"
              style="margin-right: 0.5em;"
            />ODP - Selesai
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
            <div
              class="legend-color cluster-pdp-selesai"
              style="margin-right: 0.5em;"
            />PDP - Selesai <br>
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
            <div
              class="legend-color cluster-odp-selesai"
              style="margin-right: 0.5em;"
            />ODP - Selesai <br>
            <div
              class="legend-color cluster-odp-meninggal"
              style="margin-right: 0.5em;"
            />ODP - Meninggal <br>
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
    </div>
  </div>
</template>

<script>
import { faFilter, faHome, faLayerGroup } from '@fortawesome/free-solid-svg-icons'
import * as turf from '@turf/turf'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'
import jsonKota from '@/assets/kotaV2.json'
import jsonKecamatan from '@/assets/kecamatanV2.json'
import jsonKelurahan from '@/assets/kelurahanV2.json'

export default {
  name: 'MapV2SebaranCluster',
  props: {
    propsDataSebaranJabar: {
      type: Array,
      default: () => [{}]
    }
  },
  data () {
    return {
      map: '',
      zoom: 9,
      isHidden: false,
      layerGroup: '',

      faFilter,
      faHome,
      faLayerGroup,

      distributionProvinceData: [],

      clusterKota: [],
      clusterKecamatan: [],
      clusterKelurahan: [],

      styleBatasWilayah: {
        fillColor: '#D7B6AE',
        fillOpacity: 0.1,
        weight: 0.5,
        opacity: 0.5,
        color: '#ff3200'
      },

      markersList: [],

      jsonData: [],
      dataMarker: [],
      dataLayer: [],

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

      isShowFilter: false,
      filter: {
        positif_proses: false,
        positif_meninggal: true,
        positif_sembuh: true,
        pdp_proses: false,
        pdp_selesai: false,
        pdp_meninggal: false,
        odp_proses: false,
        odp_selesai: false,
        odp_meninggal: false
      },

      isShowLayer: false,
      layer: {
        custom: false,
        kota: true,
        kecamatan: false,
        kelurahan: false
      },
      layerActive: 'kota',

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
      statusOpenedMap: ''
    }
  },
  watch: {
    propsDataSebaranJabar () {
      console.log('cluster on watch')
      this.distributionProvinceData = this.propsDataSebaranJabar
      this.onChanges()
    }
  },
  mounted () {
    this.initMap()
    if (this.distributionProvinceData.length > 0) {
      console.log('cluster on mounted ada')
      this.onChanges()
    } else {
      console.log('cluster on mounted no data')
    }
  },
  created () {
    console.log('cluster on created')
    this.distributionProvinceData = this.propsDataSebaranJabar
    // this.onChanges()
  },
  methods: {

    onChanges () {
      console.log('cluster on changes')

      this.jsonData = []
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
      this.setFilter('positif_proses')
      this.createLayerByKota()
      this.setZoomLevel()
    },

    initMap () {
      // eslint-disable-next-line new-cap
      this.map = new this.$L.map('map-wrap-cluster', {
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
    },

    setZoomLevel () {
      // listening zoomed level
      this.map.on('zoomend', () => {
        if (this.map.getZoom() <= 10 && this.layerActive === 'custom') {
          this.createLayerByKota()
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13 && this.layerActive === 'custom') {
          this.createLayerByKecamatan()
        } else if (this.map.getZoom() > 13 && this.layerActive === 'custom') {
          this.createLayerByKelurahan()
        }
      })
    },

    createLayerByKota () {
      const self = this
      this.removeLayer()
      this.removeMarker()
      self.statusOpenedMap = 'Kota'
      // looping polygon area
      this.$L.geoJSON(jsonKota, { style: this.styleBatasWilayah }).eachLayer((element) => {
        if (this.map.getBounds().intersects(element._bounds)) {
          // polygon area
          const layerWilayah = element.addTo(this.map)
          this.dataLayer.push(layerWilayah)
          element.bindTooltip(self.titleize(element.feature.properties.kemendagri_kabupaten_nama))
          // create cluster
          this.clusterKota[element.feature.properties.bps_kabupaten_kode] = this.paramMarkerCluster()
          // looping data
          this.jsonData.forEach((elPasien) => {
            if (elPasien.latitude !== null) {
              const point = turf.point([elPasien.longitude, elPasien.latitude])
              const isInside = turf.inside(point, element.feature)
              if (isInside) {
                // add data to marker
                this.addMarkerLayer(this.clusterKota, element, elPasien, 'Kota')
              }
            }
          })
          // add data to cluster
          this.addMarkerClusterLayer(this.clusterKota, element, 'Kota')
        }
      })
    },

    createLayerByKecamatan () {
      const self = this
      this.removeLayer()
      this.removeMarker()
      self.statusOpenedMap = 'Kecamatan'
      // looping polygon area
      this.$L.geoJSON(jsonKecamatan, { style: this.styleBatasWilayah }).eachLayer((element) => {
        if (this.map.getBounds().intersects(element._bounds)) {
          // polygon area
          const layerWilayah = element.addTo(this.map)
          this.dataLayer.push(layerWilayah)
          element.bindTooltip(
            self.titleize(element.feature.properties.kemendagri_kabupaten_nama) +
            '<br>Kecamatan ' + element.feature.properties.kemendagri_kecamatan_nama
          )
          // create cluster
          this.clusterKecamatan[element.feature.properties.bps_kecamatan_kode] = this.paramMarkerCluster()
          // looping data
          this.jsonData.forEach((elPasien) => {
            if (elPasien.latitude !== null) {
              const point = turf.point([elPasien.longitude, elPasien.latitude])
              const isInside = turf.inside(point, element.feature)
              if (isInside) {
                // add data to marker
                this.addMarkerLayer(this.clusterKecamatan, element, elPasien, 'Kecamatan')
              }
            }
          })
          // add data to cluster
          this.addMarkerClusterLayer(this.clusterKecamatan, element, 'Kecamatan')
        }
      })
    },

    createLayerByKelurahan () {
      const self = this
      this.removeLayer()
      this.removeMarker()
      self.statusOpenedMap = 'Kelurahan'
      // looping polygon area
      this.$L.geoJSON(jsonKelurahan, { style: this.styleBatasWilayah }).eachLayer((element) => {
        if (this.map.getBounds().intersects(element._bounds)) {
          // polygon area
          const layerWilayah = element.addTo(this.map)
          this.dataLayer.push(layerWilayah)
          element.bindTooltip(
            self.titleize(element.feature.properties.kemendagri_kabupaten_nama) +
            '<br>Kecamatan ' + element.feature.properties.kemendagri_kecamatan_nama +
            '<br>Kel/Desa ' + element.feature.properties.kemendagri_desa_nama
          )
          // create cluster
          this.clusterKelurahan[element.feature.properties.bps_desa_kode] = this.paramMarkerCluster()
          // looping data
          this.jsonData.forEach((elPasien) => {
            if (elPasien.latitude !== null) {
              const point = turf.point([elPasien.longitude, elPasien.latitude])
              const isInside = turf.inside(point, element.feature)
              if (isInside) {
                // add data to marker
                this.addMarkerLayer(this.clusterKelurahan, element, elPasien, 'Kelurahan')
              }
            }
          })
          // add data to cluster
          this.addMarkerClusterLayer(this.clusterKelurahan, element, 'Kelurahan')
        }
      })
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

    addMarkerLayer (cluster, element, elPasien, wilayah = '') {
      const m = this.$L.marker([elPasien.latitude, elPasien.longitude])
      const maxHeight = 250
      const maxWidth = 320
      const popupHtml =
        `
      <h3 style="font-size: larger; margin-bottom: 5px;"><b>Detail Pasien</b></h3>
      <hr>
      <table class="table table-sm" style="color: black; font-size: small;">
        <tr><th>Status</th><td>` + elPasien.status + ' - ' + elPasien.stage + `</td></tr>
        <tr><th>JK</th><td>` + elPasien.gender + `</td></tr>
        <tr><th>Umur</th><td>` + elPasien.umur + `</td></tr>
        <tr><th style="vertical-align: top;">Wilayah</th><th>` + this.titleize(elPasien.nama_kab) +
        ',<br>Kecamatan ' + elPasien.nama_kec +
        ',<br>Kel/Desa ' + elPasien.nama_kel + `</th></tr>
      </table>`
      m.bindPopup(popupHtml, { maxHeight, maxWidth })

      if (wilayah === 'Kota') {
        if (elPasien.status === 'Positif' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kabupaten_kode].positif_proses.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kabupaten_kode].positif_meninggal.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
          cluster[element.feature.properties.bps_kabupaten_kode].positif_sembuh.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kabupaten_kode].pdp_proses.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_kabupaten_kode].pdp_selesai.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kabupaten_kode].pdp_meninggal.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kabupaten_kode].odp_proses.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_kabupaten_kode].odp_selesai.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kabupaten_kode].odp_meninggal.addLayer(m)
        }
      } else if (wilayah === 'Kecamatan') {
        if (elPasien.status === 'Positif' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kecamatan_kode].positif_proses.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kecamatan_kode].positif_meninggal.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
          cluster[element.feature.properties.bps_kecamatan_kode].positif_sembuh.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kecamatan_kode].pdp_proses.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_kecamatan_kode].pdp_selesai.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kecamatan_kode].pdp_meninggal.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_kecamatan_kode].odp_proses.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_kecamatan_kode].odp_selesai.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_kecamatan_kode].odp_meninggal.addLayer(m)
        }
      } else if (wilayah === 'Kelurahan') {
        if (elPasien.status === 'Positif' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_desa_kode].positif_proses.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_desa_kode].positif_meninggal.addLayer(m)
        } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
          cluster[element.feature.properties.bps_desa_kode].positif_sembuh.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_desa_kode].pdp_proses.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_desa_kode].pdp_selesai.addLayer(m)
        } else if (elPasien.status === 'PDP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_desa_kode].pdp_meninggal.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Proses') {
          cluster[element.feature.properties.bps_desa_kode].odp_proses.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Selesai') {
          cluster[element.feature.properties.bps_desa_kode].odp_selesai.addLayer(m)
        } else if (elPasien.status === 'ODP' && elPasien.stage === 'Meninggal') {
          cluster[element.feature.properties.bps_desa_kode].odp_meninggal.addLayer(m)
        }
      }
    },

    addMarkerClusterLayer (cluster, element, wilayah = '') {
      if (wilayah === 'Kota') {
        for (const key of Object.keys(cluster[element.feature.properties.bps_kabupaten_kode])) {
          const newLayer = cluster[element.feature.properties.bps_kabupaten_kode][key].addTo(this.map)
          this.dataLayer.push(newLayer)
          cluster[element.feature.properties.bps_kabupaten_kode][key].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(element.feature.properties.bps_kabupaten_kode, key)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
            popup += `<b> Kota/Kabupaten </b> : ${this.titleize(element.feature.properties.kemendagri_kabupaten_nama)} <br>`
            this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(this.map)
          }).on('clustermouseout', (c) => {
            this.map.closePopup()
          })
        }
      } else if (wilayah === 'Kecamatan') {
        for (const key of Object.keys(cluster[element.feature.properties.bps_kecamatan_kode])) {
          const newLayer = cluster[element.feature.properties.bps_kecamatan_kode][key].addTo(this.map)
          this.dataLayer.push(newLayer)
          cluster[element.feature.properties.bps_kecamatan_kode][key].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(element.feature.properties.bps_kecamatan_kode, key)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
            popup += `<b> Kota/Kabupaten </b> : ${this.titleize(element.feature.properties.kemendagri_kabupaten_nama)} <br>`
            popup += `<b> Kecamatan </b> : ${element.feature.properties.kemendagri_kecamatan_nama} <br>`
            this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(this.map)
          }).on('clustermouseout', (c) => {
            this.map.closePopup()
          })
        }
      } else if (wilayah === 'Kelurahan') {
        for (const key of Object.keys(cluster[element.feature.properties.bps_desa_kode])) {
          const newLayer = cluster[element.feature.properties.bps_desa_kode][key].addTo(this.map)
          this.dataLayer.push(newLayer)
          cluster[element.feature.properties.bps_desa_kode][key].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(element.feature.properties.bps_desa_kode, key)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`
            popup += `<b> Kota/Kabupaten </b> : ${this.titleize(element.feature.properties.kemendagri_kabupaten_nama)} <br>`
            popup += `<b> Kecamatan </b> : ${element.feature.properties.kemendagri_kecamatan_nama} <br>`
            popup += `<b> Kel/Desa </b> : ${element.feature.properties.kemendagri_desa_nama} <br>`
            this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(this.map)
          }).on('clustermouseout', (c) => {
            this.map.closePopup()
          })
        }
      }
    },

    statusStageCorona (kodeWilayah, status) {
      return this.statusStage[status]
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

    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },

    setFilter (category) {
      this.filter[category] = !this.filter[category]
      this.jsonData = []
      this.removeMarker()
      this.removeLayer()

      for (const cat in this.filter) {
        if (this.filter[cat]) {
          this.jsonData = this.jsonData.concat(this.dataJson[cat])
        }
      }

      if (this.layerActive === 'custom') {
        if (this.statusOpenedMap === 'Kelurahan') {
          this.createLayerByKelurahan()
        } else if (this.statusOpenedMap === 'Kecamatan') {
          this.createLayerByKecamatan()
        } else {
          this.createLayerByKota()
        }
      } else if (this.layerActive === 'kota') {
        this.createLayerByKota(this.filterActive)
      } else if (this.layerActive === 'kecamatan') {
        this.createLayerByKecamatan(this.filterActive)
      } else if (this.layerActive === 'kelurahan') {
        this.createLayerByKelurahan(this.filterActive)
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
        if (this.statusOpenedMap === 'Kelurahan') {
          this.createLayerByKelurahan()
        } else if (this.statusOpenedMap === 'Kecamatan') {
          this.createLayerByKecamatan()
        } else {
          this.createLayerByKota()
        }
      } else if (this.layerActive === 'kota') {
        this.createLayerByKota(this.filterActive)
      } else if (this.layerActive === 'kecamatan') {
        this.createLayerByKecamatan(this.filterActive)
      } else if (this.layerActive === 'kelurahan') {
        this.createLayerByKelurahan(this.filterActive)
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
