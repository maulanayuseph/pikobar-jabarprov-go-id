<template>
  <div>
    <section class="bg-green-600">
      <div class="container mx-auto">
        <div class="mx-4 flex flex-wrap gap-8 py-8 justify-between">
          <div class="flex flex-col items-start justify-center">
            <h1 class="text-3xl font-semibold tracking-wider md:tracking-normal md:text-4xl md:font-bold leading-normal text-white">
              Informasi Vaksinasi Covid-19
            </h1>
            <p class="text-white text-lg tracking-wide">
              Pertanyaan dan berita terkini seputar vaksinasi.
            </p>
          </div>
          <img class="mx-auto md:mx-0" src="~/assets/illustrations/vaksin.svg" alt="illustrasi vaksin">
        </div>
      </div>
    </section>
    <div class="container mx-auto">
      <div class="m-4 p-5 rounded-lg bg-white shadow">
        <div v-if="true" class="flex flex-col gap-8">
          <div v-for="(i, index) of 10" :key="index">
            <h2 class="text-3xl md:text-2xl font-bold leading-normal text-gray-800">
              Test {{ i }}
            </h2>
            <p class="text-gray-700 text-lg md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi reprehenderit eaque eius voluptatibus eos non magnam aut enim cupiditate dolores ducimus at necessitatibus incidunt, error vero doloribus repellendus eligendi repudiandae.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At quos totam, ea adipisci culpa officia a voluptate unde, in aliquid facere laborum corrupti expedita consectetur enim asperiores ut id ex.
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel voluptates iure, distinctio eos eaque error, dolorem aut saepe numquam nulla soluta? Eius harum iure illo fugiat, excepturi temporibus nam exercitationem?
            </p>
            <span v-if="true" class="text-blue-500 italic underline">Sumber: Source.co </span>
          </div>
        </div>
        <content-loader
          v-else
          :speed="2"
          primary-color="#f3f3f3"
          secondary-color="#ecebeb"
        >
          <rect
            x="0"
            y="0"
            rx="0"
            ry="0"
            width="15%"
            height="10"
          />
          <rect
            x="0"
            y="12"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="22"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="32"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="42"
            rx="0"
            ry="0"
            width="100%"
            height="8"
          />
          <rect
            x="0"
            y="52"
            rx="0"
            ry="0"
            width="25%"
            height="10"
          />
        </content-loader>
      </div>
    </div>
  </div>
</template>
<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  components: {
    ContentLoader
  }
}
</script>
