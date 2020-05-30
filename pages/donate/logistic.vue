
<template>
  <div class="container mx-auto">
    <section class="m-4 md:m-8">
      <DonationBanners />
    </section>
    <section id="table-logistik" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <h4 class="p-4 text-center text-lg md:text-2xl">
          <b>Daftar Kebutuhan Non Tunai</b>
        </h4>
        <p class="mb-4 opacity-75 text-center">
          Ketahui daftar logistik medis dan non medis yang diajukan dan telah terpenuhi di sini.
        </p>
        <TabLayout :tabs="tableTabs" :active-tab-id="activeTabId" @change="v => activeTabId = v" />
        <LogisticTable :tab-selected="activeTabId" class="mt-4" />
      </div>
    </section>
    <section id="donate-now" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <ParticipationForm />
      </div>
    </section>
    <section class="m-4 md:m-8 rounded-lg border border-solid border-gray-300 bg-white">
      <KPBMContact />
    </section>
  </div>
</template>
<script>
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import { analytics } from '~/lib/firebase'

export default {
  components: {
    DonationBanners: () => import('../../components/_pages/donate/Banner'),
    KPBMContact: () => import('../../components/_pages/donate/KPBMContact'),
    ParticipationForm: () => import('../../components/_pages/donate/ParticipationForm'),
    TabLayout: () => import('../../components/TabLayout'),
    LogisticTable: () => import('../../components/_pages/donate/LogisticTable')
  },
  data () {
    return {
      icon: {
        faArrowCircleRight
      },
      tableTabs: [
        {
          id: 'medic',
          title: 'Logistik Medis'
        }
        // {
        //   id: 'non-medic',
        //   title: 'Logistik Non Medis'
        // }
      ],
      activeTabId: 'medic'
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.browser) {
        analytics.logEvent('donate_view')
      }
    })
  }
}

</script>

<style lang="scss" scoped>
</style>
