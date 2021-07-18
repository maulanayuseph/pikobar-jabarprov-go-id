<template>
  <div>
    <TrackingHeader
      :is-searched="isSearched"
      :is-search.sync="isSearched"
    />
    <TrackingResult v-if="isSearched" />
    <EmptyResult />
  </div>
</template>

<script>
import TrackingHeader from '../../components/_pages/index/Tracking/TrackingHeader'
import TrackingResult from '../../components/_pages/index/Tracking/TrackingResult'
import EmptyResult from '../../components/_pages/index/Tracking/EmptyResult'
export default {
  components: {
    TrackingHeader,
    TrackingResult,
    EmptyResult
  },
  data () {
    return {
      isSearched: false
    }
  },
  head () {
    const title = 'Tracking - Pikobar [Pusat Informasi dan Koordinasi COVID-19 Jawa Barat]'
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'article'
        }
      ]
    }
  }
}
</script>
