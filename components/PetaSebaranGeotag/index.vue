<template>
  <div class="rounded-lg bg-white shadow-md p-5 md:p-8">
    <header class="mx-auto">
      <h3 class="text-left text-2xl lg:text-3xl lg:text-center font-bold">
        Cek Lokasi Rumah Sakit dan Sebaran COVID-19<br>
        Berdasarkan Lokasi Anda
      </h3>
      <br>
      <p class="opacity-75 text-left lg:text-center">
        Untuk dapat menggunakan fitur ini, ijinkan aplikasi mengakses lokasi Anda.
        Klik tombol Akses Lokasi di bawah ini, kemudian klik Allow / Izinkan.
      </p>
      <br>
      <p class="text-center">
        <button
          class="px-6 py-2 cursor-pointer appearance-none rounded-lg text-lg text-white bg-brand-green"
          @click="getUserLocation"
        >
          <template v-if="isRetrievingLocation">
            <span>
              <FontAwesomeIcon class="spinner--rotating" :icon="icon.faSpinner" />
            </span>
          </template>
          <template v-else>
            <span>
              Akses Lokasi
            </span>
          </template>
        </button>
      </p>
    </header>
    <br>
    <div class="-mx-2 flex flex-col lg:flex-row lg:flex-no-wrap lg:items-stretch">
      <Hospitals
        v-model="hospitalRadius"
        class="flex-auto w-1/2 m-2"
        :data="dataSebaran"
      />
      <CovidCase
        v-model="covidCaseRadius"
        class="flex-auto w-1/2 m-2"
        :data="dataSebaran"
      />
    </div>
  </div>
</template>

<script>
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Hospitals from './Hospitals'
import CovidCase from './CovidCase'
export default {
  components: {
    Hospitals,
    CovidCase
  },
  data () {
    return {
      icon: {
        faSpinner
      },
      isGeolocationSupported: false,
      isRetrievingLocation: false,
      dataSebaran: null,

      hospitalRadius: 5,
      covidCaseRadius: 5
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.checkGeolocationSupport()
        .then(() => {
          this.isGeolocationSupported = true
          this.checkCurrentPermissionStatus({
            onGranted: this.getUserLocation
          })
        })
        .catch((e) => {
          this.isGeolocationSupported = false
        })
    })
  },
  methods: {
    checkCurrentPermissionStatus ({ onPrompt, onGranted, onDenied } = {}) {
      if ('permissions' in navigator) {
        navigator.permissions.query({
          name: 'geolocation'
        }).then((result) => {
          switch (result.state) {
            case 'granted':
              typeof onGranted === 'function' && onGranted()
              break
            case 'prompt':
              typeof onPrompt === 'function' && onPrompt()
              break
            case 'denied':
              typeof onDenied === 'function' && onDenied()
              break
          }
        })
      }
    },
    checkGeolocationSupport () {
      return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
          resolve()
        } else {
          reject(new ReferenceError('Geolocation is not supported'))
        }
      })
    },
    getUserLocation () {
      this.dataSebaran = null
      this.isRetrievingLocation = true
      navigator.geolocation.getCurrentPosition(this.onPositionRetrievalSuccess, this.onPositionRetrievalError, {
        maximumAge: 6 * 60 * 60 * 1000,
        timeout: 15000,
        enableHighAccuracy: true
      })
    },
    onPositionRetrievalSuccess (position) {
      const lat = position.coords.latitude
      const long = position.coords.longitude
      fetch(`https://covid19-public.digitalservice.id/api/v1/check-my-location?long=${long}&lat=${lat}`, {
        method: 'get'
      }).then((response) => {
        return response.json()
      }).then((data) => {
        this.dataSebaran = JSON.parse(JSON.stringify(data))
      }).catch(() => {
        this.onPositionRetrievalError()
      }).finally(() => {
        this.isRetrievingLocation = false
      })
    },
    onPositionRetrievalError (err) {
      this.isRetrievingLocation = false
      switch (err.code) {
        case 1:
          this.onPermissionDenied()
          break
        case 2:
          this.onPositionUnavailable()
          break
        case 3:
          this.onRequestTimeout()
          break
        default:
          break
      }
    },
    onPositionUnavailable () {
      const retry = confirm('Unable to locate your position')
      if (retry) {
        this.getUserLocation()
      }
    },
    onPermissionDenied () {
      alert('Geolocation permission denied. Please allow this app to know your location')
    },
    onRequestTimeout () {
      alert('Request timeout')
    }
  }
}
</script>

<style lang="scss" scoped>
/* purgecss start ignore */
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.spinner--rotating {
  animation: rotating 1s infinite linear;
}
/* purgecss end ignore */
</style>
