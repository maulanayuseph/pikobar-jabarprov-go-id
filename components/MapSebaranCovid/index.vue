<template>

  <div class="container-map relative">
    <div class="bg-white col-md-12 shadow-md" style="height:50em;">
        <div id="map-wrap" style="height: 75%;z-index:0;" />
        <div class="info-legend p-2">
          <b>Keterangan: </b>
          <div class="row">
            <div class="col-md">
              <div class="legend-color" style="background:#2d9cdb" /> &nbsp;
              ODP - Proses
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#f2c94c; border: 2px solid #2d9cdb" /> &nbsp;
              ODP - naik satus ke PDP
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#2d9cdb; border: 2px solid #bdbdbd" /> &nbsp;
              ODP (belum diupdate)
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #f2c94c" /> &nbsp;
              PDP - Selesai
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#f2c94c; border: 2px solid #bdbdbd" /> &nbsp;
              PDP (belum diupdate)
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#a51212; border: 2px solid #eb5757" /> &nbsp;
              Positif - Meninggal
            </div>
          </div>
          <div class="row">
            <div class="col-md">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #3aa2dd" /> &nbsp;
              ODP - Selesai
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#eb5757; border: 2px solid #3aa2dd" /> &nbsp;
              ODP - naik satus ke Positif
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#f2c94c;" /> &nbsp;
              PDP - Proses
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#eb5757; border: 2px solid #f2c94c" /> &nbsp;
              PDP - naik status ke Positif
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#eb5757" /> &nbsp;
              Positif - Proses
            </div>
            <div class="col-md">
              <div class="legend-color" style="background:#27ae60; border: 2px solid #eb5757" /> &nbsp;
              Positif - Sembuh
            </div>
          </div>
          <hr>
          <!-- <div class="row">
            <div class="col-md mt-1">
              <b>ODP (Orang Dalam Pemantauan)</b><br>
              Data yang divisualisasikan sebanyak 635 dari 1412 kasus dan 20 dari 27 kabupaten/kota
            </div>
            <div class="col-md">
              <b>PDP (Pasien Dalam Pengawasan)</b><br>
              Data yang divisualisasikan sebanyak 94 dari 132 kasus dan 16 dari 23 kabupaten/kota
            </div>
            <div class="col-md">
              <b>Positif (Pasien terkonfirmasi positif COVID-19)</b><br>
              Data yang divisualisasikan sebanyak 22 dari 26 kasus dan 7 dari 7 kabupaten/kota
            </div>
          </div> -->
          <div class="row">
            <div class="col-md mt-1">
              <b>Catatan:</b><br>
              Titik lokasi merupakan titik acak (random by system) wilayah yang tertera pada identitas kasus dan tidak menunjuk pada alamat persis masing-masing kasus, beberapa titik yang saling berdekatan terlihat menyatu pada pembesaran peta skala besar. Data yang ditampilkan saat ini bukan data seluruhnya,  data akan terus diperbaharui sesuai dengan informasi yang diterima melalui Pemerintah Provinsi Jawa Barat
            </div>
          </div>
        </div>
        <div v-if="!isHidden" class="disclaimer">
          <div class="backdrop" />
          <div class="text-disclaimer">
            <div class="title">
              Peta Sebaran Kasus COVID-19 di Jawa Barat
            </div>
            <div class="subtitle">
              Sumber: Dinas Kesehatan Provinsi Jawa Barat
            </div>
            <div class="description mt-2">
              <br>
              <b>Data yang ditampilkan akan terus diperbarui sesuai dengan informasi yang diterima melalui <br>Pemerintah Provinsi Jawa Barat.</b>
            </div>
            <button class="px-6 py-2 bg-brand-green hover:bg-brand-green-lighter text-white rounded-lg shadow-md mt-8" style="color: #fff" @click="isHidden = !isHidden">
              <b>Lihat Peta</b>
            </button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as turf from '@turf/turf'

