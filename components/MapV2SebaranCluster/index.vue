<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      <div
        id="map-wrap-cluster"
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
    </div>
  </div>
</template>

<script>
import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons'
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
      zoom: 8,
      layerGroup: '',

      faFilter,
      faHome,

      distributionProvinceData: [],

      clusterKota: [],
      clusterKecamatan: [],
      clusterKelurahan: [],

      styleBatasWilayah: {
        fillColor: 'blue',
        fillOpacity: 0,
        weight: 0.5,
        opacity: 0.5,
        color: '#F6F6F6'
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
        positif_proses: true,
        positif_meninggal: true,
        positif_sembuh: true,
        pdp_proses: false,
        pdp_selesai: false,
        pdp_meninggal: false,
        odp_proses: false,
        odp_selesai: false,
        odp_meninggal: false
      },

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
      this.distributionProvinceData = this.propsDataSebaranJabar
      this.onChanges()
    }
  },
  mounted () {
    console.log('on created')
    this.initMap()
    if (this.distributionProvinceData) {
      this.onChanges()
    }
  },
  methods: {

    onChanges () {
      console.log('onChanges')

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
      this.setFilter('positif_proses')
      this.createLayerByKota()
      this.setZoomLevel()
    },

    initMap () {
      // eslint-disable-next-line new-cap
      this.map = new this.$L.map('map-wrap-cluster', {
        zoomControl: false
      }).setView([-6.932694, 107.627449], 8)

      this.$L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
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
    },

    setZoomLevel () {
      // listening zoomed level
      this.map.on('zoomend', () => {
        if (this.map.getZoom() <= 10) {
          this.createLayerByKota()
        } else if (this.map.getZoom() > 10 && this.map.getZoom() <= 13) {
          this.createLayerByKecamatan()
        } else if (this.map.getZoom() > 13) {
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
      const maxWidth = 280
      const popupHtml =
        `
      <h5 style="font-size: larger;"><b>Detail Pasien</b></h5>
      <hr>
      <table class="table table-sm" style="color: black; font-size-smaller;">
        <tr><th>ID</th><td>` + elPasien.id + `</td></tr>
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

      if (this.statusOpenedMap === 'Kelurahan') {
        this.createLayerByKelurahan()
      } else if (this.statusOpenedMap === 'Kecamatan') {
        this.createLayerByKecamatan()
      } else {
        this.createLayerByKota()
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
<style>
@import "leaflet-geosearch/assets/css/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.btn {
  border-radius: 0.25rem;
}

.container-map {
    width:100%;
    height:100%;
    position: relative;
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
</style>
