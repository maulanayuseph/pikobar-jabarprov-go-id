<template>
  <div class="container-map m-2">
    <div class="bg-white col-md-12 p-0 " style="position:relative;border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);">
      <div id="map-faskes" style="height: 50em;z-index:0;" />
      <div class="filter-layer">
        <div class="text-right mb-2">
          <button class="btn bg-white" >
            <font-awesome-icon :icon="faHome" @click="backToHome"/>
          </button>
        </div>
        <div class="text-right">
          <button class="btn bg-white rounded" @click="showFilter">
            <font-awesome-icon :icon="faFilter" />
          </button>
        </div>
        <div v-if="isShowFilter" data-v-dfef036a="" class="filter-data">
          <li :class="filter.lini1 ? 'filter-active' : ''" @click="setFilter('lini1')">
            <svg
              style="float:left;"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#5AAA4E"
              />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#6EBE62"/>
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#5AAA4E" />
            </svg>
            &nbsp;
            Rumah Sakit Rujukan Lini 1
          </li>
          <li :class="filter.lini2 ? 'filter-active' : ''" @click="setFilter('lini2')">
            <svg
              style="float:left"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#F2C94C"
              />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#F2D57A" />
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#F2C94C" />
            </svg>
            &nbsp;
            Rumah Sakit Rujukan Lini 2
          </li>
          <li :class="filter.puskesmas ? 'filter-active' : ''" @click="setFilter('puskesmas')">
            <svg
              style="float:left"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#2D9CDB" />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#56CCF2" />
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#2D9CDB" />
            </svg>
            &nbsp;
            Puskesmas
          </li>
        </div>
      </div>
      <div class="info-legend p-3">
        <b>Keterangan: </b>
        <div class="flex mb-4">
          <div class="w-1/4 h-auto">
            <svg
              style="float:left;"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#5AAA4E"
              />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#6EBE62"/>
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#5AAA4E" />
            </svg>
            &nbsp;
            Rumah Sakit Rujukan Lini 1
          </div>
          <div class="w-1/4 h-auto">
            <svg
              style="float:left"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#F2C94C"
              />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#F2D57A" />
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#F2C94C" />
            </svg>
            &nbsp;
            Rumah Sakit Rujukan Lini 2
          </div>
          <div class="w-1/4 h-auto">
            <svg
              style="float:left"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="4"
                stroke="#2D9CDB" />
              <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#56CCF2" />
              <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#2D9CDB" />
            </svg>
            &nbsp;
            Puskesmas
          </div>
          <div class="w-1/4" />
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading-page">
      <div class="loading-image" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons'
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

