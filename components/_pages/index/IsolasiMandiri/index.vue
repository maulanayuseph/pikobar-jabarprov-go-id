<template>
  <div class="isoman">
    <h2 class="isoman__title">
      <strong>Pelayanan Kesehatan & Telekonsultasi Selama Isolasi Mandiri</strong>
    </h2>
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
        Kontak Erat dari Pasien COVID-19
      </template>
      <KontakEratCovid19 />
    </ExpandableContent>
    <ExpandableContent>
      <template #title>
        Kapan Pasien COVID-19 Dinyatakan Bebas Isoman?
      </template>
      <BebasIsoman />
    </ExpandableContent>
    <ExpandableContent>
      <template #title>
        Jika Isoman Sudah Selesai, Haruskah Tes PCR Ulang?
      </template>
      <TestPCRUlang />
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
    <div class="isoman__action-cards">
      <ActionCard
        class="action-card--whitespaced"
        title="Konsultasi dengan Dokter"
        body="Bagi Wargi yang membutuhkan obat, yuk konsultasikan terlebih dahulu dengan dokter melalui layanan telekonsultasi dokter Pikobar"
        prompt="Tanyakan Sekarang"
        :event="konsultasiDokterEvent"
        :image="konsultasiDokterImage"
        :backlink="konsultasiDokter"
      />
      <ActionCard
        title="Permohonan Kebutuhan Vitamin"
        body="Ajukan permohonan kebutuhan vitamin untuk isolasi mandiri"
        prompt="Ajukan Sekarang"
        :event="permohonanKebutuhanEvent"
        :image="permohonanKebutuhanImage"
        :backlink="permohonanKebutuhan"
      />
      <ActionCard
        title="Saya Butuh Tabung Oksigen"
        body="Lihat daftar penyedia tabung oksigen di sekitar Anda"
        prompt="Cek di Sini"
        :event="konsultasiDokterEvent"
        :image="konsultasiDokterImage"
        :backlink="konsultasiDokter"
      />
      <ActionCard
        title="Saya Punya Tabung Oksigen"
        body="Lengkapi formulir untuk meminjamkan tabung oksigen bagi warga yang membutuhkan"
        prompt="Isi Formulir"
        :event="permohonanKebutuhanEvent"
        :image="permohonanKebutuhanImage"
        :backlink="permohonanKebutuhan"
      />
    </div>
  </div>
</template>

<script>
import ExpandableContent from './ExpandableContent'
import PerawatanBagiPasien from './PerawatanBagiPasien'
import PanduanIsolasi from './PanduanIsolasi'
import KontakEratCovid19 from './KontakEratCovid19'
import BebasIsoman from './BebasIsoman'
import TestPCRUlang from './TestPCRUlang'
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
    ActionCard,
    KontakEratCovid19,
    BebasIsoman,
    TestPCRUlang
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

  &__action-cards {
    gap: 16px;
    @apply flex flex-col flex-wrap mt-4;

    > * {
      // for each action card
      // 16px is gap
      width: 100%;
    }

    @screen sm {
      @apply flex-row;

      > * {
        width: calc((100% - 16px) / 2);
      }
    }

    @screen lg {
      gap: 24px;
      @apply gap-6 mt-6;

      > * {
        // for each action card
        // 24px is gap
        width: calc((100% - 24px) / 2);
      }
    }
  }
}
</style>
