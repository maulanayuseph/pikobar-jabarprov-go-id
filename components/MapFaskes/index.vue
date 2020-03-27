<template>
  <div class="container-map">
    <div class="bg-white col-md-12 p-0 m-2 " style="border-radius: 0.8rem; box-shadow: 0 0 4px 0px rgba(0,0,0,0.05), 0 4px 24px 0 rgba(0,0,0,0.1); height:50em;">
      <div id="map-faskes" style="height: 83%;z-index:0;" />
      <div class="info-legend p-4">
        <b>Keterangan: </b>
        <div class="row">
          <div class="col-md-3">
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
          <div class="col-md-3">
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
          <div class="col-md-2">
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
          <div class="col-md" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MapSebaranCovid',
  data () {
    return {
      map: '',
      zoom: 8,
      isHidden: false,
      jsonData: [],
      listLayer: []
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
    fetchData () {
      const self = this
      axios
        .get('https://covid19-public.digitalservice.id/api/v1/sebaran/jabar/faskes')
        .then(function (response) {
          console.log(response.data)
          self.jsonData = response.data.data
          self.createMap()
        })
        .catch(function (error) {
          console.log(error)
        })
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
    removeLayer () {
      this.listLayer.forEach((element) => {
        this.map.removeLayer(element)
      })
      this.listLayer = []
    },
    createMap () {
      this.createLayerFaskes()
    },
    createLayerFaskes () {
      const iconRSRujukan = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="4" stroke="#5AAA4E"/>
      <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#6EBE62"/>
      <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#5AAA4E"/></svg>`
      const iconRSLini = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="4" stroke="#F2C94C"/>
      <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#F2D57A"/>
      <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#F2C94C"/>
      </svg>`
      const iconPuskesmas = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="16" height="16" rx="4" stroke="#2D9CDB"/>
      <path d="M13.9996 7.54973V10.4503C13.9996 10.7177 13.783 10.9347 13.5151 10.9347H10.9348V13.5155C10.9348 13.783 10.7177 14 10.4503 14H7.54978C7.28235 14 7.0653 13.783 7.0653 13.5155V10.9347H4.48447C4.21656 10.9347 4 10.7177 4 10.4503V7.54973C4 7.2823 4.21656 7.06526 4.48447 7.06526H7.0653V4.48447C7.0653 4.21704 7.28235 4 7.54978 4H10.4504C10.7178 4 10.9348 4.21704 10.9348 4.48447V7.06526H13.5152C13.783 7.06526 13.9996 7.2823 13.9996 7.54973Z" fill="#56CCF2"/>
      <path d="M13.9998 7.54973V10.4503C13.9998 10.7177 13.7832 10.9347 13.5153 10.9347H10.935V13.5155C10.935 13.783 10.7179 14 10.4505 14H9V4H10.4505C10.7179 4 10.935 4.21704 10.935 4.48447V7.06526H13.5153C13.7832 7.06526 13.9998 7.2823 13.9998 7.54973Z" fill="#2D9CDB"/>
      </svg>`

      this.jsonData.forEach((elFaskes) => {
        if (elFaskes.latitude !== null) {
          let icon = ''
          if (elFaskes.rujukan === true) {
            icon = iconRSRujukan
          } else if (elFaskes.tipe_faskes === 1) {
            icon = iconRSLini
          } else {
            icon = iconPuskesmas
          }
          const pointRS = this.$L.marker([elFaskes.latitude, elFaskes.longitude], {
            icon: this.$L.divIcon({
              html: icon,
              className: 'icon-rs green'
            })
          }).addTo(this.map)

          let popup = `<table border=0 cellpadding=2>
              <tr>
                <th><b> Nama </b></th>
                <td> : </td>
                <td>${elFaskes.nama}</td>
              </tr>
              <tr>
                <th><b> Alamat </b></th>
                <td> : </td>
                <td>${elFaskes.alamat}</td>
              </tr>`
          if (elFaskes.telepon != null && elFaskes.telepon !== '') {
            popup += `<tr>
                <th><b> Telepon </b></th>
                <td> : </td>
                <td>${elFaskes.telepon}</td>
            </tr>`
          }

          if (elFaskes.url != null && elFaskes.url !== '') {
            popup += `<tr>
                <th><b> Url </b></th>
                <td> : </td>
                <td>${elFaskes.url}</td>
              </tr>`
          }

          popup += '</table>'
          pointRS.bindPopup(popup)
          pointRS.on('mouseover', function (e) {
            this.openPopup()
          })
          pointRS.on('mouseout', function (e) {
            this.closePopup()
          })
          this.listLayer.push(pointRS)
        }
      })
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
  height: 15%;
  overflow-y: auto;
  overflow-x: hidden;
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
</style>
