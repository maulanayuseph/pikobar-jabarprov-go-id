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
        <input
          v-model="payload.type"
          name="type"
          autocomplete="off"
          class="input-text"
          placeholder="Masukkan jenis logistik"
          v-on="inputListeners"
        >
        <p
          v-if="hasError('type')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('type') }}
        </p>
      </div>
      <div class="mb-8">
        <label class="input-label" for="amount">
          Jumlah
        </label>
        <input
          v-model="payload.amount"
          name="amount"
          autocomplete="off"
          class="input-text"
          placeholder="Contoh: 100 pcs"
          v-on="inputListeners"
        >
        <p
          v-if="hasError('amount')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('amount') }}
        </p>
      </div>
      <button
        type="submit"
        class="bg-brand-green text-white rounded-lg px-6 py-2"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
        phone: 'No handphone harus diisi',
        type: 'Jenis kebutuhan logistik harus diisi',
        amount: 'Jumlah harus diisi'
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
</style>
