<template>
  <div class="flex flex-col w-full mb-6 md:w-auto md:flex-row flex-wrap xl:ml-auto">
    <input
      v-model="search"
      class="inline-block w-full flex-none rounded-md border border-grey-500 m-1 sm:flex-1 bg-white-200 p-2"
      placeholder="Cari ..."
    >
    <div class="w-full md:w-64 m-1">
      <client-only>
        <multiselect
          v-model="valueDistrict"
          class="optCity"
          :options="districs"
          :allow-empty="false"
          track-by="district_code"
          placeholder="Pilih Kabupaten/Kota"
          :searchable="true"
          select-label=""
          deselect-label=""
          selected-label=""
          label="district_name"
        />
      </client-only>
    </div>
    <div class="w-full md:w-64 m-1">
      <client-only>
        <multiselect
          v-model="valueSubDistrict"
          class="optCity"
          :options="subDistrics"
          :allow-empty="false"
          :disabled="isSelectedDistrict"
          placeholder="Pilih Kecamatan"
          track-by="subdistrict_code"
          select-label=""
          deselect-label=""
          selected-label=""
          label="subdistrict_name"
        />
      </client-only>
    </div>
    <div class="flex flex-wrap justify-start items-stretch">
      <button
        class="flex-none inline-flex items-center justify-around ml-4 mt-1 mb-1 md:mr-0 px-6 py-2 text-white rounded-md bg-brand-green hover:bg-brand-green-lighter"
        @click="onSearchItems"
      >
        <span>
          Cari
        </span>
      </button>
      <button
        class="flex-none inline-flex items-center rounded-md border border-green-500 justify-around ml-4 mt-1 mb-1 md:mr-0 px-6 py-2 text-gray-700 bg-white-400 hover:bg-white-500"
        @click="onReset"
      >
        <span>
          Reset
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    districs: {
      type: Array,
      default: () => []
    },
    subDistrics: {
      type: Array,
      default: () => []
    },
    oxygenSearch: {
      type: String,
      default: null
    },
    selectedDistrict: {
      type: Object,
      default: null
    },
    selectedSubDistrict: {
      type: Object,
      default: null
    },
    onSearchItems: {
      type: Function,
      default: null
    },
    onReset: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      isSelectedDistrict: true
    }
  },
  computed: {
    search: {
      get () {
        return this.oxygenSearch
      },
      set (val) {
        this.$emit('update:search', val)
      }
    },
    valueDistrict: {
      get () {
        return this.selectedDistrict
      },
      set (val) {
        this.$emit('update:district-selected', val)
      }
    },
    valueSubDistrict: {
      get () {
        return this.selectedSubDistrict
      },
      set (val) {
        this.$emit('update:sub-district-selected', val)
      }
    }
  },
  watch: {
    valueDistrict: {
      immediate: true,
      handler (v) {
        if (v !== null) {
          this.isSelectedDistrict = false
          this.$store.dispatch('oxygen/getCollectedSubDistricts', { district_code: v.district_code })
          this.$emit('update:sub-district-selected', null)
        } else {
          this.isSelectedDistrict = true
        }
      }
    }
  }
}
</script>
