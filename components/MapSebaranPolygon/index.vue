<template>
  <div class="container-map">
    <div class="bg-white col-md-12 p-0 " style="position:relative;border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1);">
      <div id="map-polygon" style="height: 50em;z-index:0;" />
      <div class="filter-layer"> 
        <div class="text-right">
          <button class="btn bg-white rounded" @click="showFilter">
            <font-awesome-icon :icon="faFilter" />
          </button>
        </div>
        <div data-v-dfef036a="" v-if="isShowFilter" class="filter-data">
          <li @click="setFilter('odp', 'proses')" :class="filter.odp.proses ? 'filter-active' : ''">
            <div data-v-dfef036a="" class="legend-color" style="background: rgb(45, 156, 219);margin-right: 0.5em;"></div>
              ODP - Proses
          </li>
          <li @click="setFilter('pdp', 'proses')" :class="filter.pdp.proses ? 'filter-active' : ''">
            <div class="legend-color" style="background:#f2c94c;" /> &nbsp;
            PDP - Proses
          </li>
          <li @click="setFilter('positif', 'meninggal')" :class="filter.positif.meninggal ? 'filter-active' : ''">
            <div class="legend-color" style="background:#a51212; border: 2px solid #eb5757" /> &nbsp;
            Positif - Meninggal
          </li>
          <li @click="setFilter('positif', 'aktif')" :class="filter.positif.aktif ? 'filter-active' : ''">
            <div class="legend-color" style="background:#eb5757" /> &nbsp;
            Positif - Aktif
          </li>
          <li @click="setFilter('positif', 'sembuh')" :class="filter.positif.sembuh ? 'filter-active' : ''">
            <div class="legend-color" style="background:#27ae60; border: 2px solid #eb5757" /> &nbsp;
            Positif - Sembuh
          </li>
        </div>
      </div>
      <!-- <div class="info-legend p-3">
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
      </div> -->
    </div>
    <!-- <div v-if="loading" class="loading-page">
      <div class="loading-image" />
    </div> -->
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import axios from 'axios'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import * as turf from '@turf/turf'

