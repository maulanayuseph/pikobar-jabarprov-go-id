<template>
  <div :class="!isLoading ? '' : 'hidden'">
    <div :class="!isLoading ? 'md:flex md:flex-row flex-wrap mx-1' : 'hidden'">
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
    </div>
    <div :class="!isLoading ? 'md:flex md:flex-row flex-wrap mx-1' : 'hidden'">
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
      <div class="md:flex-1 mx-1 my-1">
        <div class=" rounded-lg p-6 shadow-lg bg-white">
          <ContentLoader
            :speed="2"
            width="400"
            height="120"
            primary-color="rgba(214, 210, 210,0.6)"
            secondary-color="rgba(214, 210, 210,1)"
          >
            <rect
              x="0"
              y="0"
              rx="8"
              ry="6"
              width="50%"
              height="27"
            />
            <rect
              x="0"
              y="50"
              rx="8"
              ry="6"
              width="66%"
              height="27"
            />
            <rect
              x="0"
              y="94"
              rx="8"
              ry="6"
              width="20%"
              height="27"
            />
          </ContentLoader>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  name: 'CardLoader',
  components: {
    ContentLoader
  }
}
</script>
<style scoped>
 .total-bor {
   background-color: #f09b78;
 }
</style>
