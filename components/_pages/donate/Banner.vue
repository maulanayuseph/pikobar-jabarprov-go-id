<template>
  <div class="relative container-with-ratio rounded-lg overflow-hidden shadow-md">
    <ImageCarousel
      class="absolute inset-0 w-full h-full"
      :items="banners"
      :carousel-props="carouselProps"
    />
  </div>
</template>

<script>
export default {
  components: {
    ImageCarousel: () => import('../../../components/ImageCarousel')
  },
  data () {
    return {
      carouselProps: {
        paginationEnabled: true
      },
      banners: [
        {
          id: 0,
          sequence: 1,
          title: 'Banner 1',
          action_url: '#',
          url: require('~/assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        },
        {
          id: 1,
          sequence: 2,
          title: 'Banner 2',
          action_url: '#',
          url: require('~/assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        },
        {
          id: 2,
          sequence: 3,
          title: 'Banner 3',
          action_url: '#',
          url: require('~/assets/banner-placeholder.jpg'),
          objectFit: 'cover'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.container-with-ratio {
  padding-top: (500 * 100/ 900) * 1%;

  @screen lg {
    padding-top: (300 * 100/ 900) * 1%;
  }
}
</style>