export default {
  name: 'MapSebaranCovid',
  data () {
    return {
      map: '',
      isShowFilter: false,
      zoom: 8,
      isHidden: false,
      jsonData: [],
      listLayer: [],
      filter: {
        lini1: true,
        lini2: false,
        puskesmas: false
      },
      loading: false,
      faFilter,
      faHome,
      geoJSONData: [],
      iconRSRujukan: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" rx="4" stroke="#5AAA4E"/>
        <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#6EBE62"/>
        <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#5AAA4E"/></svg>`,
      iconRSLini: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" rx="4" stroke="#F2C94C"/>
        <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#F2D57A"/>
        <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#F2C94C"/>
      </svg>`,
      iconPuskesmas: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="16" height="16" rx="4" stroke="#2D9CDB"/>
        <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#56CCF2"/>
        <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#2D9CDB"/>
      </svg>`
    }
  },
  mounted () {
    this.createBasemap()
    this.fetchData()
  },
  beforeDestroy () {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  },
  methods: {
    backToHome () {
      this.map.flyTo([-6.932694, 107.627449], 8)
    },
    setFilter (type) {
      this.loading = true
      try {
        this.filter[type] = !this.filter[type]
        this.loading = false
        this.removeLayer()
        this.createMap()
      } catch (e) {
        console.log(e.message)
      }
    },
    showFilter () {
      this.isShowFilter = !this.isShowFilter
    },
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar/faskes')
        .then(function (response) {
          self.jsonData = response.data.data
          self.geoJSONData = self.createGeoJSON(response.data.data)
          self.createMap()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createGeoJSON (data) {
      const features = []
      data.forEach((element) => {
        if (element.latitude !== null) {
          features.push({
            type: 'Feature',
            properties: {
              kode_kemenkes: element.kode_kemenkes,
              nama: element.nama,
              tipe_faskes: element.tipe_faskes,
              rujukan: element.rujukan,
              alamat: element.alamat,
              telepon: element.telepon,
              url: element.url
            },
            geometry: {
              type: 'Point',
              coordinates: [
                element.longitude,
                element.latitude
              ]
            }
          })
        }
      })
      const geojson = {
        type: 'FeatureCollection',
        features
      }

      return geojson
    },
    createBasemap () {
      this.map = this.$L.map('map-faskes', {
        zoomControl: false
      }).setView([-6.932694, 107.627449], 8)
      this.$L.tileLayer('https://cartodb-basemaps-d.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
        tileSize: 512,
        zoomOffset: -1
      }).addTo(this.map)

      // add zoom control with your options
      this.$L.control.zoom({
        position: 'bottomright'
      }).addTo(this.map)

      // add search control
      const provider = new OpenStreetMapProvider()
      new GeoSearchControl({
        provider,
        position: 'topleft'
      }).addTo(this.map)

      // on zoom
      // Here the events for zooming and dragging
      // this.map.on('zoomend', () => {
      // })
      // on drag
      // this.map.on('dragend', () => {
      // })
      // end

      // create layer group
      this.layerGroup = this.$L.layerGroup().addTo(this.map)
    },
    createMap (data) {
      const self = this
      const layer = self.$L.geoJSON(self.geoJSONData, {
        pointToLayer: (feature, latlng) => {
          let icon = ''
          if (feature.properties.rujukan === true) {
            icon = self.iconRSRujukan
          } else if (feature.properties.tipe_faskes === 1) {
            icon = self.iconRSLini
          } else {
            icon = self.iconPuskesmas
          }

          return self.$L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
            icon: self.$L.divIcon({
              html: icon,
              className: 'icon-rs green'
            })
          })
        },
        filter: (feature, layer) => {
          if (self.filter.lini1 && feature.properties.rujukan) {
            return feature
          } else if (self.filter.lini2 && feature.properties.tipe_faskes === 1 && feature.properties.rujukan === null) {
            return feature
          } else if (self.filter.puskesmas && feature.properties.tipe_faskes === 2) {
            return feature
          }
        },
        onEachFeature: (feature, layer) => {
          let popup = `<table border=0 cellpadding=2>
          <tr>
            <th><b> Nama </b></th>
            <td> : </td>
            <td>${feature.properties.nama}</td>
          </tr>
          <tr>
            <th><b> Alamat </b></th>
            <td> : </td>
            <td>${feature.properties.alamat}</td>
          </tr>`
          if (feature.properties.telepon != null && feature.properties.telepon !== '') {
            popup += `<tr>
                <th><b> Telepon </b></th>
                <td> : </td>
                <td>${feature.properties.telepon}</td>
            </tr>`
          }

          if (feature.properties.url != null && feature.properties.url !== '') {
            popup += `<tr>
                <th><b> Url </b></th>
                <td> : </td>
                <td>${feature.properties.url}</td>
              </tr>`
          }

          popup += '</table>'
          layer.bindPopup(popup)
        }
      }).addTo(self.map)
      self.listLayer.push(layer)
    },
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    tesMap () {
    }
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://unpkg.com/leaflet-geosearch@2.6.0/assets/css/leaflet.css' }
      ]
    }
  }
}
</script>
<style scoped>
#map-faskes{
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.container-map {
  width:100%; height:100%;
}
.leaflet-popup-content {
    width: 130px;
    padding: 5px;
    line-height: 1.4;
}
.info {
    padding: 6px 8px;
    font: 14px/16px Arial, Helvetica, sans-serif;
    background: white;
    background: rgba(255,255,255,0.8);
    box-shadow: 0 0 15px rgba(0,0,0,0.2);
    border-radius: 5px;
}
.info h4 {
    margin: 0 0 5px;
    color: #777;
}
.info-legend {
  font-size: 15px;
}
.legend {
    line-height: 18px;
    color: #555;
}

