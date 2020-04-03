<template>
  <div class="container mx-auto p-5">
    <header class="flex flex-row justify-start md:justify-center items-center">
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
    <section class="max-w-3xl mx-auto my-8 md:p-8 md:bg-white md:rounded-lg md:shadow-xl md:border md:border-solid md:border-gray-300">
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
        </p>
        <br>
        <p>
          Terima kasih telah memenuhi panggilan Tes Masif COVID-19.
        </p>
        <br>
        <p>
          Hasil tes menunjukkan bahwa Anda <b class="underline">POSITIF COVID-19</b>. </p>
        <br>
        <p>
          Tetap tenang dan optimis bahwa Anda bisa melawan virus ini.
          Sebagai tindak lanjut, <b>Anda akan diundang untuk tes swab lanjutan</b>.
          Waktu dan tempat akan segera kami informasikan kepada Anda melalui SMS.
          Sementara ini, mohon perhatikan langkah-langkah berikut:
          <ol>
            <li>
              <b>Isolasi diri Anda</b>. Jaga jarak dan hindari kontak fisik langsung dengan orang lain, termasuk keluarga seperti berjabat tangan.
              Gunakan peralatan makan dan mandi sendiri, tidak bercampur dengan orang lain. 
            </li>
            <li>
              <b>Menggunakan masker bila sakit</b> atau harus berada di tempat umum.
            </li>
            <li>
              Lakukan <b>pola hidup bersih dan sehat</b>, seperti rajin mencuci tangan pakai sabun dengan air mengalir sebelum menyentuh muka dan makan,
              olahraga secara rutin, konsumsi multivitamin, istirahat yang cukup, dan mengurangi konsumsi gula.
            </li>
            <li>
              Tetap <b>berpikir positif</b>, pikiran yang bahagia akan membantu tubuhmu tetap kuat dan menjaga imun agar tidak jatuh sakit.
            </li>
            <li>
              Tingkatkan <b>imun tubuh</b> dengan mengkonsumsi banyak makanan bergizi.
            </li>
          </ol>
          <img class="object-contain object-center w-full h-auto" src="https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Frdt-pikobar.png?alt=media&token=00c5a8c1-de59-4657-8097-6e84ba0195b6">
        </p>
        <p>
          Observasi gejala yang Anda alami. Untuk positif tanpa gejala atau dengan gejala ringan sampai sedang,
          Anda disarankan untuk melakukan isolasi dan perawatan mandiri.
          Apabila gejala berlanjut, segera konsultasi ke dokter atau fasyankes terdekat.
          Untuk pertanyaan lebih lanjut, Anda dapat menghubungi:
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
          Terima kasih telah memenuhi panggilan Tes Masif COVID-19.
        </p>
        <br>
        <p>
          Hasil tes menunjukkan bahwa Anda <b class="underline">NEGATIF COVID-19</b>. 
        </p>
        <br>
        <p>
          Walaupun demikian, bukan berarti Anda kebal dari virus COVID-19.
          <b>Kami meminta Anda tetap berkegiatan dari rumah selama pandemi berlangsung</b>.
          Anda diwajibkan senantiasa menerapkan pembatasan sosial untuk bantu cegah penyebaran COVID-19, dengan langkah-langkah berikut:
          <ol>
            <li>
              Hindari bepergian dan tetap <b>berkegiatan dari rumah</b> serta <b>tidak mudik</b> untuk sementara waktu
            </li>
            <li>
              Lakukan <b>pola hidup bersih dan sehat</b>,
              seperti rajin mencuci tangan pakai sabun dengan air mengalir sebelum menyentuh muka dan makan,
              olahraga secara rutin, konsumsi multivitamin, istirahat yang cukup, dan mengurangi konsumsi gula.
            </li>
            <li>
              Tidak melakukan <b><i>panic buying</i> terhadap alat kebutuhan sehari-hari dan kebutuhan medis</b> seperti masker, karena tenaga medis dan orang yang sakit lebih membutuhkan. 
            </li>
          </ol>
          <img class="object-contain object-center w-full h-auto" src="https://firebasestorage.googleapis.com/v0/b/jabarprov-covid19.appspot.com/o/public%2Frdt-pikobar.png?alt=media&token=00c5a8c1-de59-4657-8097-6e84ba0195b6">
        </p>
        <p>
          Untuk pertanyaan lebih lanjut, Anda bisa menghubungi:
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
