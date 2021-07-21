<template>
  <div class="container mx-auto">
    <div class="md:m-8 md:p-8 result-card">
      <h2 class="text-2xl font-bold leading-tight mb-6">
        Hasil Pelacakan Status Permohonan Anda
      </h2>
      <div class="flex flex-col rounded-lg border-gray-400 border-solid border-2 p-4">
        <div class="flex flex-col gap-2 mb-2 md:p-8">
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">ID Permohonan</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ trackingResult.id_permohonan }}</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">NIK</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ trackingResult.nik }}</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Nama Pemohon</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ trackingResult.nama_lengkap }}</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Nama Paket</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ trackingResult.paket_obatvitamin }}</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Alamat Domisili</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">{{ trackingResult.alamat_tempat }}</span>
          </div>
        </div>
        <div>
          <TabLayout :tabs="listTabs" :active-tab-id="activeTabId" @change="v => activeTabId = v" />
          <div class="flex flex-col">
            <span>Status Permohonan Anda</span>
            <span class="text-xl font-bold self-center">{{ requestStatus }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    TabLayout: () => import('../../../TabLayout')
  },
  data () {
    return {
      activeTabId: 'request',
      listTabs: [
        {
          id: 'request',
          title: '1. Permohonan'
        },
        {
          id: 'verification',
          title: '2. Verifikasi'
        },
        {
          id: 'packing',
          title: '3. Packing'
        },
        {
          id: 'distribution',
          title: '4. Distribusi'
        },
        {
          id: 'received',
          title: '5. Diterima'
        }
      ],
      trackingResult: {
        alamat_tempat: 'Jl. Anggrek 21 no. 18 AS 22 Kranggan Permai Bekasi',
        city: 'Kota Bekasi',
        id_permohonan: 'REQ-0000008214',
        nama_lengkap: 'Satriyo A*** Nu***',
        nik: '3404********0006',
        paket_obatvitamin: 'Paket A - Vitamin Tanpa Konsultasi Dokter',
        status: 'DELIVERED',
        delivery_info: {
          airwaybill: '0233852100119075',
          courier: 'JNE',
          track_url: 'https://shipdeo.com/tracking-airwaybill?jne&0233852100119075'
        }
      }
    }
  },
  computed: {
    requestStatus () {
      switch (this.activeTabId) {
        case 'verification':
          return 'LOLOS VERIFIKASI'
        case 'packing':
          return 'PAKET ANDA SEDANG DI PACKING'
        case 'distribution':
          return 'PAKET ANDA SEDANG DI DISTRIBUSI'
        case 'received':
          return 'SUDAH DITERIMA'
        default:
          return ''
      }
    }
  }
}
</script>

<style scoped>
.result-card {
  @apply flex flex-col p-5 m-4
  rounded-lg bg-white shadow-md
  content-center
}
</style>
