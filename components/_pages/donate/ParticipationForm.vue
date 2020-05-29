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
          Tidak ada data. <a href="#table-logistik" class="font-italic">Tambahkan sekarang</a>
        </div>
      </div>
      <div class="mb-4">
        <label class="input-label" for="type">
          Dokumen Persetujuan
        </label>
        <div class="relative">
          <button
            class="border border-green-400 text-green-600 rounded-lg px-4 text-sm py-1 mr-2"
            @click.prevent="uploadDocument()"
          >
            <FontAwesomeIcon v-if="payload.statement_letter_url.match(/http/gi)" class="inline-block mr-2 text-green-600" :icon="icons.faCheckCircle" />
            <FontAwesomeIcon v-else class="inline-block mr-2 text-green-600" :icon="icons.faFileUpload" />
            Upload Dokumen
          </button>
          <button
            class="border border-gray-400 text-gray-600 rounded-lg px-4 text-sm py-1"
            @click.prevent="downloadDocument()"
          >
            <FontAwesomeIcon class="inline-block mr-2 text-gray-600" :icon="icons.faFileDownload" />
            Download Contoh Dokumen
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
        :disabled="$store.state.donate.selectedLogistics.length ? false : true"
        type="submit"
        class="text-white rounded-lg px-6 py-2"
        :class="[$store.state.donate.selectedLogistics.length ? 'bg-brand-green' : 'bg-gray-400 cursor-not-allowed']"
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
  email: null,
  phone: null,
  provisions: [],
  statement_letter_url: '',
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
      payload: {
        entity_type: '', // 'personal' | 'organization' | 'company'
        name: null,
        email: null,
        phone: null,
        provisions: [],
        statement_letter_url: '',
        agreed_to_be_mentioned: true
      },
      documentURL: null,
      documentFile: null,
      errors: {},
      messages: {
        name: 'Nama harus diisi',
        email: 'Email harus diisi',
        phone: 'No handphone harus diisi'
      }
    }
  },
  computed: {
    recaptchaKey () {
      return process.env.RECAPTCHA_SITE_KEY
    },
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
  mounted () {
    this.$nextTick(() => {
      this.isMounted = true
    })
  },
  methods: {
    updateQuantity (event, logistic) {
      this.$store.commit('donate/UPDATE_QUANTITY_SELECTED_LOGISTIC', {
        quantity: event.target.value,
        logistic
      })
    },
    beforeSubmit () {
      if (!this.documentURL || !this.documentFile) {
        this.showDocumentError = true
      }
      this.clearAllErrorMessages()
      const keys = Object.keys(this.payload)
      for (const key of keys) {
        this.validate(key)
      }
      if (this.hasAtLeastOneError) {
        return
      }
      this.onSubmit()
    },
    onSubmit () {
      this.$refs.invisibleRecaptcha.execute()
    },
    onVerify (response) {
      const selectedLogistics = this.$store.state.donate.selectedLogistics.map(x => ({
        id: x.id,
        type: x.matg_id,
        quantity: x.quantity
      }))
      this.$set(this.payload, 'provisions', JSON.parse(JSON.stringify(selectedLogistics)))
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
          this.$store.commit('donate/SET_SELECTED_LOGISTICS', [])
        }).catch((e) => {
          Swal.fire({
            title: 'Terjadi kesalahan',
            text: e ? e.message || e : '',
            icon: 'error'
          })
        })
    },
    uploadFileToFirebaseStorage () {
      console.log('uploading to storage')
      return new Promise((resolve, reject) => {
        const ref = storage.ref().child(`public/donation/${this.documentFile.name}-${new Date().getTime()}`)
        const uploadTask = ref.put(this.documentFile)
        uploadTask.on('state_changed', (snapshot) => {

        }, (error) => {
          reject(error)
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log({ downloadURL })
            this.payload.statement_letter_url = downloadURL
            resolve()
          })
        })
      })
    },
    postPayloadToFirestore () {
      console.log('uploading to firestore')
      return db.collection('donation').add(this.payload)
        .then((docRef) => {
          console.log(docRef.id)
        }).catch((error) => {
          console.error(error)
        })
    },
    onExpired () {
      console.log('expired')
    },
    validate (field) {
      if (field === 'statement_letter_url') {
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
    downloadDocument () {
      // DOWNLOAD DOCUMENT
      const link = document.createElement('a')
      link.setAttribute('href', '/files/contoh-persetujuan-donasi-logistik.docx')
      link.setAttribute('download', 'contoh-persetujuan-donasi-logistik.docx')
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
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
