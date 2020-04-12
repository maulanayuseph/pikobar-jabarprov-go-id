<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md"
  >
    <div class="container-map">
      &nbsp;
    </div>
  </div>
</template>

<script>

import { faFilter, faHome } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'MapV2SebaranTimeslider',
  data () {
    return {
      map: '',
      zoom: 8,
      faFilter,
      faHome
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
