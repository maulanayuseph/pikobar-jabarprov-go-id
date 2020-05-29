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
      <div class="mb-4">
        <label class="input-label" for="address">
          Alamat
        </label>
        <textarea
          v-model="payload.address"
          name="address"
          autocomplete="address"
          class="input-textarea"
          placeholder="Masukkan alamat Anda"
          rows="4"
          v-on="inputListeners"
        />
        <p
          v-if="hasError('address')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('address') }}
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
        <label class="input-label" for="amount">
          Jumlah Transfer
        </label>
        <input
          v-model="payload.amount"
          type="number"
          :min="0"
          name="amount"
          autocomplete="off"
          class="input-text"
          placeholder="Masukkan jumlah transfer"
          v-on="inputListeners"
        >
        <p
          v-if="hasError('amount')"
          class="mt-2 text-red-500"
        >
          {{ getErrorMessage('amount') }}
        </p>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Bukti Transfer
        </label>
        <div class="relative">
          <button
            class="border border-green-400 text-green-600 rounded-lg px-4 text-sm py-1 mr-2"
            @click.prevent="uploadDocument()"
          >
            <FontAwesomeIcon v-if="payload.receipt_url.match(/http/gi)" class="inline-block mr-2 text-green-600" :icon="icons.faCheckCircle" />
            <FontAwesomeIcon v-else class="inline-block mr-2 text-green-600" :icon="icons.faFileUpload" />
            Upload Dokumen
          </button>
        </div>
        <p v-if="showDocumentError" class="text-red-500">
          Dokumen harus diunggah
        </p>
      </div>
      <div class="mb-4">
        <label class="input-label" for="name">
          Tampilkan Sebagai Donatur Anonim ?
        </label>
        <select
          v-model="payload.agreed_to_be_mentioned"
          name="agreed_to_be_mentioned"
          class="input-text cursor-pointer bg-white"
        >
          <option :value="true">
            Tidak
          </option>
          <option :value="false">
            Ya
          </option>
        </select>
      </div>
      <hr class="mb-4">
      <client-only>
        <vue-recaptcha
          v-if="isMounted"
          ref="invisibleRecaptcha"
          :load-recaptcha-script="true"
          size="invisible"
          :sitekey="recaptchaKey"
          @verify="onVerify"
          @expired="onExpired"
        />
      </client-only>
      <button
        :disabled="hasAtLeastOneError"
        type="submit"
        class="text-white rounded-lg px-6 py-2"
        :class="[!hasAtLeastOneError? 'bg-brand-green' : 'bg-gray-400 cursor-not-allowed']"
      >
        Kirim
      </button>
    </form>
  </div>
</template>

<script>
import { faCheckCircle, faTrash, faFileDownload, faFileUpload } from '@fortawesome/free-solid-svg-icons'
import VueRecaptcha from 'vue-recaptcha'
import Swal from 'sweetalert2'
import { storage, db } from '@/lib/firebase'

const emptyPayload = {
  entity_type: '', // 'personal' | 'organization' | 'company'
  name: null,
  address: null,
  email: null,
  phone: null,
  amount: null,
  receipt_url: '',
  agreed_to_be_mentioned: true
}
export default {
  components: { VueRecaptcha },
  data () {
    return {
      showDocumentError: false,
      isMounted: false,
      icons: {
        faCheckCircle,
        faTrash,
        faFileDownload,
        faFileUpload
      },
      payload: JSON.parse(JSON.stringify(emptyPayload)),
      documentURL: null,
      documentFile: null,
      errors: {},
      messages: {
        name: 'Nama harus diisi',
        email: 'Email harus diisi',
        phone: 'No handphone harus diisi',
        address: 'Alamat harus diisi',
        amount: 'Jumlah transfer harus diisi'
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
    validate (field) {
      if (field === 'receipt_url') {
        return
      }
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
    },
    uploadDocument () {
      this.showDocumentError = false
      const fileInput = document.createElement('input')
      fileInput.setAttribute('type', 'file')
      fileInput.setAttribute('name', 'file')
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length) {
          this.documentFile = e.target.files[0]
          this.documentURL = window.URL.createObjectURL(e.target.files[0])
        }
      })
      fileInput.click()
    },
    beforeSubmit () {
      Swal.fire({
        title: 'Menyimpan data...',
        onBeforeOpen: () => Swal.showLoading()
      })
      this.uploadFileToFirebaseStorage()
        .then(() => {
          this.postPayloadToFirestore()
          Swal.fire({
            title: 'Data berhasil disimpan',
            icon: 'success'
          })
          this.payload = JSON.parse(JSON.stringify(emptyPayload))
        }).catch((e) => {
          Swal.fire({
            title: 'Terjadi kesalahan',
            text: e ? e.message || e : '',
            icon: 'error'
          })
        })
    },
    uploadFileToFirebaseStorage () {
      // console.log('uploading to storage')
      return new Promise((resolve, reject) => {
        const ref = storage.ref().child(`public/donation-cash/${this.documentFile.name}-${new Date().getTime()}`)
        const uploadTask = ref.put(this.documentFile)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
          reject(error)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log({ downloadURL })
            this.payload.receipt_url = downloadURL
            resolve()
          })
        })
      })
    },
    postPayloadToFirestore () {
      // console.log('uploading to firestore')
      return db.collection('donation-cash').add(this.payload)
        .then((docRef) => {
          console.log(docRef.id)
        }).catch((error) => {
          console.error(error)
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
  appearance: none;
}

.input-textarea {
  @apply w-full min-w-0 px-4 py-2 rounded
  border border-solid border-gray-300;
  appearance: none;
}
</style>
