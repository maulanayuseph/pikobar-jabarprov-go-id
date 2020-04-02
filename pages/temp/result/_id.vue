<template>
  <div class="container mx-auto p-5">
    <header class="flex flex-row justify-center items-center">
      <img
        class="w-20 mr-4 lg:mr-6 h-full object-contain object-center"
        src="/logo.jpg"
      >
      <h3 class="text-xl lg:text-2xl leading-none">
        <b>Pikobar</b>
        <br>
        <small class="opacity-75">
          Pusat Informasi dan Koordinasi COVID-19 Jawa Barat
        </small>
      </h3>
    </header>
    <section class="max-w-3xl mx-auto my-4 md:my-8 p-5 md:p-8 bg-white rounded-lg shadow-xl border border-solid border-gray-300">
      <div class="html-content" v-html="contentToUse" />
    </section>
  </div>
</template>

<script>
import { useNoIndexMeta } from '~/lib/metainfo'
export default {
  layout: 'blank',
  validate ({ params, redirect }) {
    const { id } = params
    if (!id || typeof id !== 'string') {
      redirect('/')
      return false
    }
    if (!id.startsWith('pos') && !id.startsWith('neg')) {
      redirect('/')
      return false
    }
    return true
  },
  asyncData ({ params }) {
    const { id } = params
    const isPositive = id.startsWith('pos')
    const isNegative = id.startsWith('neg')
    return {
      isPositive,
      isNegative
    }
  },
  data () {
    return {
      isPositive: false,
      isNegative: false,
      positive: `
        <p>
          Wargi Jabar yang baik,
        </p>,
        <br>
        <p>
          Terima kasih telah memenuhi panggilan Tes Masif COVID-19 di Gereja Bethel Indonesia (GBI), Jalan Aruna No. 19, Bandung, pada 30 Maret - 1 April 2020.
        </p>
        <br>
        <p>
          Hasil tes menunjukkan bahwa Anda <b class="underline">POSITIF COVID-19</b>. </p>
        <br>
        <p>
          Tetap tenang dan optimis bahwa Anda bisa melawan virus ini. Sebagai tindak lanjut, <b class="underline">Anda akan diundang untuk tes swab lanjutan</b>.
          Waktu dan tempat akan segera kami informasikan kepada Anda.
          Sementara ini, mohon perhatikan langkah-langkah berikut:
          <ol>
            <li>
              Isolasi diri Anda. Jaga jarak dan hindari kontak fisik langsung dengan orang lain, termasuk keluarga.
            </li>
            <li>
              Lakukan pola hidup bersih dan sehat
            </li>
            <li>
              Tetap berpikir positif, pikiran yang berbahagia akan membantu tubuhmu tetap kuat dan menjaga imun agar tidak jatuh sakit
            </li>
            <li>
              Tingkatkan imun tubuh dengan mengkonsumsi banyak makanan bergizi
            </li>
          </ol>
        </p>
        <br>
        <p>
          Untuk keadaan darurat Anda bisa menghubungi
          <br><br>
          Call Center: <a class="temp-result-call-button" href="tel:119">119</a>
          <br>
          Dinkes Jabar: <a class="temp-result-call-button" href="tel:0811 2093 306">0811 2093 306</a>
        </p>
      `,
      negative: `
        <p>
          Wargi Jabar yang baik,
        </p>
        <br>
        <p>
          Terima kasih telah memenuhi panggilan Tes Masif COVID-19 di Gereja Bethel Indonesia (GBI), Jalan Aruna No. 19, Bandung, pada 30 Maret - 1 April 2020.
        </p>
        <br>
        <p>
          Hasil tes menunjukkan bahwa Anda <b class="underline">NEGATIF COVID-19</b>. 
        </p>
        <br>
        <p>
          Walaupun demikian, <b class="underline">kami sarankan Anda tetap berkegiatan dari rumah selama pandemi berlangsung</b>.
          Kami berharap Anda senantiasa menerapkan pembatasan sosial untuk bantu cegah penyebaran COVID-19, dengan langkah-langkah berikut:
          <ol>
            <li>
              Hindari bepergian dan tetap berkegiatan dari rumah serta tidak mudik untuk sementara waktu
            </li>
            <li>
              Lakukan pola hidup bersih dan sehat, seperti rajin mencuci tangan, olahraga, makan-makanan bergizi dan minum multivitamin untuk menjaga imun tubuh
            </li>
            <li>
              Tidak melakukan <i>panic buying</i> terhadap alat-alat kebutuhan medis seperti masker, karena tenaga medis dan orang yang sakit lebih membutuhkan.
            </li>
          </ol>
        </p>
        <br>
        <p>
          Untuk keadaan darurat Anda bisa menghubungi
          <br><br>
          Call Center: <a class="temp-result-call-button" href="tel:119">119</a>
          <br>
          Dinkes Jabar: <a class="temp-result-call-button" href="tel:0811 2093 306">0811 2093 306</a>
        </p>
      `
    }
  },
  computed: {
    contentToUse () {
      if (this.isPositive) {
        return this.positive
      }
      if (this.isNegative) {
        return this.negative
      }
      return ''
    }
  },
  head () {
    return useNoIndexMeta()
  }
}
</script>

<style lang="scss">
.temp-result-call-button {
  color: #404040 !important;
  @apply inline-block px-3 py-1 mb-3 rounded-md border border-solid border-green-300 bg-green-100;

  &:hover {
    @apply opacity-50;
  }
}
</style>
