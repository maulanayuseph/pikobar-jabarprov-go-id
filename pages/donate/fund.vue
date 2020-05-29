
<template>
  <div class="container mx-auto">
    <section class="m-4 md:m-8">
      <DonationBanners />
    </section>
    <section id="table-logistik" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <h4 class="p-4 text-center text-lg md:text-2xl">
          <b>Bantu Kebutuhan Tunai</b>
        </h4>
        <p class="mb-4 opacity-75">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </section>
    <section id="donate-now" class="m-4 mt-8 md:m-8 md:mt-16">
      <div class="p-5 md:p-8 rounded-lg border border-solid border-gray-300 bg-white">
        <FundParticipationForm />
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
    FundParticipationForm: () => import('../../components/_pages/donate/FundParticipationForm')
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
