<template>
  <div class="isoman">
    <h2 class="isoman__title">
      <strong>Pelayanan Kesehatan & Telekonsultasi Selama Isolasi Mandiri</strong>
    </h2>
    <client-only>
      <ExpandableContent>
        <template #title>
          Perawatan Bagi Pasien COVID-19
        </template>
        <PerawatanBagiPasien />
      </ExpandableContent>
      <ExpandableContent>
        <template #title>
          Panduan Isolasi di Rumah
        </template>
        <PanduanIsolasi />
      </ExpandableContent>
      <ExpandableContent>
        <template #title>
          Konsultasi dengan Dokter
        </template>
        <KonsultasiDenganDokter />
      </ExpandableContent>
      <ExpandableContent>
        <template #title>
          Permohonan Kebutuhan Isolasi Mandiri
        </template>
        <PermohonanKebutuhanIsoman />
      </ExpandableContent>
      <div class="flex flex-col flex-no-wrap sm:flex-row gap-4 mt-4 lg:mt-6 lg:gap-6">
        <ActionCard
          class="w-full lg:w-1/2"
          title="Konsultasi dengan Dokter"
          body="Konsultasi dengan dokter melalui layanan hotline Pikobar"
          prompt="Tanyakan Sekarang"
          :event="konsultasiDokterEvent"
          :image="konsultasiDokterImage"
          :backlink="konsultasiDokter"
        />
        <ActionCard
          class="w-full lg:w-1/2"
          title="Permohonan Kebutuhan"
          body="Ajukan permohonan kebutuhan untuk isolasi mandiri"
          prompt="Ajukan Sekarang"
          :event="permohonanKebutuhanEvent"
          :image="permohonanKebutuhanImage"
          :backlink="permohonanKebutuhan"
        />
      </div>
    </client-only>
  </div>
</template>

<script>
import ExpandableContent from './ExpandableContent'
import PerawatanBagiPasien from './PerawatanBagiPasien'
import PanduanIsolasi from './PanduanIsolasi'
import KonsultasiDenganDokter from './KonsultasiDenganDokter'
import PermohonanKebutuhanIsoman from './PermohonanKebutuhanIsoman'
import ActionCard from './ActionCard'
import { konsultasiDokter, permohonanKebutuhan } from './backlinks'
import {
  TAP_KONSULTASI_DOKTER as konsultasiDokterEvent,
  TAP_PERMOHONAN_ISOMAN as permohonanKebutuhanEvent
} from './events'
import permohonanKebutuhanImage from '~/assets/illustrations/permohonan-kebutuhan-isoman.png'
import konsultasiDokterImage from '~/assets/illustrations/konsultasi-dokter.png'

export default {
  components: {
    ExpandableContent,
    PerawatanBagiPasien,
    PanduanIsolasi,
    KonsultasiDenganDokter,
    PermohonanKebutuhanIsoman,
    ActionCard
  },
  data () {
    return {
      konsultasiDokter,
      konsultasiDokterImage,
      konsultasiDokterEvent,
      permohonanKebutuhan,
      permohonanKebutuhanImage,
      permohonanKebutuhanEvent
    }
  }
}
</script>

<style lang="scss" scoped>
.isoman {
  &__title {
    @apply mb-4 text-left text-xl;

    @screen md {
      @apply mb-8 text-2xl;
    }
  }
}
</style>
