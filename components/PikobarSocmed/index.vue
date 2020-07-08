<template>
  <div class="socmed-card">
    <h6 class="socmed-cta">
      Ikuti perkembangan terkini seputar Covid-19
      dengan mengikuti kanal sosial media kami.
    </h6>
    <ul class="flex-none flex justify-start items-center text-base">
      <li v-for="(sm, index) in pikobarSocmeds" :key="index" class="mr-4">
        <a :href="`https://instagram.com/${sm.id}`" target="_blank">
          <img :src="sm.icon" :class="['socmed-icon object-contain object-center', sm.class]">
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pikobarSocmeds: Object.freeze([
        {
          id: 'pikobar_jabar',
          label: 'Pikobar',
          icon: '/logo.jpg',
          class: 'w-8 h-8'
        },
        {
          id: 'jabardigitalservice',
          label: 'Jabar Digital Service',
          icon: '/img/logo-jds.png',
          class: 'w-12 h-12'
        },
        {
          id: 'humas_jabar',
          label: 'Humas Jabar',
          icon: '/img/logo-humas-jabar.png',
          class: 'w-16 h-16'
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.socmed-card {
  @screen sm {
    @apply flex flex-row justify-between items-center;
  }
}
.socmed-cta {
  @apply text-lg text-gray-600 mb-4;

  @screen sm {
    @apply w-1/2 mb-0;
  }

  @screen lg {
    @apply w-auto text-sm;
  }
}
.socmed-icon:hover {
  @apply opacity-75;
}
</style>
