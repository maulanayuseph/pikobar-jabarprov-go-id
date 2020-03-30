<template>
  <div>
    <h3 class="text-center mb-8 md:mb-12">
      <b class="text-lg">
        Didukung oleh:
      </b>
    </h3>
    <div class="max-w-4xl mx-auto flex flex-row flex-wrap justify-center items-center text-base">
      <a
        v-for="(s, index) in sponsors"
        :key="index"
        :href="s.url || '#'"
        target="_blank"
      >
        <img
          class="cursor-pointer hover:opacity-50 object-contain object-center w-32 mx-4 mb-8"
          :style="{ height: s.height || '2.5em'}"
          :src="s.logo"
          :alt="s.alt"
        >
      </a>
    </div>
    <br>
    <p class="text-center opacity-50">
      &copy; Official website Pemerintah Provinsi Jawa Barat 2020
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sponsors: [
        {
          logo: 'img/logo-netlify.png',
          alt: 'Netlify',
          url: 'https://netlify.com'
        },
        {
          logo: 'img/logo-humas-jabar.png',
          alt: 'Humas Jabar',
          url: 'http://humas.jabarprov.go.id/'
        },
        {
          logo: 'img/logo-prixa.png',
          alt: 'Prixa',
          url: 'https://www.prixa.ai/?lang=en'
        },
        {
          logo: 'img/logo-relawan-covid.png',
          alt: 'Relawan COVID-19',
          url: '#',
          height: '5em'
        },
        {
          logo: 'img/logo-acara-seru.png',
          alt: 'Acara Seru',
          url: 'https://www.acaraseru.id/',
          height: '5em'
        },
        {
          logo: 'img/logo-acci.png',
          alt: 'Asosiasi Cloud Computing Indonesia',
          url: 'https://www.acci.or.id/',
          height: '5em'
        },
        {
          logo: 'img/logo-bssn.png',
          alt: 'Badan Siber dan Sandi Negara',
          url: 'https://bssn.go.id/',
          height: '4em'
        },
        {
          logo: 'img/logo-ngesec.png',
          alt: 'Ngelab, Ngerumpi Security',
          url: 'https://ngesec.id/'
        },
        {
          logo: 'img/logo-cyber-army.png',
          alt: 'Cyber Army',
          url: 'https://www.cyberarmy.id/'
        }
      ]
    }
  }
}
</script>

<style>

</style>
