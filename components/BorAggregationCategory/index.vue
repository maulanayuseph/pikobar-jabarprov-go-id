<template>
  <div>
    <div :class="!isLoading ? 'md:flex md:flex-row flex-wrap mx-1' : 'hidden'">
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[0]" />
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[1]" />
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[2]" />
      </div>
    </div>
    <div :class="!isLoading ? 'md:flex md:flex-row flex-wrap mx-1' : 'hidden'">
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[3]" />
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[4]" />
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <CardBor :bor="dataBor[5]" />
      </div>
    </div>
    <div :class="{hidden: !isLoading }">
      <div>
        <div class="md:flex md:flex-row flex-wrap mx-1'">
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
        </div>
        <div class="md:flex md:flex-row flex-wrap mx-1">
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
          <div class="md:flex-1 mx-1 my-1">
            <div class=" rounded-lg p-6 shadow-lg bg-white">
              <ContentLoader
                :speed="2"
                width="400"
                height="120"
                primary-color="rgba(214, 210, 210,0.6)"
                secondary-color="rgba(214, 210, 210,1)"
              >
                <rect
                  x="0"
                  y="0"
                  rx="8"
                  ry="6"
                  width="50%"
                  height="27"
                />
                <rect
                  x="0"
                  y="50"
                  rx="8"
                  ry="6"
                  width="66%"
                  height="27"
                />
                <rect
                  x="0"
                  y="94"
                  rx="8"
                  ry="6"
                  width="20%"
                  height="27"
                />
              </ContentLoader>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'BorAggregationCategory',
  components: {
    CardBor: () => import('./CardBor'),
    ContentLoader
  },
  data () {
    return {
      dataBor: [
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#33ad3f',
          tooltip: 'Isolasi Tanpa Tekanan Negatif'
        },
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#d5c042',
          tooltip: 'Isolasi Tekanan Negatif'
        },
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#cb3146',
          tooltip: 'ICU Tekanan Negatif dengan Ventilator'
        },
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#6d64b6',
          tooltip: 'ICU Tanpa Tekanan Negatif Dengan Ventilator + ICU Tanpa Tekanan Negatif Tanpa Ventilator + ICU Tekanan Negatif tanpa Ventilator + NICU Covid-19 + PICU Covid-19'
        },
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#64b5f6',
          tooltip: 'IGD Covid-19'
        },
        {
          name: '',
          bor: 0,
          growth: 0,
          total: 0,
          available: 0,
          filled: 0,
          color: '#aa1aa4',
          tooltip: 'Verlos Kamer (ruang bersalin) Covid-19'
        }
      ],
      dataIsolateDaily: []
    }
  },
  computed: {
    getIsolateTotal () {
      return this.$store.getters['data-isolasi-total-kemenkes-v2/itemsMap']
    },
    getIsolateDaily () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/itemsMap']
    },
    isLoading () {
      return this.$store.getters['data-isolasi-harian-kemenkes-v2/isLoading']
    }
  },
  watch: {
    getIsolateTotal (val) {
      this.setDataBor(val)
    },
    getIsolateDaily (val) {
      this.setGrowthBor(val)
    }
  },
  mounted () {
  },
  methods: {
    setGrowthBor (data) {
      if (data.length > 0) {
        let lastData = {}
        let beforeLastData = {}
        const length = data.length

        lastData = data[length - 1]
        beforeLastData = data[length - 2]

        this.dataBor[0].growth = (beforeLastData.hijau_persentase - lastData.hijau_persentase).toFixed(2)
        this.dataBor[1].growth = (beforeLastData.kuning_persentase - lastData.kuning_persentase).toFixed(2)
        this.dataBor[2].growth = (beforeLastData.merah_persentase - lastData.merah_persentase).toFixed(2)
        this.dataBor[3].growth = (beforeLastData.icu_persentase - lastData.icu_persentase).toFixed(2)
        this.dataBor[4].growth = (beforeLastData.igd_persentase - lastData.igd_persentase).toFixed(2)
        this.dataBor[5].growth = (beforeLastData.ruang_bersalin_persentase - lastData.ruang_bersalin_persentase).toFixed(2)
      }
    },
    setDataBor (data) {
      this.dataBor[0].name = 'Hijau'
      this.dataBor[0].bor = data.hijau_persentase
      this.dataBor[0].total = data.hijau_total
      this.dataBor[0].available = data.hijau_tersedia
      this.dataBor[0].filled = data.hijau_terisi

      this.dataBor[1].name = 'Kuning'
      this.dataBor[1].bor = data.kuning_persentase
      this.dataBor[1].total = data.kuning_total
      this.dataBor[1].available = data.kuning_tersedia
      this.dataBor[1].filled = data.kuning_terisi

      this.dataBor[2].name = 'Merah'
      this.dataBor[2].bor = data.merah_persentase
      this.dataBor[2].total = data.merah_total
      this.dataBor[2].available = data.merah_tersedia
      this.dataBor[2].filled = data.merah_terisi

      this.dataBor[3].name = 'ICU'
      this.dataBor[3].bor = data.icu_persentase
      this.dataBor[3].total = data.icu_total
      this.dataBor[3].available = data.icu_tersedia
      this.dataBor[3].filled = data.icu_terisi

      this.dataBor[4].name = 'IGD'
      this.dataBor[4].bor = data.igd_persentase
      this.dataBor[4].total = data.igd_total
      this.dataBor[4].available = data.igd_tersedia
      this.dataBor[4].filled = data.igd_terisi

      this.dataBor[5].name = 'Ruang Bersalin'
      this.dataBor[5].bor = data.ruang_bersalin_persentase
      this.dataBor[5].total = data.ruang_bersalin_total
      this.dataBor[5].available = data.ruang_bersalin_tersedia
      this.dataBor[5].filled = data.ruang_bersalin_terisi
    }
  }
}
</script>