export default {
  name: 'MapSebaranCovid',
  data () {
    return {
      map: '',
      zoom: 8,
      isHidden: false,
      activeLayer: 'ODP',
      kotaGeojson: {},
      kecamatanGeojson: {},
      kelurahanGeojson: {},
      jsonData: [],
      jsonDataKota: [
        {
          kode: '3204',
          nama: 'Kab. Bandung'
        },
        {
          kode: '3217',
          nama: 'Kab. Bandung Barat'
        },
        {
          kode: '3216',
          nama: 'Kab. Bekasi'
        },
        {
          kode: '3201',
          nama: 'Kab. Bogor'
        },
        {
          kode: '3207',
          nama: 'Kab. Ciamis'
        },
        {
          kode: '3203',
          nama: 'Kab. Cianjur'
        },
        {
          kode: '3209',
          nama: 'Kab. Cirebon'
        },
        {
          kode: '3205',
          nama: 'Kab. Garut'
        },
        {
          kode: '3212',
          nama: 'Kab. Indramayu'
        },
        {
          kode: '3215',
          nama: 'Kab. Karawang'
        },
        {
          kode: '3208',
          nama: 'Kab. Kuningan'
        },
        {
          kode: '3210',
          nama: 'Kab. Majalengka'
        },
        {
          kode: '3218',
          nama: 'Kab. Pangandaran'
        },
        {
          kode: '3214',
          nama: 'Kab. Purwarkarta'
        },
        {
          kode: '3213',
          nama: 'Kab. Subang'
        },
        {
          kode: '3202',
          nama: 'Kab. Sukabumi'
        },
        {
          kode: '3211',
          nama: 'Kab. Sumedang'
        },
        {
          kode: '3206',
          nama: 'Kab. Tasikmalaya'
        },
        {
          kode: '3273',
          nama: 'Kota Bandung'
        },
        {
          kode: '3279',
          nama: 'Kota Banjar'
        },
        {
          kode: '3275',
          nama: 'Kota Bekasi'
        },
        {
          kode: '3271',
          nama: 'Kota Bogor'
        },
        {
          kode: '3277',
          nama: 'Kota Cimahi'
        },
        {
          kode: '3274',
          nama: 'Kota Cirebon'
        },
        {
          kode: '3276',
          nama: 'Kota Depok'
        },
        {
          kode: '3272',
          nama: 'Kota Sukabumi'
        },
        {
          kode: '3278',
          nama: 'Kota Tasikmalaya'
        }
      ],
      kotaCluster: [],
      kecamatanCluster: [],
      kelurahanCluster: [],
      listLayer: [],
      wilayahLayer: [],
      styleBatasWilayah: {
        fillColor: 'blue',
        weight: 1,
        opacity: 1,
        color: '#D7B6AE',
        fillOpacity: 0
      }
    }
  },
  mounted () {
    this.tesMap()
    this.createBasemap()
    this.importJSON()
      .then(() => {
        this.fetchData()
      })
  },
  beforeDestroy () {
    if (this.view) {
      // destroy the map view
      this.view.container = null
    }
  },
  methods: {
    importJSON () {
      const files = [
        {
          name: 'kota.json',
          onLoad: (module) => {
            this.kotaGeojson = module
          }
        },
        {
          name: 'kecamatan.json',
          onLoad: (module) => {
            this.kecamatanGeojson = module
          }
        },
        {
          name: 'kelurahan.json',
          onLoad: (module) => {
            this.kelurahanGeojson = module
          }
        }
      ]
      const promises = files.map((file) => {
        return new Promise((resolve) => {
          import(`~/assets/${file.name}`)
            .then(m => {
              return m ? m.default || m : {}
            }).then(module => {
              file.onLoad(module)
            }).finally(() => {
              resolve()
            })
        })
      })
      return Promise.all(promises)
    },
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/analytics/longlat/')
        .then(function (response) {
          self.jsonData = response.data.data
          self.createMap()
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    createBasemap () {
      this.map = this.$L.map('map-wrap', {
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

      // on zoom
      // Here the events for zooming and dragging
      this.map.on('zoomend', () => {
        // if (this.map.getZoom() > 15 && this.zoom < 15) {
        //   this.removeLayer()
        //   this.removeBatasWilayah()
        //   this.zoom = this.map.getZoom()
        //   this.createLayerByKelurahan()
        // } else 
        if (this.map.getZoom() > 12 && this.zoom < 12) {
          this.removeLayer()
          this.removeBatasWilayah()
          this.zoom = this.map.getZoom()
          this.createLayerByKecamatan()
        } else if (this.map.getZoom() < 12 && this.zoom > 12) {
          this.removeLayer()
          this.removeBatasWilayah()
          this.zoom = this.map.getZoom()
          this.createLayerPasienByKota()
        }
      })
      this.map.on('dragend', () => {
        // if (this.zoom > 15) {
        //   this.removeLayer()
        //   this.createLayerByKelurahan()
        // } else 
        if (this.zoom > 12) {
          this.removeLayer()
          this.createLayerByKecamatan()
        }
      })
      // end

      // create layer group
      this.layerGroup = this.$L.layerGroup().addTo(this.map)
    },
    removeBatasWilayah () {
      this.wilayahLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.wilayahLayer = []
    },
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    configCluster (className) {
      return {
        singleMarkerMode: true,
        maxClusterRadius: 10000,
        spiderfyOnMaxZoom: false,
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
            className:  classMarker,
            iconSize: null
          })
        }
      }
    },
    statusStageCorona (status, stage) {
      console.log( status + ' === ' + stage )
      let statusStage = ''
      if (status === 'positif' && stage === 'proses') {
        statusStage = 'Positif - Proses'
      } else if (status === 'positif' && stage === 'meninggal') {
        statusStage = 'Positif - Meninggal'
      } else if (status === 'positif' && stage === 'sembuh') {
        statusStage = 'Positif - Sembuh'
      } else if (status === 'positif' && (stage == null || stage == '')) {
        statusStage = 'Positif'
      } else if (status === 'pdp' && stage === 'proses') {
        statusStage = 'PDP - Proses'
      } else if (status === 'pdp' && stage === 'selesai') {
        statusStage = 'PDP - Selesai'
      } else if (status === 'pdp' && stage === 'positif') {
        statusStage = 'PDP - naik status ke Positif'
      } else if (status === 'pdp' && stage === 'belumupdate') {
        statusStage = 'PDP (belum diupdate)'
      } else if (status === 'odp' && stage === 'proses') {
        statusStage = 'ODP - Proses'
      } else if (status === 'odp' && stage === 'selesai') {
        statusStage = 'ODP - Selesai'
      } else if (status === 'odp' && stage === 'pdp') {
        statusStage = 'ODP - naik status ke PDP'
      } else if (status === 'odp' && stage === 'positif') {
        statusStage = 'ODP naik status ke Positif'
      } else if (status === 'odp' && stage == 'belumupdate'){
        statusStage = 'ODP (belum di update)'
      } 

      return statusStage
    },
    createMap () {
      this.createLayerPasienByKota()
    },
    paramMarkerCluster () {
      const markerClusters = {
        odp: {
          proses: '',
          selesai: '',
          pdp: '',
          positif: '',
          belumupdate: ''
        },
        pdp: {
          proses: '',
          selesai: '',
          positif: '',
          belumupdate: ''
        },
        positif: {
          proses: '',
          meninggal: '',
          sembuh: ''
        }
      }
      markerClusters.positif.proses = this.$L.markerClusterGroup(this.configCluster('cluster-positif-proses'))
      markerClusters.positif.meninggal = this.$L.markerClusterGroup(this.configCluster('cluster-positif-meninggal'))
      markerClusters.positif.sembuh = this.$L.markerClusterGroup(this.configCluster('cluster-positif-sembuh'))
      markerClusters.pdp.proses = this.$L.markerClusterGroup(this.configCluster('cluster-pdp-proses'))
      markerClusters.pdp.selesai = this.$L.markerClusterGroup(this.configCluster('cluster-pdp-selesai'))
      markerClusters.pdp.positif = this.$L.markerClusterGroup(this.configCluster('cluster-pdp-positif'))
      markerClusters.pdp.belumupdate = this.$L.markerClusterGroup(this.configCluster('cluster-pdp-belumupdate'))
      markerClusters.odp.proses = this.$L.markerClusterGroup(this.configCluster('cluster-odp-proses'))
      markerClusters.odp.selesai = this.$L.markerClusterGroup(this.configCluster('cluster-odp-selesai'))
      markerClusters.odp.pdp = this.$L.markerClusterGroup(this.configCluster('cluster-odp-pdp'))
      markerClusters.odp.positif = this.$L.markerClusterGroup(this.configCluster('cluster-odp-positif'))
      markerClusters.odp.belumupdate = this.$L.markerClusterGroup(this.configCluster('cluster-odp-belumupdate'))

      return markerClusters
    },
    addMarkerLayer(cluster, element, elPasien) {
      const m = this.$L.marker([elPasien.alamat_latitude, elPasien.alamat_longitude])
      let popup = `<b> Status </b> : ${elPasien.status} <br>`

      if (elPasien.kabkot_str !== '' && elPasien.kabkot_str !== null) {
        popup += '<b> Kab/Kota </b> : ' + elPasien.kabkot_str + '<br />'
      }

      if (elPasien.kecamatan_str !== '' && elPasien.kecamatan_str !== null) {
        popup += '<b> Kecamatan </b> : ' + elPasien.kecamatan_str + '<br />'
      }

      if (elPasien.jenis_kelamin_str !== '' && elPasien.jenis_kelamin_str !== null) {
        popup += '<b> Jenis Kelamin </b> : ' + elPasien.jenis_kelamin_str + '<br />'
      }

      if (elPasien.umur !== '' && elPasien.umur !== null) {
        popup += '<b> Usia </b> : ' + elPasien.umur + ' tahun <br />'
      }
      m.bindPopup(popup)
      m.on('mouseover', function (e) {
        this.openPopup()
      })
      m.on('mouseout', function (e) {
        this.closePopup()
      })
      if (elPasien.status === 'Positif' && elPasien.stage === 'Aktif') {
        cluster[element.feature.properties.bps_kode].positif.proses.addLayer(m)
      } else if (elPasien.status === 'Positif' && elPasien.stage === 'Meninggal') {
        cluster[element.feature.properties.bps_kode].positif.meninggal.addLayer(m)
      } else if (elPasien.status === 'Positif' && elPasien.stage === 'Sembuh') {
        cluster[element.feature.properties.bps_kode].positif.sembuh.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Proses') {
        cluster[element.feature.properties.bps_kode].pdp.proses.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Selesai') {
        cluster[element.feature.properties.bps_kode].pdp.selesai.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === 'Positif') {
        cluster[element.feature.properties.bps_kode].pdp.positif.addLayer(m)
      } else if (elPasien.status === 'PDP' && elPasien.stage === null) {
        cluster[element.feature.properties.bps_kode].pdp.belumupdate.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Proses') {
        cluster[element.feature.properties.bps_kode].odp.proses.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Selesai') {
        cluster[element.feature.properties.bps_kode].odp.selesai.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'PDP') {
        cluster[element.feature.properties.bps_kode].odp.pdp.addLayer(m)
      } else if (elPasien.status === 'ODP' && elPasien.stage === 'Positif') {
        cluster[element.feature.properties.bps_kode].odp.positif.addLayer(m)
      } else {
        cluster[element.feature.properties.bps_kode].odp.belumupdate.addLayer(m)
      }
    },
    addMarkerClusterLayer(cluster, element, wilayah = '', kabkotNama = '') {
      for (const key in cluster[element.feature.properties.bps_kode]) {
        for (const keySub in cluster[element.feature.properties.bps_kode][key]) {
          const newLayer = cluster[element.feature.properties.bps_kode][key][keySub].addTo(this.map)
          this.listLayer.push(newLayer)
          cluster[element.feature.properties.bps_kode][key][keySub].on('clusterclick', (c) => {
            let popup = ''
            popup += `<b> Status </b> : ${this.statusStageCorona(key, keySub)} <br>`
            popup += `<b> Jumlah </b> : ${c.layer._childCount} kasus <br>`

            if (wilayah === 'Kecamatan') {
              if (kabkotNama !== '') {
                popup += `<b> Kota/Kabupaten </b> : ${ kabkotNama } <br>`
              }
              popup += `<b> Kecamatan </b> : ${element.feature.properties.kemendagri_nama} <br>`
            } else {
              popup += `<b> Kota/Kabupaten </b> : ${ element.feature.properties.kemendagri_nama } <br>`
            }

            this.$L.popup().setLatLng(c.layer.getLatLng()).setContent(popup).openOn(this.map)
          }).on('clustermouseout', (c) => {
            this.map.closePopup()
          })
        }
      }
    },
    createLayerPasienByKota () {
      this.$L.geoJSON(this.kotaGeojson, {
        style: this.styleBatasWilayah
      }).eachLayer((element) => { 
        if (this.map.getBounds().intersects(element._bounds)) {
          const layerWilayah = element.addTo(this.map)
          this.wilayahLayer.push(layerWilayah)
          element.bindPopup(element.feature.properties.kemendagri_nama)
          const markerClusters = this.paramMarkerCluster()
          this.kotaCluster[element.feature.properties.bps_kode] = markerClusters
          this.jsonData.forEach((elPasien) => {
            if (elPasien.alamat_latitude !== null) {
              const point = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [elPasien.alamat_longitude, elPasien.alamat_latitude]
                }
              }
              const isInside = turf.inside(point, element.feature)
              if (isInside) {
                this.addMarkerLayer(this.kotaCluster, element, elPasien)
              }
            }
          })

          this.addMarkerClusterLayer(this.kotaCluster, element)
        }
      })
    },
    createLayerByKecamatan () {
      // if(map.getBounds().intersects(layer._bounds)) { ... }
      this.$L.geoJSON(this.kecamatanGeojson, {
        style: this.styleBatasWilayah
      }).eachLayer((element) => {
        if (this.map.getBounds().intersects(element._bounds)) {
          const layerWilayah = element.addTo(this.map)
          this.wilayahLayer.push(layerWilayah)
          element.bindPopup('KEC. ' + element.feature.properties.bps_nama)

          const markerClusters = this.paramMarkerCluster()
          this.kecamatanCluster[element.feature.properties.bps_kode] = markerClusters
          let kabkotNama = ''
          this.jsonData.forEach((elPasien) => {
            if (elPasien.alamat_latitude !== null) {
              const point = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "type": "Point",
                  "coordinates": [elPasien.alamat_longitude, elPasien.alamat_latitude]
                }
              }
              const isInside = turf.inside(point, element.feature)
              if (isInside) {
                kabkotNama = elPasien.kabkot_str
                this.addMarkerLayer(this.kecamatanCluster, element, elPasien)
              }
            }
          })

          this.addMarkerClusterLayer(this.kecamatanCluster, element, 'Kecamatan', kabkotNama)
        }
      })
    },
    createLayerByKelurahan () {
      // if(map.getBounds().intersects(layer._bounds)) { ... }
      this.$L.geoJSON(this.kelurahanGeojson, {
        style: this.styleBatasWilayah
      }).eachLayer((element) => {
        if (this.map.getBounds().intersects(element._bounds)) {
          const layerWilayah = element.addTo(this.map)
          this.wilayahLayer.push(layerWilayah)
          element.bindPopup(element.feature.properties.bps_nama)

          const markerClusters = this.paramMarkerCluster()
          this.kelurahanCluster[element.feature.properties.bps_kode] = markerClusters
          this.jsonData.forEach((elPasien) => {
            if (elPasien.alamat_latitude !== null) {
              if (element._bounds.contains([elPasien.alamat_latitude, elPasien.alamat_longitude])) {
                this.addMarkerLayer(this.kelurahanCluster, element, elPasien)
              }
            }
          })

          this.addMarkerClusterLayer(this.kelurahanCluster, element, 'Kelurahan')
        }
      })
    },
    isMarkerInsidePolygon(marker, poly) {
      var polyPoints = poly.getLatLngs();       
      var x = marker[0], y = marker[1];

      var inside = false;
      for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
          var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
          var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }

      return inside;
    },
    tesMap () {
      
    }
  }
}
</script>
<style scoped>
#map-wrap{
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
  height: 25%;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 13px;
}
.legend {
    line-height: 18px;
    color: #555;
}
.text-disclaimer {
  top:20%;
  width: 100%;
  position: absolute;
  text-align: center;
  color: #fff;
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
    border: 3px solid rgb(45, 156, 219, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-odp-positif {
    background: #eb5757;
    border: 3px solid rgb(45, 156, 219, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-odp-belumupdate {
    background: rgb(45, 156, 219, 0.9);
    border: 3px solid #bdbdbd;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-proses {
    background: rgb(242, 201, 76, 0.9);
  }

  .cluster-pdp-selesai {
    border: 3px solid rgb(242, 201, 76, 0.9);
    background: #27ae60;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-positif {
    border: 3px solid rgb(242, 201, 76, 0.9);
    background: #eb5757;
    line-height: 1.8em  !important;
  }

  .cluster-pdp-belumupdate {
    border: 3px solid #bdbdbd;
    background: rgb(242, 201, 76, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-positif-proses {
    background: rgb(235, 87, 87, 0.9);
  }

  .cluster-positif-meninggal {
    background: #a51212;
    border: 3px solid rgb(235, 87, 87, 0.9);
    line-height: 1.8em  !important;
  }

  .cluster-positif-sembuh {
    background: #27ae60;
    border: 3px solid rgb(235, 87, 87, 0.9);
    line-height: 1.8em  !important;
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
    /* border: 3px solid white; */
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
