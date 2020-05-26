<template>
  <div>
    <h4 class="px-8 py-8 text-center text-lg md:text-2xl">
      <b>Saya Ingin Berpartisipasi</b>
    </h4>
    <form
      class="block max-w-3xl mx-auto"
      @submit.prevent="beforeSubmit"
    >
      <div class="mb-4">
        <label class="input-label" for="name">
          Nama
        </label>
        <input
          v-model="payload.name"
          name="name"
          autocomplete="name"
          class="input-text"
          placeholder="Masukkan nama Anda"
          v-on="inputListeners"
        >
        <p
          v-if="hasError('name')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('name') }}
        </p>
      </div>
      <div class="md:-mx-4 mb-4 flex flex-col md:flex-row md:items-stretch">
        <div class="md:w-1/2 md:mx-4 mb-4 md:mb-0">
          <label class="input-label" for="email">
            Email
          </label>
          <input
            v-model="payload.email"
            name="email"
            autocomplete="email"
            class="input-text"
            placeholder="Masukkan email Anda"
            v-on="inputListeners"
          >
          <p
            v-if="hasError('email')"
            class="mt-2 text-red-500"
          >
            {{ getErrorMessage('email') }}
          </p>
        </div>
        <div class="md:w-1/2 md:mx-4">
          <label class="input-label" for="phone">
            No HP
          </label>
          <input
            v-model="payload.phone"
            name="phone"
            autocomplete="phone"
            class="input-text"
            placeholder="Masukkan no handphone"
            v-on="inputListeners"
          >
          <p
            v-if="hasError('phone')"
            class="mt-2 text-red-500"
          >
            {{ getErrorMessage('phone') }}
          </p>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Kebutuhan Logistik
        </label>
        <div v-for="(logistic) in $store.state.donate.selectedLogistics" :key="logistic.id" class="logistic-selected">
          <div class="float-right">
            <FontAwesomeIcon
              class="text-red-400 hover:text-red-600 cursor-pointer mr-2"
              :icon="icons.faTrash"
              @click.prevent="$store.commit('donate/REMOVE_SELECTED_LOGISTIC', logistic)"
            />
            <input
              :value="logistic.quantity || 1"
              type="number"
              min="1"
              max="3"
              class="quantity-logistic"
              @keyup="updateQuantity($event, logistic)"
              @blur="updateQuantity($event, logistic)"
            >
            <span class="inline-block text-xs">PCS</span>
          </div>
          <FontAwesomeIcon class="inline-block mr-2 text-green-600 cursor-pointer" :icon="icons.faCheckCircle" />
          {{ logistic.matg_id }}
        </div>
        <div v-if="!$store.state.donate.selectedLogistics.length" class="logistic-selected text-center border-red-200">
          Belum ada logistik yang dipilih
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Dokumen Persetujuan
        </label>
        <div class="relative">
          <button
            class="border border-gray-400 text-gray-600 rounded-lg px-4 text-sm py-1 mr-2"
          >
            <FontAwesomeIcon class="inline-block mr-2 text-gray-600" :icon="icons.faFileUpload" />
            Upload Dokumen
          </button>
          <button
            class="border border-green-400 text-green-600 rounded-lg px-4 text-sm py-1"
          >
            <FontAwesomeIcon class="inline-block mr-2 text-green-600" :icon="icons.faFileDownload" />
            Download Contoh Dokumen
          </button>
        </div>
      </div>
      <hr class="mb-4" />
      <button
        :disabled="$store.state.donate.selectedLogistics.length || 'disabled'"
        type="submit"
        class="bg-brand-green text-white rounded-lg px-6 py-2"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script>
import { faCheckCircle, faTrash, faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons'
export default {
  data () {
    return {
      icons: {
        faCheckCircle,
        faTrash,
        faFileDownload,
        faFileUpload
      },
      payload: {
        name: null,
        email: null,
        phone: null,
        type: null,
        amount: null
      },
      errors: {},
      messages: {
        name: 'Nama harus diisi',
        email: 'Email harus diisi',
        phone: 'No handphone harus diisi'
      }
    }
  },
  computed: {
    hasAtLeastOneError () {
      return Object.keys(this.errors).some((key) => {
        return !!this.errors[key]
      })
    },
    inputListeners () {
      return {
        input: (e) => {
          this.validate(e.target.name)
        },
        blur: (e) => {
          this.validate(e.target.name)
        }
      }
    }
  },
  methods: {
    updateQuantity (event, logistic) {
      this.$store.commit('donate/UPDATE_QUANTITY_SELECTED_LOGISTIC', {
        quantity: event.target.value,
        logistic
      })
    },
    beforeSubmit () {
      this.clearAllErrorMessages()
      const keys = Object.keys(this.payload)
      for (const key of keys) {
        this.validate(key)
      }
      if (this.hasAtLeastOneError) {
        return
      }
      alert('ON DEVELOPMENT')
    },
    validate (field) {
      if (this.payload[field]) {
        this.setErrorMessage(field, null)
      } else {
        this.setErrorMessage(field, this.messages[field])
      }
    },
    hasError (field) {
      return !!this.errors[field]
    },
    getErrorMessage (field) {
      return this.errors[field]
    },
    setErrorMessage (field, msg) {
      this.$set(this.errors, field, msg)
    },
    clearErrorMessage (field) {
      this.$set(this.errors, field, null)
    },
    clearAllErrorMessages () {
      Object.keys(this.errors).forEach((key) => {
        this.setErrorMessage(key, null)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.input-label {
  @apply font-bold text-gray-700 leading-loose;
}
.input-text {
  @apply w-full min-w-0 px-4 py-2 rounded
  border border-solid border-gray-300;
}
.logistic-selected {
  @apply border border-green-200 rounded mb-2 pt-2 pb-2 px-4 text-sm;
  &.border-red-200 {
    @apply border border-red-200 rounded mb-2 pt-2 pb-2 px-4 text-sm text-red-400;
  }
}
.quantity-logistic {
  @apply outline-none bg-gray-200 px-2 text-center;
  width: 75px;
}
</style>