export default {
  name: 'MapSebaranPolygon',
  data () {
    return {
      map: '',
      isShowFilter: false,
      zoom: 8,
      isHidden: false,
      jsonData: [],
      listLayer: [],
      filter: {
        odp : {
          proses: true
        },
        pdp: {
          proses: false
        },
        positif: {
          aktif: false,
          meninggal: false,
          sembuh: false
        }
      },
      loading: false,
      faFilter,
      geoJSONData: [],
      kotaGeojson: {},
      dataTitik: [],
      statusCovid: {
        odp: {
          proses: []
        },
        pdp: {
          proses: []
        },
        positif: {
          aktif: [],
          meninggal: [],
          sembuh: []
        }
      },
      labelStatusCovid: {
        odp: {
          proses: 'ODP - Proses'
        },
        pdp: {
          proses: 'PDP - Proses'
        },
        positif: {
          aktif: 'Positif - Aktif',
          meninggal: 'Positif - Meninggal',
          sembuh: 'Positif - Sembuh'
        }
      },
      featureLayer: {
        odp: {
          proses: []
        },
        pdp: {
          proses: []
        },
        positif: {
          aktif: [],
          meninggal: [],
          sembuh: []
        }
      },
      areaLayer: []
    }
  },
  mounted () {
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
    setFilter (status, stage) {
      this.loading = true

      for (let propStatus in this.filter) {
        for (let propStage in this.filter[propStatus]) {
          if (propStatus === status && propStage === stage) {
            this.filter[propStatus][propStage] = !this.filter[propStatus][propStage]
          } else {
            this.filter[propStatus][propStage] = false
          }
        }
      }
      this.map.removeAll()
      this.map.add(this.areaLayer) // add batas wilayah
      
      if (this.filter[status][stage]) {
        this.map.add(this.featureLayer[status][stage])
      }
      // try {
      //   setTimeout(() => {
      //     if (this.zoom > 12) {
      //       this.removeBatasWilayah()
      //       this.removeLayer()
      //       this.createLayerByKecamatan()
      //     } else if (this.zoom < 12) {
      //       this.removeBatasWilayah()
      //       this.removeLayer()
      //       this.createLayerPasienByKota()
      //     }
      //     this.loading = false
      //   }, 1000)
        


      // } catch (e) {
      //   console.log(e.message);
      // }
    },
    showFilter() {
      this.isShowFilter = !this.isShowFilter
    },
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
          // self.geoJSONData = self.createGeoJSON(response.data.data)
          self.createMap(self.kotaGeojson, 'kota')
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
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Legend', 'esri/widgets/Expand', 'esri/geometry/Polygon', 'esri/geometry/support/webMercatorUtils', 'esri/core/watchUtils', 'esri/core/promiseUtils'], { css: true }).then(([ArcGISMap, MapView, Legend, Expand, Polygon, webMercatorUtils, watchUtils, promiseUtils]) => {
        this.map = new ArcGISMap({
          basemap: 'topo'
        })
        this.view = new MapView({
          container: 'map-polygon',
          map: this.map,
          center: [107.609810, -6.914744],
          zoom: 8
        })

        this.view.when(() => {
          // get the first layer in the collection of operational layers in the WebMap
          // when the resources in the MapView have loaded.
          const legend = new Legend({
            view: this.view
          })

          const expandLegend = new Expand({
            view: this.view,
            content: legend
          })

          // Add widget to the bottom right corner of the view
          this.view.ui.add(expandLegend, "bottom-left");
          

          watchUtils.whenTrue(this.view, "stationary", (() => {
            let activeGeoJSON = []
            let level = 'kota'
            const features = []
            let area = []

            console.log(this.view.zoom)
            if(this.view.zoom >= 13) {
              area = Polygon.fromExtent(this.view.extent)
              level = 'kelurahan'
              activeGeoJSON = this.kelurahanGeojson
            } else if (this.view.zoom >= 11) { 
              area = Polygon.fromExtent(this.view.extent)
              level = 'kecamatan'
              activeGeoJSON = this.kecamatanGeojson
            } else {
              level = 'kota'
              activeGeoJSON = this.kotaGeojson
            }

            if (area.rings !== undefined) {
              this.map.removeAll()
              let screenRings = []
              area.rings[0].forEach(element => {
                let coord = webMercatorUtils.xyToLngLat(element[0], element[1])
                screenRings.push(coord)
              })
              
              let geojsonFeatures = {
                type: "FeatureCollection",
                features: []
              }

              let screenPolygon = {
                "type": "Feature",
                "properties": {
                  "fill": "#00f"
                },
                "geometry": {
                  "type": "Polygon",
                  "coordinates": [screenRings]
                }
              }
              let i = 0
              activeGeoJSON.features.forEach((element) => {
                i++
                if (element.geometry !== null) {
                  let gJSON = ''
                  if (element.geometry.type === 'MultiPolygon') {
                      gJSON = {
                      "type": "Feature",
                      "properties": {
                        "fill": "#00f"
                      },
                      "geometry": {
                        "type": "Polygon",
                        "coordinates": element.geometry.coordinates[0]
                      }
                    }
                  }  else {
                    gJSON = element
                  }
                  
                  let isInside = false
                  let contain = turf.booleanContains(screenPolygon, gJSON);

                  if (contain) {
                    isInside = true
                    geojsonFeatures.features.push(element)
                  }
                  
                  if (!isInside) {
                    let intersection = turf.booleanOverlap(gJSON, screenPolygon)
                    if (intersection) {
                      geojsonFeatures.features.push(element)
                    }
                  }
                  
                }
              })  

              console.log(i)

              this.createMap(geojsonFeatures, level)
            }
            
          }))
        });


        
      })
    },
    createMap (geojson, level) {
      console.log(geojson)
      loadModules(['esri/Map', 'esri/Graphic', 'esri/PopupTemplate', 'esri/views/MapView', 'esri/layers/FeatureLayer', 'esri/geometry/Point', 'esri/symbols/SimpleMarkerSymbol',  'esri/renderers/UniqueValueRenderer', 'esri/geometry/Polygon', 'esri/layers/GeoJSONLayer', 'esri/symbols/SimpleFillSymbol', 'esri/layers/GraphicsLayer', 'esri/Basemap', 'esri/layers/TileLayer'], { css: true }).then(([ArcGISMap, Graphic, PopupTemplate, MapView, FeatureLayer, Point, SimpleMarkerSymbol, UniqueValueRenderer, Polygon, GeoJSONLayer, SimpleFillSymbol, GraphicsLayer, Basemap, TileLayer]) => {
        
        const simpleSymbol = JSON.parse(JSON.stringify(this.statusCovid)) 

        const listPolygonCovid = JSON.parse(JSON.stringify(this.statusCovid)) 

        const renderer = JSON.parse(JSON.stringify(this.statusCovid)) 

        const maxPasien = JSON.parse(JSON.stringify(this.statusCovid)) 

        simpleSymbol.odp.proses = {
          type: 'simple-fill',
          color: '#2d9cdb',
          style: 'solid',
          outline: {
            color: 'white',
            width: 0
          }
        }

        simpleSymbol.pdp.proses = new SimpleFillSymbol({
          color: '#f2c94c',
          style: 'solid',
          outline: {
            color: 'white',
            width: 0
          }
        })

        simpleSymbol.positif.aktif = new SimpleFillSymbol({
          color: '#eb5757',
          style: 'solid',
          outline: {
            color: '#bdbdbd',
            width: 0
          }
        })
        simpleSymbol.positif.meninggal = new SimpleFillSymbol({
          color: '#a51212',
          style: 'solid',
          outline: {
            color: '#eb5757',
            width: 0
          }
        })
        simpleSymbol.positif.sembuh = new SimpleFillSymbol({
          color: '#27ae60',
          style: 'solid',
          outline: {
            color: '#eb5757',
            width: 0
          }
        })
        


        const popupTemplate = new PopupTemplate({
          title: 'Detail Data',
          content: [
            {
              type: 'fields',
              fieldInfos: [
                {
                  fieldName: 'nama',
                  label: level
                },
                {
                  fieldName: 'status',
                  label: 'Status'
                },
                {
                  fieldName: 'jumlah',
                  label: 'Jumlah'
                }
              ]
            }
          ]
        })

        const fields = [
          {
            name: 'ObjectID',
            alias: 'ObjectID',
            type: 'oid'
          },
          {
            name: 'status',
            alias: 'Status',
            type: 'string'
          },
          {
            name: 'nama',
            alias: 'Nama',
            type: 'string'
          },
          {
            name: 'jumlah',
            alias: 'Jumlah',
            type: 'string'
          }
        ]

        const listGraphicArea = []
        geojson.features.forEach((elFeature) => {
          const polygonCovid = JSON.parse(JSON.stringify(this.statusCovid))

          this.countPointCovid(elFeature, level)

          let dataTitik = this.dataTitik.find((elTitik) => {
            return elTitik.kode === elFeature.properties.bps_kode
          })

          const polygon = {
            type: "polygon",  // autocasts as new Polyline()
            rings: elFeature.geometry.coordinates[0]
          };

          let drawBorderArea = new Graphic({
            geometry: polygon,
            symbol: {
              type: "simple-line",  // autocasts as new SimpleLineSymbol()
              color: "lightblue",
              width: "2px",
              style: "short-dot"
            }
          })

          listGraphicArea.push(drawBorderArea)

          
          for (let status in this.statusCovid) {
            for (let stage in this.statusCovid[status]) {
              polygonCovid[status][stage] = new Graphic({
                geometry: polygon,
                symbol: simpleSymbol[status][stage],
                attributes: {
                  status: this.labelStatusCovid[status][stage],
                  nama: elFeature.properties.kemendagri_nama,
                  jumlah: dataTitik.data[status][stage].length
                },
              });
              listPolygonCovid[status][stage].push(polygonCovid[status][stage])

              if (maxPasien[status][stage] < dataTitik.data[status][stage].length) {
                maxPasien[status][stage] = dataTitik.data[status][stage].length
              }
            }
          }

        })

        const glArea = new GraphicsLayer({
          graphics: listGraphicArea
        });

        this.areaLayer = glArea
        this.map.add(glArea) // add batas wilayah
        
        for (let status in this.statusCovid) {
          for (let stage in this.statusCovid[status]) {
            renderer[status][stage] = {
              label: this.labelStatusCovid[status][stage],
              type: 'simple',
              symbol: simpleSymbol[status][stage],
              visualVariables: {
                type: 'opacity',
                field: 'jumlah',
                stops: [
                  { value: 0, opacity: 0 },
                  { value: 1, opacity: 0.4 },
                  { value: Math.round(maxPasien[status][stage] / 4), opacity: 0.5 },
                  { value: Math.round(maxPasien[status][stage] / 3), opacity: 0.6 },
                  { value: Math.round(maxPasien[status][stage] / 2), opacity: 0.8 },
                  { value: Math.round(maxPasien[status][stage]), opacity: 1 }
                ]
              }
            }

            this.featureLayer[status][stage] = new FeatureLayer({
              source: listPolygonCovid[status][stage],
              renderer: renderer[status][stage],
              fields,
              popupTemplate
            })
          }
        }

        let status = ''
        let stage = ''
        for (let propStatus in this.filter) {
          for (let propStage in this.filter[propStatus]) {
            if(this.filter[propStatus][propStage]) {
              status = propStatus
              stage = propStage
              break;
            }
          }
        }
        this.map.add(this.featureLayer[status][stage])
      })
    },
    countPointCovid (element, level) {
      let kodeTitik = ''
      if (level === 'kota') {
        kodeTitik = 'kode_kabkot'
      } else if (level === 'kecamatan') {
        kodeTitik = 'kode_kecamatan'
      } else if (level === 'kelurahan') {
        kodeTitik = 'kode_desa'
      }

      let jumlahPasien = {
          odp: {
            proses: ''
          },
          pdp: {
            proses: ''
          },
          positif: {
            aktif: '',
            meninggal: '',
            sembuh: ''
          }
        }
        jumlahPasien.odp.proses = this.jsonData.filter ( ( d ) => {
          if (d.status === 'ODP' && d.stage === 'Proses' && d[kodeTitik] === element.properties.bps_kode) {
            return d
          }
        });
        jumlahPasien.pdp.proses = this.jsonData.filter ( ( d ) => {
          if (d.status === 'PDP' && d.stage === 'Proses' && d[kodeTitik] === element.properties.bps_kode) {
            return d
          }
        });
        jumlahPasien.positif.aktif = this.jsonData.filter ( ( d ) => {
          if (d.status === 'Positif' && d.stage === 'Aktif' && d[kodeTitik] === element.properties.bps_kode) {
            return d
          }
        });
        jumlahPasien.positif.meninggal = this.jsonData.filter ( ( d ) => {
          if (d.status === 'Positif' && d.stage === 'Meninggal' && d[kodeTitik] === element.properties.bps_kode) {
            return d
          }
        });
        jumlahPasien.positif.sembuh = this.jsonData.filter ( ( d ) => {
          if (d.status === 'Positif' && d.stage === 'Sembuh' && d[kodeTitik] === element.properties.bps_kode) {
            return d
          }
        });

        this.dataTitik.push({
          kode: element.properties.bps_kode,
          data: jumlahPasien
        })
    },
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    tesMap () {
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

</style>
