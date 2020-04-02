<template>
  <div class="rounded-lg border border-solid border-gray-300">
    <header class="p-5 ">
      <h5 class="text-base lg:text-lg">
        <b>Jumlah kasus COVID-19 di sekitar Anda</b>
      </h5>
    </header>
    <div
      v-if="!data"
      class="p-5 text-center bg-gray-100"
    >
      <p class="opacity-50">
        Lokasi Tidak Ditemukan
      </p>
    </div>
    <template
      v-else-if="data"
    >
      <LocationSelector
        :value="value"
        :options="options"
        @change="$emit('change', $event)"
      />
      <hr>
      <div class="p-5">
        <!--  -->
      </div>
    </template>
  </div>
</template>

<script>
import LocationSelector from './LocationSelector'
export default {
  components: {
    LocationSelector
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Number,
      default: 5
    },
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      options: {
        radius: [
          {
            value: 0.5,
            label: '500 M'
          },
          {
            value: 1,
            label: '1 KM'
          },
          {
            value: 5,
            label: '5 KM'
          },
          {
            value: 7,
            label: '7 KM'
          },
          {
            value: 10,
            label: '10 KM'
          }
        ]
      }
    }
  }
}
</script>

<style>

</style>
