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
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">REQ-0000000001</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">NIK</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">3123123938492032934</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Nama Pemohon</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">Naufal Ihsan Kusumayadhi</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Nama Paket</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">Kasur Lipat</span>
          </div>
          <div class="flex flex-row">
            <span class="text-sm md:text-base w-6/12 sm:w-3/12">Alamat Domisili</span>
            <span class="text-sm md:text-base w-6/12 sm:w-9/12">Jl in dulu aja Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
          </div>
        </div>
        <div>
          <TabLayout :tabs="listTabs" :active-tab-id="activeTabId" @change="v => activeTabId = v" />
            <div v-if="activeTabId === 'request'">request</div>
            <div v-if="activeTabId === 'verification'">verification</div>
            <div v-if="activeTabId === 'packing'">packing</div>
            <div v-if="activeTabId === 'distribution'">distribution</div>
            <div v-if="activeTabId === 'received'">received</div>
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
      ]
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