.title{
  font-size: large;
  font-weight: bold;
}
.legend-color {
  width: 1em;
  height: 1em;
  float: left;
  border-radius: 10px;
  margin-top: 4px;
}
.icon-legend-rs {
  font-size: 1.2em;
}
.loading-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.5em;
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}

.filter-layer {
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 1em;
  padding-top: 1em;
}

.filter-layer .btn {
  width: 2em;
  height: 2em;
  border-radius: 5px;
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
</style>
<style>
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.legend i {
    width: 18px;
    height: 18px;
    float: left;
    margin-right: 8px;
    opacity: 0.7;
}
  .cluster {
    border-radius: 50%;
    text-align: center;
    color: white;
    font-weight: 700;
    font-family: monospace;
  }

  .cluster-odp-proses {
    background: rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-selesai {
    background: #27ae60;
  }

  .cluster-odp-pdp {
    background: #f2c94c;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-positif {
    background: #eb5757;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-odp-belumupdate {
    background: #bdbdbd;
    border: 1px solid rgb(45, 156, 219, 0.9);
  }

  .cluster-pdp-proses {
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-pdp-selesai {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #27ae60
  }

  .cluster-pdp-positif {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #eb5757;
  }

  .cluster-pdp-belumupdate {
    border: 1px solid rgb(242, 201, 76, 0.9);
    background: #bdbdbd;
  }

  .cluster-positif-proses {
    background: rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-meninggal {
    background: #a51212;
    border: 1px solid rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-sembuh {
    background: #27ae60;
    border: 1px solid rgb(235, 87, 87, 0.9);
  }
  .cluster:before {
    content: ' ';
    position: absolute;
    border-radius: 50%;
    z-index: -1;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    /* border: 1px solid white; */
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

.green, .green svg {
  color:#08cc29
}

.yellow, .yellow svg {
  color:#fdd619
}
.blue, .blue svg {
  color:#169cea
}
.icon-rs {
  background: #fff
}

.loading-image {
  height: 10em;
  background-position: center;
  background-repeat: no-repeat;
  background-image:
        url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09InJvdGF0ZSgwIDUwIDUwKSI+CiAgICAgICAgICAgICAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iMyIgcnk9IjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjODVhMmI2Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuOTE2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgICAgICAgPC9yZWN0PgogICAgICAgICAgICA8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAgNTAgNTApIj4KICAgICAgICAgICAgICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSIzIiByeT0iNiIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiM4NWEyYjYiPgogICAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC44MzMzMzMzMzMzMzMzMzM0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg2MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjc1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg5MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjY2NjY2NjY2NjY2NjY2NjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDEyMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjU4MzMzMzMzMzMzMzMzMzRzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE1MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjQxNjY2NjY2NjY2NjY2NjdzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDIxMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjMzMzMzMzMzMzMzMzMzMzNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI0MCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KICAgICAgICAgICAgICA8L3JlY3Q+CiAgICAgICAgICAgIDwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyNzAgNTAgNTApIj4KICAgICAgICAgICAgICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSIzIiByeT0iNiIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiM4NWEyYjYiPgogICAgICAgICAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIGtleVRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC4xNjY2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+CiAgICAgICAgICAgICAgPC9yZWN0PgogICAgICAgICAgICA8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMzAwIDUwIDUwKSI+CiAgICAgICAgICAgICAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iMyIgcnk9IjYiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjODVhMmI2Ij4KICAgICAgICAgICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiBrZXlUaW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuMDgzMzMzMzMzMzMzMzMzMzNzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMzMCA1MCA1MCkiPgogICAgICAgICAgICAgIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjMiIHJ5PSI2IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzg1YTJiNiI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPgogICAgICAgICAgICAgIDwvcmVjdD4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgPC9zdmc+")
}

.glass {
  height: 26px !important;
}

</style>
